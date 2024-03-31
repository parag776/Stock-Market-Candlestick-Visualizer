import {candleMargin, minCandleBodyHeight, priceDecreaseCandleColor, priceIncreaseCandleColor} from "./constData.js"
import { chartArea } from "./assembleChart.js";

export function candle(chartAndAxis, candleData, scales){

    const {xScale, yScale} = scales
    const {open, high, low, close, date} = candleData;
    
    let bodyHeight = Math.max(minCandleBodyHeight, Math.abs(yScale.getValue(open)-yScale.getValue(close)));

    let wickX = xScale.getValue(date);
    let wickStartY = yScale.getValue(low);
    let wickEndY = yScale.getValue(high);

    let y = yScale.getValue(open);
    let x = wickX - (xScale.dataWidth/(2*candleMargin)); // getting start point of the candle
    let candleColor = priceDecreaseCandleColor;
    

    if(open<close){
        y = yScale.getValue(close);
        candleColor = priceIncreaseCandleColor;
    }

    chartAndAxis
        .append("rect")
        .attr("x", x)
        .attr("y", y)
        .attr("width", (xScale.dataWidth)/candleMargin)
        .attr("height", bodyHeight)
        .attr("fill", candleColor)
        .attr("shape-rendering", "crispEdges")
        // .attr("stroke", "black")
        // .attr("stroke-width", 1);

    chartAndAxis
        .append("path")
        .attr("d", `M${wickX},${wickStartY} L${wickX},${wickEndY}`)
        .attr("stroke", candleColor)
        .attr("stroke-width", 1)
        .attr("shape-rendering", "crispEdges")
}
