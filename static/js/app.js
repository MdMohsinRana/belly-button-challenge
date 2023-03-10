const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
function Read(sample) {
    d3.json(url).then((data) => {
        var metadata = data.metadata;
        var resultsarray = metadata.filter(sampleobject =>
            sampleobject.id == sample);
        var result = resultsarray[0]
        var panel = d3.select("#sample-metadata");
        panel.html("");
        Object.entries(result).forEach(([key,value]) => {
            panel.append("h6").text(`${key}: ${value}`);
        });
    });
}


//creating charts
function Charts(sample) {
d3.json(url).then((data) => {
    var samples = data.samples;
    var resultsarray = samples.filter(sampleobject =>
        sampleobject.id == sample);
    var result = resultsarray[0]
    var ids = result.otu_ids;
    var labels = result.otu_labels;
    var values = result.sample_values;
  
//bar chart
    var BarChartData = [
    {
        y:ids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse(),
        x:values.slice(0,10).reverse(),
        text:labels.slice(0,10).reverse(),
        type:"bar",
        orientation: "h"
    }];
    var BarChartLayout = {
        title: "Top 10 OTUs",
        margin: { t:30, l: 150}
    };
    Plotly.newPlot("bar", BarChartData, BarChartLayout);
  
//bubble chart
    var BubbleChartData = [
    {
        x: ids,
        y: values,
        text: labels,
        mode: "markers",
        marker: {
            color: ids,
            size: values,
            }
    }
    ];
    var BubbleChartLayout = {
        margin: { t:0 },
        xaxis: { title: "OTU_ID"},
        hovermode: 'closest',
    };
    Plotly.newPlot("bubble", BubbleChartData, BubbleChartLayout);
  
})};

function init() {
var selector = d3.select("#selDataset");

//creating a dropdown list
d3.json(url).then((data) => {
    var SampleNames = data.names;
    SampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
    });
  
//trying a sample
    const TrySample = SampleNames[0];
    Read(TrySample);
    Charts(TrySample);
  });
}

//new sample
function All(newSample) {
    Read(newSample);
    Charts(newSample);
}

//dashboard
init();