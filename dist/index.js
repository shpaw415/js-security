import * as server from "./server/password";
export * from "./both/security";
export const password = () => server.default;
