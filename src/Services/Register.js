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
    const mail = req.body.mail
    const pass = req.body.pass
    const dni = req.body.dni

    const cCode = checkWithCode(dni, mail, pass)
    if(cCode!=0) return jResponse(req,res,cCode)

    const token = createRegisterToken(dni,mail,pass)

    if(!token || token=='') return jResponse(req,res,102)
    const mailer = new Mail('DMAIL')
    try {
        let mailResponse = await mailer.send('Register DemoCrazy - DCRAZY',mail,'Register into DemoCrazy', `<a href=http://localhost:3000/register?regtoken=${token}>Hola</a>`, true) //Put to true and change token to a complete html body
        console.log(mailResponse)
        //POSIBLE RESPONSES
        if(mailResponse.accepted[0]==mail) jResponse(req,res,0)
        else {
            console.log("response code: " + mailResponse.responseCode)
            let eCode=1
            switch (mailResponse.responseCode) {
                case 554:           //'554 5.0.0 Error: transaction failed, blame it on the weather: This address does not exist. Please try again'
                    eCode=154       //This address does not exist. Please try again. 
                    break
            }
            jResponse(req,res,eCode)
        }
    } catch(e){
        jResponse(req,res,eCode)
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

        //We have to insert data encrypted in database
        //Need to make the call

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