const router = require('express').Router();
const Farm = require('../models/Farm');

router.post('/', async (req, res) => {
    const {name, size} = req.body;

    if(!name && !size) {
        return res.status(422).json({error: 'Nome e tamanho são obrigatórios.'})
    }

    try {
        await Farm.create({name,size});
        return res.status(201).json({message: 'Fazendo criada com sucesso.'})
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
        res.status(500).json({error})
    }
})

router.patch('/:id', async (req, res) => {

    const id = req.params.id;
    const {name, size} = req.body;

    try {
  
        const updateFarm = await Farm.updateOne({_id: id}, {name, size});

        if(updateFarm.matchedCount === 0) {
            return res.status(422).json({error: 'Fazendo não encontra.'})
        }

        return res.status(200).json({name, size});
    } catch (error) {
        res.status(500).json({error})
    }
})

router.delete('/:id', async (req, res) => {

    const id = req.params.id;

    try {

        const farm = await Farm.findOne({_id: id});

        if(!farm) {
            return res.status(422).json({error: 'Fazendo não encontra.'})
        }
  
        await Farm.deleteOne({_id: id});

        return res.status(200).json({message: 'Fazenda excluida com sucesso.'});
    } catch (error) {
        res.status(500).json({error})
    }
})


module.exports = router;