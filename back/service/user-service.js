const UserModel = require('../models/user-model')
const bcypt = require('bcrypt')
const uuid = require('uuid')
const mailService = require('./mail-service') 
class UserService {
    async regisration (email, password){
        const candidate = await UserModel.findOne({email})
        if(candidate){
            throw new Error('Eser is already exist')

        }
        const hashPassword = await bcypt.hash(password, 3)
        const activationLink = uuid.v4()
        const user = await UserModel.create({email,password: hashPassword, activationLink})
        await mailService.sendActivationMail(email, activationLink)
    }
}

module.exports = new UserService()