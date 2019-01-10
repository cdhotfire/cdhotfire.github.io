export default {
    model(t) {
	   return t.$http.get("api/home/model");
    },
    saveSetting(t, request) {
	   return t.$http.post("api/home/saveSetting", request);
    },
    saveFAQLookupValue(t, request) {
	   return t.$http.post("api/home/saveFAQLookupValue", request);
    },
    saveLookup(t, request) {
	   return t.$http.post("api/home/saveLookup", request);
    }
};