import { badRequest } from "../../helpers/http-helper";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";

export default class LoginController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.email) {
      return new Promise((resolve) => {
        resolve(badRequest(new Error("Missing param: email")));
      });
    }
    return new Promise((resolve) => {
      resolve(badRequest(new Error("Missing param: password")));
    });
  }
}
