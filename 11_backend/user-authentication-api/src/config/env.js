import { loadEnvFile } from "process";

const loadEnv = () => {
    return loadEnvFile(".env")
}

export default loadEnv;