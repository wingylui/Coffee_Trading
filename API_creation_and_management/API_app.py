# import MongoClient
from pymongo import MongoClient
import numpy as np

# Create an instance of MongoClient
mongo = MongoClient(port = 27017)

# assign the uk_food database to a variable name
db_coffee_trading = mongo.coffee_trading
                       
    # label all the collections into different variables
    total_production = mongo.coffee_trading.total_production
    domestic_consumption = mongo.coffee_trading.domestic_consumption
    retail_price = mongo.coffee_trading.retail_price
    reexport = mongo.coffee_trading["re-export"]
    import_coffee = mongo.coffee_trading.import_coffee
    export = mongo.coffee_trading.export
    grower_received = mongo.coffee_trading.grower_received
    top_coffee = mongo.coffee_trading.top_quality_coffee
    location = mongo.coffee_trading.worldmap

# create empty geojson file
geojson = {"type": "FeatureCollection"}

from flask import Flask, jsonify

# Crete an app
app = Flask(__name__)

@app.route("/map/production")
def production_country():
    # Create an instance of MongoClient
    mongo = MongoClient(port = 27017)

    # label all the collections into different variables
    total_production = mongo.coffee_trading.total_production
    domestic_consumption = mongo.coffee_trading.domestic_consumption
    location = mongo.coffee_trading.worldmap

    for country in total_production["Country (In thousand 60kg bags)"]:
        for 
    
    # create empty geojson file
    geojson = {"type": "FeatureCollection"}
   

    return jsonify()

@app.route("/map/import")
def import_counctry():
    
    # Create an instance of MongoClient
    mongo = MongoClient(port = 27017)
    
    # label all the collections into different variables
    import_coffee = mongo.coffee_trading.import_coffee
    reexport = mongo.coffee_trading["re-export"]
    location = 

    return jsonify()

@app.rounte("/map/export")
def export_country():
    # Create an instance of MongoClient
    mongo = MongoClient(port = 27017)

    # label all the collections into different variables
    export = mongo.coffee_trading.export
    location = 


@app.route("dashboard/grower_received")
def farmer_received():
    # Create an instance of MongoClient
    mongo = MongoClient(port = 27017)

    # label all the collections into different variables
    retail_price = mongo.coffee_trading.retail_price
    grower_received = mongo.coffee_trading.grower_received

    return jsonify()

# @app.rounte("map/top_quality_coffee")
# def top_quality_coffee():
#     # Create an instance of MongoClient
#     mongo = MongoClient(port = 27017)

#     # label all the collections into different variables
#     top_coffee = mongo.coffee_trading.top_quality_coffee

#     return jsonify()
    