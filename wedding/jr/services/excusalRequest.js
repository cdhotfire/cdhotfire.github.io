export default {
    model(t) {
        return t.$http.get("api/excusalRequest/model");
    },
    submitExcusalRequest(t, formData) {
        return t.$http.post("api/excusalRequest/submitExcusalRequest", formData);
    }
};