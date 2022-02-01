// const { request } = require('express');
// const bcrypt = require('bcrypt');
const call = require('../Utils/DBtool')
const citizens = require('../External/DB/citizens')
const jResponse = require('./Common/jsonResponse')

////////////////////////////////////////////////////////////////////////////////////////
// S> PUBLIC FUNCTIONS

//POST /register?(&lng)
//{dni:****,mail:****,pass:****}  /TOKEN INFO
async function sendTrust(req, res) {
    const id = req.userData.id
    const trust = req.body.id
    try {
        if(id==trust) return jResponse(req,res,605) //Un id == trust puede provocar recursividad infinita
        //We had to check with a SQL that that person is not to going to trust to something that trust him - evitar recursividad
        
        const rawResponse = await citizens.setTrust(id,trust) //'DC', 'UPDATE citizen SET trust=/**/ WHERE id=/**/',[trust,id]
    } catch (e) {
        console.log(e)
        return jResponse(req,res,601)
    }
    
    
    //if(rawResponse[0].trust == null) return jResponse(req,res,502)
    return jResponse(req,res,500,{"check in": `https://${req.host}/trust`})
}

async function readTrust(req, res) {
    const id = req.userData.id
    const rawResponse = await citizens.getTrust(id)
    if(rawResponse[0].trust == null) return jResponse(req,res,502)
    return jResponse(req,res,500,{"trusted":rawResponse[0].trust})
}

async function readTrustChain(req, res) {
    /*
    IMPORTANT TO CHECK TRUST CHAIN BEFORE TO INSERT THE TRUST TO AVOID RECURSIVITY
    */
    const SQL = `
    with loop as (
        SELECT trust FROM citizen WHERE id=/**/ and trust NOT NULL
        UNION ALL
        SELECT c.trust FROM citizen c
        INNER JOIN loop l ON l.trust=c.id
    ) select * FROM loop;
    `;
    const id = req.userData.id
    const rawResponse = await call('DC', SQL,[id,id])
    if(rawResponse[0].trust == null) return jResponse(req,res,502)
    return jResponse(req,res,900,{"trusted":rawResponse[0].trust})
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