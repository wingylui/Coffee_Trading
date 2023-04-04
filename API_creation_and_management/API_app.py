# import MongoClient
from pymongo import MongoClient
import numpy as np
from flask import Flask, jsonify


# creating a function for popup graph in the map
def line_graph_API(dic, key_name, results):
    # create lists : years (x-axis) and values (y-axis) for ploting line graph
    years = []
    values = []

    # extract all the years and values data from database
    years_array = np.arange(1990, 2020)
    for year in years_array:
        years.append(str(year))
        values.append(results[str(year)])

    # putting all data into dictionary
    dic[key_name] = {"years" : years, "values" : values}


# Create an instance of MongoClient
mongo = MongoClient(port = 27017)

# Crete an app
app = Flask(__name__)

@app.route("/map/production")
def production_country():
    # Create an instance of MongoClient
    mongo = MongoClient(port = 27017)

    # label all the collections into different variables
    total_production = mongo.coffee_trading.total_production
    # domestic_consumption = mongo.coffee_trading.domestic_consumption
    location = mongo.coffee_trading.worldmap

    # organising all the data and output as a geojson file
    # create feature list for geojson
    features = []

    # query the whole table of total_production 
    for production_results in total_production.find():
        # create property array for storing all other data
        dic_in_feature = {} 
        # typical feature for type
        dic_in_feature["type"] = "Feature"
        
        # name the variables that required
        country_in_table = production_results["Country (In thousand 60kg bags)"]

        # create property array for storing all data in the table
        properties = {}

        # storing variables into properites dic
        properties["Country Name"] = country_in_table
        properties["units"] = "In thousand 60kg bags"
        
        # query all the data from 1990 to 2019
        years = np.arange(1990,2020)
        for year in years:
            properties[str(year)] = production_results[str(year)]
            

        # put all the data from properties array into the feature list
        dic_in_feature["properties"] = properties

        # query out the coordinates from the world map json file and put into the geometry dictionary
        query = {"Country Name" : country_in_table}
        location_query = location.find_one(query)
        dic_in_feature["geometry"] = dict(location_query["Geo Shape"])
        
        # put all above the into features list
        features.append(dic_in_feature)

    # create geojson file
    geojson_file = {"type": "FeatureCollection", "features" : features}

    return jsonify(geojson_file)


@app.route("/map/import")
def import_counctry():
    
    # Create an instance of MongoClient
    mongo = MongoClient(port = 27017)
    
    # label all the collections into different variables
    import_coffee = mongo.coffee_trading.import_coffee
    # reexport = mongo.coffee_trading["re-export"]
    location = mongo.coffee_trading.worldmap

    # organising all the data and output as a geojson file
    # create feature list for geojson
    features = []

    # query the whole table of import
    for import_results in import_coffee.find():
        # create property array for storing all other data
        dic_in_feature = {} 
        # typical feature for type
        dic_in_feature["type"] = "Feature"

        # name the variables that required
        country_in_table = import_results["Country (In thousand 60kg bags)"]
        
        # create property array for storing all data in the table
        properties = {}

        # storing variables into properites dic
        properties["Country Name"] = country_in_table
        properties["units"] = "In thousand 60kg bags"
        
        # query all the data from 1990 to 2019
        years = np.arange(1990,2020)
        for year in years:
            properties[str(year)] = import_results[str(year)]
        # put all the data from properties array into the feature list
        dic_in_feature["properties"] = properties
        
        # query out the coordinates from the world map json file and put into the geometry dictionary
        query = {"Country Name" : country_in_table}
        location_query = location.find_one(query)
        dic_in_feature["geometry"] = location_query["Geo Shape"]
        
        # put all above the into features list
        features.append(dic_in_feature)
    # create geojson file
    geojson_file = {"type": "FeatureCollection", "features" : features}

    return jsonify(geojson_file)

