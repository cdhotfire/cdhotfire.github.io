export default {
    model(t) {
        return t.$http.get("api/feedback/model");
    },
    submitFeedback(t, formData) {
	   return t.$http.post("api/feedback/submitFeedback", formData);
    }
};