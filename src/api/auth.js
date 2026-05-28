import api from "@/api/axios";

export default {
    login(data) {
        return api.post("/auth/login", data)
    }
}