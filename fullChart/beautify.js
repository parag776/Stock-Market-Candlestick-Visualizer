import { data, chartAreaRect, chartArea, chartAreaExtention} from "./assembleChart.js";
import { scales } from "./scales.js";
import { axisValues } from "./axis.js";
import { topLeftRectColor, gridLinesColor, gridLinesOpacity, hoveredCandleColor, roundDigits, hoveredCandleRectInfo, xAxisHeight, yAxisWidth, numberMiddleFixConst, topLeftInfoHeight, priceDecreaseCandleColor, priceIncreaseCandleColor, topLeftRectOpacity } from "./constData.js"
import { round, dateToString } from "./utilityFunctions.js";
import { nameArea } from "./chart.js";

function addGridLines(){

    const {xAxisValues, yAxisValues} = axisValues;

    chartArea.selectAll("path.xgridlines").remove();

    for(let i=0;i<xAxisValues.length;i++){

        chartArea.append("path")
            .attr("class", "xgridlines")
            .attr("d", `M${xAxisValues[i]},${chartArea.attr("height")} L${xAxisValues[i]},0`)
            .attr("stroke-width", 0.5)
            .attr("stroke", gridLinesColor)
            .attr("stroke-opacity", gridLinesOpacity)
            .attr("shape-rendering", "crispEdges")
    }

    chartArea.selectAll("path.ygridlines").remove();

    for(let i=0;i<yAxisValues.length;i++){

        chartArea.append("path")
            .attr("class", "ygridlines")
            .attr("d", `M${chartArea.attr("width")},${yAxisValues[i]} L0,${yAxisValues[i]}`)
            .attr("stroke-width", 0.5)
            .attr("stroke", gridLinesColor)
            .attr("stroke-opacity", gridLinesOpacity)
            .attr("shape-rendering", "crispEdges")
    }
}

