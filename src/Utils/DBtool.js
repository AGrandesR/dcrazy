require('dotenv').config()
//const mysql = require('mysql')
//const { Client } = require('pg')


//Always use /**/ to indicate params
async function call(flag, sql, params=[]) {
  //if sql = string una petición, sino podemos mirar de hacer un pool si se trata de un array
  if(flag!='') flag+='_'
  const type = process.env[`${flag}TYPE`]

  if(!/^[a-z]{3,8}$/.test(type)) return Promise.reject(new Error('Try to make something strange - put correct values'))

  const funcName = 'use' + type.charAt(0).toUpperCase() + type.slice(1)
  return (typeof eval(funcName) == 'function') ? eval(funcName)(flag, sql, params) : Promise.reject(new Error('Not found database type'));
}

//MySQL
async function useMysql(flag, sql, params=[]){
  const mysql = require('mysql')
  while(sql.indexOf('/**/')!=-1){
    sql = str.replace('/**/','?')
  }
  return new Promise((res,rej)=>{
    const connection = mysql.createConnection({
      host     : process.env[`${flag}HOST`],
      user     : process.env[`${flag}USER`],
      password : process.env[`${flag}PASS`],
      database : process.env[`${flag}DB`],
      port     : process.env[`${flag}PORT`]
    });
    
    connection.connect();
    
    connection.query(sql, params, function (error, results, fields) {
      if (error) rej(error);
      console.log('---------------')
      console.log(results)
      console.log('---------------')
      console.log(fields)
      console.log('---------------')
      res(results)

      connection.end();
    });
    
    
  })
}
async function usePsql(flag, sql, params=[]){
  const { Client } = require('pg')
  let count=1
  while(sql.indexOf('/**/')!=-1){
    sql = sql.replace('/**/', `$${count}`)
    count++
  }
  return new Promise(async (res,rej)=>{
    try {     
      const client = new Client({
        host     : process.env[`${flag}HOST`],
        user     : process.env[`${flag}USER`],
        password : process.env[`${flag}PASS`],
        database : process.env[`${flag}DB`],
        port     : process.env[`${flag}PORT`]
      })
      await client.connect()
      //const results = await client.query('SELECT $1::text as message', ['Hello world!'])
      console.log(sql);
      console.log(params)
      const results = await client.query(sql, params)
      console.log(res) // Hello world!
      await client.end()
      if(typeof results.rows != undefined) res(results.rows)
      else res(false)
    } catch(e){
      rej(e)
    }
    
  })
}
module.exports = call