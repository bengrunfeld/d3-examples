// D3 Examples

// Define Data
var stats = [
  {'xVal': 0, 'yVal': 20},
  {'xVal': 30, 'yVal': 85},
  {'xVal': 60, 'yVal': 35},
  {'xVal': 90, 'yVal': 10},
  {'xVal': 120, 'yVal': 45},
  {'xVal': 150, 'yVal': 60},
  {'xVal': 180, 'yVal': 10},
];

var height = 300;

var graph = d3.select('.chart');

// Create the main svg container
var svg = graph.append('svg')
    .attr('width', 600)
    .attr('height', height)
    .style('background', '#e3e3e3')
    .style('padding', '30px');

// Set up the tooltip
var tooltip = graph.append('div')
  .style('position', 'absolute')
  .style('padding', '0 10px')
  .style('background', '#3e3e3e')
  .style('color', 'white')
  .style('opacity', 0)
  .style('min-width', '80px')
  .style('min-height', '50px')
  .style('border-radius', '5px')
  .style('padding', '10px')
  .style('line-height', '25px')

// Create circles to represent points
var circle = svg.append('g')
  .classed('circles', true)
  .selectAll('circle')
  .data(stats)
    .enter()
      .append('circle')
        .style('fill', 'red')
        .attr('r', 5)
        .attr('cx', function(d, i){
          return d['xVal'];
        })
        .attr('cy', function(d, i){
          return height - d['yVal'];
        })
  .on('mouseover', function(d){
    tooltip.style('opacity', 0.9);
    tooltip.style('left', (d3.event.pageX + 15) + 'px');
    tooltip.style('top', (d3.event.pageY - 60) + 'px');
    tooltip.html(
      '<div>X Val: ' + d['xVal'] + '</div><div>Y Val: ' + d['yVal'] + '</div>'
    )
  })

// Create lines between the points
var lines = svg.append('g')
    .classed('lines', true)
    .selectAll('line')
    .data(stats)
      .enter()
        .append('line')
          .style('stroke', 'black')
          .style('stroke-width', 1)
          .attr('x1', function(d, i){
            return d['xVal'];
          })
          .attr('y1', function(d, i){
            return height - d['yVal'];
          })
          .attr('x2', function(d, i){
            if (i < stats.length - 1){ 
              return stats[i+1]['xVal'];
            } else {
              return stats[i]['xVal'];
            }
          })
          .attr('y2', function(d, i){
            if (i < stats.length - 1){ 
              return height - stats[i+1]['yVal'];
            } else {
              return height - stats[i]['yVal'];
            }
          });