export function candleInfo(event){              // this has to be invoked via mouse activity

    let x = event.offsetX;
    let y = event.offsetY;
    let curDate = scales.xScale.getNearestValue(x);
    let curPrice = round(scales.yScale.getValueReverse(y), roundDigits);

    

    // making x line and rectangle

    if(curDate){
        let xValue = scales.xScale.getValue(curDate);

        let dateIndex = scales.xScale.getDataIndex(curDate);

        chartAreaExtention.selectAll("#candleInfoArea").remove();
        chartAreaExtention.selectAll("#candleInfoText").remove();

        // creating left top candle info
        let candleInfoArea = chartAreaExtention.append("rect")
            .attr("id", "candleInfoArea")
            .attr("x", +nameArea.attr("x") + +nameArea.attr("width"))
            .attr("y", nameArea.attr("y"))
            .attr("width", 0)                              // temp width is changed below
            .attr("height", topLeftInfoHeight)
            .attr("rx", "2%")
            .attr("ry", "2%")
            .attr("fill", topLeftRectColor)
            .attr("fill-opacity", topLeftRectOpacity)

        

        let candleInfoText = 
        chartAreaExtention.append("text")
            .attr("id", "candleInfoText")
            .attr("x", +candleInfoArea.attr("x") + 5)
            .attr("y", 2 + topLeftInfoHeight/2 + numberMiddleFixConst)
            .attr("dominant-baseline", "middle")
            .attr("fill", (data[dateIndex]["open"]<=data[dateIndex]["close"])?(priceIncreaseCandleColor):priceDecreaseCandleColor)

        let ohlcTextArr = ["O", data[dateIndex]["open"].toString(), " ", "H",
                          data[dateIndex]["high"].toString(), " ", "L",
                          data[dateIndex]["low"].toString(), " ", "C",
                          data[dateIndex]["close"].toString(), " "]

        if(dateIndex<data.length-1){

            let diff = data[dateIndex]["close"] - data[dateIndex+1]["close"];
            let percentChange = round(diff*100/data[dateIndex+1]["close"], 2)
            diff = round(diff, 2)

            

            if(percentChange>0){
                ohlcTextArr.push('+', diff.toString(), ' ', '(', '+', percentChange.toString(), '%', ')')
            } else {
                ohlcTextArr.push(diff.toString(), ' ', '(', percentChange.toString(), '%', ')')
            }
        }

        for(let i = 0; i<ohlcTextArr.length;i++){
            let curT = candleInfoText.append("tspan")

            let helper = ['O', 'H', 'L', 'C'];

            if(helper.includes(ohlcTextArr[i])){
                curT
                    .attr("fill", "black")
                    .text(ohlcTextArr[i])
                    continue;
            } 
            
            helper = [' ', '(', ')', '+', '-', '%'];

            if(helper.includes(ohlcTextArr[i])){
                curT.text(ohlcTextArr[i])
                    continue;
            }
            
            curT.text((+ohlcTextArr[i]).toFixed(roundDigits))
        }

        let textLen = document.getElementById('candleInfoText').getComputedTextLength();

        candleInfoArea.attr("width", textLen + 10);

        chartArea.selectAll("g.hoveredCandleX").remove();
        chartAreaExtention.selectAll("g.hoveredCandleX").remove();

        let xGroup = chartArea.append("g")
            .attr("class", "hoveredCandleX")
        
        xGroup
            .append("path")
            .attr("d", `M${xValue},${chartArea.attr("height")} L${xValue},0`)
            .attr("stroke-width", 1)
            .attr("stroke", hoveredCandleColor)
            .attr("stroke-dasharray", 5)
            .attr("shape-rendering", "crispEdges")

            let xRectWidth = hoveredCandleRectInfo.xWidth;
            let xRectHeight = xAxisHeight * hoveredCandleRectInfo.xHeightRatio;
        
        let xGroupEx = chartAreaExtention.append("g")
            .attr("class", "hoveredCandleX")
        
        xGroupEx
            .append("rect")
            .attr("width", xRectWidth)
            .attr("height", xRectHeight)
            .attr("x", xValue - xRectWidth/2)
            .attr("y", chartArea.attr("height"))
            .attr("fill", "black")
            .attr("shape-rendering", "crispEdges")
        
        xGroupEx
            .append("text")
            .attr("x", xValue)
            .attr("y", +chartArea.attr("height") + xAxisHeight/2)
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "middle")
            .attr("fill", "white")
            .text(dateToString(curDate))

    } else {
        candleInfoRemove();
    }

    // making y line and rectangle

    let yValue = scales.yScale.getValue(curPrice);

    chartArea.selectAll("g.hoveredCandleY").remove();
    chartAreaExtention.selectAll("g.hoveredCandleY").remove();

    let yGroup = chartArea.append("g")
            .attr("class", "hoveredCandleY")
        
    yGroup
        .append("path")
        .attr("d", `M${chartArea.attr("width")},${yValue} L0,${yValue}`)
        .attr("stroke-width", 1)
        .attr("stroke", hoveredCandleColor)
        .attr("stroke-dasharray", 5)
        .attr("shape-rendering", "crispEdges")

        let yRectWidth = yAxisWidth * hoveredCandleRectInfo.yWidthRatio;
        let yRectHeight = hoveredCandleRectInfo.yHeight;

        let yGroupEx = chartAreaExtention.append("g")
            .attr("class", "hoveredCandleY")
        
        yGroupEx
            .append("rect")
            .attr("width", yRectWidth)
            .attr("height", yRectHeight)
            .attr("x", chartArea.attr("width"))
            .attr("y", yValue - yRectHeight/2)
            .attr("fill", "black")
            .attr("shape-rendering", "crispEdges")
        
        yGroupEx
            .append("text")
            .attr("x", +chartArea.attr("width") + 10)
            .attr("y", yValue + numberMiddleFixConst)
            .attr("dominant-baseline", "middle")
            .attr("fill", "white")
            .text(curPrice.toFixed(roundDigits))


}

export function candleInfoRemove(){

    chartArea.selectAll("g.hoveredCandleX").remove();
    chartAreaExtention.selectAll("g.hoveredCandleX").remove();
    chartArea.selectAll("g.hoveredCandleY").remove();
    chartAreaExtention.selectAll("g.hoveredCandleY").remove();
    chartAreaExtention.selectAll("#candleInfoArea").remove();
    chartAreaExtention.selectAll("#candleInfoText").remove();

}

export function beautify(){

    // chartAreaColor
    chartAreaRect.
        attr("fill", "white");
    
    
    addGridLines();
    
}