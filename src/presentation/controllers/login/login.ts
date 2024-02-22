import { InvalidParamError, MissingParamError } from "../../errors";
import { badRequest, ok } from "../../helpers/http-helper";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";
import { EmailValidator } from "../signup/signup-protocols";

export default class LoginController implements Controller {
  constructor(private readonly emailValidator: EmailValidator) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { email, password } = httpRequest.body;

    if (!email) {
      return new Promise((resolve) => {
        resolve(badRequest(new MissingParamError("email")));
      });
    }
    if (!password) {
      return new Promise((resolve) => {
        resolve(badRequest(new MissingParamError("password")));
      });
    }
    const isValid = this.emailValidator.isValid(email);

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
