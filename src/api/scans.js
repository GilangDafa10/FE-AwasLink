import api from "@/api/axios";

export default {
    getScan() {
        return api.get("/scans")
    },
    createScan(data) {
        return api.post("/scans", data)
    }
}