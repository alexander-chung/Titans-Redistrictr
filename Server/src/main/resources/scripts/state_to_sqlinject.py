import json


with open('../json/States.json') as f:
    data = json.load(f)

states = data["features"]

columns = [
    "GEOID10",
    "STATEENUM",
    "NAME10",
    "TOTAL_POP",
    "WHITE_POP",
    "HISPANIC_POP",
    "AFRICAN_AMERICAN_POP",
    "NATIVE_AMERICAN_POP",
    "ASIAN_POP",
    "OTHER_POP",
    "TOTAL_VAP",
    "WHITE_VAP",
    "HISPANIC_VAP",
    "AFRICAN_AMERICAN_VAP",
    "NATIVE_AMERICAN_VAP",
    "ASIAN_VAP",
    "OTHER_VAP",
    "NUM_DISTRICTS",
    "NUM_PRECINCTS",
    "CENTER_LAT",
    "CENTER_LON",
    "ZOOM"
]

for state in states:
    demo_data = state["properties"]
    insert = "INSERT INTO titans.states ("

    for c in columns:
        insert += c + ", "
    insert = insert[:-2] + ") "

    insert += "VALUES ("
    for i in range(0, 3):
        insert += "'" + demo_data[columns[i]] + "'" + ", "

    for i in range(3, len(columns)):
        insert += str(demo_data[columns[i]]) + ", "

    insert = insert[:-2] + ") "
    print(insert)
