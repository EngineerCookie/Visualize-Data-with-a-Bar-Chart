import { testData, dataSet } from './dataset.js';
console.log(screen.width)
const data = dataSet.data;

let paddingL = 50, paddingR = 10, width = 950, height = 485;
const svg = d3.select('.canvas')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    ;

let div = d3.select('.canvas')
    .append('div')
    .attr('id', 'tooltip')
    .style('opacity', 0)
    ;

//##FUNCTIONS START
let dateConcat = (date, i) => {
    return `${date.getUTCFullYear()}.${date.getUTCMonth()}`
};

let dateTool = (data) => {
    let year = new Date(data[0]).getUTCFullYear();
    let quarter = Math.ceil((new Date(data[0]).getUTCMonth() + 1) / 3);
    return `${year} Q${quarter}<br>$${new Intl.NumberFormat().format(data[1])} Billion`
}

//##FUNCTIONS END

const xScale = d3.scaleLinear()
    .domain([
        d3.min(data, (d) => dateConcat(new Date(d[0]))),
        d3.max(data, (d) => dateConcat(new Date(d[0])))
    ])
    .range([paddingL, width - paddingR])
    ;

const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, (d) => d[1])])
    .range([height - paddingL, paddingR])
    ;


svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('data-date', (d) => d[0])
    .attr('data-gdp', (d) => d[1])
    .attr('height', (d) => d[1] / 100 * 2.35)
    .attr('width', 2.8)
    .attr('x', (d, i) => i * 3.24)
    .attr('y', (d) => height - (d[1] / 100 * 2.35))
    .attr('transform', `translate(${paddingL}, ${-paddingL})`)
    .on('mouseover', function (d, info) {
        div.attr('data-date', info[0]);
        div.transition()
            .duration(200)
            .style('opacity', 0.9)
        div.html(`${dateTool(info)}`)
            .style("top", `50%`)
            .style("left", `${d.pageX}px`)
            .style('transform', () => {
                if(screen.width <= 1100) {
                    return `translate(-50%, 0)`
                } else {return `translate(-100%, 0)`}
            });
    })
    .on('mouseout', function (d) {
        div.transition()
            .duration(500)
            .style('opacity', 0);
    })
    ;


const xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));
const yAxis = d3.axisLeft(yScale);

svg.append('g')
    .attr('transform', `translate(0, ${height - paddingL})`)
    .attr('id', 'x-axis')
    .call(xAxis)
    ;


svg.append('g')
    .attr('transform', `translate(${paddingL},0)`)
    .attr('id', 'y-axis')
    .call(yAxis)
    .call(g => g.append("text")
        .attr("x", -250)
        .attr("y", 30)
        .attr('transform', `rotate(-90)`)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .attr('class', 'label')
        .text('Gross Domestic Product'))
    ;

svg.selectAll('.canvas-bars')
    .append('div')
    .attr('class', 'tooltip')
    ;

/*
X  Axis Fecha:  debe  ser por año y quatrimestre


Y Axis Monto


let testTest = new Date(data[0][0])
let dateConcat = (date) => {
    return `${date.getUTCFullYear()}.${date.getUTCMonth()}`
};

console.log(dateConcat(testTest));

function runTest () {
    data.forEach((d) => {
        console.log(d[0]);
    })
}

runTest()

*/
