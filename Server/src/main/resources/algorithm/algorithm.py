import json
import copy
import random
import networkx as nx
import matplotlib.pyplot as plt
import cProfile, pstats, io
import time
import sys
from collections import OrderedDict


def profile(fnc):
    """A decorator that uses cProfile to profile a function"""

    def inner(*args, **kwargs):
        pr = cProfile.Profile()
        pr.enable()
        retval = fnc(*args, **kwargs)
        pr.disable()
        s = io.StringIO()
        sortby = 'cumulative'
        ps = pstats.Stats(pr, stream=s).sort_stats(sortby)
        ps.print_stats()
        print(s.getvalue())
        return retval

    return inner


with open('src/main/resources/json/local_job.json') as f:
    config = json.load(f)

STATE = config['state']
FILE_NAME = 'src/main/resources/json/' + STATE + '_Precincts.json'
NUMBER_OF_CLUSTERS = 0
if STATE == 'FL':
    NUMBER_OF_CLUSTERS = 27
elif STATE == 'TX':
    NUMBER_OF_CLUSTERS = 36
else:
    NUMBER_OF_CLUSTERS = 13

JOB_ID = config['id']
DISTRICTINGID = sys.argv[1]
terminationLimit = 1000
compactness = config['compactnessMeasure']
populationVariation = config['populationDifference']
minority = config['minorityGroups']

with open(FILE_NAME) as f2:
    data = json.load(f2)


class Node:
    def __init__(self, id, neighbors, population, vap, county):
        self.id = id
        self.neighbors = neighbors
        self.population = population
        self.vap = vap
        self.minorityPopulation = 0
        self.minorityVap = 0
        self.county = county
        self.districtNum = None


class Cluster:
    def __init__(self, districtId, nodes, neighbors):
        self.id = districtId
        self.nodes = nodes
        self.neighbors = neighbors
        self.edges = []
        self.isAcceptable = False
        self.percentage = 0

    def calculatePopulation(self):
        population = 0
        for node in self.nodes:
            population += node.population
        return population

    def calculateVap(self):
        population = 0
        for node in self.nodes:
            population += node.vap
        return population

    def calculateMinorityPopulation(self):
        population = 0
        for node in self.nodes:
            population += node.minorityPopulation
        return population

    def calculateMinorityVap(self):
        population = 0
        for node in self.nodes:
            population += node.minorityVap
        return population

    def calculateNumCounties(self):
        counties = []
        for node in self.nodes:
            c = node.county
            if c not in counties:
                counties.append(c)
        return len(counties)

    def getRandomNeighbor(self):
        if not self.neighbors:
            return None
        else:
            r = random.choice(self.neighbors)
            return r

    def calculateCompactness(self):
        borderPrecincts = getBorderPrecincts(self.nodes)
        ratio = len(borderPrecincts) / len(self.nodes)
        ratio = 1 - ratio  # inverse the ratio
        comp = ''
        if 0 <= ratio < 0.25:
            comp = 'NONE'
        elif 0.25 <= ratio < 0.5:
            comp = 'LITTLE'
        elif 0.5 <= ratio < 0.75:
            comp = 'MODERATE'
        elif 0.75 <= ratio <= 1:
            comp = 'VERY'
        return comp


def getBorderPrecincts(precincts):
    borderPrecincts = []
    # for all the precincts in the district, find precincts that connects to precincts outside of the district
    for p in precincts:
        for neighbor in p.neighbors:
            if nodes_dict[
                neighbor] not in precincts:  # if the precinct has neighbor not in the district (connects to precincts outside the district)
                borderPrecincts.append(p.id)  # mark it as a border precinct
                break
    return borderPrecincts


