const {Router} = require('express');


const router = Router();
router.get('/', async(req, res)=>{
    try  {
        const {name} = req.query;
        if(!name){
            return res.status(200).send(await getAllPoke());
        }else{
            const pokeFoundName = await getPokeByName(name);
            if(pokeFoundName){
                return res.status(200).json(pokeFoundName)
            }
        }
    }catch(error){
        console.log('errror');
        return res.status(404).send('No Funciona');
    }
});

router.get('/:id', async(req, res)=>{
    try{
        const {id} = req.params;
        //console.log(id)
        const pokeFoundId = await getPokeById(id);
        if(pokeFoundId) return res.status(200).json(pokeFoundId)
    } catch(error){
        //console.log('error');
        return res.status(404).send('Poketino no funciona');
    }
});

router.post('/', async(req, res)=>{
    try{
        const pokeData = req.body
        console.log('Dale Perri', pokeData)
        await postPokedb(pokeData)
        return res.status(200).send('pokemon creado')
    } catch (error){res.status(400).send('Alo ah fallado')}
});

module.exports = router;