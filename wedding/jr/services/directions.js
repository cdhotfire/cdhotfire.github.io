export default {
    model(t) {
        return t.$http.get("api/directions/model");
    }
};