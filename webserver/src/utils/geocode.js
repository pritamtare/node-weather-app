const request = require('postman-request');
const chalk = require('chalk');


// const url = "http://api.weatherstack.com/current?access_key=326df63e46c1e971059269d9a10523e5&query=18.533,73.867&units=f";  //farenheit



const geocode = (address,callback)=>{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoicHJpdGFtdGFyZTU1NSIsImEiOiJja3A1OHl1OXowam9zMnBzMXBsdzZ1cWxiIn0.aqmMgvsFIykr82itz8MK_w`
    request({ url , json:true},(error,{body})=>{
        if(error){
            callback(chalk.inverse.red(" Unable to connect weather server... "),undefined)
        }else if(body.features.length == 0 ){
            callback(chalk.inverse.red(" Unable to find location,plse try another search... "),undefined)
        }else {
            callback(undefined,{
                 latitude : body.features[0].center[1] ,
                 longitude : body.features[0].center[0],
                 location : body.features[0].place_name
            })
        }
    })
}

// geocode('pune',(error,data)=>{
//     console.log(error);
//     console.log(data);
// })


module.exports = geocode;