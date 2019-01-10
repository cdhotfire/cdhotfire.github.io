export default {
    model(t) {
        return t.$http.get("api/faq/model");
    },
    saveFAQQuestion(t, request) {
	   return t.$http.post("api/faq/saveFAQQuestion", request);
    },
    removeFAQ(t, request) {
	   return t.$http.post("api/faq/removeFAQ", request);
    },
    saveFAQGroup(t, request) {
	   return t.$http.post("api/faq/saveFAQGroup", request);
    },
    addFAQQuestion(t, request) {
	   return t.$http.post("api/faq/addFAQQuestion", request);
    }
};