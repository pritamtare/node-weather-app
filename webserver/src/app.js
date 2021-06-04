const express = require('express');
const path = require("path")
const hbs = require("hbs")
const chalk = require("chalk");
// const request = require('postman-request');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express();



//express path config
const staticPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');



//set view engine
app.set('view engine','hbs');
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//static path
app.use(express.static(staticPath))


app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Pritam'
      
    })
})


app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Pritam'    
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:'This is some helpful text',
        name:"pritam",
        title:'Help'
    })
})


app.get('/products',(req,res)=>{
   if(!req.query.search){
     return  res.send({
                 error:'you must provide search'
                 })
   }

   console.log(req.query.search)
   res.send({
       products:[]
   })
})


//-----------------------------------------------------------------------------
app.get('/weather',(req , res)=>{
// debugger
  if( !req.query.address ){
    return  res.send({
            error:'You must provide an address'
        })
    }
    geocode( req.query.address, (error, {latitude ,longitude ,location} )=>{
      if ( error ){
         return  res.send({ error })
        } 
         forecast( longitude, latitude, (error, forecastData)=>{
             if ( error ){
                    return  res.send({ errors :error})
                console.log(error)
             }
            
            res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
            })
        }) 
    }) 
})


//-----------------------------------------------------------------------------
 

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:404,
        name:'Pritam',
        errorMessage:'No article found in help'
    }) 
})

app.get('/about/*',(req,res)=>{
    res.render('404',{
        title:404,
        name:'Pritam',
        errorMessage:'No article found in about'
    }) 
})


app.get('*',(req,res)=>{
    res.render('404',{
        title:404,
        name:'Pritam',
        errorMessage:'Page not found'
    }) 
})




// ---------------------------------------------------------

const port = 3000;
app.listen(port,(error)=>{
    if(error){
        console.log(chalk.inverse.red(error))
    }
    else{
        console.log(chalk.inverse.green(` server is running on port ${port} `))
    }
})