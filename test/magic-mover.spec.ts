import 'reflect-metadata'
import mongoose from 'mongoose';
import request from 'supertest';
import createServer from '../src/utils/server';
import { HttpStatusCodes } from '../src/utils/httpStatusCodes';
import { magicMoverStates } from '../src/interfaces/magic-mover.interface';
const app = createServer();

describe('Magic Mover Test', () => {
    /**
     * mover id and item id which we will create them 
     */
    let moverId: string;
    let itemId: string;

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
     * create a new mover
     */
    it('should create a magic mover', async () => {
        const response = await request(app).post(`/api/magic-movers`).send({name:'test',weightLimit:59});
        moverId = response.body['_id'];
        expect(response.statusCode).toBe(HttpStatusCodes.CREATED.code);
    });
    
    /**
     * get the created mover
     */
    it('should get the magic mover data', async () => {
        const response = await request(app).get(`/api/magic-movers/${moverId}`);
        expect(response.statusCode).toBe(HttpStatusCodes.OK.code);
        expect(response.body['_id']).toEqual(moverId);
    });
    
    /**
     * there is no items to start a mission
     */
    it('shouldn\'t start a mission', async () => {
        const response = await request(app).post(`/api/magic-movers/start-mission/${moverId}`);
        expect(response.statusCode).toBe(HttpStatusCodes.BAD_REQUEST.code);    
    });

    /**
     * there is no mission to end
     */
    it('shouldn\'t end a mission', async () => {
        const response = await request(app).post(`/api/magic-movers/end-mission/${moverId}`);
        expect(response.statusCode).toBe(HttpStatusCodes.BAD_REQUEST.code);    
    });
    
    /**
     * there is no items to hold
     */
    it('shouldn\'t start loading', async () => {
        const response = await request(app).post(`/api/magic-movers/load/`).send({id:moverId});
        expect(response.statusCode).toBe(HttpStatusCodes.BAD_REQUEST.code);
    });
    
    /**
     * there is no items to hold
     */
    it('shouldn\'t start loading', async () => {
        const response = await request(app).post(`/api/magic-movers/load/`).send({id:moverId,itemIds:[]});
        expect(response.statusCode).toBe(HttpStatusCodes.BAD_REQUEST.code);
    });

    /**
     * there is to much weight
     */
    it('shouldn\'t start loading', async () => {
        const response = await request(app).post(`/api/magic-movers/load/`).send({id:moverId,itemIds:[itemId,itemId,itemId]});
        expect(response.statusCode).toBe(HttpStatusCodes.BAD_REQUEST.code);
    });
    
    /**
     * the weight is suitable
     */
    it('should start loading', async () => {
        const response = await request(app).post(`/api/magic-movers/load/`).send({id:moverId,itemIds:[itemId]});        
        expect(response.statusCode).toBe(HttpStatusCodes.OK.code);
        expect(response.body.magicMover['_id']).toEqual(moverId);
        expect(response.body.magicMover['state']).toEqual(magicMoverStates.Loading);
    });
    
    /**
     * there is an item to start a mission
     */
    it('should start a mission' , async () => {
        const response = await request(app).post(`/api/magic-movers/start-mission/${moverId}`);
        expect(response.statusCode).toBe(HttpStatusCodes.OK.code);
        expect(response.body.magicMover['_id']).toEqual(moverId);
        expect(response.body.magicMover['state']).toEqual(magicMoverStates.OnMission);
    });
    
    /**
     * there is a mission and we can end it
     */
    it('should end a mission' , async () => {
        const response = await request(app).post(`/api/magic-movers/end-mission/${moverId}`);        
        expect(response.statusCode).toBe(HttpStatusCodes.OK.code);
        expect(response.body.magicMover['_id']).toEqual(moverId);
        expect(response.body.magicMover['state']).toEqual(magicMoverStates.Resting);
        expect(response.body.magicMover['completedMissions']).toBe(1);
    });

    afterAll(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    });
})