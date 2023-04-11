// when user clicking Top Quality Coffee button
function topQualityCoffee() {
    // control which block display on the main section
    // if Top Quality Coffee was clicked dashboard of top quality coffee will open
    // and the grower received block will be hided
    document.getElementById("growerGet").style.display = "none";
    document.getElementById("topCoffee").style.display = "block";

    const allCoffeeURL = "http://127.0.0.1:5000/dashboard/top_quality_coffee/all";
    d3.json(allCoffeeURL).then(function(data){
        plotGraph(data, "all");
        d3.select("#info>h4").text("All High Quality Coffee (Scored 94+)").style("color","rgb(107, 54, 38)")}
    );
}

function optionChanged(input){
    if (input == "All") {
        const allCoffeeURL = "http://127.0.0.1:5000/dashboard/top_quality_coffee/all";
        d3.json(allCoffeeURL).then(function(data){
            plotGraph(data, "all");
            // changing the description text
            d3.select("#info>h4").text("All High Quality Coffee (Scored 94+)").style("color","rgb(107, 54, 38)")});
    }
    else if (input == "High Rated"){
        const highRatedCoffeeURL = "http://127.0.0.1:5000/dashboard/top_quality_coffee/high_rated";
        d3.json(highRatedCoffeeURL).then(function(data){
            plotGraph(data, "high_rated");
            // changing the description text
            d3.select("#info>h4").text("Very High Quality Coffee (Scored 97+)").style("color","rgb(107, 54, 38)")});
    }
    else{
        const lowPriceCoffeeURL = "http://127.0.0.1:5000/dashboard/top_quality_coffee/low_price";
        d3.json(lowPriceCoffeeURL).then(function(data){
        plotGraph(data, "low_price");
        // changing the description text
        d3.select("#info>h4").text("Coffee Retail Price less than USD $35/kg").style("color","rgb(107, 54, 38)")});
    };
}


// farmer_received
// when user click the farmer received button
function retailFarmer(){
    // control which block display on the main section
    // if farmer_received button was clicked line graph of farmer received  will open
    // and the dashboard of top quality coffee block will be hided
    document.getElementById("growerGet").style.display = "block";
    document.getElementById("topCoffee").style.display = "none";

    // data of line of best fit for farmer received (from statistical analysis)
    var lineOfBest_Farmer =  [47.7245244 ,  50.13660976,  52.54869512,  54.96078047,
    57.37286583,  59.78495119,  62.19703655,  64.60912191,
    67.02120726,  69.43329262,  71.84537798,  74.25746334,
    76.6695487 ,  79.08163406,  81.49371941,  83.90580477,
    86.31789013,  88.72997549,  91.14206085,  93.5541462 ,
    95.96623156,  98.37831692, 100.79040228, 103.20248764,
   105.614573  , 108.02665835, 110.43874371, 112.85082907,
   115.26291443, 117.67499979];
    
   // data of line of best fit for retail price (from statistical analysis)
   var lineOfBest_Retail = [425.58624442, 433.12219538, 440.65814634, 448.1940973 ,
    455.73004826, 463.26599922, 470.80195018, 478.33790114,
    485.8738521 , 493.40980306, 500.94575403, 508.48170499,
    516.01765595, 523.55360691, 531.08955787, 538.62550883,
    546.16145979, 553.69741075, 561.23336171, 568.76931267,
    576.30526363, 583.84121459, 591.37716555, 598.91311651,
    606.44906747, 613.98501844, 621.5209694 , 629.05692036,
    636.59287132, 644.12882228];

    const retailFarmerURL = "http://127.0.0.1:5000/dashboard/farmer_received";
    d3.json(retailFarmerURL).then(function(data){
        var retailPrice ={
            x: data.GrowerReceivedMean.years, 
            y: data.RetailPriceMean.values,
            marker:{
                color: "rgb(101, 62, 35)",
                size: 10}, // control the size and colour of dots
            line: {
                color: "rgb(101, 62, 35)",
                width: 5}, // control the thickiness and colour of line
            mode: "lines+markers", 
            name: "Retail Price (US cents/lb)"}; // legend label

        var LBF_Retail = {
            x: data.GrowerReceivedMean.years,
            y: lineOfBest_Retail,
            mode: "lines",
            line: {dash: "dashdot", color: "404040"}, // want dash line for line of best fit
            name: "Retail Price (line of best fit)"}; // legend label

        var growerReceived = {
            x: data.GrowerReceivedMean.years,
            y: data.GrowerReceivedMean.values,
            mode: "lines+markers",
            name: "Bean Cost (US cents/lb)", // legend label
            marker:{
                color: "rgb(152, 105, 63)",
                size: 10}, // control the size and colour of dots
            line:{
                color: "rgb(152, 105, 63)",
                width: 5}}; // control the thickiness and colour of line

        var LBF_Farmer = {
            x: data.GrowerReceivedMean.years,
            y: lineOfBest_Farmer,
            line: {dash: "dashdot", color: "404040"}, // want dash line for line of best fit
            mode: "lines",
            name : "Bean Cost (line of best fit)"}; // legend label
          
          var layout = {
            title: {text: "Global Average Coffee Bean Price - Retail vs Farmer", font: {size: "27"}},
            paper_bgcolor: "#f9f4e6", // colour of the whole image background
            plot_bgcolor: "#d8bd9d97", // colour of plot background
            margin:{pad: 10},
            xaxis:{automargin: true, title:{text: "Years", standoff: 10, font: {size:18}}},
            yaxis:{automargin: true, title:{text: "Price (US cents/lb)", standoff: 10, font: {size:18}}},
            width: 1400,
            height: 700};
          
          Plotly.newPlot("retail-farmer", [retailPrice, LBF_Retail, growerReceived, LBF_Farmer], layout);
    });}



