import { chartArea, data } from "./assembleChart.js";

// this scaleBand is specific for this candleStickChart, here rangeStart is always greater than rangeEnd
// very specific don't use for any other purpose

export class scaleBand{

    #mp = new Map();
    #reverseMp = new Map();
    #dateToDataIndex = new Map();


    constructor(rangeStart, dataWidth){
        this.chartStart = +chartArea.attr("width") + dataWidth;
        this.chartEnd = -dataWidth;

        this.rangeStart = rangeStart;
        this.dataWidth = dataWidth;

        this.dateStart = Math.max(0, Math.ceil((rangeStart - this.chartStart)/dataWidth));
        this.dateEnd = this.dateStart;
        

        for(let i=this.dateStart;i<data.length;i++){

            let dateLocation = rangeStart-i*dataWidth;

            if(dateLocation<this.chartEnd) break;

            this.#mp.set(data[i]["date"], dateLocation);
            this.#dateToDataIndex.set(data[i]["date"], i);
            this.#reverseMp.set(dateLocation, data[i]["date"]);
            this.dateEnd++;
        }


        this.dateEnd--;

    }

    updateScale(rangeStart, dataWidth){

        this.#mp.clear();

        this.chartStart = +chartArea.attr("width")+dataWidth;
        this.chartEnd = -dataWidth;

        this.rangeStart = rangeStart;
        this.dataWidth = dataWidth;

        this.dateStart = Math.max(0, Math.ceil((rangeStart - this.chartStart)/dataWidth));
        this.dateEnd = this.dateStart;
        

        for(let i=this.dateStart;i<data.length;i++){

            let dateLocation = rangeStart-i*dataWidth;

            if(dateLocation<this.chartEnd) break;

            this.#mp.set(data[i]["date"], dateLocation);
            this.#dateToDataIndex.set(data[i]["date"], i);
            this.#reverseMp.set(dateLocation, data[i]["date"]);
            this.dateEnd++;
        }

        this.dateEnd--;

    }

    getValue(value){
        return this.#mp.get(value);
    }

    getValueBeauty(value){
        return Math.floor(this.#mp.get(value)) + 0.5;
    }

    getDataIndex(value){
        return this.#dateToDataIndex.get(value);
    }

    getValueReverse(){
        const res = [];

        for(let i=this.dateStart;i<=this.dateEnd;i++){
            res.push(data[i]["date"])
        }

        return res;

    }

    getNearestValue(value){


        let l = this.dateStart;
        let r = this.dateEnd;

        while(l<=r){
            let mid = Math.floor((l+r)/2);

            let curLoc = this.getValue(data[mid]["date"]);

            if(value > curLoc){
                r = mid-1;
            } else{
                l = mid+1;
            }
        }

        if(r<0 || l>=data.length) return null;

        let firstDateLoc = this.getValue(data[l]["date"]);
        let secondDateLoc = this.getValue(data[r]["date"]);

        if(value - firstDateLoc > secondDateLoc - value){
            return data[r]["date"]
        } else {
            return data[l]["date"];
        }

    }

};

export class scaleLinear{

    constructor(domainStart, domainEnd, rangeStart, rangeEnd){

        this.domainStart = domainStart;
        this.domainEnd = domainEnd;
        this.rangeStart = rangeStart;
        this.rangeEnd = rangeEnd;
    }

    getValue(curDomain){
        return this.rangeStart + (this.rangeEnd-this.rangeStart)/(this.domainEnd-this.domainStart)*(curDomain-this.domainStart);
    }

    getValueBeauty(curDomain){
        let ans = this.rangeStart + (this.rangeEnd-this.rangeStart)/(this.domainEnd-this.domainStart)*(curDomain-this.domainStart);
        return Math.floor(ans) + 0.5;
    }

    getValueReverse(curRange){
        return this.domainStart + (this.domainEnd-this.domainStart)/(this.rangeEnd-this.rangeStart)*(curRange-this.rangeStart);
    }

};