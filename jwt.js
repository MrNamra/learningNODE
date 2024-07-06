const jwt = require('jsonwebtoken')

const jwtAuthMiddleware = (req, res, next) => {

    // first check req header of auth or not
    const authorization = req.headers.authorization
    // console.log(req.headers)
    if(!authorization) return res.status(401).json({ error: 'Token Missing!'})

    // ext jwt token from the request header
    const token = authorization.split(' ')[1]
    if(!token)
        return res.status(401).json({ error: 'Unauthorized!'})
    try{
        // verify Jwt token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    }catch(err){
        console.log(err);
        res.status(401).json({ error : "Invalide Token!"})
    }
}

// function Gen Token
const generateToekn = (userData) => {
    // gen JWt Token using user data
    return  jwt.sign(userData, process.env.JWT_SECRET, {expiresIn: 3000})
}

module.exports = {jwtAuthMiddleware, generateToekn}