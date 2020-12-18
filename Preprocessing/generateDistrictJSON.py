import geojson as gj
from shapely.geometry.polygon import Polygon


def editDistrictData():
    # North Carolina
    with open(r"jsons\NorthCarolinaDistrictData.json") as f:
        districtDataNC = gj.load(f)
    with open(r"jsons\NorthCarolinaPrecinctData.json") as f:
        precinctDataNC = gj.load(f)
    # counter = 0
    for i in range(len(districtDataNC['features'])):
        precincts = []
        totalPOP = whitePOP = hispanicPOP = africanAmericanPOP = nativeAmericanPOP = asianPOP = otherPOP = \
            totalVAP = whiteVAP = hispanicVAP = africanAmericanVAP = nativeAmericanVAP = asianVAP = otherVAP = 0
        for j in range(len(precinctDataNC['features'])):
            precinctPolygon = Polygon(precinctDataNC['features'][j]['geometry']['coordinates'][0])
            polygon = Polygon(districtDataNC['features'][i]['geometry']['coordinates'][0])
            if polygon.contains(precinctPolygon.centroid):
                # counter += 1
                precincts += [precinctDataNC['features'][j]['properties']['GEOID10']]
                totalPOP += precinctDataNC['features'][j]['properties']['TOTAL_POP']
                whitePOP += precinctDataNC['features'][j]['properties']['WHITE_POP']
                hispanicPOP += precinctDataNC['features'][j]['properties']['HISPANIC_POP']
                africanAmericanPOP += precinctDataNC['features'][j]['properties']['AFRICAN_AMERICAN_POP']
                nativeAmericanPOP += precinctDataNC['features'][j]['properties']['NATIVE_AMERICAN_POP']
                asianPOP += precinctDataNC['features'][j]['properties']['ASIAN_POP']
                otherPOP += precinctDataNC['features'][j]['properties']['OTHER_POP']
                totalVAP += precinctDataNC['features'][j]['properties']['TOTAL_VAP']
                whiteVAP += precinctDataNC['features'][j]['properties']['WHITE_VAP']
                hispanicVAP += precinctDataNC['features'][j]['properties']['HISPANIC_VAP']
                africanAmericanVAP += precinctDataNC['features'][j]['properties']['AFRICAN_AMERICAN_VAP']
                nativeAmericanVAP += precinctDataNC['features'][j]['properties']['NATIVE_AMERICAN_VAP']
                asianVAP += precinctDataNC['features'][j]['properties']['ASIAN_VAP']
                otherVAP += precinctDataNC['features'][j]['properties']['OTHER_VAP']
                # print(districtDataNC['features'][i]['properties']['CD113FP'])
        districtDataNC['features'][i]['properties']['precincts'] = precincts
        districtDataNC['features'][i]['properties']['TOTAL_POP'] = totalPOP
        districtDataNC['features'][i]['properties']['WHITE_POP'] = whitePOP
        districtDataNC['features'][i]['properties']['HISPANIC_POP'] = hispanicPOP
        districtDataNC['features'][i]['properties']['AFRICAN_AMERICAN_POP'] = africanAmericanPOP
        districtDataNC['features'][i]['properties']['NATIVE_AMERICAN_POP'] = nativeAmericanPOP
        districtDataNC['features'][i]['properties']['ASIAN_POP'] = asianPOP
        districtDataNC['features'][i]['properties']['OTHER_POP'] = otherPOP
        districtDataNC['features'][i]['properties']['TOTAL_VAP'] = totalVAP
        districtDataNC['features'][i]['properties']['WHITE_VAP'] = whiteVAP
        districtDataNC['features'][i]['properties']['HISPANIC_VAP'] = hispanicVAP
        districtDataNC['features'][i]['properties']['AFRICAN_AMERICAN_VAP'] = africanAmericanVAP
        districtDataNC['features'][i]['properties']['NATIVE_AMERICAN_VAP'] = nativeAmericanVAP
        districtDataNC['features'][i]['properties']['ASIAN_VAP'] = asianVAP
        districtDataNC['features'][i]['properties']['OTHER_VAP'] = otherVAP
    # print(counter)
    # print(len(precinctDataNC['features']))
    with open(r"jsons\NorthCarolinaDistrictData.json", 'w') as f:
        gj.dump(districtDataNC, f)

    # # Florida
    # with open(r"jsons\FloridaDistrictData.json") as f:
    #     districtDataFL = gj.load(f)
    # with open(r"jsons\FloridaPrecinctData.json") as f:
    #     precinctDataFL = gj.load(f)
    # # counter = 0
    # for i in range(len(districtDataFL['features'])):
    #     precincts = []
    #     totalPOP = whitePOP = hispanicPOP = africanAmericanPOP = nativeAmericanPOP = asianPOP = otherPOP = \
    #         totalVAP = whiteVAP = hispanicVAP = africanAmericanVAP = nativeAmericanVAP = asianVAP = otherVAP = 0
    #     for j in range(len(precinctDataFL['features'])):
    #         if precinctDataFL['features'][j]['geometry']['type'] == 'MultiPolygon':
    #             precinctPolygon = Polygon(precinctDataFL['features'][j]['geometry']['coordinates'][0][0])
    #             if districtDataFL['features'][i]['geometry']['type'] == 'MultiPolygon':
    #                 for k in range(len(districtDataFL['features'][i]['geometry']['coordinates'])):
    #                     polygon = Polygon(districtDataFL['features'][i]['geometry']['coordinates'][k][0])
    #                     if polygon.contains(precinctPolygon.centroid):
    #                         # counter += 1
    #                         precincts += [precinctDataFL['features'][j]['properties']['GEOID10']]
    #                         totalPOP += precinctDataFL['features'][j]['properties']['TOTAL_POP']
    #                         whitePOP += precinctDataFL['features'][j]['properties']['WHITE_POP']
    #                         hispanicPOP += precinctDataFL['features'][j]['properties']['HISPANIC_POP']
    #                         africanAmericanPOP += precinctDataFL['features'][j]['properties']['AFRICAN_AMERICAN_POP']
    #                         nativeAmericanPOP += precinctDataFL['features'][j]['properties']['NATIVE_AMERICAN_POP']
    #                         asianPOP += precinctDataFL['features'][j]['properties']['ASIAN_POP']
    #                         otherPOP += precinctDataFL['features'][j]['properties']['OTHER_POP']
    #                         totalVAP += precinctDataFL['features'][j]['properties']['TOTAL_VAP']
    #                         whiteVAP += precinctDataFL['features'][j]['properties']['WHITE_VAP']
    #                         hispanicVAP += precinctDataFL['features'][j]['properties']['HISPANIC_VAP']
    #                         africanAmericanVAP += precinctDataFL['features'][j]['properties']['AFRICAN_AMERICAN_VAP']
    #                         nativeAmericanVAP += precinctDataFL['features'][j]['properties']['NATIVE_AMERICAN_VAP']
    #                         asianVAP += precinctDataFL['features'][j]['properties']['ASIAN_VAP']
    #                         otherVAP += precinctDataFL['features'][j]['properties']['OTHER_VAP']
    #                         # print(districtDataFL['features'][i]['properties']['CD113FP'])
    #                         break
    #             else:
    #                 polygon = Polygon(districtDataFL['features'][i]['geometry']['coordinates'][0])
    #                 if polygon.contains(precinctPolygon.centroid):
    #                     # counter += 1
    #                     precincts += [precinctDataFL['features'][j]['properties']['GEOID10']]
    #                     totalPOP += precinctDataFL['features'][j]['properties']['TOTAL_POP']
    #                     whitePOP += precinctDataFL['features'][j]['properties']['WHITE_POP']
    #                     hispanicPOP += precinctDataFL['features'][j]['properties']['HISPANIC_POP']
    #                     africanAmericanPOP += precinctDataFL['features'][j]['properties']['AFRICAN_AMERICAN_POP']
    #                     nativeAmericanPOP += precinctDataFL['features'][j]['properties']['NATIVE_AMERICAN_POP']
    #                     asianPOP += precinctDataFL['features'][j]['properties']['ASIAN_POP']
    #                     otherPOP += precinctDataFL['features'][j]['properties']['OTHER_POP']
    #                     totalVAP += precinctDataFL['features'][j]['properties']['TOTAL_VAP']
    #                     whiteVAP += precinctDataFL['features'][j]['properties']['WHITE_VAP']
    #                     hispanicVAP += precinctDataFL['features'][j]['properties']['HISPANIC_VAP']
    #                     africanAmericanVAP += precinctDataFL['features'][j]['properties']['AFRICAN_AMERICAN_VAP']
    #                     nativeAmericanVAP += precinctDataFL['features'][j]['properties']['NATIVE_AMERICAN_VAP']
    #                     asianVAP += precinctDataFL['features'][j]['properties']['ASIAN_VAP']
    #                     otherVAP += precinctDataFL['features'][j]['properties']['OTHER_VAP']
    #                     # print(districtDataFL['features'][i]['properties']['CD113FP'])
    #         else:
    #             precinctPolygon = Polygon(precinctDataFL['features'][j]['geometry']['coordinates'][0])
    #             if districtDataFL['features'][i]['geometry']['type'] == 'MultiPolygon':
    #                 for k in range(len(districtDataFL['features'][i]['geometry']['coordinates'])):
    #                     polygon = Polygon(districtDataFL['features'][i]['geometry']['coordinates'][k][0])
    #                     if polygon.contains(precinctPolygon.centroid):
    #                         # counter += 1
    #                         precincts += [precinctDataFL['features'][j]['properties']['GEOID10']]
    #                         totalPOP += precinctDataFL['features'][j]['properties']['TOTAL_POP']
    #                         whitePOP += precinctDataFL['features'][j]['properties']['WHITE_POP']
    #                         hispanicPOP += precinctDataFL['features'][j]['properties']['HISPANIC_POP']
    #                         africanAmericanPOP += precinctDataFL['features'][j]['properties']['AFRICAN_AMERICAN_POP']
    #                         nativeAmericanPOP += precinctDataFL['features'][j]['properties']['NATIVE_AMERICAN_POP']
    #                         asianPOP += precinctDataFL['features'][j]['properties']['ASIAN_POP']
    #                         otherPOP += precinctDataFL['features'][j]['properties']['OTHER_POP']
    #                         totalVAP += precinctDataFL['features'][j]['properties']['TOTAL_VAP']
    #                         whiteVAP += precinctDataFL['features'][j]['properties']['WHITE_VAP']
    #                         hispanicVAP += precinctDataFL['features'][j]['properties']['HISPANIC_VAP']
    #                         africanAmericanVAP += precinctDataFL['features'][j]['properties']['AFRICAN_AMERICAN_VAP']
    #                         nativeAmericanVAP += precinctDataFL['features'][j]['properties']['NATIVE_AMERICAN_VAP']
    #                         asianVAP += precinctDataFL['features'][j]['properties']['ASIAN_VAP']
    #                         otherVAP += precinctDataFL['features'][j]['properties']['OTHER_VAP']
    #                         # print(districtDataFL['features'][i]['properties']['CD113FP'])
    #                         break
    #             else:
    #                 polygon = Polygon(districtDataFL['features'][i]['geometry']['coordinates'][0])
    #                 if polygon.contains(precinctPolygon.centroid):
    #                     # counter += 1
    #                     precincts += [precinctDataFL['features'][j]['properties']['GEOID10']]
    #                     totalPOP += precinctDataFL['features'][j]['properties']['TOTAL_POP']
    #                     whitePOP += precinctDataFL['features'][j]['properties']['WHITE_POP']
    #                     hispanicPOP += precinctDataFL['features'][j]['properties']['HISPANIC_POP']
    #                     africanAmericanPOP += precinctDataFL['features'][j]['properties']['AFRICAN_AMERICAN_POP']
    #                     nativeAmericanPOP += precinctDataFL['features'][j]['properties']['NATIVE_AMERICAN_POP']
    #                     asianPOP += precinctDataFL['features'][j]['properties']['ASIAN_POP']
    #                     otherPOP += precinctDataFL['features'][j]['properties']['OTHER_POP']
    #                     totalVAP += precinctDataFL['features'][j]['properties']['TOTAL_VAP']
    #                     whiteVAP += precinctDataFL['features'][j]['properties']['WHITE_VAP']
    #                     hispanicVAP += precinctDataFL['features'][j]['properties']['HISPANIC_VAP']
    #                     africanAmericanVAP += precinctDataFL['features'][j]['properties']['AFRICAN_AMERICAN_VAP']
    #                     nativeAmericanVAP += precinctDataFL['features'][j]['properties']['NATIVE_AMERICAN_VAP']
    #                     asianVAP += precinctDataFL['features'][j]['properties']['ASIAN_VAP']
    #                     otherVAP += precinctDataFL['features'][j]['properties']['OTHER_VAP']
    #                     # print(districtDataFL['features'][i]['properties']['CD113FP'])
    #     districtDataFL['features'][i]['properties']['precincts'] = precincts
    #     districtDataFL['features'][i]['properties']['TOTAL_POP'] = totalPOP
    #     districtDataFL['features'][i]['properties']['WHITE_POP'] = whitePOP
    #     districtDataFL['features'][i]['properties']['HISPANIC_POP'] = hispanicPOP
    #     districtDataFL['features'][i]['properties']['AFRICAN_AMERICAN_POP'] = africanAmericanPOP
    #     districtDataFL['features'][i]['properties']['NATIVE_AMERICAN_POP'] = nativeAmericanPOP
    #     districtDataFL['features'][i]['properties']['ASIAN_POP'] = asianPOP
    #     districtDataFL['features'][i]['properties']['OTHER_POP'] = otherPOP
    #     districtDataFL['features'][i]['properties']['TOTAL_VAP'] = totalVAP
    #     districtDataFL['features'][i]['properties']['WHITE_VAP'] = whiteVAP
    #     districtDataFL['features'][i]['properties']['HISPANIC_VAP'] = hispanicVAP
    #     districtDataFL['features'][i]['properties']['AFRICAN_AMERICAN_VAP'] = africanAmericanVAP
    #     districtDataFL['features'][i]['properties']['NATIVE_AMERICAN_VAP'] = nativeAmericanVAP
    #     districtDataFL['features'][i]['properties']['ASIAN_VAP'] = asianVAP
    #     districtDataFL['features'][i]['properties']['OTHER_VAP'] = otherVAP
    # # print(counter)
    # # print(len(precinctDataFL['features']))
    # with open(r"jsons\FloridaDistrictData.json", 'w') as f:
    #     gj.dump(districtDataFL, f)
    #
    # # Texas
    # with open(r"jsons\TexasDistrictData.json") as f:
    #     districtDataTX = gj.load(f)
    # with open(r"jsons\TexasPrecinctData.json") as f:
    #     precinctDataTX = gj.load(f)
    # # counter = 0
    # for i in range(len(districtDataTX['features'])):
    #     precincts = []
    #     totalPOP = whitePOP = hispanicPOP = africanAmericanPOP = nativeAmericanPOP = asianPOP = otherPOP = \
    #         totalVAP = whiteVAP = hispanicVAP = africanAmericanVAP = nativeAmericanVAP = asianVAP = otherVAP = 0
    #     for j in range(len(precinctDataTX['features'])):
    #         if precinctDataTX['features'][j]['geometry']['type'] == 'MultiPolygon':
    #             precinctPolygon = Polygon(precinctDataTX['features'][j]['geometry']['coordinates'][0][0])
    #             polygon = Polygon(districtDataTX['features'][i]['geometry']['coordinates'][0])
    #             if polygon.contains(precinctPolygon.centroid):
    #                 # counter += 1
    #                 precincts += [precinctDataTX['features'][j]['properties']['GEOID10']]
    #                 totalPOP += precinctDataTX['features'][j]['properties']['TOTAL_POP']
    #                 whitePOP += precinctDataTX['features'][j]['properties']['WHITE_POP']
    #                 hispanicPOP += precinctDataTX['features'][j]['properties']['HISPANIC_POP']
    #                 africanAmericanPOP += precinctDataTX['features'][j]['properties']['AFRICAN_AMERICAN_POP']
    #                 nativeAmericanPOP += precinctDataTX['features'][j]['properties']['NATIVE_AMERICAN_POP']
    #                 asianPOP += precinctDataTX['features'][j]['properties']['ASIAN_POP']
    #                 otherPOP += precinctDataTX['features'][j]['properties']['OTHER_POP']
    #                 totalVAP += precinctDataTX['features'][j]['properties']['TOTAL_VAP']
    #                 whiteVAP += precinctDataTX['features'][j]['properties']['WHITE_VAP']
    #                 hispanicVAP += precinctDataTX['features'][j]['properties']['HISPANIC_VAP']
    #                 africanAmericanVAP += precinctDataTX['features'][j]['properties']['AFRICAN_AMERICAN_VAP']
    #                 nativeAmericanVAP += precinctDataTX['features'][j]['properties']['NATIVE_AMERICAN_VAP']
    #                 asianVAP += precinctDataTX['features'][j]['properties']['ASIAN_VAP']
    #                 otherVAP += precinctDataTX['features'][j]['properties']['OTHER_VAP']
    #                 # print(districtDataTX['features'][i]['properties']['CD113FP'])
    #         else:
    #             precinctPolygon = Polygon(precinctDataTX['features'][j]['geometry']['coordinates'][0])
    #             polygon = Polygon(districtDataTX['features'][i]['geometry']['coordinates'][0])
    #             if polygon.contains(precinctPolygon.centroid):
    #                 # counter += 1
    #                 precincts += [precinctDataTX['features'][j]['properties']['GEOID10']]
    #                 totalPOP += precinctDataTX['features'][j]['properties']['TOTAL_POP']
    #                 whitePOP += precinctDataTX['features'][j]['properties']['WHITE_POP']
    #                 hispanicPOP += precinctDataTX['features'][j]['properties']['HISPANIC_POP']
    #                 africanAmericanPOP += precinctDataTX['features'][j]['properties']['AFRICAN_AMERICAN_POP']
    #                 nativeAmericanPOP += precinctDataTX['features'][j]['properties']['NATIVE_AMERICAN_POP']
    #                 asianPOP += precinctDataTX['features'][j]['properties']['ASIAN_POP']
    #                 otherPOP += precinctDataTX['features'][j]['properties']['OTHER_POP']
    #                 totalVAP += precinctDataTX['features'][j]['properties']['TOTAL_VAP']
    #                 whiteVAP += precinctDataTX['features'][j]['properties']['WHITE_VAP']
    #                 hispanicVAP += precinctDataTX['features'][j]['properties']['HISPANIC_VAP']
    #                 africanAmericanVAP += precinctDataTX['features'][j]['properties']['AFRICAN_AMERICAN_VAP']
    #                 nativeAmericanVAP += precinctDataTX['features'][j]['properties']['NATIVE_AMERICAN_VAP']
    #                 asianVAP += precinctDataTX['features'][j]['properties']['ASIAN_VAP']
    #                 otherVAP += precinctDataTX['features'][j]['properties']['OTHER_VAP']
    #                 # print(districtDataTX['features'][i]['properties']['CD113FP'])
    #     districtDataTX['features'][i]['properties']['precincts'] = precincts
    #     districtDataTX['features'][i]['properties']['TOTAL_POP'] = totalPOP
    #     districtDataTX['features'][i]['properties']['WHITE_POP'] = whitePOP
    #     districtDataTX['features'][i]['properties']['HISPANIC_POP'] = hispanicPOP
    #     districtDataTX['features'][i]['properties']['AFRICAN_AMERICAN_POP'] = africanAmericanPOP
    #     districtDataTX['features'][i]['properties']['NATIVE_AMERICAN_POP'] = nativeAmericanPOP
    #     districtDataTX['features'][i]['properties']['ASIAN_POP'] = asianPOP
    #     districtDataTX['features'][i]['properties']['OTHER_POP'] = otherPOP
    #     districtDataTX['features'][i]['properties']['TOTAL_VAP'] = totalVAP
    #     districtDataTX['features'][i]['properties']['WHITE_VAP'] = whiteVAP
    #     districtDataTX['features'][i]['properties']['HISPANIC_VAP'] = hispanicVAP
    #     districtDataTX['features'][i]['properties']['AFRICAN_AMERICAN_VAP'] = africanAmericanVAP
    #     districtDataTX['features'][i]['properties']['NATIVE_AMERICAN_VAP'] = nativeAmericanVAP
    #     districtDataTX['features'][i]['properties']['ASIAN_VAP'] = asianVAP
    #     districtDataTX['features'][i]['properties']['OTHER_VAP'] = otherVAP
    # # print(counter)
    # # print(len(precinctDataTX['features']))
    # with open(r"jsons\TexasDistrictData.json", 'w') as f:
    #     gj.dump(districtDataTX, f)


editDistrictData()
