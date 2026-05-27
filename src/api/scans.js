import api from "@/api/axios";

export default {
    getScan() {
        return api.get("/dashboard/public/history")
    },
    createScan(data) {
        return api.post("/scans", data)
    }
}