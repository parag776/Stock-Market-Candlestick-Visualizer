import { changeYAxisWidth} from "./constData.js";
import { data } from "./assembleChart.js";
import { round } from "./utilityFunctions.js";

export function fixYAxisWidth(){

    let textLen = 0;
    let count = 0;

    for(let i=0;i<Math.min(50, data.length);i++){
        let tempText = d3.select('body')
            .append('svg')

        tempText
            .append('text')
            .attr("id", "tempForLength")
            .text(round(+data[i]["close"], 2));

        textLen = Math.max(document.getElementById('tempForLength').getComputedTextLength(), textLen);
        tempText.remove();
    }
    changeYAxisWidth(textLen + 20);
}