require('dotenv').config();

const express = require('express')
const app = express()
const path = require('path')
const gardenGuruApi = require('./api.js')
const ejs = require('ejs')

app.use(express.static(path.join(__dirname,'public')))
app.set('view engine','ejs')
app.set('views',__dirname+'/views')

app.get('/',(req,res) => {
    res.render('index.html')
})

app.get('/GetPlantInfo/:plantName',async (req,res) => {
    const info = await gardenGuruApi.getPlantInfo(req.params.plantName)
    if (info) {
        res.render('plantinfo.ejs',{info,searchName: req.params.plantName})
    } else {
        res.render('plantinfoerr.ejs')
    }
})

app.get('/GetMoreInfo/:plantId',async(req,res) => {
    const info = await gardenGuruApi.getMoreInfo(req.params.plantId)
    if (info) {
        res.render('moreplantinfo.ejs',info)
    } else {
        res.render('plantinfoerr.ejs')
    }
})

app.get('/GetLocationInfo//:locationName',(req,res) => {
    res.render('plantinfoerr.ejs')
})

app.get('/GetLocationInfo/:locationId/:locationName',async(req,res) => {
    const info = await gardenGuruApi.getLocationInfo(req.params.locationId)
    if (info) {
        res.render('location.ejs',{info,locationName: req.params.locationName})
    } else {
        res.render('plantinfoerr.ejs')
    }
})

var port = process.env.PORT || 3000
app.listen(port,() => {
    console.log(`listening on port ${port}`)
})