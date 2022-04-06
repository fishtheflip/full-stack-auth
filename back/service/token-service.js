const jwt = require('jsonwebtoken')
const tokenModel = require('../models/token-model')
class TokenService {
    generateToken(payload){
        const JWT_SECRET_ACCESS = 'some-string'
        const JWT_SECRET_REFRESH = 'some-string'
        const accessToken = jwt.sign(payload, JWT_SECRET_ACCESS, {expiresIn:'30m'})
        const refreshToken = jwt.sign(payload, JWT_SECRET_REFRESH, {expiresIn:'30d'})
        return {
            accessToken,
            refreshToken
        }

    }
    async saveToken(userId, refreshToken){
        const tokenData = await tokenModel.findOne({user:userId})
        if(tokenData){
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }
        const token = await tokenModel.create({user: userId, refreshToken})
        return token
    }
}

module.exports = new TokenService()