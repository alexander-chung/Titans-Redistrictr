import json
import geopandas as gpd
import shapely
import os

# JOBID = '1'
# DISTRICTINGID = '1'
# STATE = 'NC'

# dir_path = os.path.dirname(os.path.realpath(__file__))

# precinctPath = dir_path[:-9] + 'json\\' + STATE + "_Precincts.json"
# districtingPath = dir_path[:-9] + 'jobs\\job' + JOBID + '\\job' + JOBID + '_districting' + DISTRICTINGID + '.json'

def dissolveDistricting(JOBID, precinctPath, districtingPath):
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

# print(precinctPath)
# print(districtingPath)