import json

state = "FL"

with open(state + '_Precincts.json') as f:
    data = json.load(f)

precincts = data["features"]
columns = [
    "ID", 
    "GEOID10", 
    "NAME10", 
    "GEO_ID", 
    "COUNTY", 
    "COUNTY_ID", 
    "PREC_ID", 
    
    # below int
    "TOTAL_POP", 
    "WHITE_POP", 
    "HISPANIC_POP", 
    "AFRICAN_AMERICAN_POP", 
    "NATIVE_AMERICAN_POP", 
    "ASIAN_POP", 
    "OTHER_POP", 
    "PERCENT_HISPANIC", 
    "PERCENT_AFRICAN_AMERICAN", "PERCENT_NATIVE_AMERICAN", 
    "PERCENT_ASIAN", 
    "TOTAL_VAP", 
    "WHITE_VAP", 
    "HISPANIC_VAP",
    "AFRICAN_AMERICAN_VAP", 
    "NATIVE_AMERICAN_VAP", 
    "ASIAN_VAP", 
    "OTHER_VAP", 
    # above int

    "NEIGHBORS",
]

for precinct in precincts:
    properties = precinct["properties"]

    # columns
    insert = "INSERT INTO titans." + state + "_precincts ("
    for c in columns:
        insert += c + ", "
    insert = insert[0:-2] + ") "

    # values
    insert += "VALUES ("
    for i in range(0, 7):
        insert += '"' + str(properties[columns[i]]) + '", '
    for i in range(7, 25):
        n = str(properties[columns[i]]) if str(properties[columns[i]]) != "NaN" else "0"
        insert += n + ", "
    neighbors = properties["NEIGHBORS"]
    if(len(neighbors) == 0):
        insert += "''"
    else:
        insert += "'"
        for n in neighbors:
            insert += n + ", "
    insert = insert[0: -2]
    insert += "');"

    print(insert)
