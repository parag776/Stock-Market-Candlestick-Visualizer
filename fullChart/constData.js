const candleMargin = 1.3;
const initialCandleWidth = 20;
const xAxisHeight = 28;
let yAxisWidth = 50;
const initialYAxisMargin = 70;
const initialXAxisMargin = 0.1; // in percentage
const heightPerTick = 40;
const roundDigits = 2;
const maxTickCountX = 10;
const minCandleWidth = 2;
const minCandleBodyHeight = 1;
const headerFooterHeight = 50;
const sideBarWidth = 50;
const gridLinesColor = "#8e9fbd";
const gridLinesOpacity = 0.5;
const hoveredCandleColor = "black";
const priceDecreaseCandleColor = "red";
const priceIncreaseCandleColor = "green";
const topLeftInfoHeight = 25;
const topLeftRectColor = "white";
const topLeftRectOpacity = 0.6;

function changeYAxisWidth(newWidth){
    yAxisWidth = newWidth;
}

// misc constants
const numberMiddleFixConst = 1.5;

const hoveredCandleRectInfo = {

    xWidth: 100,
    yHeight: 21,

    xHeightRatio: 0.85,
    yWidthRatio: 0.95

}

export {

    // candleData
    candleMargin, // ratio (candleMargin/candleWidth)
    initialCandleWidth,
    minCandleWidth,
    minCandleBodyHeight,
    priceDecreaseCandleColor, 
    priceIncreaseCandleColor,

    // AxisData
    xAxisHeight,
    yAxisWidth,
    changeYAxisWidth,
    initialYAxisMargin, 
    initialXAxisMargin, 
    heightPerTick,
    maxTickCountX,
    roundDigits,

    //chart Data
    gridLinesColor,
    gridLinesOpacity,
    hoveredCandleColor,
    hoveredCandleRectInfo,
    topLeftInfoHeight,
    topLeftRectColor,
    topLeftRectOpacity, 

    // area outside chart data
    headerFooterHeight,
    sideBarWidth,

    //misc data
    numberMiddleFixConst

}