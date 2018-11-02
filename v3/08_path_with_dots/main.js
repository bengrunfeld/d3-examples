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

graph.append("svg")
      .attr("width", width)
      .attr("height", height)
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
