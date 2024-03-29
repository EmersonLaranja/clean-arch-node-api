import request from "supertest";
import app from "../config/app";
import { MongoHelper } from "../../infra/db/mongodb/helpers/mongo-helper";

describe("Signup Routes", () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    await MongoHelper.getCollection("accounts").deleteMany({});
  });

  test("Should return an account on success", async () => {
    await request(app)
      .post("/api/signup")
      .send({
        name: "Emerson",
        email: "emerson@mail.com",
        password: "123",
        passwordConfirmation: "123",
      })
      .expect(200);
  });
});
