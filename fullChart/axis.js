import { chartArea, axis, chartAreaRect, chartAndAxis, chartAreaExtention } from "./assembleChart.js"
import { scales } from "./scales.js"
import { heightPerTick, maxTickCountX, yAxisWidth, xAxisHeight, roundDigits, changeYAxisWidth} from "./constData.js"
import { round } from "./utilityFunctions.js"

function updateChartAreaAfterAxis(){

    chartArea.attr("width", chartAndAxis.attr("width") - yAxisWidth)
        
    chartAreaRect.attr("width", chartAndAxis.attr("width") - yAxisWidth)

    let xAxis = axis.xAxis;
    let yAxis = axis.yAxis;
    
    xAxis.attr("width", chartArea.attr("width"))

    yAxis
        .attr("transform", `translate(${chartArea.attr("width")}, 0)`)
        .attr("width", yAxisWidth)

    chartAreaExtention
        .attr("width", chartAndAxis.attr("width") - yAxisWidth);
}


function fillYAxisArr(yAxisArr, lowerPrice, upperPrice, multiplier, localMutliplier){
    const start = Math.ceil(lowerPrice/(multiplier*localMutliplier))*(multiplier*localMutliplier);
    for(let i=0;start+multiplier*i*localMutliplier<=upperPrice;i++){
        yAxisArr.push(round(start + multiplier*i*localMutliplier, roundDigits));
    }
}

const dateTypesHelperArr = ["year", "month", "day", "minutes"]; // will add seconds later if required

function pushDateInArray(xAxisArr, fullXArr, i, dateTypeIndex){

    if(dateTypeIndex==0){
        xAxisArr[i].push(fullXArr[i].getFullYear());
    } else if(dateTypeIndex==1){
        xAxisArr[i].push(fullXArr[i].getMonth());
    } else if(dateTypeIndex==2){
        xAxisArr[i].push(fullXArr[i].getDate());
    } else {
        xAxisArr[i].push(fullXArr[i].getHours() + ":" + fullXArr[i].getMinutes());
    }

}

function countDateFreqHelper(fullXArr, dateTypeIndex){

    let curCountArr = [];

    for(let i=0;i<fullXArr.length-1;i++){
        if(dateTypeIndex==0){

            if(fullXArr[i].getFullYear()!=fullXArr[i+1].getFullYear()) {
                curCountArr.push(i);
            }

        } else if(dateTypeIndex==1){

            if(fullXArr[i].getMonth()!=fullXArr[i+1].getMonth()) {
                curCountArr.push(i);
            }

        } else if(dateTypeIndex==2){

            if(fullXArr[i].getDate()!=fullXArr[i+1].getDate()) {
                curCountArr.push(i);
            }

        } else {
            console.log("something wrong with your current code please check it")
        }
    }

    return curCountArr;

}

// function fillXAxisArr(l, r, maxTickCount, fullXArr, xAxisArr, dateTypeIndex){

//     if(r<l) return;
//     if(curTicksCount==4) {
//         console.log("something wrong with your current code please check it")
//         return;
//     }

//     let curCountArr = countDateFreqHelper(fullXArr, dateTypeIndex);

//     if(curCountArr.length<=maxTickCount){

//         let runningL = l;

//         for(let i=0;i<curCountArr.size();i++){

//             fillXAxisArr(runningL, curCountArr[i]-1, Math.round(maxTickCount*(curCountArr[i]-runningL)/(r-l+1)),fullXArr, xAxisArr, dateTypeIndex+1);
//             pushDateInArray(xAxisArr, fullXArr, curCountArr[i], dateTypeIndex);
//         }
//     } else {
        
//         if(dateTypeIndex==3){

//         } else {

            

//         }

//     }

//     // its a temporary answer.
//     // will fill full answer later


//     // let ans = []

//     // let gap = Math.ceil(fullXArr.length/10);
//     // for(let i=0;i<fullXArr.length;i+=gap){
//     //     ans.push(fullXArr[i]);
//     // }

//     // return ans;

// }

