let dataArr = [
  {o: 248, c: 249, l: 246, h: 252, ts: 1541381100000},
  {o: 249, c: 247, l: 243, h: 249, ts: 1541381200000},
  {o: 247, c: 248, l: 247, h: 255, ts: 1541381300000},
  {o: 248, c: 243, l: 241, h: 249, ts: 1541381400000},
  {o: 243, c: 246, l: 242, h: 247, ts: 1541381500000},
  {o: 246, c: 246, l: 244, h: 247, ts: 1541381600000},
  {o: 245, c: 249, l: 245, h: 255, ts: 1541381700000}
]

let dataMax = dataArr.reduce((a, b) => (a.h > b.h) ? a : b)
let dataMin = dataArr.reduce((a, b) => (a.l < b.l) ? a : b)

let margin = {left: 30, top: 30, right: 0, bottom: 0}
let padding = 5
let dimensions = {chartWidth: 0, chartHeight: 200, candleWidth: 9, barHeight: 0, wickWidth: 1}

let xScale = d3.scaleLinear()
              .domain([0, dataArr.length])
              .range([0, dataArr.length * (dimensions.candleWidth + padding)])

let yScale = d3.scaleLinear()
              .domain([dataMin.l, dataMax.h])
              .range([dimensions.chartHeight, 0])

let xAxis = d3.axisBottom(xScale).ticks(3)
let yAxis = d3.axisLeft(yScale)//.ticks(3)

let svg = d3.select('.main').append('svg')

svg.append('g')
  .call(xAxis)
  .attr('transform', `translate(${margin.left}, ${dimensions.chartHeight + (padding * 2)})`)

svg.append('g')
  .call(yAxis)
  .attr('transform', `translate(${margin.left - padding}, ${padding})`)


// Open and Close
svg.append('g')
  .attr('transform', `translate(${margin.left}, ${padding})`)
  .selectAll('rect').data(dataArr).enter().append('rect')
    .attr('width', dimensions.candleWidth)    
    .attr('height', (d, i) => {
      const height = (d.c > d.o) ? yScale(d.o) - yScale(d.c) : yScale(d.c) - yScale(d.o)
      return (height !== 0) ? height : 1
    })
    .attr('x', (d, i) => i * (dimensions.candleWidth + padding))
    .attr('y', (d, i) => (d.c > d.o) ? yScale(d.c) : yScale(d.o))
    .style('fill', (d, i) => (d.c > d.o) ? 'green' : 'red')


// High and Low
svg.append('g')
  .attr('transform', `translate(${margin.left}, ${padding})`)
  .selectAll('rect').data(dataArr).enter().append('rect')
    .attr('width', dimensions.wickWidth)    
    .attr('height', (d, i) => yScale(d.l) - yScale(d.h))
    .attr('x', (d, i) => i * (dimensions.candleWidth + padding) + (Math.floor(dimensions.candleWidth / 2)))
    .attr('y', (d, i) => yScale(d.h))
    .style('fill', (d, i) => (d.c > d.o) ? 'green' : 'red')




