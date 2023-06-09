// Create the two map tile layers (For stree and topo view)
var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// naming all new layer variable
var importLayer = new L.LayerGroup();
var productionLayer = new L.LayerGroup();
var exportLayer = new L.LayerGroup();
var reExportLayer = new L.LayerGroup();

// initialized different legend variable;
var productionLegend;
var importLegend;
var exportLegend;
var reexportLegend;

// Putting the two map title into list to create toggle switch
var baseMaps = {
  "Street Map": street
};

// create map
finalMap = L.map("map", {
    center: [0,0], // the central position when first loaded into the map
    zoom : 3,
    layers: [street]
});

// creating overlayer to control the map toggle
var overLays = {
  "Import" : importLayer,
  "Re-Export" : reExportLayer,
  "Total Production" : productionLayer,
  "Export" : exportLayer
};

// add layer with only baseMaps
L.control.layers(baseMaps, overLays).addTo(finalMap);


// stating production url
const productionURL = "http://127.0.0.1:5000/map/production";

// assess the production json data through API
d3.json(productionURL).then(function(data) {
  // creating choropleth into map and add to layer
  var productionChoropleth = L.choropleth(data, {
    valueProperty: 'y2019', // which property in the features to use
    scale: ["#a1ccee", "#04379d"], // colour: blue
    steps: 15, // number of breaks 
    mode: 'q', // q for quantile, e for equidistant, k for k-means
    style: {color: '#fff', weight: 1, fillOpacity: 0.8}, // outline color and width
    onEachFeature: function(features, layer) {
      layer.bindPopup('<div id="foo"></div>').on('popupopen', function (e) {
        // getting the coutnry that user click on
        let graphURL = "http://127.0.0.1:5000/trade_popup/" + features.properties.CountryName;
        
        // query out the data for production and export data for that country through API
        d3.json(graphURL).then(function(graphdata){

          exportgraph(graphdata, features.properties.CountryName); // line plot
      })
    })
  }}).addTo(productionLayer); // adding to the layer

  var units = data.features[0].properties.units;
  // creating legend for production
  var productionLegend = legend(productionChoropleth, units, "Total Production", 15, 100);
  // control the legned on and off 
  legendControl(productionLegend, "Total Production");
});

// console.log(productionLegend)
// identify import url
const importURL = "http://127.0.0.1:5000/map/import";

// assess the production json data through API
d3.json(importURL).then(function(data) {
  // creating choropleth into map and add to layer
  var importChoropleth = L.choropleth(data, {
    valueProperty: '2019', // which property in the features to use
    scale: ["#aaf6c6", "#07762c"], // colour: green
    steps: 15, // number of breaks 
    mode: 'q', // q for quantile, e for equidistant, k for k-means
    style: {color: '#fff', weight: 1, fillOpacity: 0.8}, // outline color and width
    onEachFeature: function(features, layer) {
      layer.bindPopup('<div id="foo"></div>').on('popupopen', function (e) {
        // getting the coutnry that user click on
        let graphURL = "http://127.0.0.1:5000/trade_popup/" + features.properties.CountryName;

        // query out the data for import and reexport data for that country through API
        d3.json(graphURL).then(function(graphdata){
          // setting up the line graph using plotly
          importgraph(graphdata, features.properties.CountryName);
      })
    })
  }}).addTo(importLayer); // adding to the layer

  var units = data.features[0].properties.units;
  // creating legend for import
  var importLegend = legend(importChoropleth, units, "Import", 15, 1000);
  // control the legned on and off 
  legendControl(importLegend, "Import");

});


// identify export url
const exportURL = "http://127.0.0.1:5000//map/export";

// assess the export json data through API
d3.json(exportURL).then(function(data) {
  // creating choropleth into map and add to layer
  var exportChoropleth =L.choropleth(data, {
    valueProperty: '2019', // which property in the features to use
    scale: ["#f6ecbc", "#ec620e"], // colour: orange
    steps: 15, // number of breaks 
    mode: 'q', // q for quantile, e for equidistant, k for k-means
    style: {color: '#fff', weight: 1, fillOpacity: 0.8}, // outline color and width
    onEachFeature: function(features, layer) {
      layer.bindPopup('<div id="foo"></div>').on('popupopen', function (e) {
        // getting the coutnry that user click on
        let graphURL = "http://127.0.0.1:5000/trade_popup/" + features.properties.CountryName;

        // query out the data for production and export data for that country through API
        d3.json(graphURL).then(function(graphdata){
          // setting up the line graph using plotly
          exportgraph(graphdata, features.properties.CountryName);
      })
    })
  }}).addTo(exportLayer); // adding to the layer

  var units = data.features[0].properties.units;
  // creating legend for export
  var exportLegend = legend(exportChoropleth, units, "Export", 15, 1000);
  // control the legned on and off 
  legendControl(exportLegend, "Export");
});

// identify export url
const reExportURL = "http://127.0.0.1:5000//map/re-export";

