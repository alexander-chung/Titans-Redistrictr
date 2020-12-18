import pandas as pd


DEMO_PATH_NAMES = [r"data\FLPrecinctDemoData.csv", r"data\NCPrecinctDemoData.csv", r"data\TXPrecinctDemoData.csv",
                   r"data\FLVAPDEMO.csv", r"data\NCVAPDEMO.csv", r"data\TXVAPDEMO.csv"]
dfFL = []
dfNC = []
dfTX = []
dfFLVAP = []
dfNCVAP = []
dfTXVAP = []


def initData():
    global dfFL, dfNC, dfTX, dfFLVAP, dfNCVAP, dfTXVAP
    # -01 : Total, -02: Hispanic, -05: White, -06: African American, -07: Native American, -08: Asian
    dfNC = pd.read_csv(DEMO_PATH_NAMES[1], skiprows=[1], usecols=['GEO_ID', 'NAME', 'P002001', 'P002002', 'P002005',
                                                                  'P002006', 'P002007', 'P002008'])
    dfFL = pd.read_csv(DEMO_PATH_NAMES[0], skiprows=[1], usecols=['GEO_ID', 'NAME', 'P002001', 'P002002', 'P002005',
                                                                  'P002006', 'P002007', 'P002008'])
    dfTX = pd.read_csv(DEMO_PATH_NAMES[2], skiprows=[1], usecols=['GEO_ID', 'NAME', 'P002001', 'P002002', 'P002005',
                                                                  'P002006', 'P002007', 'P002008'])
    dfNCVAP = pd.read_csv(DEMO_PATH_NAMES[4], skiprows=[1], usecols=['GEO_ID', 'P004001', 'P004002', 'P004005',
                                                                     'P004006', 'P004007', 'P004008'])
    dfFLVAP = pd.read_csv(DEMO_PATH_NAMES[3], skiprows=[1], usecols=['GEO_ID', 'P004001', 'P004002', 'P004005',
                                                                     'P004006', 'P004007', 'P004008'])
    dfTXVAP = pd.read_csv(DEMO_PATH_NAMES[5], skiprows=[1], usecols=['GEO_ID', 'P004001', 'P004002', 'P004005',
                                                                     'P004006', 'P004007', 'P004008'])


