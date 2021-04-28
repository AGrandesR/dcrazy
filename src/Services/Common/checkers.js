

function checkDNI(dni) {
    if(!/^\d{8}[a-zA-Z]$/.test(dni)) return false
    let letter = dni.slice(-1)
    let num = dni.slice(0, -1)

    num = num % 23

    let correctLetter = 'TRWAGMYFPDXBNJZSQVHLCKET'.substr(num,1)

    if(correctLetter!=letter.toUpperCase()) return false
    return true
}

function checkMail(mail){
    if(!/^\w+@\w+.\w+$/.test(mail)) return false
    return true
}
function checkProtonMail(mail){
    if(!/^\w+@protonmail.com/.test(mail)) return false
    return true
}
function check(dni, mail){
    if(!checkDNI(dni)) return false
    if(!checkMail(mail)) return false
    return true
}
function checkWithCode(dni, mail){
    if(!checkDNI(dni)) return 151
    if(!checkProtonMail(mail)) return 153
    return 0 //IS OK
}

module.exports = {
    checkDNI,
    checkMail,
    checkProtonMail,
    check,
    checkWithCode
}