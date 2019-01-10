export default {
    model(t) {
        return t.$http.get("api/subscription/model");
    },
    updateSubscription(t, request) {
        return t.$http.post(
            "api/subscription/updateSubscription",
            request
        );
    }
};