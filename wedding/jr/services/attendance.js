export default {
    model(t) {
	   return t.axios.get("api/attendance/model");
    },
    getAttendanceStatus(t, request) {
	   return t.axios.post(
		  "api/attendance/getAttendanceStatus",
		  request
	   );
    }
};