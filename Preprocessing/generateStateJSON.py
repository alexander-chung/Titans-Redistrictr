import geojson as gj


def editStateData():
    # North Carolina
    with open(r"jsons\NorthCarolinaStateData.json") as f:
        stateDataNC = gj.load(f)
    with open(r"jsons\NorthCarolinaDistrictData.json") as f:
        districtDataNC = gj.load(f)
    totalPOP = whitePOP = hispanicPOP = africanAmericanPOP = nativeAmericanPOP = asianPOP = otherPOP = \
        totalVAP = whiteVAP = hispanicVAP = africanAmericanVAP = nativeAmericanVAP = asianVAP = otherVAP = 0
    for i in range(len(districtDataNC['features'])):
        totalPOP += districtDataNC['features'][i]['properties']['TOTAL_POP']
        whitePOP += districtDataNC['features'][i]['properties']['WHITE_POP']
        hispanicPOP += districtDataNC['features'][i]['properties']['HISPANIC_POP']
        africanAmericanPOP += districtDataNC['features'][i]['properties']['AFRICAN_AMERICAN_POP']
        nativeAmericanPOP += districtDataNC['features'][i]['properties']['NATIVE_AMERICAN_POP']
        asianPOP += districtDataNC['features'][i]['properties']['ASIAN_POP']
        otherPOP += districtDataNC['features'][i]['properties']['OTHER_POP']
        totalVAP += districtDataNC['features'][i]['properties']['TOTAL_VAP']
        whiteVAP += districtDataNC['features'][i]['properties']['WHITE_VAP']
        hispanicVAP += districtDataNC['features'][i]['properties']['HISPANIC_VAP']
        africanAmericanVAP += districtDataNC['features'][i]['properties']['AFRICAN_AMERICAN_VAP']
        nativeAmericanVAP += districtDataNC['features'][i]['properties']['NATIVE_AMERICAN_VAP']
        asianVAP += districtDataNC['features'][i]['properties']['ASIAN_VAP']
        otherVAP += districtDataNC['features'][i]['properties']['OTHER_VAP']
    stateDataNC['features'][0]['properties']['TOTAL_POP'] = totalPOP
    stateDataNC['features'][0]['properties']['WHITE_POP'] = whitePOP
    stateDataNC['features'][0]['properties']['HISPANIC_POP'] = hispanicPOP
    stateDataNC['features'][0]['properties']['AFRICAN_AMERICAN_POP'] = africanAmericanPOP
    stateDataNC['features'][0]['properties']['NATIVE_AMERICAN_POP'] = nativeAmericanPOP
    stateDataNC['features'][0]['properties']['ASIAN_POP'] = asianPOP
    stateDataNC['features'][0]['properties']['OTHER_POP'] = otherPOP
    stateDataNC['features'][0]['properties']['TOTAL_VAP'] = totalVAP
    stateDataNC['features'][0]['properties']['WHITE_VAP'] = whiteVAP
    stateDataNC['features'][0]['properties']['HISPANIC_VAP'] = hispanicVAP
    stateDataNC['features'][0]['properties']['AFRICAN_AMERICAN_VAP'] = africanAmericanVAP
    stateDataNC['features'][0]['properties']['NATIVE_AMERICAN_VAP'] = nativeAmericanVAP
    stateDataNC['features'][0]['properties']['ASIAN_VAP'] = asianVAP
    stateDataNC['features'][0]['properties']['OTHER_VAP'] = otherVAP
    with open(r"jsons\NorthCarolinaStateData.json", 'w') as f:
        gj.dump(stateDataNC, f)

    # # Florida
    # with open(r"jsons\FloridaStateData.json") as f:
    #     stateDataFL = gj.load(f)
    # with open(r"jsons\FloridaDistrictData.json") as f:
    #     districtDataFL = gj.load(f)
    # totalPOP = whitePOP = hispanicPOP = africanAmericanPOP = nativeAmericanPOP = asianPOP = otherPOP = \
    #     totalVAP = whiteVAP = hispanicVAP = africanAmericanVAP = nativeAmericanVAP = asianVAP = otherVAP = 0
    # for i in range(len(districtDataFL['features'])):
    #     totalPOP += districtDataFL['features'][i]['properties']['TOTAL_POP']
    #     whitePOP += districtDataFL['features'][i]['properties']['WHITE_POP']
    #     hispanicPOP += districtDataFL['features'][i]['properties']['HISPANIC_POP']
    #     africanAmericanPOP += districtDataFL['features'][i]['properties']['AFRICAN_AMERICAN_POP']
    #     nativeAmericanPOP += districtDataFL['features'][i]['properties']['NATIVE_AMERICAN_POP']
    #     asianPOP += districtDataFL['features'][i]['properties']['ASIAN_POP']
    #     otherPOP += districtDataFL['features'][i]['properties']['OTHER_POP']
    #     totalVAP += districtDataFL['features'][i]['properties']['TOTAL_VAP']
    #     whiteVAP += districtDataFL['features'][i]['properties']['WHITE_VAP']
    #     hispanicVAP += districtDataFL['features'][i]['properties']['HISPANIC_VAP']
    #     africanAmericanVAP += districtDataFL['features'][i]['properties']['AFRICAN_AMERICAN_VAP']
    #     nativeAmericanVAP += districtDataFL['features'][i]['properties']['NATIVE_AMERICAN_VAP']
    #     asianVAP += districtDataFL['features'][i]['properties']['ASIAN_VAP']
    #     otherVAP += districtDataFL['features'][i]['properties']['OTHER_VAP']
    # stateDataFL['features'][0]['properties']['TOTAL_POP'] = totalPOP
    # stateDataFL['features'][0]['properties']['WHITE_POP'] = whitePOP
    # stateDataFL['features'][0]['properties']['HISPANIC_POP'] = hispanicPOP
    # stateDataFL['features'][0]['properties']['AFRICAN_AMERICAN_POP'] = africanAmericanPOP
    # stateDataFL['features'][0]['properties']['NATIVE_AMERICAN_POP'] = nativeAmericanPOP
    # stateDataFL['features'][0]['properties']['ASIAN_POP'] = asianPOP
    # stateDataFL['features'][0]['properties']['OTHER_POP'] = otherPOP
    # stateDataFL['features'][0]['properties']['TOTAL_VAP'] = totalVAP
    # stateDataFL['features'][0]['properties']['WHITE_VAP'] = whiteVAP
    # stateDataFL['features'][0]['properties']['HISPANIC_VAP'] = hispanicVAP
    # stateDataFL['features'][0]['properties']['AFRICAN_AMERICAN_VAP'] = africanAmericanVAP
    # stateDataFL['features'][0]['properties']['NATIVE_AMERICAN_VAP'] = nativeAmericanVAP
    # stateDataFL['features'][0]['properties']['ASIAN_VAP'] = asianVAP
    # stateDataFL['features'][0]['properties']['OTHER_VAP'] = otherVAP
    # with open(r"jsons\FloridaStateData.json", 'w') as f:
    #     gj.dump(stateDataFL, f)
    #
    # # Texas
    # with open(r"jsons\TexasStateData.json") as f:
    #     stateDataTX = gj.load(f)
    # with open(r"jsons\TexasDistrictData.json") as f:
    #     districtDataTX = gj.load(f)
    # totalPOP = whitePOP = hispanicPOP = africanAmericanPOP = nativeAmericanPOP = asianPOP = otherPOP = \
    #     totalVAP = whiteVAP = hispanicVAP = africanAmericanVAP = nativeAmericanVAP = asianVAP = otherVAP = 0
    # for i in range(len(districtDataTX['features'])):
    #     totalPOP += districtDataTX['features'][i]['properties']['TOTAL_POP']
    #     whitePOP += districtDataTX['features'][i]['properties']['WHITE_POP']
    #     hispanicPOP += districtDataTX['features'][i]['properties']['HISPANIC_POP']
    #     africanAmericanPOP += districtDataTX['features'][i]['properties']['AFRICAN_AMERICAN_POP']
    #     nativeAmericanPOP += districtDataTX['features'][i]['properties']['NATIVE_AMERICAN_POP']
    #     asianPOP += districtDataTX['features'][i]['properties']['ASIAN_POP']
    #     otherPOP += districtDataTX['features'][i]['properties']['OTHER_POP']
    #     totalVAP += districtDataTX['features'][i]['properties']['TOTAL_VAP']
    #     whiteVAP += districtDataTX['features'][i]['properties']['WHITE_VAP']
    #     hispanicVAP += districtDataTX['features'][i]['properties']['HISPANIC_VAP']
    #     africanAmericanVAP += districtDataTX['features'][i]['properties']['AFRICAN_AMERICAN_VAP']
    #     nativeAmericanVAP += districtDataTX['features'][i]['properties']['NATIVE_AMERICAN_VAP']
    #     asianVAP += districtDataTX['features'][i]['properties']['ASIAN_VAP']
    #     otherVAP += districtDataTX['features'][i]['properties']['OTHER_VAP']
    # stateDataTX['features'][0]['properties']['TOTAL_POP'] = totalPOP
    # stateDataTX['features'][0]['properties']['WHITE_POP'] = whitePOP
    # stateDataTX['features'][0]['properties']['HISPANIC_POP'] = hispanicPOP
    # stateDataTX['features'][0]['properties']['AFRICAN_AMERICAN_POP'] = africanAmericanPOP
    # stateDataTX['features'][0]['properties']['NATIVE_AMERICAN_POP'] = nativeAmericanPOP
    # stateDataTX['features'][0]['properties']['ASIAN_POP'] = asianPOP
    # stateDataTX['features'][0]['properties']['OTHER_POP'] = otherPOP
    # stateDataTX['features'][0]['properties']['TOTAL_VAP'] = totalVAP
    # stateDataTX['features'][0]['properties']['WHITE_VAP'] = whiteVAP
    # stateDataTX['features'][0]['properties']['HISPANIC_VAP'] = hispanicVAP
    # stateDataTX['features'][0]['properties']['AFRICAN_AMERICAN_VAP'] = africanAmericanVAP
    # stateDataTX['features'][0]['properties']['NATIVE_AMERICAN_VAP'] = nativeAmericanVAP
    # stateDataTX['features'][0]['properties']['ASIAN_VAP'] = asianVAP
    # stateDataTX['features'][0]['properties']['OTHER_VAP'] = otherVAP
    # with open(r"jsons\TexasStateData.json", 'w') as f:
    #     gj.dump(stateDataTX, f)


editStateData()
