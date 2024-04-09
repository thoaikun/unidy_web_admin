import { Session } from "@models/session";
import api from "./base";

const authenticate = async (email: string, password: string) => {
    const response = await api.post("api/v1/admin/authenticate/login", {
        email,
        password,
    });
    return response.data as Session
}

const authenticateService = {
    authenticate,
}

export default authenticateService;