import {fullChart} from "./fullChart/assembleChart.js"

// make div for chart
const chartContainer = d3.select("body")
    .append("div")
    .attr("width", 900)
    .attr("height", 600)

fullChart(chartContainer, "Google");