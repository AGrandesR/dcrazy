// const { request } = require('express');
// const bcrypt = require('bcrypt');
const call = require('../Utils/DBtool')
const jResponse = require('./Common/jsonResponse')

////////////////////////////////////////////////////////////////////////////////////////
// S> PUBLIC FUNCTIONS

//POST /register?(&lng)
//{dni:****,mail:****,pass:****}  /TOKEN INFO
async function sendTrust(req, res) {
    
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