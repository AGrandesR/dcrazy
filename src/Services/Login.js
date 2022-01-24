const { request } = require('express');
//const bcrypt = require('bcrypt');

const {createToken, readToken} = require('../Utils/JWTtool')
// const Mail = require('../Utils/MAILtool')
const citizens = require('../External/DB/citizens')
const {createHash, createBasicHash, checkHash} = require('../Utils/HASHtool')

const jResponse = require('./Common/jsonResponse')
const {checkWithCode} = require('./Common/checkers')

////////////////////////////////////////////////////////////////////////////////////////
// S> PUBLIC FUNCTIONS

//POST /login?(&lng)
//{mail:****,pass:****}
async function getToken(req, res) {
    const mail = req.body.mail
    const pass = req.body.pass
    //const dni = req.body.dni

    //const cCode = checkWithCode(dni, mail/*, pass*/)
    //if(cCode!=0) return jResponse(req,res,cCode)

    //const hashDNI   = createHash(data.dni);
    const hashMAIL  = createBasicHash(mail);
    //const hashPASS  = createHash(pass);

    //READ IN DATABASE IF EXIST
    try {
        const rawResponse = await citizens.findCitizenbyMail(hashMAIL);
        
        if(!rawResponse) return jResponse(req, res, 3)
        const data = rawResponse[0]
        if(!checkHash(pass,data.pass)) return jResponse(req,res,5)
        const token=createLoginToken(data.id, data.dni, data.mail)
        return jResponse(req,res,0,{"token":token})
    } catch(e){
        if(e.code=='23505') return jResponse(req,res,155)
        if(e.code=='22021') return jResponse(req,res,191)
        console.log(e);
        return jResponse(req,res,1)
    }
}

// E> PUBLIC FUNCTIONS
////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////
// S> PRIVATE FUNCTIONS
function check(dni, mail, pass) {
    
    return false;
}
 
function createLoginToken(id, dni, mail) {
    //Checkers!!
    if(haveError()) return false
    const token = createToken({ dni: dni, mail: mail, id: id},'LOGIN')
    return token
}

function readLoginToken(token) {
    const data = readToken(token,'LOGIN')
    if(haveError()) return false
    return data
}
function haveError() {
    return false
}
// E> PRIVATE FUNCTIONS
////////////////////////////////////////////////////////////////////////////////////////


module.exports = {
    getToken
}