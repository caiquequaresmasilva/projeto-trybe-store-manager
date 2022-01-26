const { expect } = require("chai");
const sinon = require("sinon");
const connection = require("../../models/connection");

const productsModel = require("../../models/productsModel");
const salesModel = require('../../models/salesModel');

const productPayload = {
  id: 1,
  name: "Martelo do Thor",
  quantity: 100,
};
const TEST_NAME = "Martelo do Thor";
const TEST_ID = 1;
const productsList = [
  {
    id: 1,
    name: "produto A",
    quantity: 10,
  },
  {
    id: 2,
    name: "produto B",
    quantity: 20,
  },
];
const sale =   [
  {
    "product_id": 1,
    "quantity": 2
  },
  {
    "product_id": 2,
    "quantity": 5
  }
]

describe("Testes da camada Model", () => {
  describe("Na entidade 'products'", () => {
    describe("O método 'create'", () => {
      before(async () => {
        const execute = [{ insertId: TEST_ID }];
        sinon.stub(connection, "execute").resolves(execute);
      });

      after(async () => {
        connection.execute.restore();
      });
      it("Deve cadastrar um novo produto e retornar um objeto", async () => {
        const response = await productsModel.create(productPayload);
        expect(response).to.be.an("object");
      });

      it("Deve retornar o id do novo produto inserido no objeto", async () => {
        const response = await productsModel.create(productPayload);
        expect(response).to.have.a.property("id");
      });
    });

    describe("O método 'getByName'", () => {
      before(async () => {
        const execute = [[productPayload]];
        sinon.stub(connection, "execute").resolves(execute);
      });

      after(async () => {
        connection.execute.restore();
      });

      it("Deve retornar um objeto", async () => {
        const response = await productsModel.getByName(TEST_NAME);
        expect(response).to.be.an("object");
      });
      it("Deve retornar um produto com o nome estipulado", async () => {
        const response = await productsModel.getByName(TEST_NAME);
        expect(response.name).to.be.equal(TEST_NAME);
      });
    });
    describe("O método 'getAll'", () => {
      before(async () => {
        const execute = [productsList];
        sinon.stub(connection, "execute").resolves(execute);
      });

      after(async () => {
        connection.execute.restore();
      });
      it("Deve retornar um array de objetos", async () => {
        const response = await productsModel.getAll();
        response.forEach((obj) => expect(obj).to.be.an("object"));
      });
      it("Deve retornar uma lista de produtos", async () => {
        const response = await productsModel.getAll();
        expect(response).to.be.eql(productsList);
      });
    });
    describe("O método 'getById'", () => {
      before(async () => {
        const execute = [[productPayload]];
        sinon.stub(connection, "execute").resolves(execute);
      });
      after(async () => {
        connection.execute.restore();
      });

      it("Deve retornar um objeto", async () => {
        const response = await productsModel.getById(TEST_ID);
        expect(response).to.be.an("object");
      });

      it("Deve retornar um produto com o id estipulado", async () => {
        const response = await productsModel.getById(TEST_ID);
        expect(response.id).to.be.equal(TEST_ID);
      });
    });
  });
  describe("Na entidade 'sales'", () => {
    describe("O método 'create'", () => {
      before(async () => {
        const execute = [{ insertId: TEST_ID }];
        const query = null
        sinon.stub(connection, "execute").resolves(execute);
        sinon.stub(connection, "query").resolves(query);
      });

      after(async () => {
        connection.execute.restore();
      });
      it("Deve cadastrar uma nova venda e retornar um objeto", async () => {
        const response = await salesModel.create(sale);
        expect(response).to.be.an("object");
      });

      it("Deve retornar o id da nova venda inserido no objeto", async () => {
        const response = await salesModel.create(sale);
        expect(response).to.have.a.property("id");
      });
    });
  });
});
