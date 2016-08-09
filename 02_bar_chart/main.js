// D3 Examples

var bardata = [20, 30, 15, 35, 25, 72, 48, 10, 20, 30, 15, 35, 25, 72, 48, 10];

var height = 400,
    width = 600,
    barWidth = 50,
    barOffset = 5;

var yScale = d3.scale.linear()
              .domain([0, d3.max(bardata)])
              .range([0, height]);

var xScale = d3.scale.ordinal()
              .domain(d3.range(0, bardata.length))
              .rangeBands([0, width], .3);


d3.select('.chart').append('svg')
    .attr('width', width)
    .attr('height', height)
    .style('background', 'grey') 
      .selectAll('rect')
        .data(bardata)
        .enter().append('rect')
          .style('fill', 'darkred')
          .attr('width', xScale.rangeBand())
          .attr('height', function(d){
            return yScale(d);
          })
          .attr('x', function(d, i){
            return xScale(i);
          })
          .attr('y', function(d){
            return height - yScale(d);
          })




