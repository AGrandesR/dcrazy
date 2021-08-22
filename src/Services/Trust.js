// const { request } = require('express');
// const bcrypt = require('bcrypt');
const call = require('../Utils/DBtool')
const jResponse = require('./Common/jsonResponse')

////////////////////////////////////////////////////////////////////////////////////////
// S> PUBLIC FUNCTIONS

//POST /register?(&lng)
//{dni:****,mail:****,pass:****}  /TOKEN INFO
async function sendTrust(req, res) {
    const id = req.userData.id
    const trust = req.body.id
    try {
        const rawResponse = await call('DC', 'UPDATE citizen SET trust=/**/ WHERE id=/**/',[trust,id])
    } catch (e) {
        console.log(e)
        return jResponse(req,res,601)
    }
    
    
    //if(rawResponse[0].trust == null) return jResponse(req,res,502)
    return jResponse(req,res,500,{"check in": `https://${req.host}/trust`})
}

async function readTrust(req, res) {
    const id = req.userData.id
    const rawResponse = await call('DC', 'SELECT trust FROM citizen WHERE id=/**/',[id])
    if(rawResponse[0].trust == null) return jResponse(req,res,502)
    return jResponse(req,res,500,{"trusted":rawResponse[0].trust})
}
// E> PUBLIC FUNCTIONS
////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////
// S> PRIVATE FUNCTIONS

// E> PRIVATE FUNCTIONS
////////////////////////////////////////////////////////////////////////////////////////


module.exports = {
    sendTrust,
    readTrust
}