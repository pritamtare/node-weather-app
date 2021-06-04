const request = require('postman-request');
const chalk = require('chalk');


const forecast = (longitude,latitude,callback)=>{
    const url = `http://api.weatherstack.com/current?access_key=326df63e46c1e971059269d9a10523e5&query=${longitude},${latitude}`;

    request({url , json:true},(error, {body})=>{
        if(error){
                    callback(chalk.inverse.red(" Unable to connect weather server... "))
                }else if(body.error){
                    callback(chalk.inverse.red(" Unable to find location, plese try another search... "))
                }
                else{
                     callback(chalk.inverse.green(` It is currently ${ body.current.temperature} degrees out. Seems today ${body.current.weather_descriptions[0]}  `));
                    // callback(body)
                }
    })
}

// forecast(18.533,74.867, (error, data)=>{
//     console.log(error)
//      console.log(data)
// })


module.exports = forecast;