def merge_clusters(a, b):
    # print("merging", a.id, b.id, a.__dict__, b.__dict__)
    a.neighbors.extend(b.neighbors)
    a.neighbors = list(dict.fromkeys(a.neighbors))  # remove duplicates
    a.neighbors.remove(b.id)
    a.neighbors.remove(a.id)
    a.nodes.extend(b.nodes)
    del clusters[b.id]

    # for all neighbors of b, change their reference to b as a neighbor as a reference to a
    for neighborId in b.neighbors:
        if neighborId == a.id:
            continue
        neighbor = clusters[neighborId]
        for index, item in enumerate(neighbor.neighbors):
            if b.id == item:
                neighbor.neighbors[index] = a.id
                break
        neighbor.neighbors = list(dict.fromkeys(neighbor.neighbors))

    # node_ids = [node.id for node in nodes]
    temp_edges = []
    for n in a.nodes:
        for e in edge_dict[n.id]:
            if nodes_dict[e] in a.nodes and (n.id, e) not in temp_edges and (e, n.id) not in temp_edges:
                temp_edges.append((n.id, e))
    cluster.edges = temp_edges
    # print("after merging", a.id, a.__dict__)
    return a


def deep_merge_clusters(a, b):
    # print("Merging", a.id, b.id)
    temp_nodes = a.nodes.copy()
    temp_nodes.extend(b.nodes)
    temp_neighbors = a.neighbors.copy()
    temp_neighbors.extend(b.neighbors)
    temp_neighbors = list(dict.fromkeys(temp_neighbors))
    return Cluster(a.id, temp_nodes, temp_neighbors)


def generate_seed_districting(numClusters):
    while len(clusters) > numClusters:
        random_cluster = random.choice(list(clusters.values()))
        random_neighbor_id = random_cluster.getRandomNeighbor()
        random_neighbor = clusters[random_neighbor_id]
        merge_clusters(random_cluster, random_neighbor)


def create_mst(cluster):
    nodes = cluster.nodes
    node_ids = [node.id for node in nodes]
    subgraph = nx_graph.subgraph(node_ids)
    mst = nx.minimum_spanning_tree(subgraph)
    # print("min spanning tree", mst.nodes, mst.edges)
    return mst


def choose_random_edge(mst):
    random_edge = random.choice(list(mst.edges))
    # print("Randomly selected edge", random_edge)
    return random_edge


def verifyPopulation(cluster):
    popValid = False
    if ideal_population * (1 - populationVariation / 2) <= cluster.calculatePopulation() <= ideal_population * (
            1 + populationVariation / 2):
        popValid = True
    return popValid


def verifyCompactness(cluster):
    compValid = False
    comp = cluster.calculateCompactness()

    if comp == compactness:
        compValid = True
    return compValid


def getCompDifference(cluster):
    borderPrecincts = getBorderPrecincts(cluster.nodes)
    ratio = len(borderPrecincts) / len(cluster.nodes)
    ratio = 1 - ratio  # inverse the ratio
    idealCompRatio = 0
    if compactness == "NONE":
        idealCompRatio = 0.125
    elif compactness == "LITTLE":
        idealCompRatio = 0.375
    elif compactness == "MODERATE":
        idealCompRatio = 0.625
    elif compactness == "VERY":
        idealCompRatio = 0.875

    compDifference = abs(idealCompRatio - ratio)
    return compDifference


