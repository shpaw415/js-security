import * as pass from "bcrypt";

export default function Password() {
  class Password {
    private saltRound = 10;
    private password_plain = "";
    private password_hash = "";

    async hash(password: string) {
      let resolver: (() => void) | ((value: unknown) => void) = () => {};
      let prom = new Promise((resolve) => {
        resolver = resolve;
      });
      this.password_plain = password;
      const salt = await pass.genSalt(this.saltRound);
      let res = "";
      pass.hash(this.password_plain, salt, (err, password_enc) => {
        this.password_hash = password_enc;
        resolver(true);
      });
      await prom;
      return this.password_hash;
    }
    async verify(password: string, hash: string) {
      this.password_hash = hash;
      this.password_plain = password;
      return await pass.compare(password, hash);
    }
  }
  return new Password();
}
