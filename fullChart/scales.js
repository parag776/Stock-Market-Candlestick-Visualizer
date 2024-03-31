import {candleMargin, initialCandleWidth, initialYAxisMargin, initialXAxisMargin, minCandleWidth} from "./constData.js"
import { scaleBand, scaleLinear } from "./utilityClasses.js"
import { data } from "./assembleChart.js"

export let scales = {};

export let initialMaxPrice;

export function makeScales(width, height){
    
    const candleWidthWithMargin = initialCandleWidth*candleMargin;
    const initialCandleCount = (width-initialYAxisMargin)/candleWidthWithMargin;

    let initialMaxPrice = data[0]["high"];
    let minPrice = data[0]["low"];

    for(let i=1;i<Math.min(data.length, initialCandleCount);i++){
        initialMaxPrice = Math.max(data[i]["high"], initialMaxPrice);
        minPrice = Math.min(data[i]["low"], minPrice);
    }

    // creating Y Scale

    let yScale = new scaleLinear(minPrice, initialMaxPrice, height*(1-initialXAxisMargin), height*initialXAxisMargin);

    // creating X Scale

    let xScale = new scaleBand(width-initialYAxisMargin, candleWidthWithMargin);

    scales = {xScale, yScale};

}

export function updateScales(movementX, movementY){
    let {xScale, yScale} = scales;

    // updating Y scale

    yScale.rangeStart += movementY;
    yScale.rangeEnd += movementY;

    // updating X scale

    let curRangeStart = xScale.rangeStart + movementX;
    let curDataWidth = xScale.dataWidth;

    xScale.updateScale(curRangeStart, curDataWidth);
}

export function transformXScale(movementX){

    let {xScale} = scales;

    let curRangeStart = xScale.rangeStart;
    let curDataWidth = Math.max(minCandleWidth, xScale.dataWidth * (curRangeStart-movementX)/curRangeStart);

    xScale.updateScale(curRangeStart, curDataWidth);

}


export function transformYScale(movementY){

    let {yScale} = scales;

    let domainDiff = yScale.domainEnd - yScale.domainStart;

    let curDomainStart = yScale.domainStart - domainDiff*movementY/650;
    let curDomainEnd = yScale.domainEnd + domainDiff*movementY/650;
    

    if(curDomainEnd>curDomainStart){
        yScale.domainStart = curDomainStart;
        yScale.domainEnd = curDomainEnd;
    }
}