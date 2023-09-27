const {Office} = require('../../db')

const postOffice = async (req, res)=> {
    const {name, area, capacity, price, address, ratingAverage} = req.body
    try {
        if(!name || !area || !capacity || !price || !address || !ratingAverage){
            return res.status(401).json({error: 'You need complete all the spaces'})
            
        }
        const [office, created] = await Office.findOrCreate({where: {name: name.toLowerCase()}})
        if(created) {
            return res.status(401).json({error: 'The Office is already registered'})
        }
        return res.status(200).json(office)
        
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

module.exports = postOffice