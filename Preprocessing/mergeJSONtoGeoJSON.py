import json

with open(r'jsons\NCprecinctdata_raw.json', 'r') as f:
    data = json.load(f)

with open(r'jsons\NCPrecinctDemoData.json', 'r') as f2:
    props = json.load(f2)

for properties_list in props:
    for feat in data['features']:
        if properties_list['PREC_ID'] == feat['properties']['GEOID10']:
            feat['properties'].update(properties_list)

data['features'].sort(key=lambda x: x['properties']['GEO_ID'])

i = 1
for feat in data['features']:
    feat['properties'].update({"ID": str(i)})
    i += 1

with open(r'jsons\NC_unbuffed.json', 'w') as f:
    json.dump(data, f)
