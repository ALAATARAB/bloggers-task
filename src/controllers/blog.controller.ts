import { Request, Response, NextFunction } from "express";
import { HttpStatusCodes } from "../utils/httpStatusCodes";
import { ObjectId } from "mongoose";
import BlogService from "../services/blog.service";
import logger from "../utils/logger";
import ApiError from "../utils/api-error";

export default class BlogController {
    private blogService: BlogService = new BlogService();

    post = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let content: string = req.body.content;
            let userId: string = req.body.userId;
            const blog = await this.blogService.createBlog({userId,content});
            logger.info(`user #${userId}: has created a blog #${blog._id}`);
            res.status(HttpStatusCodes.CREATED.code).send(blog);
        }
        catch(err) {
            next(err);
        }
    }
    
    get = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let page: number|null = (req.query.page ? Number(req.query.page) : null);
            let limit: number|null = (req.query.limit ? Number(req.query.limit) : null);
            const blogs = await this.blogService.getBlogs(page,limit);
            res.status(HttpStatusCodes.OK.code).send(blogs)
        } catch (err) {
            next(err);
        }
    }
    
    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id as unknown;
            const {content , userId} = req.body;
            const oldBlog = await this.blogService.getById(id as ObjectId);
            if(!oldBlog) {
                throw new ApiError("The blog doesn't exist",HttpStatusCodes.NOT_FOUND.code);
            }
            if(oldBlog?.userId!==userId) {
                throw new ApiError("You are not the owner",HttpStatusCodes.UNAUTHORIZED.code);
            }

            const blog = await this.blogService.updateBlog(id as ObjectId, content);
            logger.info(`blog #${id}: has updated`)
            res.status(HttpStatusCodes.OK.code).send(blog);
        } catch (err) {
            next(err);
        }
    }

    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id as unknown;
            const deletedBlog = await this.blogService.deleteBlog(id as ObjectId);
            logger.info(`blog #${id}: has deleted`);
            res.status(HttpStatusCodes.OK.code).send(deletedBlog);
        } catch (err) {
            next(err)
        }
    }
}