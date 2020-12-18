import geopandas as gpd

precinctData = gpd.read_file(r'jsons\FL_unbuffed.json')

precinctData['NEIGHBORS'] = None

precinctDataUnbuffered = precinctData[['ID', 'geometry']]
precinctDataBuffered= precinctData[['ID', 'geometry']]

# Convert the CRS (EPSG: 4326 --> EPSG: 3857 Pseudo-Mercator)
currentCrs = precinctData.crs
precinctDataUnbuffered.to_crs(epsg= 3857, inplace= True)
precinctDataBuffered.to_crs(epsg= 3857, inplace= True)

# 200 Feet in meters
bufferAmount = 60.96 

precinctDataBuffered['geometry'] = precinctDataUnbuffered['geometry'].buffer(bufferAmount)

for bufferedIndex, bufferedPrecinct in precinctDataBuffered.iterrows():
    neighbors = []
    for index, precinct in precinctDataUnbuffered.iterrows():  
        if bufferedPrecinct.geometry.intersects(precinct['geometry']) and bufferedPrecinct['ID'] != precinct['ID']:
            intersectionLength = precinct['geometry'].intersection(bufferedPrecinct['geometry']).length
            if intersectionLength > bufferAmount:
                neighbors.append(precinct['ID'])
    precinctData.iloc[bufferedIndex]['NEIGHBORS'] = neighbors
    print('Finished parsing neighbors for Precinct:', bufferedPrecinct['ID'])
    print('Precinct', bufferedPrecinct['ID'], 'neighbors = ', neighbors, '\n')
        
precinctData.to_file("FloridaPrecinctData.json", driver='GeoJSON')


