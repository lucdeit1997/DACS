const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {hash, compare} = require('bcrypt');
const promise = require('bluebird');
const jwt = require('jsonwebtoken');
const {signPromise, verifyPromise} = require('../helpers/jwt');
const UserSchema = new Schema({
   UserName:    { type: String, required: true },
   Password:    { type: String, required: true },
   FullName:    { type: String, required: true },
   Address:     { type: String, required: true },
   Phone:       { type: String, required: true },
   Permission:  { type: Number, default: 0}, // 0 là user 1 là superUser 2 là Admin.
   IsShow:      { type: Boolean, default: 1 }
});

const UserMongo = mongoose.model('User', UserSchema);

class User extends UserMongo {
     static async signUp( UserName, Password, FullName, Address, Phone, Permission){
        const isExist = await User.find({
            $or: [
                { UserName: UserName },
                { Phone: Phone },
            ]
        });
        var tag = -1;
        if (isExist.length > 0)
        {
            const check = isExist.find(userz => userz.UserName === UserName)
            check ? console.log('UserName Exist') : console.log('phone Exitst');
            return;
        }
        const UserTemp = new User({ UserName, Password, FullName, Address, Phone, Permission})        
        const UserNew = await UserTemp.save(); // _id
        if ( !UserNew ) throw new error('SignUp_fail');
        return UserNew;
    }

    static signIn( UserName, Password ){
        return new promise((resolve, reject)=>{
            User.findOne({UserName}).then(async result => {
                if (!result) return reject({error: 'user_not_exist'});
                compare(Password, result.Password).then(checkPassword =>{
                    if (!checkPassword) return reject({error: 'password_fail'});
                })
                const objRes = {};
                objRes.userId = result._id;
                objRes.permission = result.Permission;
                const token = await signPromise(objRes);
                if (!token) return reject({error: 'cannot_convert_token'});
                result.Password = undefined; 
                return resolve({token, result})
            })
        })
    }
    static async getInfoUser(userId) {
        let result = await User.findById(userId);
        if( !result ) throw new error('get info user fail');
        return result;
    }

    static async removeUser(userId){
        let result = await User.findByIdAndUpdate( userId, { IsShow: 0 });
        if( !result ) throw new error('Delete user fail');
        return result;
    }
}
module.exports = User;