def editData():
    global dfFL, dfNC, dfTX, dfFLVAP, dfNCVAP, dfTXVAP
    # North Carolina
    # rename/order columns and get/add COUNTY and ID columns
    dfNC.columns = ['GEO_ID', 'NAME', 'TOTAL_POP', 'HISPANIC_POP', 'WHITE_POP', 'AFRICAN_AMERICAN_POP',
                    'NATIVE_AMERICAN_POP', 'ASIAN_POP']
    # Voting District NPT1, Carteret County, North Carolina - format
    dfNC['COUNTY'] = dfNC.NAME.apply(lambda x: x[x.find(",") + 1:-23].lstrip().upper())
    dfNC['COUNTY_ID'] = dfNC.GEO_ID.str[-9:-6]
    dfNC['PREC_ID'] = dfNC.NAME.apply(
        lambda x: x[x.find("Voting District") + 15:x.find(",")].lstrip().replace(" ", "-"))
    dfNC['PREC_ID'] = dfNC['GEO_ID'].str[9:14] + dfNC['PREC_ID']
    dfNC['OTHER_POP'] = dfNC['TOTAL_POP'] - dfNC['HISPANIC_POP'] - dfNC['WHITE_POP'] - dfNC['AFRICAN_AMERICAN_POP'] - \
                        dfNC['NATIVE_AMERICAN_POP'] - dfNC['ASIAN_POP']
    dfNC = dfNC[['GEO_ID', 'COUNTY', 'COUNTY_ID', 'PREC_ID', 'TOTAL_POP', 'WHITE_POP', 'HISPANIC_POP',
                 'AFRICAN_AMERICAN_POP', 'NATIVE_AMERICAN_POP', 'ASIAN_POP', 'OTHER_POP']]
    # get/add percent minority group
    dfNC['PERCENT_HISPANIC'] = \
        dfNC.apply(lambda row: round(row.HISPANIC_POP / row.TOTAL_POP * 100, 1) if row.TOTAL_POP != 0 else "NaN",
                   axis=1)
    dfNC['PERCENT_AFRICAN_AMERICAN'] = \
        dfNC.apply(lambda row: round(row.AFRICAN_AMERICAN_POP / row.TOTAL_POP * 100, 1) if row.TOTAL_POP != 0 else "NaN"
                   , axis=1)
    dfNC['PERCENT_NATIVE_AMERICAN'] = \
        dfNC.apply(lambda row: round(row.NATIVE_AMERICAN_POP / row.TOTAL_POP * 100, 1) if row.TOTAL_POP != 0 else "NaN",
                   axis=1)
    dfNC['PERCENT_ASIAN'] = \
        dfNC.apply(lambda row: round(row.ASIAN_POP / row.TOTAL_POP * 100, 1) if row.TOTAL_POP != 0 else "NaN", axis=1)
    # sort (NC data isn't sorted in the csv)
    dfNC.sort_values(by=['GEO_ID'], inplace=True)
    # add VAP data and rename/order
    dfNCVAP.columns = ['GEO_ID', 'TOTAL_VAP', 'HISPANIC_VAP', 'WHITE_VAP', 'AFRICAN_AMERICAN_VAP',
                       'NATIVE_AMERICAN_VAP', 'ASIAN_VAP']
    dfNCVAP = dfNCVAP[['GEO_ID', 'TOTAL_VAP', 'WHITE_VAP', 'HISPANIC_VAP', 'AFRICAN_AMERICAN_VAP',
                       'NATIVE_AMERICAN_VAP', 'ASIAN_VAP']]
    dfNCVAP['OTHER_VAP'] = dfNCVAP['TOTAL_VAP'] - dfNCVAP['HISPANIC_VAP'] - dfNCVAP['WHITE_VAP'] - \
                           dfNCVAP['AFRICAN_AMERICAN_VAP'] - dfNCVAP['NATIVE_AMERICAN_VAP'] - dfNCVAP['ASIAN_VAP']
    dfNC = pd.merge(dfNC, dfNCVAP, on='GEO_ID', how='outer')

    # # Florida
    # # rename/order columns and get/add COUNTY and ID columns
    # dfFL.columns = ['GEO_ID', 'NAME', 'TOTAL_POP', 'HISPANIC_POP', 'WHITE_POP', 'AFRICAN_AMERICAN_POP',
    #                 'NATIVE_AMERICAN_POP', 'ASIAN_POP']
    # # 1-County Voting District 1, Alachua County, Florida - format
    # dfFL['COUNTY'] = dfFL.NAME.apply(lambda x: x[x.find(",") + 1:-16].lstrip().upper())
    # dfFL['COUNTY_ID'] = dfFL.GEO_ID.str[-9:-6]
    # dfFL['PREC_ID'] = dfFL['GEO_ID'].str[-4:]
    # dfFL['PREC_ID'] = dfFL['GEO_ID'].str[9:14] + dfFL['PREC_ID']
    # dfFL['OTHER_POP'] = dfFL['TOTAL_POP'] - dfFL['HISPANIC_POP'] - dfFL['WHITE_POP'] - dfFL['AFRICAN_AMERICAN_POP'] - \
    #                     dfFL['NATIVE_AMERICAN_POP'] - dfFL['ASIAN_POP']
    # dfFL = dfFL[['GEO_ID', 'COUNTY', 'COUNTY_ID', 'PREC_ID', 'TOTAL_POP', 'WHITE_POP', 'HISPANIC_POP',
    #              'AFRICAN_AMERICAN_POP', 'NATIVE_AMERICAN_POP', 'ASIAN_POP', 'OTHER_POP']]
    # # get/add percent minority group for heat map
    # dfFL['PERCENT_HISPANIC'] = \
    #     dfFL.apply(lambda row: round(row.HISPANIC_POP / row.TOTAL_POP * 100, 1) if row.TOTAL_POP != 0 else "NaN",
    #                axis=1)
    # dfFL['PERCENT_AFRICAN_AMERICAN'] = \
    #     dfFL.apply(lambda row: round(row.AFRICAN_AMERICAN_POP / row.TOTAL_POP * 100, 1) if row.TOTAL_POP != 0 else "NaN"
    #                , axis=1)
    # dfFL['PERCENT_NATIVE_AMERICAN'] = \
    #     dfFL.apply(lambda row: round(row.NATIVE_AMERICAN_POP / row.TOTAL_POP * 100, 1) if row.TOTAL_POP != 0 else "NaN",
    #                axis=1)
    # dfFL['PERCENT_ASIAN'] = \
    #     dfFL.apply(lambda row: round(row.ASIAN_POP / row.TOTAL_POP * 100, 1) if row.TOTAL_POP != 0 else "NaN", axis=1)
    # # add VAP data and rename/order
    # dfFLVAP.columns = ['GEO_ID', 'TOTAL_VAP', 'HISPANIC_VAP', 'WHITE_VAP', 'AFRICAN_AMERICAN_VAP',
    #                    'NATIVE_AMERICAN_VAP', 'ASIAN_VAP']
    # dfFLVAP = dfFLVAP[
    #     ['GEO_ID', 'TOTAL_VAP', 'WHITE_VAP', 'HISPANIC_VAP', 'AFRICAN_AMERICAN_VAP', 'NATIVE_AMERICAN_VAP',
    #      'ASIAN_VAP']]
    # dfFLVAP['OTHER_VAP'] = dfFLVAP['TOTAL_VAP'] - dfFLVAP['HISPANIC_VAP'] - dfFLVAP['WHITE_VAP'] - \
    #                        dfFLVAP['AFRICAN_AMERICAN_VAP'] - dfFLVAP['NATIVE_AMERICAN_VAP'] - dfFLVAP['ASIAN_VAP']
    # dfFL = pd.merge(dfFL, dfFLVAP, on='GEO_ID', how='outer')
    #
    # # Texas
    # # rename/order columns and get/add COUNTY and ID columns
    # dfTX.columns = ['GEO_ID', 'NAME', 'TOTAL_POP', 'HISPANIC_POP', 'WHITE_POP', 'AFRICAN_AMERICAN_POP',
    #                 'NATIVE_AMERICAN_POP', 'ASIAN_POP']
    # # Voting District 0001, Anderson County, Texas - format
    # dfTX['COUNTY'] = dfTX.NAME.apply(lambda x: x[x.find(",") + 1:-15].lstrip().upper())
    # dfTX['COUNTY_ID'] = dfTX.GEO_ID.str[-9:-6]
    # dfTX['PREC_ID'] = dfTX['GEO_ID'].str[-4:]
    # dfTX['PREC_ID'] = dfTX['GEO_ID'].str[9:14] + dfTX['PREC_ID']
    # dfTX['OTHER_POP'] = dfTX['TOTAL_POP'] - dfTX['HISPANIC_POP'] - dfTX['WHITE_POP'] - dfTX['AFRICAN_AMERICAN_POP'] - \
    #                     dfTX['NATIVE_AMERICAN_POP'] - dfTX['ASIAN_POP']
    # dfTX = dfTX[['GEO_ID', 'COUNTY', 'COUNTY_ID', 'PREC_ID', 'TOTAL_POP', 'WHITE_POP', 'HISPANIC_POP',
    #              'AFRICAN_AMERICAN_POP', 'NATIVE_AMERICAN_POP', 'ASIAN_POP', 'OTHER_POP']]
    # # get/add percent minority group for heat map
    # dfTX['PERCENT_HISPANIC'] = \
    #     dfTX.apply(lambda row: round(row.HISPANIC_POP / row.TOTAL_POP * 100, 1) if row.TOTAL_POP != 0 else "NaN",
    #                axis=1)
    # dfTX['PERCENT_AFRICAN_AMERICAN'] = \
    #     dfTX.apply(lambda row: round(row.AFRICAN_AMERICAN_POP / row.TOTAL_POP * 100, 1) if row.TOTAL_POP != 0 else "NaN"
    #                , axis=1)
    # dfTX['PERCENT_NATIVE_AMERICAN'] = \
    #     dfTX.apply(lambda row: round(row.NATIVE_AMERICAN_POP / row.TOTAL_POP * 100, 1) if row.TOTAL_POP != 0 else "NaN",
    #                axis=1)
    # dfTX['PERCENT_ASIAN'] = \
    #     dfTX.apply(lambda row: round(row.ASIAN_POP / row.TOTAL_POP * 100, 1) if row.TOTAL_POP != 0 else "NaN", axis=1)
    # # add VAP data and rename/order
    # dfTXVAP.columns = ['GEO_ID', 'TOTAL_VAP', 'HISPANIC_VAP', 'WHITE_VAP', 'AFRICAN_AMERICAN_VAP',
    #                    'NATIVE_AMERICAN_VAP', 'ASIAN_VAP']
    # dfTXVAP = dfTXVAP[
    #     ['GEO_ID', 'TOTAL_VAP', 'WHITE_VAP', 'HISPANIC_VAP', 'AFRICAN_AMERICAN_VAP', 'NATIVE_AMERICAN_VAP',
    #      'ASIAN_VAP']]
    # dfTXVAP['OTHER_VAP'] = dfTXVAP['TOTAL_VAP'] - dfTXVAP['HISPANIC_VAP'] - dfTXVAP['WHITE_VAP'] - \
    #                        dfTXVAP['AFRICAN_AMERICAN_VAP'] - dfTXVAP['NATIVE_AMERICAN_VAP'] - dfTXVAP['ASIAN_VAP']
    # dfTX = pd.merge(dfTX, dfTXVAP, on='GEO_ID', how='outer')


def createJSON():
    # convert df to json
    dfNC.to_json(r'jsons\NCPrecinctDemoDataTest.json', orient="records", indent=4)
    # dfFL.to_json(r'jsons\FLPrecinctDemoData.json', orient="records", indent=4)
    # dfTX.to_json(r'jsons\TXPrecinctDemoData.json', orient="records", indent=4)


initData()
editData()
createJSON()
