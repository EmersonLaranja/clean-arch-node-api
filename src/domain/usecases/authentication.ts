export default class Authentication {
  async auth(email: string, password: string): Promise<string>;
}
