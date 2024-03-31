export function translateParcer(key){

    let collectionX, collectionY;
    for(let i=0;i<key.length;i++){
        if(key[i]==','){
            collectionX = key.substr(10, i-10)
            collectionY = key.substr(i+1, key.length-i-2)
        }
    }
    
    collectionX = collectionX.trim();
    collectionY = collectionY.trim();

    return {collectionX, collectionY};
}

export function fixData(data){
    for(let i=0;i<data.length;i++){
        data[i]["open"] = +data[i]["open"];
        data[i]["high"] = +data[i]["high"];
        data[i]["low"] = +data[i]["low"];
        data[i]["close"] = +data[i]["close"];
        data[i]["volume"] = +data[i]["volume"];
    }
}

export function round(num, digits){
    const roundHelper = Math.pow(10, digits);
    return Math.round(num*roundHelper)/roundHelper;
}

export function dateToString(date){
    return date.toString();
}