def is_edge_valid(edge_to_cut, mst, cluster_a, cluster_b):
    result = verify_cut_edge(edge_to_cut, mst, cluster_a, cluster_b)
    # resultClusterList = result[0]
    resultClusterA = result[0]
    resultClusterB = result[1]

    # verify the population of the two result clusters as well as two original clusters
    popValA = verifyPopulation(resultClusterA)
    popValB = verifyPopulation(resultClusterB)

    originalPopValA = verifyPopulation(cluster_a)
    originalPopValB = verifyPopulation(cluster_b)

    if popValA and popValB:  # if both resulting clusters have valid population
        if originalPopValA and originalPopValB:  # if original clusters both have valid population
            # check compactness measure of result clusters
            compValA = verifyCompactness(resultClusterA)
            compValB = verifyCompactness(resultClusterB)
            if compValA and compValB:  # if both resulting clusters have valid compactness
                resultClusterA.isAcceptable = True
                resultClusterB.isAcceptable = True
                return 1
            else:
                if cluster_a.isAcceptable and cluster_b.isAcceptable:
                    return False

                originalCompValA = False
                originalCompValB = False
                if cluster_a.isAcceptable:
                    originalCompValA = True
                else:
                    originalCompValA = verifyCompactness(cluster_a)
                if cluster_b.isAcceptable:
                    originalCompValB = True
                else:
                    originalCompValB = verifyCompactness(cluster_b)

                if originalCompValA and originalCompValB:
                    cluster_a.isAcceptable = True
                    cluster_b.isAcceptable = True
                    return False
                elif (compValA + compValB) > (originalCompValA + originalCompValB):
                    if compValA:
                        resultClusterA.isAcceptable = True
                    if compValB:
                        resultClusterB.isAcceptable = True
                    return 2
                elif (compValA + compValB) == (originalCompValA + originalCompValB):
                    compDifferenceA = getCompDifference(resultClusterA)
                    compDifferenceB = getCompDifference(resultClusterB)
                    compDifferenceOriginalA = getCompDifference(cluster_a)
                    compDifferenceOriginalB = getCompDifference(cluster_b)
                    # compare total difference from the ideal compactness of two result clusters and two original compactness
                    if (compDifferenceA + compDifferenceB) < (compDifferenceOriginalA + compDifferenceOriginalB):
                        return 2
                    else:
                        return False
                else:
                    return False
        else:  # if one or both original two clusters have invalid population, return true
            return 2
    elif originalPopValA and originalPopValB:  # if original clusters both have valid population but result clusters would be invalid
        return False
    else:
        popDifferenceA = abs(resultClusterA.calculatePopulation() - ideal_population)
        popDifferenceB = abs(resultClusterB.calculatePopulation() - ideal_population)
        popDifferenceOriginalA = abs(cluster_a.calculatePopulation() - ideal_population)
        popDifferenceOriginalB = abs(cluster_b.calculatePopulation() - ideal_population)
        # compare total difference from the ideal population of two result clusters and two original compactness
        if (popDifferenceA + popDifferenceB) < (popDifferenceOriginalA + popDifferenceOriginalB):
            return 2
        else:
            return False
    return False


def cut_edge(edge_to_cut, mst, combined_neighbors):
    # print("EDGE TO CUT", edge_to_cut)
    mst.remove_edge(edge_to_cut[0], edge_to_cut[1])
    result_clusters = list((nx_graph.subgraph(c) for c in nx.connected_components(mst)))
    cut_cluster_a = result_clusters[0]
    cut_cluster_b = result_clusters[1]

    # create new clusters
    temp = []
    for node_id in list(cut_cluster_a.nodes):
        temp.append(nodes_dict[node_id])
    new_cluster_a = Cluster(list(cut_cluster_a.nodes)[0], temp, [])
    temp = []
    for node_id in list(cut_cluster_b.nodes):
        temp.append(nodes_dict[node_id])
    new_cluster_b = Cluster(list(cut_cluster_b.nodes)[0], temp, [])

    # Update the total cluster list
    temp = {new_cluster_a.id: new_cluster_a, new_cluster_b.id: new_cluster_b}
    clusters.update(temp)

    # find clusters that match neighbors
    neighbor_clusters = []
    for neighbor_id in combined_neighbors:
        for cluster in clusters.values():
            for node in cluster.nodes:
                if neighbor_id == node.id and cluster not in neighbor_clusters:
                    neighbor_clusters.append(cluster)
                    break
    if new_cluster_a not in neighbor_clusters:
        neighbor_clusters.append(new_cluster_a)
    if new_cluster_b not in neighbor_clusters:
        neighbor_clusters.append(new_cluster_b)

    for cluster in neighbor_clusters:
        temp_edges = []
        temp_neighbors = []
        for n in cluster.nodes:
            for e in edge_dict[n.id]:
                if nodes_dict[e] in cluster.nodes:
                    if (n.id, e) not in temp_edges and (e, n.id) not in temp_edges:
                        temp_edges.append((n.id, e))
                else:
                    # find the cluster that has y
                    for cluster2 in clusters.values():
                        if nodes_dict[e] in cluster2.nodes and cluster2.id not in temp_neighbors:
                            temp_neighbors.append(cluster2.id)
                            break

        cluster.edges = temp_edges
        cluster.neighbors = temp_neighbors


