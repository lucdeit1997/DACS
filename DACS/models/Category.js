const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
   CategoryName: { type: String, required: true },
   IsShow:       { type: Boolean, default: 1 }
});

const CategoryMongo = mongoose.model('Category', CategorySchema);

class Category extends CategoryMongo {
    static async addCategory( CategoryName ){
        const CategoryTemp = new Category({ CategoryName })
        const CategoryNew = await CategoryTemp.save(); // _id
        if (!CategoryNew) throw new error('add_Category_fail');
        return CategoryNew;
    }

    static async getListCategory(){
            var condition= {
                IsShow: 1
            };
           let listCategory = await Category.find(condition);
            if(!listCategory) throw new error("can not get list");
            return listCategory;
    }
    static async removeCategory(CategoryId)
    {
        let categoryResult = await Category.findByIdAndUpdate(CategoryId, {IsShow: 0});
        if(!categoryResult) throw new error("can not remove list");
            return categoryResult;
    }
    static async updateCategory(CategoryId, CategoryName)
    {
        let categoryResult = await Category.findByIdAndUpdate(CategoryId, {CategoryName: CategoryName});
        if(!categoryResult) throw new error("can not update list");
            return categoryResult;
    }
}
module.exports = Category;