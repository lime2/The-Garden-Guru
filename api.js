const axios = require('axios');
var api = {}

api.getPlantInfo = async function(plantName) {
    try {
        const { data:response } = await axios.get(`https://trefle.io/api/v1/species/search?q=${plantName}&token=${process.env.TREFLE_API_TOKEN}`);
        
        const data = response.data;
        
        const info = []
        for (var i = 0; i<data.length; i++) {
            info.push({
                ['id']: data[i].id,
                ['plantName']: data[i].common_name,
                ['scientific_name']: data[i].scientific_name,
                ['image_url']: data[i].image_url,
                ['family']: data[i].family
            })
        }
        return info
    } catch (err) {
        console.log(err)
        return false
    }
}

api.getMoreInfo = async function(plantId) {
    try {
        console.log(`https://trefle.io/api/v1/plants/${plantId}?token=${process.env.TREFLE_API_TOKEN}`)
        const { data:response } = await axios.get(`https://trefle.io/api/v1/plants/${plantId}?token=${process.env.TREFLE_API_TOKEN}`);
        const data = response.data
        console.log(data.main_species.distribution)
        
        const info = {
            plantName: data.common_name,
            scientificName: data.scientific_name,
            imageUrl: data.image_url,
            commonFamily: data.family_common_name,
            family: data.main_species.family,
            edible: data.main_species.edible,
            ediblePart: data.main_species.edible_part,
            location: data.observations,
            careInfo: data.main_species.growth,
            native: data.main_species.distributions.native,
            introduced: data.main_species.distributions.introduced
        }
        return info
    } catch (err) {
        console.log(err)
        return false
    }
}

api.getLocationInfo = async function(location) {
    try {
        const {data:response} = await axios.get(`https://trefle.io/api/v1/distributions/${location}/plants?token=${process.env.TREFLE_API_TOKEN}`)
        const data = response.data
        var info = []
        var x =10000;
        for (var i=0; i<x; i++) {
            if (i>0 && i<data.length && data[i].id != data[i-1].id){
            info.push({
                ['id']: data[i].id,
                ['plantName']: data[i].common_name,
                ['scientific_name']: data[i].scientific_name,
                ['image_url']: data[i].image_url,
                ['family']: data[i].family
            })
        } else if (data[i] && i < data.length) {
            x++;
        }
        }
        return info
    } catch (err) {
        console.log(err)
        return false
    }
}


module.exports = api