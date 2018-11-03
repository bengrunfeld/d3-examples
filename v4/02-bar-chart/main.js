let svg = d3.select('.main').append('svg')

let dataArr = [8,2,1,5,7,9,3,2,1,6,3,7,9,2,1,8]

let xScale = d3.scaleLinear()
              .domain([0, dataArr.length])
              .range([0, dataArr.length * 25])

let yScale = d3.scaleLinear()
              .domain([0, Math.max(...dataArr)])
              .range([120, 30])

let xAxis = d3.axisBottom(xScale)
let yAxis = d3.axisLeft(yScale)

svg.append('g')
  .attr("transform", `translate(20, 40)`)
  .selectAll('rect').data(dataArr).enter().append('rect')
    .attr('width', '20')
    .attr('height', (d, i) => d * 10)
    .attr('x', (d, i) => i * 25)
    .attr('y', (d, i) => 100 - (d * 10))
    .style('fill', 'steelblue')

svg.append('g')
  .call(xAxis)
  .attr("transform", `translate(20, 140)`)

svg.append('g')
  .call(yAxis)
  .attr("transform", `translate(20, 20)`)


