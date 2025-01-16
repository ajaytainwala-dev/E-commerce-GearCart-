import mongoose, { Schema, Document } from "mongoose";

interface ICategory extends Document{
    category_id: number;
    category_image:string;
    name: string;
    description: string;
    parent_Category:Schema.Types.ObjectId;
}

const CategorySchema : Schema = new Schema({
    category_id:{
        type: Number,
        required: true,
        unique: true,
    },
    category_image:{
        type: String,
        required: false,
    },
    name:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: false,
    },
    parent_Category:{
        type:Schema.Types.ObjectId,
        ref: "Category",
        required: false,
    },
})

const Category = mongoose.model<ICategory>("Category", CategorySchema);

export default Category;
