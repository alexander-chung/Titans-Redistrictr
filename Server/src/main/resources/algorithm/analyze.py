import json
import random
import sys
import numpy as np
import statistics
import os
import geopandas as gpd
import shapely
from shapely import geometry

def dissolveDistricting(precinctPath, districtingPath):
    with open(districtingPath) as f:
        return_file = json.load(f)

    districting = gpd.read_file(districtingPath)
    data = gpd.read_file(precinctPath)

    for districtIndex, district in districting.iterrows():
        x = district.precinctIDs.replace("'", "")
        precinctIDs = x.strip('][').split(', ')
        df = data
        for index, precinct in df.iterrows():
            if precinct['ID'] not in precinctIDs:
                df = df.drop(index)
        df['districtID'] = district.districtID
        dissolved = df.dissolve(by='districtID')
        return_file['features'][districtIndex]['geometry'] = shapely.geometry.mapping(dissolved.iloc[0]['geometry'])

        print('District', districtIndex + 1, ' dissolved.')

    with open(districtingPath, 'w') as outfile:
        json.dump(return_file, outfile)


STATEID = "FL"
STATE = ""
if STATEID == "NC":
    STATE = "North Carolina"
elif STATEID == "FL":
    STATE = "Florida"
else:
    STATE = "Texas"
JOB_ID = "285"
NUMBER_OF_DISTRICTINGS = 100

dir_path = os.path.dirname(os.path.realpath(__file__))

precinctPath = dir_path[:-9] + 'json\\' + STATEID + '_Precincts.json'

with open(precinctPath) as f:
    data = json.load(f)
nodes_data = data["features"]
# Get total minority VAP of all districts in all districtings
districtings = []

for i in range(NUMBER_OF_DISTRICTINGS):
    filePath = dir_path[:-9] + 'jobs\\job' + str(JOB_ID) + '\\job' + str(JOB_ID) + '_districting' + str(i+1) + '.json'
    with open(filePath) as f2:
        data = json.load(f2)
    districtings.append(data)

totalMvap = 0
districtingMvap = {}
districting = districtings[0]
districts = districting["features"]
numDistricts = len(districts)
boxPlotData = []
axLabels = []
label = 1
for district in districts:
    totalMvap += int(district["properties"]["minorityVotingAgePopulation"])
    boxPlotData.append([])      # initialize the empty lists
    axLabels.append(str(label))
    label += 1
averageMvap = totalMvap/len(districts)      # get the average MVAP for each district inside one districting

for districting in districtings:
    districts = districting["features"]
    diff = 0
    index = 0
    for district in districts:
        diff += abs(int(district["properties"]["minorityVotingAgePopulation"]) - averageMvap)
        percentage = int(district["properties"]["minorityVotingAgePopulation"])/int(district["properties"]["votingAgePopulation"])
        percentage = round(percentage, 2)
        boxPlotData[index].append(percentage)
        index += 1
    districtingMvap[districting["districtingID"]] = diff

boxesData = []
i = 0
print("Box plot data lists:")
for data in boxPlotData:
    mi = min(data)
    q1 = np.quantile(data, .25)
    q3 = np.quantile(data, .75)
    ma = max(data)
    me = statistics.median(data)
    d = {}
    d["label"] = axLabels[i]
    d["y"] = [mi, q1, q3, ma, me]
    i += 1
    boxesData.append(d)

print(boxesData)

# Find the districting with the smallest total difference of each district compared to the average
minumumDiff = 0
maximumDiff = 0
averageDistricting = ""
extremeDistricting = ""
for key in districtingMvap:
    print(districtingMvap[key], ': ', key)
    if minumumDiff == 0:
        minumumDiff = districtingMvap[key]
        maximumDiff = districtingMvap[key]
        averageDistricting = key
        extremeDistricting = key
    elif districtingMvap[key] < minumumDiff:
        minumumDiff = districtingMvap[key]
        averageDistricting = key
    elif districtingMvap[key] > maximumDiff:
        maximumDiff = districtingMvap[key]
        extremeDistricting = key

