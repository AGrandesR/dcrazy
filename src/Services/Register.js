const { request } = require('express');

const {createToken, readToken} = require('../Utils/JWTtool')
const Mail = require('../Utils/MAILtool')
const call = require('../Utils/DBtool')

const jResponse = require('./Common/jsonResponse')
const {checkWithCode} = require('./Common/checkers')

////////////////////////////////////////////////////////////////////////////////////////
// S> PUBLIC FUNCTIONS

//POST /register?(&lng)
//{dni:****,mail:****,pass:****}
async function createRegister(req, res) {
    const dni = req.body.dni
    const mail = req.body.mail
    const pass = req.body.pass

    const cCode = checkWithCode(dni, mail, pass)
    if(cCode!=0) return jResponse(req,res,cCode)

    const token = createRegisterToken(dni,mail,pass)

    if(!token || token=='') return jResponse(req,res,102)
    const mailer = new Mail('DCRAZY')
    try {
        let isSend = await mailer.send('Register DemoCrazy - DCRAZY',mail,'Register into DemoCrazy', `<a href=http://localhost:3000/register?regtoken=${token}>Hola</a>`, true) //Put to true and change token to a complete html body

        //POSIBLE RESPONSES
        if(isSend) jResponse(req,res,0)
        else jResponse(req,res,1)
    } catch(e){
        console.error(e)
        jResponse(req,res,1)
    }
}
async function confirmRegister(req, res) {
    try {
        const token = req.query.regtoken

        const data = readRegisterToken(token)

        if(!data) return jResponse(req,res,107)
        const cCode = checkWithCode(data.dni, data.mail, data.pass)
        if(cCode!=0) return jResponse(req,res,cCode)
        if((new Date).getTime()<data.iat || (new Date).getTime()>(data.iat + 3600)) return jResponse(req,res,109)

                

        jResponse(req,res,0)
    } catch (e) {
        console.error(e)
        jResponse(req,res,1)
    }
    

}
// E> PUBLIC FUNCTIONS
////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////
// S> PRIVATE FUNCTIONS
function check(dni, mail, pass) {
    
    return false;
}

function createRegisterToken(dni, mail, pass) {
    //Checkers!!
    if(haveError()) return false
    const token = createToken({ dni: dni, mail: mail, pass: pass},'REGISTER')
    return token
}

function readRegisterToken(token) {
    const data = readToken(token,'REGISTER')
    if(haveError()) return false
    return data
}
function haveError() {
    return false
}
// E> PRIVATE FUNCTIONS
////////////////////////////////////////////////////////////////////////////////////////


module.exports = {
    createRegister,
    confirmRegister
}