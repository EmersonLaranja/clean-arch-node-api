import { badRequest } from "../../helpers/http-helper";
import LoginController from "./login";

describe("Login Controller", () => {
  test("Should return 400 if no email is provided", async () => {
    const sut = new LoginController();
    const httpRequest = {
      body: {
        password: "any_password",
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(badRequest(new Error("Missing param: email")));
  });
});