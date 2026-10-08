
//.env configs
import { loadEnvFile } from "process"

export const loadEnv = () => {

    return loadEnvFile(".env");
}
