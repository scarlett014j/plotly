// d3.json("samples.json", function(data) {
//     console.log(data);
// });

function genCharts(selectedItem){
  Plotly.purge("bar")
  Plotly.purge("bubble")
    // Use the D3 library to read `samples.json`.
  d3.json("samples.json").then(function(bellybuttondata) {
    var selectedItemIndex = bellybuttondata.names.indexOf(selectedItem);
    d3.select("#demographicInfo").selectAll("*").remove();
    d3.select("#demographicInfo")
      .selectAll('div')
      .data(Object.entries(bellybuttondata.metadata[selectedItemIndex]))
      .enter()
      .append('div')
      .text(x => `${x[0]}: ${x[1]}`);
  
      // Generate horizontal bar chart with dropdown menu to display the top 10 OTUs found per individual.
    var trace1 = {
      y: bellybuttondata.samples[selectedItemIndex].otu_ids.slice(0, 9).reverse().map(x => `OTU ${x}`),
      x: bellybuttondata.samples[selectedItemIndex].sample_values.slice(0, 9).reverse(),
      type: "bar",
      orientation: 'h',
      text: bellybuttondata.samples[selectedItemIndex].otu_labels.slice(0, 9).reverse(),
      };

    var data = [trace1];
    Plotly.newPlot('bubble', data, {});
    });
}

d3.json("samples.json").then(function(bellybuttondata){
  var dropdown = d3.select("#selDataset");
  dropdown
    .selectAll('option')
    .data(bellybuttondata.names)
    .enter()
    .append('option')
    .text(x => x)
    .attr("value", x => x);

    genCharts(dropdown.node().value)
});