const { expect } = require("chai");
const sinon = require("sinon");

const productsModel = require("../../models/productsModel");
const salesModel = require("../../models/salesModel");

const productsService = require("../../services/productsService");
const salesService = require("../../services/salesService");

const product = { name: "produto", quantity: 10 };
const productResponse = {
  id: 1,
  name: "Martelo do Thor",
  quantity: 100,
};
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
const TEST_ID = 1;

describe("Testes da camada Service", () => {
  describe("Na entidade products", () => {
    describe("O método 'create'", () => {
      before(async () => {
        const create = { id: TEST_ID };
        sinon.stub(productsModel, "getByName").resolves(false);
        sinon.stub(productsModel, "create").resolves(create);
      });
      after(async () => {
        productsModel.getByName.restore();
        productsModel.create.restore();
      });
      it("Deve cadastrar um novo produto e retornar um objeto", async () => {
        const response = await productsService.create(product);
        expect(response).to.be.an("object");
      });

      it("Deve retornar o produto cadastrado com seu id", async () => {
        const response = await productsService.create(product);
        expect(response).to.be.eql({ id: TEST_ID, ...product });
      });
    });
    describe("O método 'getAll'", () => {
      before(async () => {
        const getAll = productsList;
        sinon.stub(productsModel, "getAll").resolves(getAll);
      });

      after(async () => {
        productsModel.getAll.restore();
      });
      it("Deve retornar um array de objetos", async () => {
        const response = await productsService.getAll();
        response.forEach((obj) => expect(obj).to.be.an("object"));
      });
      it("Deve retornar uma lista de produtos", async () => {
        const response = await productsService.getAll();
        expect(response).to.be.eql(productsList);
      });
    });
    describe("O método 'getById'", () => {
      before(async () => {
        sinon.stub(productsModel, "getById").resolves(productResponse);
      });
      after(async () => {
        productsModel.getById.restore();
      });

      it("Deve retornar um objeto", async () => {
        const response = await productsService.getById(TEST_ID);
        expect(response).to.be.an("object");
      });

      it("Deve retornar um produto com o id estipulado", async () => {
        const response = await productsService.getById(TEST_ID);
        expect(response.id).to.be.equal(TEST_ID);
      });
    });
  });
});