// assess the production json data through API
d3.json(reExportURL).then(function(data) {
  // creating choropleth into map and add to layer
  var reExportChoropleth =  L.choropleth(data, {
    valueProperty: '2019', // which property in the features to use
    scale: ["#f6bcbc", "#9d1414"], // colour: red
    steps: 15, // number of breaks 
    mode: 'q', // q for quantile, e for equidistant, k for k-means
    style: {color: '#fff', weight: 1, fillOpacity: 0.8}, // outline color and width
    onEachFeature: function(features, layer) {
      // layer.bindPopup("<b>" + features.properties.y2019)
      layer.bindPopup('<div id="foo"></div>').on('popupopen', function (e) {
        // getting the coutnry that user click on
        let graphURL = "http://127.0.0.1:5000/trade_popup/" + features.properties.CountryName;

        // query out the data for production and export data for that country through API
        d3.json(graphURL).then(function(graphdata){
          // setting up the line graph using plotly
          importgraph(graphdata, features.properties.CountryName);
      })
    })
  }}).addTo(reExportLayer); // adding to the layer

  var units = data.features[0].properties.units;
  // creating legend for import
  var reExportLegend = legend(reExportChoropleth, units, "Re-Export", 15, 1000);
  // control the legned on and off 
  legendControl(reExportLegend, "Re-Export");

});


// control the legend on/off  when user clicking the layers
function legendControl(legend, titleName){
  // adding legened when toggle on the layer
  finalMap.on("overlayadd", function(event){
    if (event.name == titleName){
      legend.addTo(finalMap);
    }
  });
  
  // remove legened when toggle off the layer
  finalMap.on("overlayremove", function(event){
    if (event.name == titleName){
      finalMap.removeControl(legend);
    }
  });
}


 
function exportgraph (data, country) {
  // setting up the line graph using plotly
  var productionLine = {
    x: data.TotalProduction.years,
    y: data.TotalProduction.values,
    mode: "lines+markers",
    name: "Total Production",
    line: {color: "#174FBF", width: 3},
    marker: {color:"#174FBF", size: 6}}; // production line

  var exportLine = {
    x: data.Export.years,
    y: data.Export.values,
    mode: "lines+markers",
    name: "Export",
    line: {color: "#FFA019", width: 3},
    marker: {color:"#FFA019", size: 6}}; // export line

  var layout =  {width: 600, height: 450, title: country, margin:{l:30, r:30, b: 30, t:70},
    yaxis: {automargin: true, title:{text: "Thousands 60kg bags",standoff: 5}, constraintoward: "bottom"}, 
    xaxis: {automargin: true, title:{text: "Years", standoff: 5}, constraintoward: "left"}};
  
  Plotly.newPlot('foo', [productionLine, exportLine], layout);  
}

function importgraph (data, country) {
  // import line
  var importLine = {
    x: data.Import.years,
    y: data.Import.values,
    mode: "lines+markers",
    name: "Import",
    line: {color: "#17771E", width: 3},
    marker: {color:"#17771E", size: 6}}; 
  
  // reexport line
  var reExportLine = {
    x: data.ReExport.years,
    y: data.ReExport.values,
    mode: "lines+markers",
    name: "Re-Export",
    line: {color: "#BC2E2E", width: 3}, 
    marker: {color:"#BC2E2E", size: 6}}; 

  var layout =  {width: 600, height: 450, title: country, margin:{l:30, r:30, b: 30, t:70},
                yaxis: {automargin: true, title:{text: "Thousands 60kg bags",standoff: 5}, constraintoward: "bottom"}, 
                xaxis: {automargin: true, title:{text: "Years", standoff: 5}, constraintoward: "left"}};

  // trying with there is consumption data, if not, then only plot the import and reexport data
  try {
    var ConsumptionLine = {
      x: data.Consumption.years,
      y: data.Consumption.values,
      mode: "lines+markers",
      name: "Consumption",
      line: {color: "#2E99BC", width: 3},
      marker: {color:"#2E99BC", size: 6}}; // consumption
    
    Plotly.newPlot('foo', [importLine, reExportLine, ConsumptionLine], layout); 
  }
  catch {
    Plotly.newPlot('foo', [importLine, reExportLine], layout); 
  }
}


  
function legend(choroplethGraph, unitName, titleName, steps, roundNum) {
  // creating legend
  var legend = L.control({ position: "bottomleft" });
  legend.onAdd = function(map) {
      var div = L.DomUtil.create("div", "legend");
      var limits = choroplethGraph.options.limits;
      var colors = choroplethGraph.options.colors;

      var difference = Math.ceil((limits[limits.length - 1] - limits[0]/ steps)/roundNum)*roundNum;
      var dum = Math.ceil((limits[0])/roundNum)*roundNum;
      let range = [];
      for (i = 0; i < steps; i++){
        var dumAdded = dum + difference;
        var value = dum + " - " + dumAdded;
        range.push(value);
        dum = dumAdded;
      };

      // Add the minimum and maximum.
      let legendInfo = "<h4>" + titleName + "</h4></br><b>" + unitName + "</br>";

      div.innerHTML += legendInfo;
      for (i = 0; i < range.length; i++){
          div.innerHTML += "<i style=\"background-color: " + colors[i] + "\"></i><span>" + range[i] + "</span></br>"
      };

      // div.innerHTML += "<ul>" + labels.join("") + "</ul>";
      return div;
  };
 
  return legend;
};
