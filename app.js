require('dotenv').config()
require('./model/db')
require('./db/dbconnection')
const express = require('express');
const routes = require('./routes/index')
const bodyparser = require('body-parser');
const app = express();
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use('/api', routes);
global.httpResponseHandlerError = require('./utils/httpResponseHandler').httpResponseHandlerError
global.httpResponseSuccessHandler = require('./utils/httpResponseHandler').httpResponseSuccessHandler
global.Joi=require('joi')
app.get('/',(req,res)=>{
    res.status(200).send("Welcome to the Label India")
})
app.all("*", (req, res) =>{
    res.status(404).send("You've tried reaching a route that doesn't exist.")}
    );

app.listen(4500, () => {
    console.log('Express server started at port : 4500');
});

module.exports=app;