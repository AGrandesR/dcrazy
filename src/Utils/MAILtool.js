const { text } = require('express');
const nodemailer = require('nodemailer');

require('dotenv').config()
/*
const mail = require('MAILtool')
let mail = new mail('DCRAZY)
*/
class MAILtool {
    #transporter;
    #mail;
    constructor(flag) {
        if(flag!='') flag+='_'
        this.#transporter = nodemailer.createTransport({
            host: process.env[`${flag}HOST`],
            port: process.env[`${flag}PORT`],
            secure: false, //process.env[`${flag}SECURE`], // true for 465, false for other ports -> DEVELOP BOOLEAN CHECKER (CHECKER FOR ALL)
            auth: {
              user: process.env[`${flag}USER`], // generated ethereal user
              pass: process.env[`${flag}PASS`], // generated ethereal password
            },
            tls: {
                rejectUnauthorized: false
            }
        });
        this.#mail = process.env[`${flag}USER`]
    }

    async status(){
        return new Promise((res, rej)=>{
            this.#transporter.verify(function(error, success) {
                if (error) {
                  console.log(error);
                  res(false)
                } else {
                  console.log("Server is ready to take our messages");
                  rej(false)
                }
            });
        }) 
    }

    async send(fromName, toMail, subject, body, isHTML=false) {
        //return new Promise(function (res, rej){
            let data = {
                from: `${fromName} <${this.#mail}>`,
                to: toMail,
                subject: subject,
                text: body
            }
            if (isHTML) data.html=body
            console.log(data)
            try {
                let info = await this.#transporter.sendMail(data)
                return(info)
            } catch (e) {
                return(e)
            }
        //})
    }
}

module.exports = MAILtool;