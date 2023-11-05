import { badRequest } from "../helpers/http-helper";
import { MissingParamError } from "../protocols/errors/missing-param-error";
import { HttpRequest, HttpResponse } from "../protocols/http";

export class SignUpController {
  handle(httpRequest: HttpRequest): HttpResponse {
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
    throw new Error("Ocorreu um erro inesperado!");
  }
}
