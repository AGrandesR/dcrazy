require('dotenv').config()
const mysql = require('mysql');


async function call(flag, sql, params=[]) {
  return new Promise((res,rej)=>{
    if(flag!='') flag+='_'
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

module.exports = call