function plotGraph(dataSet, key){
    // species data
    var speciesBarTrace = [{
        x: dataSet.species[key],
        y: dataSet.species.species, 
        type: "bar",
        marker: {
            color: "rgb(112, 68, 36)",
            opacity: 0.7, // 30% transparent
            line: {
                width: 1.5,
                color: "rgb(95, 50, 19)"} // line colour and width
        },
        orientation: "h" // change vertical to horizontial
    }];

    var speciesBarLayout = {
        showlegend: false,
        height: 480,
        width: 330,
        margin: {
            b: 30,
            l: 80,
            r: 10,
            t: 60}, // setting the margin of the graph
        paper_bgcolor: "rgba(0, 0, 0, 0)",  // transparent background (whole image)
        plot_bgcolor: "rgba(0, 0, 0, 0)",  // transparent background (plot only)
        title: "Species", 
        xaxis:{automargin: true, title:{text: "Counts", standoff: 10}}
    };

    // plot bar chart
    Plotly.newPlot("speices", speciesBarTrace, speciesBarLayout);

    // roast level pie
    var roastLvData = [{
        values: dataSet.roast_level[key],
        labels: dataSet.roast_level.roast_level,
        // marker colour (according to the roast level colour)
        marker: {colors: ["rgb(54, 24, 3)", "rgb(255, 202, 126)", "rgb(152, 105, 63)", "rgb(101, 62, 35)", "rgb(203, 152, 94)"]},
        type: "pie",
        textinfo: "none",
        hoverinfo: "label+percent",
        hole: .7 // create a dounut chart (add hole in the middle)
      }];
      
      var pieLayout = {
        height: 190,
        width: 350,
        margin: {
            b: 20,
            l: 20,
            r: 20, 
            t: 40}, // setting the margin of the graph
        paper_bgcolor: "rgba(0, 0, 0, 0)",  // transparent background (whole image)
        plot_bgcolor: "rgba(0, 0, 0, 0)",  // transparent background (plot only)
        legend:{font: {size: 15}},
        title: "Roast Level"
      };
      
      Plotly.newPlot("roast-level", roastLvData, pieLayout);

      // origin country
      var originBarTrace = [{
        x: dataSet.origin_country.coffee_origin_country, 
        y: dataSet.origin_country[key],
        type: "bar",
        marker: {
            color: "rgb(112, 68, 36)",
            opacity: 0.7, // 30% transparent
            line: {
                width: 1.5,
                color: "rgb(95, 50, 19)"} // line colour and width
        },
    }];

    var originBarLayout = {
        showlegend: false,
        height: 400,
        width: 650,
        margin: {
            b: 100,
            l: 50,
            r: 25,
            t: 60}, // setting the margin of the graph
        paper_bgcolor: "rgba(0, 0, 0, 0)", // transparent background (whole image)
        plot_bgcolor: "rgba(0, 0, 0, 0)", // transparent background (plot only)
        title: "Coffee Origin Country",
        yaxis:{automargin: true, title:{text: "Counts", standoff: 5}}
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
            color: "rgb(112, 68, 36)",
            opacity: 0.7, // transparent
            line: {
                width: 1.5,
                color: "rgb(95, 50, 19)"} // line colour and width
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
            pad: 5}, // setting the margin of the graph
        paper_bgcolor: "rgba(0, 0, 0, 0)", // transparent background (whole image)
        plot_bgcolor: "rgba(0, 0, 0, 0)", // transparent background (plot only)
        title: "Coffee Price",
        xaxis:{automargin: true, title:{text: "Counts", standoff: 14}}
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
            color: "rgb(112, 68, 36)",
            opacity: 0.7, // transparent
            line: {
                width: 1.5,
                color: "rgb(95, 50, 19)"} // line colour and width
        },
    }];

    var roasterBarLayout = {
        showlegend: false,
        height: 400,
        width: 650,
        margin: {
            b: 90,
            l: 50,
            r: 25,
            t: 60}, // changing margin size
        paper_bgcolor: "rgba(0, 0, 0, 0)",
        plot_bgcolor: "rgba(0, 0, 0, 0)", // transparent background
        title: "Coffee Roaster Country",
        yaxis:{automargin: true, title:{text: "Counts", standoff: 1}}
    };

    // plot bar chart
    Plotly.newPlot("roaster-country", roasterBarTrace, roasterBarLayout);

}