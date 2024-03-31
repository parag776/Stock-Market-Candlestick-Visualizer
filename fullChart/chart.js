import { scales, makeScales, updateScales, transformXScale, transformYScale } from "./scales.js";
import {candle} from "./candle.js"
import { data, chartArea, chartAreaExtention, chartName} from "./assembleChart.js";
import { makeAxis } from "./axis.js";
import { beautify } from "./beautify.js"
import { topLeftInfoHeight, topLeftRectColor, numberMiddleFixConst, topLeftRectOpacity } from "./constData.js";

function refreshCandles(){
    // removing all previous candles.
    chartArea.selectAll("g.candle").remove();

    let dateStart = scales.xScale.dateStart;
    let dateEnd = scales.xScale.dateEnd;

    // adding new candles
    for(let i=dateStart;i<=dateEnd;i++){
        const group = chartArea.append("g").attr("class", "candle");
        candle(group, data[i], scales);
    }
}

export let nameArea;

function makeNameRect(){
    nameArea = 
    chartAreaExtention.append("rect")
        .attr("id", "chartNameRect")
        .attr("x", 2)
        .attr("y", 2)
        .attr("height", topLeftInfoHeight)
        .attr("width", 0) // temp width which is changed below
        .attr("rx", "2%")
        .attr("ry", "2%")
        .attr("fill", topLeftRectColor)
        .attr("fill-opacity", topLeftRectOpacity)
    
    chartAreaExtention.append("text")
        .attr("id", "chartNameText")
        .attr("x", 2 + 5) // left width
        .attr("y", 2 + topLeftInfoHeight/2 + numberMiddleFixConst)
        .attr("dominant-baseline", "middle")
        .text(chartName)

    let textLen = document.getElementById('chartNameText').getComputedTextLength();
    
    nameArea.attr("width", textLen + 10);
}



export function makeChart(){

    makeNameRect()
    makeScales(chartArea.attr("width"), chartArea.attr("height"));
    makeAxis();
    beautify();

    let dateStart = scales.xScale.dateStart;
    let dateEnd = scales.xScale.dateEnd;

    // adding new candles
    for(let i=dateStart;i<=dateEnd;i++){
        
        const group = chartArea.append("g").attr("class", "candle");
        candle(group, data[i], scales);
    }
    
}

export function updateChartDrag(movement){
    let {movementX, movementY} = movement;
    updateScales(movementX, movementY);
    makeAxis();
    beautify();

    refreshCandles();
    
}

export function xTransform(movementX){

    if(movementX<0 && scales.xScale.dataWidth>chartArea.attr("width")) return;

    transformXScale(movementX);
    makeAxis();
    beautify();

    refreshCandles();

}

export function yTransform(movementY){

    transformYScale(movementY);
    makeAxis();
    beautify();

    refreshCandles();
    
}

export function newCandleShift(){
    
    updateScales(scales.xScale.dataWidth, 0);
}


// export function updateChartY(data, chartAndAxis, scaleY, something)