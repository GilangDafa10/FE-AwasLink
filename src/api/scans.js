import api from "@/api/axios";

export default {
    getScan(page = 1, limit = 20) {
        return api.get("/scans/history", { params: { page, limit } })
    },
    createScan(data) {
        return api.post("/scans", data)
    }
}