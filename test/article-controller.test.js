const assert = require("assert");//Para realizar comparaciones
const sinon = require("sinon");//Sinon permite reemplazar funciones sin tener en cuenta las dependencias
var articleController =  require("../backend/controllers/article-controller");

const {
  articlesMock//Es un json con articulos de prueba
} = require("../backend/utils/mocks/articles");

describe("article controllers", function() {
  
  before(() => getAllStub = sinon.stub(articleController, "getAll").resolves(articlesMock)); //Reemplaza la funcion
  //getAll de articleController con una que simplemente devuelve una promesa con los articulos de prueba
  after(() => articleController.getAll.restore());

  describe("when getAll method is called", async function() {
    it(" should call the getAll mock method", async function() {
      await articleController.getAll();
      assert.strictEqual(getAllStub.called, true);//Simplemente comprueba que la funcion haya sido reemplazada
    });

    it("should return an array of products", async function() {
      const result = await articleController.getAll();
      const expected = articlesMock;
      assert.deepStrictEqual(result, expected);//Comprueba que devuelva el mock de articulos
    });
  });

});