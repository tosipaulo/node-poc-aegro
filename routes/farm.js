const router = require('express').Router();
const Farm = require('../models/Farm');

router.post('/', async (req, res) => {
    const {name} = req.body;

    if(!name) {
        return res.status(422).json({error: 'Nome é obrigatório.'})
    }

    try {
        await Farm.create({name});
        console.log({name})
        return res.status(201).json({message: 'Fazenda criada com sucesso.'})
    } catch (error) {
        res.status(500).json({error})
    }
})

router.get('/', async (req, res) => {
    try {
        const farms = await Farm.find();
        return res.status(200).json(farms);
    } catch (error) {
        res.status(500).json({error})
    }
})

router.get('/:id', async (req, res) => {

    const id = req.params.id;

    try {
        const farm = await Farm.findOne({_id: id});

        if(!farm) {
            return res.status(422).json({error: 'Fazendo não encontra.'})
        }

        return res.status(200).json(farm);
    } catch (error) {
        return res.status(500).json({error})
    }
})

router.patch('/:id', async (req, res) => {

    const id = req.params.id;
    const {name} = req.body;

    try {
  
        const updateFarm = await Farm.updateOne({_id: id}, {name});

        if(updateFarm.matchedCount === 0) {
            return res.status(422).json({error: 'Fazendo não encontra.'})
        }

        return res.status(200).json({name});
    } catch (error) {
        return res.status(500).json({error})
    }
})

router.delete('/:id', async (req, res) => {

    const id = req.params.id;

    try {

        const farm = await Farm.findOne({_id: id});

        if(!farm) {
            return res.status(422).json({error: 'Fazenda não encontra.'})
        }
  
        await Farm.deleteOne({_id: id});

        return res.status(200).json({message: 'Fazenda excluida com sucesso.'});
    } catch (error) {
        return res.status(500).json({error})
    }
})


module.exports = router;