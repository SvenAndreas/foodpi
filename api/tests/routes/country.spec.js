/* eslint-disable import/no-extraneous-dependencies */
const {expect} = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, conn } = require('../../src/db.js');

const agent = session(app);
const recipe = {
  name: 'Milanea a la napolitana',
  healthScore:22,
  summary:"Trying",
  dishTypes: "Lunch",
  readyInMinutes:30,
  analyzedInstructions:"yeah",
  image:"www.com.asd"
};

describe('Recipe routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Recipe.sync({ force: true })
    .then(() => Recipe.create(recipe)));
  describe('GET /recipes', () => {
    it('should get 200', (done) =>
      agent.get('/recipes').expect(200)
    );
    it("should get 404 if mandatory parameters missing",async()=>{
          await agent.post("/recipe").send({"name":"milanesa"}).expect(404)
    })
  });
});