def verify_cut_edge(edge_to_cut, mst, cluster_a, cluster_b):
    # print("Test edge to cut", edge_to_cut)
    # mst_copy = mst.copy()
    # mst_copy.remove_edge(edge_to_cut[0], edge_to_cut[1])
    mst.remove_edge(edge_to_cut[0], edge_to_cut[1])
    result_clusters = list((nx_graph.subgraph(c) for c in nx.connected_components(mst)))
    cut_cluster_a = result_clusters[0]
    cut_cluster_b = result_clusters[1]
    mst.add_edge(edge_to_cut[0], edge_to_cut[1])

    temp = []
    for node_id in list(cut_cluster_a.nodes):
        temp.append(nodes_dict[node_id])
    new_cluster_a = Cluster(list(cut_cluster_a.nodes)[0], temp, [])
    temp = []
    for node_id in list(cut_cluster_b.nodes):
        temp.append(nodes_dict[node_id])
    new_cluster_b = Cluster(list(cut_cluster_b.nodes)[0], temp, [])

    return [new_cluster_a, new_cluster_b]


def recombination_step():
    # merge 2 random districts
    random_cluster = random.choice(list(clusters.values()))
    random_neighbor_id = random_cluster.getRandomNeighbor()
    random_neighbor = clusters[random_neighbor_id]
    merged_cluster = deep_merge_clusters(random_cluster, random_neighbor)
    # print("Merging district", random_cluster.id, random_neighbor_id)
    # print("ideal population", ideal_population)

    # make min spanning tree of merged cluster
    mst = create_mst(merged_cluster)
    # recreate neighbors and edges
    combined_neighbors = random_cluster.neighbors.copy()
    combined_neighbors.extend(random_neighbor.neighbors)

    possibleEdges = list(mst.edges)
    feasibleEdges = []

    # print("number of possible edges", len(possibleEdges))
    valid = False
    random_edge = None
    while not valid:
        random_edge = random.choice(possibleEdges)  # choose a random edge and test if it's a valid edge to cut
        valid = is_edge_valid(random_edge, mst, random_cluster, random_neighbor)
        # if valid:
        #     print("Found valid edge: ", random_edge)
        # else:

        if not valid:
            possibleEdges.remove(random_edge)
            if not possibleEdges:
                # print("No valid edges found!")
                return 0  # If all edges are tested and there is no good edge to cut

    # if a valid edge is found drop the two original clusters
    del clusters[random_cluster.id]
    del clusters[random_neighbor.id]

    # remove neighbor and edge references to those clusters
    for n in random_cluster.neighbors:
        if n != random_cluster.id and n != random_neighbor.id:
            neighbor = clusters[n]
            if random_cluster.id in neighbor.neighbors:
                neighbor.neighbors.remove(random_cluster.id)
            for edge in neighbor.edges:
                if edge[0] == random_cluster.id or edge[1] == random_cluster.id:
                    neighbor.edges.remove(edge)

    for n in random_neighbor.neighbors:
        if n != random_cluster.id and n != random_neighbor.id:
            neighbor = clusters[n]
            if random_neighbor.id in neighbor.neighbors:
                neighbor.neighbors.remove(random_neighbor.id)
            for edge in neighbor.edges:
                if edge[0] == random_neighbor.id or edge[1] == random_neighbor.id:
                    neighbor.edges.remove(edge)
    # print("\nRemoved clusters", random_cluster.id, random_neighbor.id)

    # cut random edge found in the previous step to form two new clusters
    cut_edge(random_edge, mst, combined_neighbors)
    # debug_clusters()
    return valid


