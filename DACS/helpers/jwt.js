const jwt = require('jsonwebtoken');
const SECERT_KEY = "asdasd32asndmasd2sa3s4dndjuothgfh";

function signPromise(obj){
    return new Promise((resolve, reject) => {
        jwt.sign(obj, SECERT_KEY, (err, result) =>{
            if(err) return reject(err);
            resolve(result);
        })  
    })
};

function verifyPromise(obj){
    return new Promise( (resolve, reject) =>{
        jwt.verify(obj, SECERT_KEY, (err, result) =>{
            if(err) return reject(err);
            resolve(result);
        })
    })
};

module.exports = { signPromise, verifyPromise };