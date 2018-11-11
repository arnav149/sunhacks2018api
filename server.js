const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const direction = require('google-maps-direction');

let datab = {
  lat:'',
  long:'',
  endlat:0,
  endlong:0
}

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/driver',(req,res)=>{
  console.log(req.body);
  datab.lat = parseFloat(req.body.lat);
  datab.long = parseFloat(req.body.long);
  res.send('success');
})

app.get('/parent',(req,res)=>{
  if(datab.lat!=0 && datab.long!=0)
    res.send({lat: datab.lat,long: datab.long})


})

app.post('/latitude',(req,res)=>{
  datab.endlat = req.body.endlat;
  datab.endlong = req.body.endlong;
  console.log(datab.endlat,datab.endlong);
  res.send('success');
})

app.get('/speed',(req,res)=>{
  let obj={
    distance:0,
    time:0
  };
  axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${datab.lat},${datab.long}&destinations=${datab.endlat},${datab.endlong}&key=AIzaSyApsiMJBsI6piScQHEWkYOEbUU211S2M30`,{mode:'no-cors'})
  //.then(dat=> res.send({dist:dat.data.rows[0].elements[0].distance.value,tm:dat.data.rows[0].elements[0].time.value}))
  .then(dat=> res.send({dist:dat.data.rows[0].elements[0].distance.value,time:dat.data.rows[0].elements[0].duration.value}))
  //.then(dat=> console.log(dat.data.rows[0].elements[0]))
  .catch(err=>console.log(err))
  // direction({
  //   origin:`${datab.lat},${datab.long}`,
  //   destination:`${req.body.endlat},${req.body.endlong}`
  // })
  // .then(function(result){
  //   console.log(result);
//})

})



app.listen(3000,()=>console.log('app is running on port 3000'));
