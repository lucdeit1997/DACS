const mongoose = require('mongoose');
const post = require('../routing/Post.router')
const SchemaAddress = mongoose.Schema;
//_id
const AddressSchema = new SchemaAddress({
    Post_ID :      { type: SchemaAddress.Types.ObjectId, required: true },
    Tinh:          { type: String, required: true },
    Huyen:         { type: String, required: true },
    Thon_Xa:       { type: String, required: true },
});
const AddressMogo = mongoose.model('Address', AddressSchema);
class Address extends AddressMogo{
    static async getListAddress(){
        let listAddress = await Address.find();
        if(!listAddress) throw new error("can not get list");
        return listAddress;
    }
}
module.exports = Address;