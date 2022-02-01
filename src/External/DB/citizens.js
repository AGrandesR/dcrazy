const call = require('../../Utils/DBtool')

////////////////////////////////////////////////////////////////////////////////////////
// S> PUBLIC FUNCTIONS
async function findCitizenbyMail(mail) {
    return new Promise(async (resolved,rejected)=>{
        try{
            const rawResponse = await call('DC', 'SELECT id, dni, mail, pass FROM citizen WHERE mail=/**/',[mail])
            resolved(rawResponse)
        } catch (e){
            rejected(e)
        }
    })
    
}
async function setTrust(id, trust) {
    return new Promise(async (resolved,rejected)=>{
        try{
            if(id==trust) rejected(605) //You can't trust yourself
            
            //Un id == trust puede provocar recursividad infinita
            //We had to check with a SQL that that person is not to going to trust to something that trust him - evitar recursividad
            const rawResponse = await call('DC', 'UPDATE citizen SET trust=/**/ WHERE id=/**/',[trust,id])
            resolved(rawResponse)
        } catch (e){
            rejected(e)
        }
    })
}
async function getTrust(id) {
    return new Promise(async (resolved,rejected)=>{
        try{
            const rawResponse = await  call('DC', 'SELECT trust FROM citizen WHERE id=/**/',[id])
            resolved(rawResponse)
        } catch (e){
            rejected(e)
        }
    })
}

async function getTrustChain(id){
    return new Promise(async (resolved,rejected)=>{
        try{
            //if(id==trust) rejected(605) //You can't trust yourself
            const SQL = `
            with loop as (
                SELECT trust FROM citizen WHERE id=/**/ and trust NOT NULL
                UNION ALL
                SELECT c.trust FROM citizen c
                INNER JOIN loop l ON l.trust=c.id
            ) select * FROM loop;
            `;
            const rawResponse = await call('DC', SQL,[id])
            if(rawResponse[0].trust == null) rejected(req,res,502)
            resolved(rawResponse[0].trust)
            //Un id == trust puede provocar recursividad infinita
            //We had to check with a SQL that that person is not to going to trust to something that trust him - evitar recursividad
            const updateResponse = await call('DC', 'UPDATE citizen SET trust=/**/ WHERE id=/**/',[trust,id])
            resolved(updateResponse)
        } catch (e){
            rejected(e)
        }
    })
}
async function isIdInTrustChain(id,trustChainId){
    return new Promise(async(resolved, rejected)=>{
        const SQL = `
            with loop as (
                SELECT trust FROM citizen WHERE id=/**/ and trust NOT NULL
                UNION ALL
                SELECT c.trust FROM citizen c
                INNER JOIN loop l ON l.trust=c.id
            ) select * FROM loop;
        `;
        const rawResponse = await call('DC', SQL,[id])
        if(rawResponse[0].trust == null) resolved(false)
        resolved(rawResponse[0].trust)
        console.log("Check array:")
        console.log(rawResponse[0].trust)
        resolved(rawResponse[0].trust.indexOf(id) != -1)
        //Un id == trust puede provocar recursividad infinita
        //We had to check with a SQL that that person is not to going to trust to something that trust him - evitar recursividad
        const updateResponse = await call('DC', 'UPDATE citizen SET trust=/**/ WHERE id=/**/',[trust,id])
    })
}
// E> PUBLIC FUNCTIONS
////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////
// S> PRIVATE FUNCTIONS


// E> PRIVATE FUNCTIONS
////////////////////////////////////////////////////////////////////////////////////////


module.exports = {
    findCitizenbyMail,
    getTrust,
    setTrust
}