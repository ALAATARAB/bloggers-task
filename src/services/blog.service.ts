import  BlogModel from "../models/blog.model";
import IBlog from "../interfaces/blog.interface";
import { Document, ObjectId } from "mongoose";

type BlogDoc = (Document & IBlog);

export default class BlogService {
    
    createBlog = async (blog: IBlog) : Promise<BlogDoc> => {
        return await BlogModel.create(blog);
    }

    getBlogs = async (page: number|null, limit: number|null) : Promise<BlogDoc[]> => {
        if(page===null || limit===null)
            return await BlogModel.find();
        let skip: number = (page-1)*limit;
        return await BlogModel.find().skip(skip).limit(limit);
    }

    getById = async (blogId: ObjectId) : Promise<BlogDoc|null> => {
        return await BlogModel.findById(blogId);
    }

    updateBlog = async (blogId: ObjectId, newContent: string) : Promise<BlogDoc> => {
        return await BlogModel.findByIdAndUpdate(blogId, {content: newContent}, {new:true}) as BlogDoc;
    }

    deleteBlog = async (blogId: ObjectId) : Promise<BlogDoc> => {
        return await BlogModel.findByIdAndDelete(blogId) as BlogDoc;
    }
}