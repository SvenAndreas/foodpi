const { Recipe, conn } = require('../../src/db.js');
const { expect } = require('chai');

const recipe = {
  name: 'Milanea a la napolitana',
  healthScore:"asdsad",
  summary:"Trying",
  dishTypes: "Lunch",
  readyInMinutes:30,
  analyzedInstructions:"yeah",
  image:"www.com.asd"
};

describe('Recipe model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Recipe.sync({ force: true }));

    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Recipe.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Recipe.create({ name: 'Milanesa a la napolitana' });
      });
      it("should throw an error if name is not a string",(done)=>{
        Recipe.create({name:33})
          .then(()=> done(new Error("Name only accepts strings")))
          .catch(()=>done())
      }); 
    });
    
    describe("HealthScore",()=>{
      it("Should throw an error if health score is null",(done)=>{
        Recipe.create({})
          .then(()=> done(new Error("Health Score can not be null")))
          .catch(()=>done())
      })
      it("Should throw an error if health score is not an integer",(done)=>{
        Recipe.create(recipe)
          .then(()=>done(new Error("Health score must be an integer")))
          .catch(()=>done())
      })
    })

  });
});
