const assert = require("assert");
const proxyquire = require("proxyquire");

const {
  productsMock,
  articleControllerMock
} = require("../backend/utils/mocks/articles");

const testServer = require("../backend/utils/testServer");

describe("routes - api - articles", function() {
  const route = proxyquire("../backend/routes/routes", {
    "../controllers/article-controller": articleControllerMock
  });

  const request = testServer(route);

  describe("GET /articles", function() {
    it("should respond with status 200", function(done) {
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