function getUserInfo(user){
  return{
    id: user.id,
    name: user.name,
    lastName: user.lastName,
    email: user.email,
    dni: user.dni,
    birthDate: user.birthDate,
    address: user.address,
    upToDate: user.upToDate,
    backupContact: user.backupContact,
    imageUrl: user.imageUrl,
    plan: user.plan,
    dniType: user.dniType
  }
}

module.exports = {getUserInfo};