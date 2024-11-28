import 'reflect-metadata'
import mongoose from 'mongoose';
import request from 'supertest';
import createServer from '../src/utils/server';
import { HttpStatusCodes } from '../src/utils/httpStatusCodes';
const app = createServer();

describe('Magic Item Test', () => {
    /**
     * item id which we will create it
     */
    let itemId:string;

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URL_TEST || 'mongodb://localhost:27017/task-test');
    });

    /**
     * create a new item
     */
    it('should create a magic item', async () => {
        const response = await request(app).post(`/api/magic-items`).send({name:'test',weight:20});
        itemId = response.body['_id'];
        expect(response.statusCode).toBe(HttpStatusCodes.CREATED.code);
    });

    /**
     * get the created item
     */
    it('should get the magic item data', async () => {
        const response = await request(app).get(`/api/magic-items/${itemId}`);
        expect(response.statusCode).toBe(HttpStatusCodes.OK.code);
        expect(response.body['_id']).toEqual(itemId);
    });
    
    /**
     * update the created item
     */
    it('should update the magic item data', async () => {
        const response = await request(app).patch(`/api/magic-items/${itemId}`).send({name:"new test"});
        expect(response.statusCode).toBe(HttpStatusCodes.OK.code);
        expect(response.body['name']).toEqual('new test');
    });
    
    /**
     * there is no data for update
     */
    it('shouldn\'t update the magic item data', async () => {
        const response = await request(app).patch(`/api/magic-items/${itemId}`).send({});
        expect(response.statusCode).toBe(400);
    });

    /**
     * delete the created item
     */
    it('should delete the magic item data', async () => {
        const response = await request(app).delete(`/api/magic-items/${itemId}`).send({name:"new test"});
        expect(response.statusCode).toBe(HttpStatusCodes.OK.code);
    });

    /**
     * there is no item because we have deleted it
     */
    it('shouldn\'t find a magic item', async () => {
        const response = await request(app).get(`/api/magic-items/${itemId}`);
        expect(response.statusCode).toBe(HttpStatusCodes.NOT_FOUND.code);
    });
    
    /**
     * there is no item because we have deleted it
     */
    it('shouldn\'t delete a magic item', async () => {
        const response = await request(app).delete(`/api/magic-items/${itemId}`);
        expect(response.statusCode).toBe(HttpStatusCodes.NOT_FOUND.code);
    });
    
    /**
     * there is no item because we have deleted it
     */
    it('shouldn\'t update a magic item', async () => {
        const response = await request(app).delete(`/api/magic-items/${itemId}`).send({name:"new test"});        
        expect(response.statusCode).toBe(HttpStatusCodes.NOT_FOUND.code);
    });

    /**
     * there is no enough data to create an item
     */
    it('shouldn\'t create a magic item', async () => {
        const response = await request(app).post(`/api/magic-items/`).send({name:"test"});        
        expect(response.statusCode).toBe(HttpStatusCodes.BAD_REQUEST.code);
    });
    
    afterAll(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    });
})