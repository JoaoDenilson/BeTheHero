const request = require('supertest');
const app = require('../../src/app');
const { post } = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    beforeEach(async () =>{
        await connection.migrate.rollback();
        await connection.migrate.latest();
    })

    afterAll(async () =>{
        await connection.destroy();
    })

    it('should be able to create a new ONG', async () => {
        const response = await request(app)
            .post('/ongs')
            //Headers da requisição
            //set('authorization', 'value_id')
            .send({     
                name: "reget 6",
                email: "contact@reget.com",
                whatsapp: "8812345678",
                city: "Cedro",
                uf: "CE"
            });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    })
});