const express=require("express");
const app=express();
const https=require("https");
const bodyParser=require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
  var cityName=req.body.cityName;
  url="https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&units=metric&appid=43fb8a0d12d87ebb0c0c5b061fd131ae"

  https.get(url,function(response){
    response.on("data",function(data){
    const weatherData=JSON.parse(data);
    const temp=weatherData.main.temp;
    const description=weatherData.weather[0].description;
    const icon=weatherData.weather[0].icon;
    const iconUrl="http://openweathermap.org/img/wn/"+icon+"@2x.png";
    res.write("<h1>The temperature in "+cityName+" is "+temp+" degree Celcius</h1>");
    res.write("<p>The weather is currently "+description+"</p>");
    res.write("<img src="+iconUrl+">");
    res.send();
  });
  });
});


app.listen("3000",function(){
  console.log("Server Started");
})
