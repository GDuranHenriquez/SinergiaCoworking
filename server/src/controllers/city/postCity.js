const { City, Province } = require("../../db");

const postCity = async (req, res) => {
    try {

        const {name} = req.body;

        if(!name) {
            return res.status(401).json({error: "No se indicó el nombre"})
        }
        // if(!province){
        //     return res.status(401).json({error: 'No se indicó la provincia'})
        // }
        // const checkProvince = await Province.findByPk(province)
        // if(!checkProvince){
        //     return res.status(401).json({error: 'La provincia provista no está registrada'})
        // }
        const [city, created] = await City.findOrCreate({where:{name}});
        if(!created){
            return res.status(401).json({error: 'La ciudad ya esta registrada'})
        }
        return res.status(200).json(city);

    } catch (error) {

        res.status(500).json({error: error.message});

    }
};

module.exports = {postCity};