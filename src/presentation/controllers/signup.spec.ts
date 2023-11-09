import { MissingParamError } from "../protocols/errors/missing-param-error";
import { SignUpController } from "./signup";

const makeSut = (): SignUpController => new SignUpController();

describe("SignUp Controller", () => {
  test("Should return 400 if no name is provided", () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        email: "joe@email.com",
        password: "any_password",
        passwordConfirmation: "any_password",
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("name"));
  });

  test("Should return 400 if no email is provided", () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        name: "Joe Doe",
        password: "any_password",
        passwordConfirmation: "any_password",
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("email"));
  });

  test("Should return 400 if no password is provided", () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        name: "Joe Doe",
        email: "joe@email.com",
        passwordConfirmation: "any_password",
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("password"));
  });

  test("Should return 400 if no passwordConfirmation is provided", () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        name: "Joe Doe",
        email: "joe@email.com",
        password: "any_password",
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(
      new MissingParamError("passwordConfirmation")
    );
  });
});
