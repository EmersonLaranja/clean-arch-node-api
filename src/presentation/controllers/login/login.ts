import { InvalidParamError, MissingParamError } from "../../errors";
import { badRequest, ok } from "../../helpers/http-helper";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";
import { EmailValidator } from "../signup/signup-protocols";

export default class LoginController implements Controller {
  constructor(private readonly emailValidator: EmailValidator) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.email) {
      return new Promise((resolve) => {
        resolve(badRequest(new MissingParamError("email")));
      });
    }
    if (!httpRequest.body.password) {
      return new Promise((resolve) => {
        resolve(badRequest(new MissingParamError("password")));
      });
    }
    const isValid = this.emailValidator.isValid(httpRequest.body.email);

    if (!isValid) {
      return new Promise((resolve) => {
        resolve(badRequest(new InvalidParamError("email")));
      });
    }
    return {
      body: {},
      statusCode: 200,
    };
  }
}
