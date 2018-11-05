let svg = d3.select('.main').append('svg')

let dataArr = [8,2,1,5,30,9,3,2,15,6,3,7,9,2,1,25,22,15,6,3,7,9,]
let [dataMin, dataMax] = d3.extent(dataArr)

let margin = {top: 40, right: 0, bottom: 0, left: 30}
let padding = 5
let dimensions = {chartWidth: 0, chartHeight: (dataMax * 10), barWidth: 20, barHeight: 10}

let xScale = d3.scaleLinear()
              .domain([0, dataArr.length])
              .range([0, dataArr.length * (dimensions.barWidth + padding)])

let yScale = d3.scaleLinear()
              .domain([0, Math.max(...dataArr)])
              .range([dimensions.chartHeight, 0])

let xAxis = d3.axisBottom(xScale).ticks(3)
let yAxis = d3.axisLeft(yScale).ticks(3)

svg.append('g')
  .call(xAxis)
  .attr("transform", `translate(${margin.left}, ${margin.top + dimensions.chartHeight + padding})`)

svg.append('g')
  .call(yAxis)
  .attr("transform", `translate(${margin.left - 5}, ${margin.top})`)

svg.append('g')
  .attr("transform", `translate(${margin.left}, ${margin.top})`)
  .selectAll('rect').data(dataArr).enter().append('rect')
    .attr('width', dimensions.barWidth)
    .attr('height', (d, i) => d * dimensions.barHeight)
    .attr('x', (d, i) => i * (dimensions.barWidth + padding))
    .attr('y', (d, i) => dimensions.chartHeight - (d * dimensions.barHeight))
    .style('fill', 'steelblue')


