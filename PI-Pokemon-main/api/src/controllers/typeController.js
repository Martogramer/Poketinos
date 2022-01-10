const axios = require('axios');
const {Type} = require('../db');
const {URL_API_POKEMON_TYPE} = require('../utils/GlobalConst');

const getTypesTotal = async()=>{
    try{
        const foundTypesDB = await Type.findAll({
            attributes: ['name']
        });
        if(foundTypesDB.lenght === 0){
            const typesPokeapi = await axios.get(URL_API_POKEMON_TYPE);
            let typesCreateDB = typesPokeapi.data.results.map(type => Type.create({name: type.name}));
            typesCreateDB = await axios.all(typesCreateDB);
            const getTypesPokeApi = getTypes(typesCreateDB);
            return getTypesPokeApi;
        }else{
            const getTypesPokeDB = getTypes(foundTypesDB);
            return getTypesPokeDB;
        }
    }catch(error){return error};
};

const getTypes = (array) => {
    let types = array.map(type=>type.name);
    return types;
};

module.exports = {getTypesTotal}