@app.route("/map/export")
def export_country():
    # Create an instance of MongoClient
    mongo = MongoClient(port = 27017)

    # label all the collections into different variables
    export = mongo.coffee_trading.export
    location = mongo.coffee_trading.worldmap

    # organising all the data and output as a geojson file
    # create feature list for geojson
    features = []

    # query the whole table of import
    for export_results in export.find():
        # create property array for storing all other data
        dic_in_feature = {} 
        # typical feature for type
        dic_in_feature["type"] = "Feature"

        # name the variables that required
        country_in_table = export_results["Country (In thousand 60kg bags)"]
        
        # create property array for storing all data in the table
        properties = {}

        # storing variables into properites dic
        properties["Country Name"] = country_in_table
        properties["units"] = "In thousand 60kg bags"
        
        # query all the data from 1990 to 2019
        years = np.arange(1990,2020)
        for year in years:
            properties[str(year)] = export_results[str(year)]
        # put all the data from properties array into the feature list
        dic_in_feature["properties"] = properties
        
        # query out the coordinates from the world map json file and put into the geometry dictionary
        query = {"Country Name" : country_in_table}
        location_query = location.find_one(query)
        dic_in_feature["geometry"] = location_query["Geo Shape"]
        
        # put all above the into features list
        features.append(dic_in_feature)
    # create geojson file
    geojson_file = {"type": "FeatureCollection", "features" : features}

    return jsonify(geojson_file)


@app.route("/map/retail_price")
def retail_price():
    # Create an instance of MongoClient
    mongo = MongoClient(port = 27017)

    # label all the collections into different variables
    retail_price = mongo.coffee_trading.retail_price
    location = mongo.coffee_trading.worldmap

    # organising all the data and output as a geojson file
    # create feature list for geojson
    features = []

    # query the whole table of import
    for price_results in retail_price.find():
        # create property array for storing all other data
        dic_in_feature = {} 
        # typical feature for type
        dic_in_feature["type"] = "Feature"

        # name the variables that required
        country_in_table = price_results["Country (US cents per lb)"]
        
        # create property array for storing all data in the table
        properties = {}

        # storing variables into properites dic
        properties["Country Name"] = country_in_table
        properties["units"] = "US cents per lb"
        
        # query all the data from 1990 to 2019
        years = np.arange(1990,2020)
        for year in years:
            properties[str(year)] = price_results[str(year)]
        # put all the data from properties array into the feature list
        dic_in_feature["properties"] = properties
        
        # query out the coordinates from the world map json file and put into the geometry dictionary
        query = {"Country Name" : country_in_table}
        location_query = location.find_one(query)
        dic_in_feature["geometry"] = location_query["Geo Shape"]
        
        # put all above the into features list
        features.append(dic_in_feature)
    # create geojson file
    geojson_file = {"type": "FeatureCollection", "features" : features}

    return jsonify(geojson_file)


@app.route("/map/re-export")
def reexport():
    # Create an instance of MongoClient
    mongo = MongoClient(port = 27017)

    # label all the collections into different variables
    reexport = mongo.coffee_trading["re-export"]
    location = mongo.coffee_trading.worldmap

    # organising all the data and output as a geojson file
    # create feature list for geojson
    features = []

    # query the whole table of import
    for reexport_results in reexport.find():
        # create property array for storing all other data
        dic_in_feature = {} 
        # typical feature for type
        dic_in_feature["type"] = "Feature"
        
        # name all the variables that required 
        country_in_table = reexport_results["Country (In thousand 60kg bags)"]

        # create property array for storing all data in the table
        properties = {}

        # storing variables into properites dic
        properties["Country Name"] = country_in_table
        properties["units"] = "In thousand 60kg bags"
        
        # query all the data from 1990 to 2019
        years = np.arange(1990,2020)
        for year in years:
            properties[str(year)] = reexport_results[str(year)]
        # put all the data from properties array into the feature list
        dic_in_feature["properties"] = properties
        
        # query out the coordinates from the world map json file and put into the geometry dictionary
        query = {"Country Name" : country_in_table}
        location_query = location.find_one(query)
        dic_in_feature["geometry"] = location_query["Geo Shape"]
        
        # put all above the into features list
        features.append(dic_in_feature)
    # create geojson file
    geojson_file = {"type": "FeatureCollection", "features" : features}

    return jsonify(geojson_file)


