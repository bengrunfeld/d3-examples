// D3 Examples

var data = [3, 6, 2, 7, 5, 2, 0, 3, 8, 9, 2, 5, 9];

var width = 800; 
var height = 400; 

var xScale = d3.scale.linear()
  .domain([0, data.length])
  .range([0, width]);

var yScale = d3.scale.linear()
  .domain([0, 10])
  .range([height, 0]);

var line = d3.svg.line()
  .x(function(d,i) { 
    return xScale(i); 
  })
  .y(function(d) { 
    return yScale(d); 
  })

var graph = d3.select(".graph");

var tip = graph.append("div")
  .style("width", "10px")
  .style("height", "20px")
  .style("background", "#3e3e3e")
  .style("border-radius", "5px")
  .style("padding", "15px")
  .style("position", "absolute")
  .style("opacity", 0)
  .style("color", "white")
  .classed("tooltip", true)


var container = graph.append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("padding", "10px")
      .classed("container", true);

var chart = graph.select(".container")
  .append("g")
  .append("path")
    .attr("d", line(data));

var circles = graph.select(".container")
  .append('g')
    .selectAll('circle')
      .data(data)
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

var hoverAreas = graph.select(".container")
  .append("g")
  .classed("hoverAreasContainer", true)
  .selectAll(".hoverAreas")
    .data(data)
      .enter()
        .append("rect")
          .classed("hoverArea", true)
          .attr("width", function(d, i){
            if (i == 0 || i == data.length - 1) {
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
          .style("fill-opacity", 0.3)
          .on("mouseover", function(d, i){
            tip.text(d)
              .style("opacity", 1)
              .style("left", xScale(i))
              .style("top", yScale(d) - 50);
          })
          .on("mouseout", function(d, i){
            tip.style("opacity", 0);
          })






