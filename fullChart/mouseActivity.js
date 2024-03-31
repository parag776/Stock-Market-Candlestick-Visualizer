import { chartArea, axis } from "./assembleChart.js";
import { updateChartDrag, xTransform, yTransform} from "./chart.js";
// import {axis} from "./axis.js"
import { candleInfo, candleInfoRemove } from "./beautify.js";

export function addMouseActivity(){

    d3.select("html")
        .on("mouseup", function(){
            d3.select(this).on("mousemove", null);
        })

    chartArea
        .on("mouseleave", candleInfoRemove)

    // moving chart with drag
    chartArea
        .on("mousedown",function (){
            d3.select("html").on("mousemove", function(event){

                const movementX = event.movementX;
                const movementY = event.movementY;
                const movement = {movementX, movementY}

                updateChartDrag(movement);
            })
        })
        .on('wheel', function(event){

            event.preventDefault();
            const movementX = event.deltaY;

            if(event.ctrlKey){

                //todo

                // console.log("hello")
                // xTransformCtrl(movementX);
            } else {
                xTransform(movementX);
            }

        })
    
    // transforming chart x axis
    axis.xAxis
        .on("mousedown", function(){
            d3.select("html").on("mousemove", function(event){

                const movementX = event.movementX
                xTransform(movementX);
            })
        })
        .on('wheel', function(event){

            event.preventDefault();

            const movementX = event.deltaY;
            xTransform(movementX);

        })
        

    // transform chat y axis

    axis.yAxis
        .on("mousedown", function(){
            d3.select("html").on("mousemove", function(event){

                const movementY = event.movementY;
                yTransform(movementY);
            })
        })
        .on('wheel', function(event){

            event.preventDefault();

            const movementY = event.deltaY/5;
            yTransform(movementY);

        })

    // getting mouse location on chartArea

    chartArea
        .on("mousemove", candleInfo)

    


    chartArea
        .on("mouseenter", function(event){
            let x = event.offsetX;
            let y = event.offsetY;



        })
}