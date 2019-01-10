export default {
    model(t) {
        return t.$http.get("api/questionnaire/model");
    },
    submitQuestionnaire(t, formData) {
        return t.$http.post("api/questionnaire/submitQuestionnaire", formData);
    },
    loadQuestionnaire(t, formData) {
        return t.$http.post("api/questionnaire/loadQuestionnaire", formData);
    },
    responses(t, search) {
        return t.$http.post('api/questionnaire/responses', search);
    }
};