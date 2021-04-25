const { request } = require('express');
const {createToken, readToken} = require('../Utils/JWTtool')
const Mail = require('../Utils/MAILtool')
const jResponse = require('./Common/jsonResponse')

////////////////////////////////////////////////////////////////////////////////////////
// S> PUBLIC FUNCTIONS

//POST /register?(&lng)
//{dni:****,mail:****,pass:****}
async function createRegister(req, res) {
    const lng = (typeof req.query.lng !== 'undefined') ? req.query.lng : 'eng'
    const dni = req.body.dni
    const mail = req.body.mail
    const pass = req.body.pass

    const token = createRegisterToken(dni,mail,pass)

    if(!token || token=='') return res.send(jResponse(102))
    const mailer = new Mail('DCRAZY')
    try {
        let isSend = await mailer.send('Register DemoCrazy - DCRAZY',mail,'Register into DemoCrazy', token, false) //Put to true and change token to a complete html body

        //POSIBLE RESPONSES
        if(isSend) res.json(jResponse(0))
        else res.json(jResponse(1))
    } catch(e){
        console.error(e)
        res.json(jResponse(1))
    }
}
async function confirmRegister(req, res) {
    const lng = (typeof req.query.lng !== 'undefined') ? req.query.lng : 'eng'
    const token = req.query.regtoken
    console.log(req.query)
    const data = readRegisterToken(token)
    if(!data) res.json(jResponse(107))
    res.json(data)

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