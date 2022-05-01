const router = require('express').Router();
const Farm = require('../models/Farm');

router.post('/', async (req, res) => {
    const {name, size, farmId} = req.body;

    const farm = await Farm.findOne({_id: farmId});

    if(!farm) {
        return res.status(422).json({error: 'Fazenda não encontra.'})
    }

    try {
        await Farm.updateOne({_id: farmId}, {
            $push: {
                'chunks': {
                    name,
                    size
                }
            }
        });
        return res.status(201).json({message: 'Talhão criado com sucesso.'})
    } catch (error) {
        return res.status(500).json({error})
    }
});

router.patch('/:chunkId', async (req, res) => {
    const {name, size, farmId, productions} = req.body;
    const chunkId = req.params.chunkId;

    const farm = await Farm.findOne({_id: farmId});

    if(!farm) {
        return res.status(422).json({error: 'Fazenda não encontra.'})
    }

    try {
        await Farm.findOneAndUpdate(
            {_id: farmId, 'chunks._id': chunkId},
            {
                $set: {
                    'chunks.$': {
                        name, 
                        size,
                        productions
                    }
                }
            }
        )
        return res.status(200).json({message: 'Talhão atualizado com sucesso.'})
    } catch (error) {
        return res.status(500).json({error})
    }
});

module.exports = router;