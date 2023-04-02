# import MongoClient
from pymongo import MongoClient
import numpy as np
from flask import Flask, jsonify


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
        
        # create property array for storing all data in the table
        properties = {}

        properties["Country Name"] = country_in_table
        properties["units"] = "In thousand 60kg bags"
        
        # query all the data from 1990 to 2019
        years = np.arange(1990,2019)
        for year in years:
            properties[year] = production_results[str(year)]

        # put all the data from properties array into the feature list
        dic_in_feature["properties"] = properties


        country_in_table = production_results["Country (In thousand 60kg bags)"]
        # query out the coordinates from the world map json file and put into the geometry dictionary
        query = {"Country Name" : country_in_table}
        location_query = location.find_one(query)
        dic_in_feature["geometry"] = location_query["Geo Shape"]
        
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
        
        # create property array for storing all data in the table
        properties = {}
        properties["Country Name"] = country_in_table
        properties["units"] = "In thousand 60kg bags"
        
        # query all the data from 1990 to 2019
        years = np.arange(1990,2019)
        for year in years:
            properties[year] = import_results[str(year)]
        # put all the data from properties array into the feature list
        dic_in_feature["properties"] = properties
        country_in_table = import_results["Country (In thousand 60-kg bags)"]
        # query out the coordinates from the world map json file and put into the geometry dictionary
        query = {"Country Name" : country_in_table}
        location_query = location.find_one(query)
        dic_in_feature["geometry"] = location_query["Geo Shape"]
        
        # put all above the into features list
        features.append(dic_in_feature)
    # create geojson file
    geojson_file = {"type": "FeatureCollection", "features" : features}

    return jsonify(geojson_file)

@app.rounte("/map/export")
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
        
        # create property array for storing all data in the table
        properties = {}
        properties["Country Name"] = country_in_table
        properties["units"] = "In thousand 60kg bags"
        
        # query all the data from 1990 to 2019
        years = np.arange(1990,2019)
        for year in years:
            properties[year] = export_results[str(year)]
        # put all the data from properties array into the feature list
        dic_in_feature["properties"] = properties
        country_in_table = export_results["Country (In thousand 60kg bags)"]
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
def farmer_received():
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
        
        # create property array for storing all data in the table
        properties = {}
        properties["Country Name"] = country_in_table
        properties["units"] = "USD per lb"
        
        # query all the data from 1990 to 2019
        years = np.arange(1990,2019)
        for year in years:
            properties[year] = price_results[str(year)]
        # put all the data from properties array into the feature list
        dic_in_feature["properties"] = properties
        country_in_table = price_results["Country (US cents per lb)"]
        # query out the coordinates from the world map json file and put into the geometry dictionary
        query = {"Country Name" : country_in_table}
        location_query = location.find_one(query)
        dic_in_feature["geometry"] = location_query["Geo Shape"]
        
        # put all above the into features list
        features.append(dic_in_feature)
    # create geojson file
    geojson_file = {"type": "FeatureCollection", "features" : features}

    return jsonify(geojson_file)


@app.route("/map/grower_received")
def farmer_received():
    # Create an instance of MongoClient
    mongo = MongoClient(port = 27017)

    # label all the collections into different variables
    grower_received = mongo.coffee_trading.grower_received
    location = mongo.coffee_trading.worldmap

    # organising all the data and output as a geojson file
    # create feature list for geojson
    features = []

    # query the whole table of import
    for farmer_results in grower_received.find():
        # create property array for storing all other data
        dic_in_feature = {} 
        # typical feature for type
        dic_in_feature["type"] = "Feature"
        
        # create property array for storing all data in the table
        properties = {}
        properties["Country Name"] = country_in_table
        properties["units"] = "USD per lb"
        
        # query all the data from 1990 to 2019
        years = np.arange(1990,2019)
        for year in years:
            properties[year] = farmer_results[str(year)]
        # put all the data from properties array into the feature list
        dic_in_feature["properties"] = properties
        country_in_table = farmer_results["Country (US cents/lb)"]
        # query out the coordinates from the world map json file and put into the geometry dictionary
        query = {"Country Name" : country_in_table}
        location_query = location.find_one(query)
        dic_in_feature["geometry"] = location_query["Geo Shape"]
        
        # put all above the into features list
        features.append(dic_in_feature)
    # create geojson file
    geojson_file = {"type": "FeatureCollection", "features" : features}

    return jsonify(geojson_file)

@app.rounte("map/top_quality_coffee")
def top_quality_coffee():
    # Create an instance of MongoClient
    mongo = MongoClient(port = 27017)

    # label all the collections into different variables
    top_coffee = mongo.coffee_trading.top_quality_coffee

    return jsonify()
    