def debug_clusters():
    print("Acceptable range: (", str(ideal_population * (1 - populationVariation / 2)), ",",
          str(ideal_population * (1 + populationVariation / 2)), ")")
    print("{:<8} {:<10} {:<10} {:<10} {:<15} {:<15} {:<20}".format('Cluster', 'VAP', 'POP', 'MPOP', 'Compactness',
                                                                   'NumPrecincts', 'Neighbors'))
    for key in clusters:
        cluster = clusters[key]
        nodes = cluster.nodes
        # node_ids = [node.id for node in nodes]
        edgeList = cluster.edges
        neighbors = cluster.neighbors
        population = cluster.calculatePopulation()
        minorityPop = cluster.calculateMinorityPopulation()
        vap = cluster.calculateVap()
        comp = cluster.calculateCompactness()
        print("{:<8} {:<10} {:<10} {:<10} {:<15} {:<15} {:<20}".format(key, vap, population, minorityPop, comp,
                                                                       str(len(nodes)), str(neighbors)))

    print()


def debug_merge(cluster, neighbor, merged):
    print("Merged cluster", cluster.id, "with", neighbor.id, "to form new cluster", merged.id)
    print("{:<10} {:<50} {:<20} {:<40}".format('Population', 'Nodes', 'Neighbors', 'Edges'))
    precincts = merged.nodes
    precincts_ids = [precinct.id for precinct in precincts]
    edgeList = merged.edges
    neighbors = merged.neighbors
    print("{:<10} {:<50} {:<20} {:<40}".format(merged.calculatePopulation(), str(precincts_ids), str(neighbors),
                                               str(edgeList)))


def sortClusters():
    print("Sorting")
    percentage = {}
    for key in clusters:
        cluster = clusters[key]
        p = cluster.calculateMinorityVap() / cluster.calculateVap()
        cluster.percentage = p
        percentage[p] = cluster

    newCluster = OrderedDict()
    i = 1
    for key in sorted(percentage):
        c = percentage[key]
        oldId = percentage[key].id
        for k in clusters:
            cluster = clusters[k]
            if oldId in cluster.neighbors:
                cluster.neighbors.remove(oldId)
                cluster.neighbors.append(str(i))

        c.id = str(i)
        i += 1

    for c in clusters:
        cluster = clusters[c]
        newCluster[int(cluster.id)] = cluster
    return newCluster


def debug_nx():
    for cluster in clusters.values():
        nodes = cluster.nodes
        node_ids = [node.id for node in nodes]
        subgraph = nx_graph.subgraph(node_ids)
        print("Sub Graph", subgraph.nodes, subgraph.edges)


