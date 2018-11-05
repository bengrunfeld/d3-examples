let svg = d3.select('.main').append('svg')

let dataArr = [
  {o: 248, c: 249, l: 246, h: 252, ts: 1541381671395},
  {o: 249, c: 247, l: 243, h: 249, ts: 1541381680707},
  {o: 247, c: 248, l: 247, h: 255, ts: 1541381692099},
  {o: 248, c: 243, l: 241, h: 249, ts: 1541381706819},
  {o: 243, c: 246, l: 242, h: 247, ts: 1541381731521},
  {o: 246, c: 246, l: 244, h: 247, ts: 1541381749649},
  {o: 245, c: 249, l: 245, h: 255, ts: 1541381769505}
]

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


