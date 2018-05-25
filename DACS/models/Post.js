
const mongoose = require('mongoose');
const ObjectID = require('mongoose').ObjectID
const Address = require('./Address');

const SchemaPost = mongoose.Schema;

const PostSchema = new SchemaPost({
    title:         { type: String, required: true, trim: true },
    contentSmall:  { type: String, required: true },
    contentLarge:  { type: String},
    image:         { type: String },
    price:         { type: Number, required: true},
    acreage:       { type: String},//Dien tích
    statusCurrent: { type: Boolean, default: 1 }, //1.active 0.block
    createAt:      { type: Date, default: Date.now() },
    updateAt:      { type: Date, default: Date.now() },
    CategoryID:    { type: String}
});
const PostMongo = mongoose.model('Post', PostSchema);

class Post extends PostMongo {
    static async addPost( CategoryID, title, contentSmall, contentLarge, image, price, acreage, Tinh,Huyen, Thon_Xa){
        const post = new Post({ CategoryID, title, contentSmall, contentLarge, image, price, acreage})
        const postNew = await post.save(); // _id
        if (!postNew) throw new error('add_post_fail');
        const addressTemp = new Address({Post_ID: mongoose.Types.ObjectId(postNew._id), Tinh: Tinh, Huyen: Huyen, Thon_Xa: Thon_Xa});
        const addResSave = await addressTemp.save();
        if (!addResSave) throw new error('add_address_fail');
        return postNew;
    }

    static async removePost(idPost )
    {
        let postResult = await Post.findByIdAndUpdate(idPost, {
            statusCurrent: 0,
            updateAt: Date.now()
        })
        if(!postResult) throw new error('Cannot_find_by_idPost')
        return postResult;
    }

    static async updatePost(idPost, CategoryID, title, contentSmall, contentLarge, image, price, acreage, Tinh,Huyen, Thon_Xa)
    {
        let postResult = await Post.findByIdAndUpdate(idPost, {
            CategoryID: CategoryID,
            title: title,
            contentSmall: contentSmall,
            contentLarge: contentLarge,
            image: image,
            price: price,
            acreage: acreage,
            Tinh: Tinh,
            Huyen: Huyen,
            Thon_Xa: Thon_Xa
        }, { new: true }) 
        if(!postResult) throw new error('can_not_update_post');
        const addressTemp = new Address({Post_ID: postResult._id, Tinh: Tinh, Huyen: Huyen, Thon_Xa: Thon_Xa});
        const addResSave = await addressTemp.save();
        if (!addResSave) throw new error('add_address_fail');
        return addResSave;
    }
    static async getListPost() {
        // let listPost = await Post.find({}); //array Post || list post
        // listPost.forEach(async post => {
        //     const addressDetail = await Address.findOne({Post_ID: post._id});
        //     !addressDetail ? addressDetail = undefined : addressDetail;
        //     post['address'] = addressDetail;
        // });
        // console.log(listPost)
        // myObjectId = mongoose.Types.ObjectId(Post_ID); 
        
        const listPost = await Post.aggregate([
            {
                $lookup: {
                    from: "addresses",
                    localField: "_id",
                    foreignField: "Post_ID",
                    as: 'Address',
                }
            }
    ])
        console.log(listPost)
        console.log(listPost[0].Address[0].Thon_Xa)
        if(!listPost) throw new error('can_not_getList_post');
        return listPost;
    }
}
module.exports = Post;
