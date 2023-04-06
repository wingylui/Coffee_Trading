// Top Quality Coffee
function topQualityCoffee() {
    document.getElementById("growerGet").style.display = "none";
    document.getElementById("topCoffee").style.display = "block";

    const allCoffeeURL = "http://127.0.0.1:5000/dashboard/top_quality_coffee/all";
    d3.json(allCoffeeURL).then(function(data){
        plotGraph(data.all);
        
    })
}

function optionChanged(input){
    if (input == "All") {
        const allCoffeeURL = "http://127.0.0.1:5000/dashboard/top_quality_coffee/all";
        d3.json(allCoffeeURL).then(function(data){
            plotGraph(data, "all");})
    }
    else if (input == "High Rated"){
        const highRatedCoffeeURL = "http://127.0.0.1:5000/dashboard/top_quality_coffee/high_rated";
        d3.json(highRatedCoffeeURL).then(function(data){
            plotGraph(data, "high_rated");})
    }
    else{
        const lowPriceCoffeeURL = "http://127.0.0.1:5000/dashboard/top_quality_coffee/low_price";
        d3.json(lowPriceCoffeeURL).then(function(data){
        plotGraph(data, "low_price");})
    };
}


// farmer_received
// when user click the farmer received button
function retailFarmer(){
    document.getElementById("growerGet").style.display = "block";
    document.getElementById("topCoffee").style.display = "none";

    const retailFarmerURL = "http://127.0.0.1:5000/dashboard/farmer_received";
    d3.json(retailFarmerURL).then(function(data){
        console.log(data);
        var retailPrice ={
            x: data.GrowerReceivedMean.years,
            y: data.RetailPriceMean.values,
            mode: "lines+markers",
            name: "Retail Price"};

        var growerReceived = {
            x: data.GrowerReceivedMean.years,
            y: data.GrowerReceivedMean.values,
            mode: "lines+markers",
            name: "Grower Received"};
          
          var layout = {
            title: "Grower Received back from the Consumer",
            width: 1400,
            height: 700
          };
          
          Plotly.newPlot("retail-farmer", [retailPrice, growerReceived], layout);
    });}


function plotGraph(dataSet, key){
    console.log(dataSet);
    // species data
    var speciesBarTrace = [{
        x: dataSet.species[key],
        y: dataSet.species.species, 
        // text: topTen.map(label => label.otu_labels), // for hover text
        type: "bar",
        marker: {
            color: "rgb(94, 149, 169)",
            opacity: 0.7, // transparent
            line: {
                width: 1.5,
                color: "rgb(55, 116, 145)"} // line colour and width
        },
        orientation: "h" // change vertical to horizontial
    }];

    var speciesBarLayout = {
        showlegend: false,
        height: 480,
        width: 280,
        margin: {
            b: 30,
            l: 80,
            r: 10,
            t: 60},
        paper_bgcolor: "rgba(0, 0, 0, 0)",
        title: "Species"
    };

    // plot bar chart
    Plotly.newPlot("speices", speciesBarTrace, speciesBarLayout);

    // // rating pie
    // var ratingData = [{
    //     values: dataSet.rating[key],
    //     labels: dataSet.rating.coffee_rating,
    //     type: "pie",
    //     textinfo: "none",
    //     hoverinfo: "label+percent+name",
    //     hole: .7
    //   }];
      
    //   var ratingPieLayout = {
    //     height: 400,
    //     width: 500,
    //     title: "Rating"
    //   };
      
    //   Plotly.newPlot("rating", ratingData, ratingPieLayout);


    // roast level pie
    var roastLvData = [{
        values: dataSet.roast_level[key],
        labels: dataSet.roast_level.roast_level,
        type: "pie",
        textinfo: "none",
        hoverinfo: "label+percent+name",
        hole: .7
      }];
      
      var pieLayout = {
        height: 190,
        width: 350,
        margin: {
            b: 20,
            l: 20,
            r: 20,
            t: 40},
        paper_bgcolor: "rgba(0, 0, 0, 0)",
        legend:{font: {size: 15}},
        title: "Roast Level"
      };
      
      Plotly.newPlot("roast-level", roastLvData, pieLayout);

      // origin country
      var originBarTrace = [{
        x: dataSet.origin_country.coffee_origin_country, 
        y: dataSet.origin_country[key],
        // x: dataSet.origin_country[key],
        // y: dataSet.origin_country.coffee_origin_country, 
        // text: topTen.map(label => label.otu_labels), // for hover text
        type: "bar",
        marker: {
            color: "rgb(94, 149, 169)",
            opacity: 0.7, // transparent
            line: {
                width: 1.5,
                color: "rgb(55, 116, 145)"} // line colour and width
        },
        // orientation: "h" // change vertical to horizontial
    }];

    var originBarLayout = {
        showlegend: false,
        height: 400,
        width: 650,
        margin: {
            b: 100,
            l: 50,
            r: 25,
            t: 60},
        paper_bgcolor: "rgba(0, 0, 0, 0)",
        title: "Coffee Origin Country"
    };

    // plot bar chart
    Plotly.newPlot("origin-country", originBarTrace, originBarLayout);

    // price
    var priceBarTrace = [{
        x: dataSet.price[key],
        y: dataSet.price.PriceRangeUSD_kg, 
        // text: topTen.map(label => label.otu_labels), // for hover text
        type: "bar",
        marker: {
            color: "rgb(94, 149, 169)",
            opacity: 0.7, // transparent
            line: {
                width: 1.5,
                color: "rgb(55, 116, 145)"} // line colour and width
        },
        orientation: "h" // change vertical to horizontial
    }];

    var priceBarLayout = {
        showlegend: false,
        height: 480,
        width: 300,
        margin: {
            b: 30,
            l: 100,
            r: 0,
            t: 60,
            pad: 5},
        paper_bgcolor: "rgba(0, 0, 0, 0)",
        title: "Coffee Price"
    };

    // plot bar chart
    Plotly.newPlot("price", priceBarTrace, priceBarLayout);

    // roaster country
    var roasterBarTrace = [{
        x: dataSet.roaster.roaster_country, 
        y: dataSet.roaster[key],
        // text: topTen.map(label => label.otu_labels), // for hover text
        type: "bar",
        marker: {
            color: "rgb(94, 149, 169)",
            opacity: 0.7, // transparent
            line: {
                width: 1.5,
                color: "rgb(55, 116, 145)"} // line colour and width
        },
        // orientation: "h" // change vertical to horizontial
    }];

    var roasterBarLayout = {
        showlegend: false,
        height: 400,
        width: 650,
        margin: {
            b: 100,
            l: 50,
            r: 25,
            t: 60},
        paper_bgcolor: "rgba(0, 0, 0, 0)",
        title: "Coffee Roaster Country"
    };

    // plot bar chart
    Plotly.newPlot("roaster-country", roasterBarTrace, roasterBarLayout);

}