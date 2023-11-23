import { badRequest } from "../helpers/http-helper";
import { Controller } from "../protocols/controller";
import { EmailValidator } from "../protocols/email-validator";
import { InvalidParamError } from "../protocols/errors/invalid-param-error";
import { MissingParamError } from "../protocols/errors/missing-param-error";
import { ServerError } from "../protocols/errors/server-error";
import { HttpRequest, HttpResponse } from "../protocols/http";

export class SignUpController implements Controller {
  constructor(private readonly emailValidator: EmailValidator) {}

  handle(httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = [
        "name",
        "email",
        "password",
        "passwordConfirmation",
      ];

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }
      const isValid = this.emailValidator.isValid(httpRequest.body.email);
      if (!isValid) {
        return badRequest(new InvalidParamError("email"));
      }
      return {
        statusCode: 200,
        body: { message: "SignUp successful" },
      };
    } catch {
      return {
        statusCode: 500,
        body: new ServerError(),
      };
    }
  }
}
