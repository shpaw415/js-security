import * as pass from "bcrypt";
class passwordManager {
    saltRound = 10;
    password_plain = "";
    password_hash = "";
    async hash(password) {
        let resolver = () => { };
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
    async verify(password, hash) {
        this.password_hash = hash;
        this.password_plain = password;
        return await pass.compare(password, hash);
    }
}
export default function Password() {
    return new passwordManager();
}