if __name__ == "__main__":
    # Main
    start = time.time()
    nodes_data = data["features"]
    # initialize each precinct as a node and a cluster with itself as its only node
    clusters = {}
    nodes_dict = {}
    # edges = []
    edge_dict = {}
    total_population = 0
    nx_graph = nx.MultiGraph()  # whole graph

    for a in range(len(nodes_data)):
        edge_dict[str(a + 1)] = []

    for node_data in nodes_data:
        node = Node(node_data["properties"]["ID"], node_data["properties"]["NEIGHBORS"],
                    node_data["properties"]["TOTAL_POP"], node_data["properties"]["TOTAL_VAP"],
                    node_data["properties"]["COUNTY"])
        for m in minority:
            n = m.upper()
            n = n.replace("-", "_")
            p = n + "_POP"
            v = n + "_VAP"
            node.minorityPopulation += node_data["properties"][p]
            node.minorityVap += node_data["properties"][v]
        nx_graph.add_node(node.id)
        total_population += node.population
        nodes_dict[node.id] = node
        for n in node.neighbors:
            # edges.append((node.id, n))
            edge_dict[node.id].append(n)
        cluster = Cluster(node.id, [node], node.neighbors)
        clusters[cluster.id] = cluster

    # calculate ideal population for each cluster
    ideal_population = total_population / NUMBER_OF_CLUSTERS

    # populate nx_graph
    for key in edge_dict:
        for e in edge_dict[key]:
            if not nx_graph.has_edge(key, e):
                nx_graph.add_edge(key, e)

    print("Generate seedDistricting...")
    generate_seed_districting(NUMBER_OF_CLUSTERS)
    # debug_clusters()
    termination = 0
    numEdgeNotFound = 0
    numEdgeValid = 0
    numEdgeImprove = 0
    while termination < terminationLimit:
        # print("\n Redistricting ", termination + 1)
        a = recombination_step()
        if a == 0:
            numEdgeNotFound += 1
        elif a == 1:
            numEdgeValid += 1
        elif a == 2:
            numEdgeImprove += 1
        termination += 1
    print("Ideal population is", ideal_population, ", ideal compactness is", compactness)
    validPerc = numEdgeValid / terminationLimit
    invalidPerc = numEdgeNotFound / terminationLimit
    improvePerc = numEdgeImprove / terminationLimit
    print("Number of times no valid edge found is", numEdgeNotFound, "chance is", invalidPerc)
    print("Number of times found valid edge is", numEdgeValid, "chance is", validPerc)
    print("Number of times improved edge found is", numEdgeImprove, "chance is", improvePerc)
    # debug_clusters()

    sortedClusters = sortClusters()
    key = sorted(sortedClusters.keys())

    districts = []
    for k in key:
        cluster = sortedClusters[k]
        nodes = cluster.nodes
        edgeList = cluster.edges
        neighbors = cluster.neighbors
        population = cluster.calculatePopulation()
        mpop = cluster.calculateMinorityPopulation()
        mvap = cluster.calculateMinorityVap()
        vap = cluster.calculateVap()
        counties = cluster.calculateNumCounties()
        precinctsIDs = []
        precinctsInfo = []
        for n in nodes:
            p = {}
            p["precinctID"] = str(n.id)
            p["minorityPopulation"] = str(n.minorityPopulation)
            p["minorityVotingAgePopulation"] = str(n.minorityVap)
            precinctsIDs.append(n.id)
            precinctsInfo.append(p)

        district = {}
        district["type"] = "Feature"
        district["properties"] = {
            "district": "District" + str(k),
            "districtID": "sortOrder" + str(k),
            "population": str(population),
            "minorityPopulation": str(mpop),
            "votingAgePopulation": str(vap),
            "minorityVotingAgePopulation": str(mvap),
            "adjacentDistricts": neighbors,
            "differentCounties": str(counties),
            "precinctIDs": str(precinctsIDs),
            "precinctsInfo": precinctsInfo
        }
        district["geometry"] = {"type": "Polygon", "coordinates": []}

        districts.append(district)

    districting = {"type": "FeatureCollection",
                   "jobID": str(JOB_ID),
                   "districtingID": str(DISTRICTINGID),
                   "constraints": {
                       "compactnessLimit": compactness,
                       "populationDifferenceLimit": populationVariation,
                       "minorityGroups": minority
                   },
                   "features": districts
                   }

    # Output to json file
    outputFileName = "src/main/resources/jobs/job" + str(JOB_ID) + "/job" + str(JOB_ID) + "_districting" + str(DISTRICTINGID) + ".json"
    with open(outputFileName, 'w') as json_file:
        json.dump(districting, json_file)

    print('It took', time.time() - start, 'seconds.')