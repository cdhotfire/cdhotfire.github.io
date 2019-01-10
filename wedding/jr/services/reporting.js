export default {
    model(t) {
	   return t.$http.get("api/reporting/model");
    },
    getReportingStatus(t, request) {
	   return t.$http.post(
		  "api/reporting/getReportingStatus",
		  request
	   );
    }
};