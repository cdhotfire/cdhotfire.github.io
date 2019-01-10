export default {
    model(t) {
	   return t.$http.get("api/calendar/model");
    },
    getevents(t, start, end) {
	   return t.$http.get("api/calendar/getevents/" + start + "/" + end);
    },
    saveevent(t, event) {
	   return t.$http.post("api/calendar/saveevent", event);
    },
    deleteevent(t, id) {
	   return t.$http.delete("api/calendar/deleteevent/" + id);
    }
};