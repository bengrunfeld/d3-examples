let svg = d3.select('.main').append('svg')

let dataArr = [{x:5, y:5},{x:10, y:7},{x:15, y:9}, {x:20, y:11}]

let line = d3.line()
                .x(d => d.x * 20)
                .y(d => d.y * 5)

svg.append('path').attr('d', line(dataArr))