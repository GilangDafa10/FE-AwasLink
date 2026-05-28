import api from "@/api/axios";

export default {
    getLogs(page = 1, limit = 20) {
        return api.get("/admin/logs", {
            params: { page, limit },
        });
    },
    deleteAllLogs() {
        return api.delete("/admin/logs");
    },
    deleteLog(id) {
        return api.delete(`/admin/logs/${id}`);
    },
};
