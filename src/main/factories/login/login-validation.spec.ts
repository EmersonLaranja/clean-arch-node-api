import {
  CompareFieldsValidation,
  EmailValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from "../../../presentation/helpers/validators";
import { Validation } from "../../../presentation/protocols/validation";
import { EmailValidator } from "../../../presentation/protocols/email-validator";
import { makeLoginValidation } from "./login-validation";

jest.mock("../../../presentation/helpers/validators/validation-composite");
const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true; //always initialize a positive value, so it won't alter other tests
    }
  }
  return new EmailValidatorStub();
};
describe("LoginValidation Factory ", () => {
  test("Should call ValidationComposite with all validations", () => {
    makeLoginValidation();
    const validations: Validation[] = [];

    for (const field of ["email", "password"]) {
      validations.push(new RequiredFieldValidation(field));

      validations.push(new EmailValidation("email", makeEmailValidator()));
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
