// D3 Examples

var data1 = [3, 6, 2, 7, 5, 2, 0, 3, 8, 9, 2, 5, 9];
var data2 = [10, 91, 50, 35, 22, 78, 65, 40, 80, 95, 23, 15, 40];

var width = 800; 
var height = 400; 

function xScale(dataSource){
  return d3.scale.linear()
    .domain([0, dataSource.length])
    .range([0, width]);
}

function yScale(dataSource){
  return d3.scale.linear()
  .domain([0, d3.max(dataSource)])
  .range([height, 0]);
}

// Select target div from HTML page
var graph = d3.select(".graph");

// Set up Tooltip
var tip = graph.append("div")
  .classed("tooltip", true)

// Add the main SVG container element
var container = graph.append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("padding", "10px")
      .classed("container", true);

// Add a path representing the signal
function drawPath(dataSource) {
  graph.select(".container")
    .append("g")
    .append("path")
    .attr("d", line(dataSource))
}

// Add circles representing the individual points on the signal
function drawCircles(dataSource) {
  graph.select(".container")
    .append('g')
    .selectAll('circle')
      .data(dataSource)
        .enter()
          .append('circle')
            .style('fill', 'steelblue')
            .attr('r', 5)
            .attr('cx', function(d, i){
              return xScale(i);
            })
            .attr('cy', function(d, i){
              return yScale(d);
            });
}

// Create hoverable areas which will cause the tooltip to display
function createHoverAreas(dataSource) {
  graph.select(".container")
    .append("g")
    .classed("hoverAreasContainer", true)
    .selectAll(".hoverAreas")
      .data(dataSource)
        .enter()
          .append("rect")
            .classed("hoverArea", true)
            .attr("width", function(d, i){
              if (i == 0 || i == dataSource.length - 1) {
                return xScale(0.5);
              } 
              return xScale(1);
            })
            // Turn this on if you want to see the subdivisions
            // .style("stroke", "black")
            .attr("height", 400 + "px")
            .attr("x", function(d, i) { 
              if (i !== 0) {
                return xScale(i) - xScale(0.5);
              }
              
            })
            .attr("y", 0)
            .style("fill-opacity", 0)
            .on("mouseover", function(d, i){
              tip.text(d)
                .style("opacity", 1)
                .style("left", xScale(i))
                .style("top", yScale(d) - 50);
            })
            .on("mouseout", function(d, i){
              tip.style("opacity", 0);
            })
}

var line = d3.svg.line()
  .x(function(d,i) { 
    return xScale(i); 
  })
  .y(function(d) { 
    return yScale(d); 
  })

drawPath(data1);
drawCircles(data1);
createHoverAreas(data1);



