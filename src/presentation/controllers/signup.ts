import { badRequest } from "../helpers/http-helper";
import { MissingParamError } from "../protocols/errors/missing-param-error";
import { HttpRequest, HttpResponse } from "../protocols/http";

export class SignUpController {
  handle(httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return badRequest(new MissingParamError("name"));
    }
    return badRequest(new MissingParamError("email"));
  }
}