# averageDistricting = str(NUMBER_OF_DISTRICTINGS//2)
print("Average districting", averageDistricting)
print("Extreme districting", extremeDistricting)

del districtingMvap[averageDistricting]
del districtingMvap[extremeDistricting]

randomDistrictings = random.sample(districtingMvap.keys(), 2)
randomDistrictingA = randomDistrictings[0]
randomDistrictingB = randomDistrictings[1]

print("Random districting", randomDistrictingA, randomDistrictingB)

outputDistrictings = []
outputDistrictings.append(districtings[int(averageDistricting)-1])
outputDistrictings.append(districtings[int(extremeDistricting)-1])
outputDistrictings.append(districtings[int(randomDistrictingA)-1])
outputDistrictings.append(districtings[int(randomDistrictingB)-1])

random1Data = []
randomD1 = districtings[int(randomDistrictingA)-1]["features"]
i = 0
for district in randomD1:
    d = {}
    d["x"] = i
    d["y"] = round(int(district["properties"]["minorityVotingAgePopulation"])/int(district["properties"]["votingAgePopulation"]), 2)
    random1Data.append(d)
    i += 1

random2Data = []
randomD2 = districtings[int(randomDistrictingB)-1]["features"]
i = 0
for district in randomD2:
    d = {}
    d["x"] = i
    d["y"] = round(int(district["properties"]["minorityVotingAgePopulation"])/int(district["properties"]["votingAgePopulation"]), 2)
    random2Data.append(d)
    i += 1

averageData = []
averageD = districtings[int(averageDistricting)-1]["features"]
i = 0
for district in averageD:
    d = {}
    d["x"] = i
    d["y"] = round(int(district["properties"]["minorityVotingAgePopulation"])/int(district["properties"]["votingAgePopulation"]), 2)
    averageData.append(d)
    i += 1

extremeData = []
extremeD = districtings[int(extremeDistricting)-1]["features"]
i = 0
for district in extremeD:
    d = {}
    d["x"] = i
    d["y"] = round(int(district["properties"]["minorityVotingAgePopulation"])/int(district["properties"]["votingAgePopulation"]), 2)
    extremeData.append(d)
    i += 1

boxPlot = {"boxesData": boxesData,
            "random1Data": random1Data,
            "random2Data": random2Data,
            "averageData": averageData,
            "extremeData": extremeData
    }
boxplotPath = dir_path[:-9] + 'jobs\\job' + JOB_ID + '\\job' + JOB_ID + '_boxplot.json'
with open(boxplotPath, 'w') as json_file:
    json.dump(boxPlot, json_file)

geom_districtings = [averageDistricting, extremeDistricting, randomDistrictingA, randomDistrictingB]
for number in geom_districtings:
    districtingPath = dir_path[:-9] + 'jobs\\job' + JOB_ID + '\\job' + JOB_ID + '_districting' + number + '.json'
    dissolveDistricting(precinctPath, districtingPath)


realOutputDistrictings = []
for i in geom_districtings:
    filePath = dir_path[:-9] + 'jobs\\job' + str(JOB_ID) + '\\job' + str(JOB_ID) + '_districting' + str(i) + '.json'
    with open(filePath) as f3:
        data = json.load(f3)
    realOutputDistrictings.append(data)

output = {"states": [
    {
        "stateName": STATE,
        "stateID": STATEID,
        # "precinctsGeoJson": {
        #     "type": "FeatureCollection",
        #     "description": STATE + " State Precincts",
        #     "features": nodes_data
        # },
        "averageDistricting": averageDistricting,
        "extremeDistricting": extremeDistricting,
        "randomDistricting1": randomDistrictingA,
        "randomDistricting2": randomDistrictingB,
        "districtings": realOutputDistrictings
    }
]}
# Output to json file
outputFileName = dir_path[:-9] + 'jobs\\job' + str(JOB_ID) + '\\job' + str(JOB_ID) + '_summary.json'
with open(outputFileName, 'w') as json_file:
    json.dump(output, json_file)