import {fixData} from "./utilityFunctions.js"
import { makeChart} from "./chart.js";
import { addMouseActivity } from "./mouseActivity.js";
import {headerFooterHeight, sideBarWidth, yAxisWidth, xAxisHeight} from "./constData.js"
import { fixYAxisWidth } from "./jugadFunctions.js";

export let chartAndAxis;
export let chartAreaRect;
export let chartArea;
export let chartAreaExtention;
export let axis;
export let data;
export let chartName;

function createChartAndAxis(chartContainer){

    chartAndAxis = chartContainer
        .append("svg")
        .attr("transform", `translate(${sideBarWidth}, ${headerFooterHeight})`)
        .attr("width", chartContainer.attr("width") - sideBarWidth)
        .attr("height", chartContainer.attr("height") - headerFooterHeight)

    chartArea = chartAndAxis
        .append("g")
        .attr("class", "chartArea")
        .attr("width", chartAndAxis.attr("width") - yAxisWidth)
        .attr("height", chartAndAxis.attr("height") - xAxisHeight);
        
    chartAreaRect = chartArea
        .append("rect")
        .attr("width", chartAndAxis.attr("width") - yAxisWidth)
        .attr("height", chartAndAxis.attr("height") - xAxisHeight)

    let xAxis = chartAndAxis.append("g")
        .attr("class", "xAxis")
        .attr("transform", `translate(0, ${chartArea.attr("height")})`)
        .attr("width", chartArea.attr("width"))
        .attr("height", xAxisHeight)


    let yAxis = chartAndAxis.append("g")
        .attr("class", "yAxis")
        .attr("transform", `translate(${chartArea.attr("width")}, 0)`)
        .attr("width", yAxisWidth)
        .attr("height", chartArea.attr("height"))

    axis = {xAxis, yAxis};

    chartAreaExtention = chartAndAxis
        .append("g")
        .attr("class", "chartAreaExtention")
        .attr("width", chartAndAxis.attr("width") - yAxisWidth)
        .attr("height", chartAndAxis.attr("height") - xAxisHeight)

}


export async function fullChart(chartContainer, cn){

    chartName = cn;

    // chart and axis code
    data = await d3.csv("/testingdata/Download Data - STOCK_US_XNYS_CSV (1).csv")
    fixData(data)

    fixYAxisWidth();
    
    createChartAndAxis(chartContainer);
    
    makeChart();

    // updating chart as per mouse activity.
    addMouseActivity();

    // around the chart code

}