@app.route("/trade_popup/<country_name>")
def dashboard_country(country_name):
    # Create an instance of MongoClient
    mongo = MongoClient(port = 27017)

    # label all the collections into different variables
    total_production = mongo.coffee_trading.total_production
    import_coffee = mongo.coffee_trading.import_coffee
    reexport = mongo.coffee_trading["re-export"]
    export = mongo.coffee_trading.export
    consumption = mongo.coffee_trading.consumption

    data = {}
    data["country"] = country_name
    data["units"] = "In thousand 60kg bags"
    import_query = {"Country (In thousand 60kg bags)" : country_name}
    output_field = {"_id" : 0, "Country (In thousand 60kg bags)" : 0}

    try:
        for production_results in total_production.find(import_query, output_field):
            line_graph_API(data, "TotalProduction", production_results)
    except:
        pass

    try:
        for export_results in export.find(import_query, output_field):
            line_graph_API(data, "Export", export_results)
    except:
        pass

    try:
        for import_results in import_coffee.find(import_query, output_field):
            line_graph_API(data, "Import", import_results)
            
    except:
        pass

    try:
        for reexport_results in reexport.find(import_query, output_field):
            line_graph_API(data, "ReExport", reexport_results)
    except:
        pass

    try:
        for consumption_results in consumption.find(import_query, output_field):
            line_graph_API(data, "Consumption", consumption_results)
    except:
        pass

    return jsonify(data)



@app.route("/dashboard/farmer_received")
def farmer_recevied():
    # Create an instance of MongoClient
    mongo = MongoClient(port = 27017)

    # label all the collections into different variables
    grower_received = mongo.coffee_trading.grower_received
    retail_price = mongo.coffee_trading.retail_price

    # create a empty dictionary to store 1990 - 2019 the mean of grower received (each year)
    grower_received_mean = {}
    years = np.arange(1990,2020) # get a range of number from 1990 to 2020

    # create a dictionary to store all the data
    final_json = {"unit" : "US cents per lb"}
    for year in years: 
        # create a empty list for that particular year
        the_year = []
        # query all the farmer received data from that year and store it into the_year list if it is not None
        for famer_results in grower_received.find({}, {str(year): 1}):
            if famer_results[str(year)] != None:
                the_year.append(famer_results[str(year)])
            else:
                pass

        # calculate the mean of the whole list
        grower_received_mean[str(year)] = np.mean(the_year)
        
    #  putting into line plot format
    line_graph_API(final_json, "GrowerReceivedMean", grower_received_mean)

    # create a empty dictionary to store 1990 - 2019 the mean of retail price (each year)
    retail_price_mean = {}
    years = np.arange(1990,2020)
    for year in years:
        # create a empty list for that particular year
        the_year = []

        # query all the retail price data from that year and store it into the_year list if it is not None
        for retail_results in retail_price.find({}, {str(year): 1}):
            if retail_results[str(year)] != None:
                the_year.append(retail_results[str(year)])
            else:
                pass

        # calculate the mean of the whole list
        retail_price_mean[str(year)] = np.mean(the_year)

    # putting into line plot format
    line_graph_API(final_json, "RetailPriceMean", retail_price_mean)


    return jsonify(final_json)
      

@app.route("/dashboard/top_quality_coffee")
def top_quality_coffee():
    # Create an instance of MongoClient
    mongo = MongoClient(port = 27017)
    # label all the collections into different variables
    dashboard_data = mongo.coffee_trading.dashboard_graph
    for results in dashboard_data.find({},{"_id" : 0}):
        dashboard = results
    
    return jsonify(dashboard)


# allow using debug mode so continuously updating the web page
if __name__ == "__main__":
    app.run(debug= True)