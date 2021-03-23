const articlesMock = [{
    "id_articulo": 1,
    "descripcion": "Tomatoes - Roma",
    "precio": 948.98,
    "stock": 74,
    "imagen": "http://dummyimage.com/231x130.jpg/cc0000/ffffff",
    "activo": true
  }, {
    "id_articulo": 2,
    "descripcion": "Muffin - Blueberry Individual",
    "precio": 936.6,
    "stock": 86,
    "imagen": "http://dummyimage.com/179x200.jpg/cc0000/ffffff",
    "activo": true
  }, {
    "id_articulo": 3,
    "descripcion": "Bacardi Raspberry",
    "precio": 362.24,
    "stock": 21,
    "imagen": "http://dummyimage.com/144x232.bmp/dddddd/000000",
    "activo": true
  }, {
    "id_articulo": 4,
    "descripcion": "Spice - Peppercorn Melange",
    "precio": 432.4,
    "stock": 47,
    "imagen": "http://dummyimage.com/168x156.jpg/5fa2dd/ffffff",
    "activo": true
  }, {
    "id_articulo": 5,
    "descripcion": "Soda Water - Club Soda, 355 Ml",
    "precio": 434.5,
    "stock": 3,
    "imagen": "http://dummyimage.com/221x190.bmp/dddddd/000000",
    "activo": true
  }]

class articleControllerMock {
  async getAll() {
    return Promise.resolve(articlesMock);
  }
}

module.exports = {
    articlesMock,
    articleControllerMock
};
  