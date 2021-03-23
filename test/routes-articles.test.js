const assert = require("assert"); //Para realizar comparaciones
const proxyquire = require("proxyquire"); //Permite reemplazar dependencias durante los test

const {
  articleControllerMock //Es un mock del controlador, osea realiza funciones de prueba sin llamar al servidor
} = require("../backend/utils/mocks/articles");

const testServer = require("../backend/utils/testServer"); //Permite crear un server de testeo

describe("routes - api - articles", function() {
  const route = proxyquire("../backend/routes/routes", {
    "../controllers/article-controller": articleControllerMock //Reemplaza la dependencia article controller por el mock
    //Dicha dependencia es de routes
  });

  const request = testServer(route);//Crea el servidor con las rutas habituales, solo que el controlador está mockeado

  describe("GET /articles", function() {//Testeamos el metodo get de articulos
    it("should respond with status 200", function(done) {//Done permite esperar la respuesta de la funcion asincrona
      request.get("/articles").expect(200, done);
    });

    it("should respond with content type json", function(done) {
      request.get("/articles").expect("Content-type", /json/, done);
    });

    it("should respond with not error", function(done) {
      request.get("/articles").end((err, res) => {
        assert.strictEqual(err, null);
        done();
      });
    });
  });
});