// D3 Examples

var appData = [
  {color: 'brown', width: 150, name: 'Mike'}, 
  {color: 'blue', width: 200, name: 'Peter'}, 
  {color: 'black', width: 250, name: 'Rob'}
];

d3.select('.varis').selectAll('div')
  .data(appData)
  .enter().append('div')
  .classed('item', true)
  .text(function(d){
    return d.name;
  })
  .style({
      'color': 'white',
      'background': function(d){
      return d.color;
      },
      width: function(d){
        return d.width + 'px';
      }
  });
