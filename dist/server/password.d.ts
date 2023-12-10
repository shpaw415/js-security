declare class passwordManager {
    private saltRound;
    private password_plain;
    private password_hash;
    hash(password: string): Promise<string>;
    verify(password: string, hash: string): Promise<boolean>;
}
export default function Password(): passwordManager;
export {};