function fillXAxisArr(fullXArr){
    let ans = []

    let gap = Math.ceil(fullXArr.length/10);
    for(let i=0;i<fullXArr.length;i+=gap){
        ans.push(fullXArr[i]);
    }

    return ans;
}



export let axisArr = {};
export let axisValues = {};
export function makeAxis(){

    const height = chartArea.attr("height");

    const {xAxis, yAxis} = axis;

    const {xScale, yScale} = scales;

    // making y axis

    const upperPrice = yScale.getValueReverse(0);
    const lowerPrice = yScale.getValueReverse(height);

    const maxTickCountY = Math.floor(height/heightPerTick);

    let temp = (upperPrice-lowerPrice)/(maxTickCountY);

    let multiplier = 1;
    if(temp>1){
        while(temp>10){
            multiplier*=10;
            temp/=10;
        }
    } else {
        while(temp<1){
            multiplier/=10;
            temp*=10;
        }
    }

    let yAxisArr = [];

    if(temp==1){

        const localMutliplier = 1;
        fillYAxisArr(yAxisArr, lowerPrice, upperPrice, multiplier, localMutliplier)

    } else if(temp<=2){

        const localMutliplier = 2;
        fillYAxisArr(yAxisArr, lowerPrice, upperPrice, multiplier, localMutliplier)
    } else if(temp<=2.5){
        
        const localMutliplier = 2.5;
        fillYAxisArr(yAxisArr, lowerPrice, upperPrice, multiplier, localMutliplier)

    } else if(temp<=4){

        const localMutliplier = 4;
        fillYAxisArr(yAxisArr, lowerPrice, upperPrice, multiplier, localMutliplier)

    } else if(temp<=5){

        const localMutliplier = 5;
        fillYAxisArr(yAxisArr, lowerPrice, upperPrice, multiplier, localMutliplier)

    } else {
        const localMutliplier = 10;
        fillYAxisArr(yAxisArr, lowerPrice, upperPrice, multiplier, localMutliplier)

    }

    let yAxisValues = yAxisArr.map(d => yScale.getValue(d));
    
    // this is just to get the size of the text

    let curYAxisWidth = 0;

    for(let i=0;i<yAxisArr.length;i++){

        let tempText = yAxis.append("text")
        .attr("id", "tempForLength")
        .attr("x", yAxisWidth/2)
        .attr("y", yScale.getValue(yAxisArr[i]))
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .text(Math.abs(yAxisArr[i]).toFixed(roundDigits))

        let textLen = document.getElementById('tempForLength').getComputedTextLength();

        curYAxisWidth = Math.max(curYAxisWidth, textLen);

        tempText.remove();
    }

    curYAxisWidth+=20;
    changeYAxisWidth(curYAxisWidth);

    updateChartAreaAfterAxis();

    

    // till here change of change of width of y-axis.

    yAxis.selectAll("rect")
        .data([null])
        .join("rect")
        .attr("width", yAxisWidth)
        .attr("height", height)
        .attr("fill", "antiquewhite")
        
    yAxis.selectAll("text")
        .data(yAxisArr)
        .join("text")
        .attr("x", 10)
        .attr("y", d => yScale.getValue(d))
        .attr("dominant-baseline", "middle")
        .text(d => d.toFixed(roundDigits))


    // making X axis
    let fullXArr = xScale.getValueReverse();

    let xAxisArr = fillXAxisArr(fullXArr);
    let xAxisValues = xAxisArr.map(d => xScale.getValue(d));

    console.log(xAxisValues)

    // adding rectangle on svg
    xAxis.selectAll("rect")
        .data([null])
        .join("rect")
        .attr("width", chartArea.attr("width"))
        .attr("height", xAxisHeight)
        .attr("fill", "antiquewhite")

    xAxis.selectAll("text")
        .data(xAxisArr)
        .join("text")
        .attr("x", d => xScale.getValue(d))
        .attr("y", xAxisHeight/2)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .text(d => d.toString());

    axisArr = {xAxisArr,  yAxisArr};
    axisValues = {xAxisValues, yAxisValues};
}