// D3 Examples

var stats = [3, 1, 5, 7, 2];

var graph = d3.select('.chart')
  .append('svg')
    .attr('width', 600)
    .attr('height', 400)
    .style('background', '#e3e3e3')
    .style('padding', '30px')
    .append('g')
      .selectAll('circle')
        .data(stats)
          .enter()
            .append('circle')
              .style('fill', 'red')
              .attr('r', 5)
              .attr('cx', function(d, i){
                return i * 40;
              })
              .attr('cy', function(d, i){
                return d * 10;
              })