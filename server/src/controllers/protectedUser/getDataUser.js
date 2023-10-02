async function getDataUserClient(req, res){
  res.status(200).json(req.user);    
}

module.exports = {getDataUserClient};