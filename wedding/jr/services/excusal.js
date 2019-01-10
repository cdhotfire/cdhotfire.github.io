export default {
    model(t) {
        return t.$http.get("api/excusal/model");
    },
    getExcusalStatus(t, request) {
        return t.$http.post(
            "api/excusal/getExcusalStatus",
            request
        );
    }
};