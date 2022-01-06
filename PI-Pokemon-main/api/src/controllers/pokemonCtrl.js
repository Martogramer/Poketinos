const axios = require('axios');
const {Pokemon, Type} = require('../db');
const {URL_API_POKEMON,
    URL_API_POKEMON_NAME_OR_ID} = require('../utils/GlobalConst');

const getPokeApi=async()=>{
    try{
        const totalReq = await axios.get(URL_API_POKEMON);
        const totalReq2 = totalReq.data.results.map(e=>axios.get(e.url));
        const infoUrl = await axios.all(totalReq2);
        
        let pokemons = infoUrl.map(e=>e.data);
        let infoPoke = pokemons.map(e=>objPokeApi(e))
        return infoPoke;
    }catch(error){
        //console.log(error);
        return error;
}};
const getPokedb=async()=>{
    try{
        return await Pokemon.findAll({
            include: {
                model: Type,
                attributes: ['name']
            }
        })
    }catch(error){
        //console.log(error);
        return error;
}};
const getAllPoke=async()=>{
    try{
        const apiData = await getPokeApi();
        const dbData = await getPokedb();
        return [...apiData, ...dbData];
    }catch(error){
        //console.log(error);
        return error;
}};

const getPokeByName=async(name)=>{
    try{
        const searchDbName=await Pokemon.findOne({
            where:{name},
            include:{model:Type}
        })
        if(searchDbName){
            let nameDb = {
                id: searchDbName.id,
                name: searchDbName.name,
                life: searchDbName.life,
                attack: searchDbName.attack,
                defense: searchDbName.defense,
                speed: searchDbName.speed,
                height: searchDbName.height,
                weight: searchDbName.weight,
                sprite: searchDbName.sprite,
                types: searchDbName.types.lenght < 2 ? [searchDbName.types[0]] : [searchDbName.types[0], searchDbName.types[1]]
            }
            return nameDb
        }else{
            const searchApiName = axios.get(`${URL_API_POKEMON_NAME_OR_ID}${name.toLowerCase()}`);
            const foundApiName = objPokeApi(searchApiName.data);
            return foundApiName
        }
    }catch(error){return error};
    };

    const getPokeById=async(id)=>{
        try{

            if(id.lenght > 2){
                const searchDbId=await Pokemon.findOne({
                    where:{id},
                    include:{model:Type}
                });
                console.log('Pokemon en data base', searchDbId)
                let idDB = {
                    id: searchDbId.id,
                    name: searchDbId.name,
                    life: searchDbId.life,
                    attack: searchDbId.attack,
                    defense: searchDbId.defense,
                    speed: searchDbId.speed,
                    height: searchDbId.height,
                    weight: searchDbId.weight,
                    sprite: searchDbId.sprite,
                    types: searchDbId.types.lenght < 2 ? [searchDbId.types[0]] : [searchDbId.types[0], searchDbId.types[1]]
                }
                return idDB
            }else{
                const searchApiId = axios.get(`${URL_API_POKEMON_NAME_OR_ID}${id.toString()}`);
                const foundApiId = objPokeApi(searchApiId.data);
                return foundApiId;
            
            }
         
        }catch(error){return error};
        };

const objPokeApi = (poke)=>{
    const obj = {
        id: poke.id,
        name: poke.name,
        life: poke.stats[0].base_stat,
        attack: poke.stats[1].base_stat,
        defense: poke.stats[2].base_stat,
        speed: poke.stats[5].base_stat,
        
        height: poke.height,
        weight: poke.weight,
        sprite: poke.sprites.other.dream_world.front_default,
        types: poke.types.lenght < 2 ? [{name: poke.types[0].type.name}] : [{name: poke.types[0].types.name}, {name: poke.types[1].types.name}]
    }
    return objPokeApi;
};

const postPokedb = async(pokeData) =>{
    try{
        const {name, life, attack, defense, speed, height, weight, sprite, types} = pokeData
        const pokemono = await Pokemon.create({
            name,
            life,
            attack,
            defense,
            speed,
            height,
            weight,
            sprite,
        })
        const pokeType = await Type.findAll({
            where: {name:types}
        });
        let crear = pokemono.addType(pokeType);
        return crear;
    } catch(error){return error}
};


module.exports = {
    getPokeApi,
    getPokedb,
    getAllPoke,
    getPokeByName,
    getPokeById,
    postPokedb
}