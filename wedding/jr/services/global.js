export default {
    model(t) {
	   return t.$http.get("api/global/model");
    },
    clearcache(t) {
	   return t.$http.get('api/global/clearcache');
    },
    saveerror(t, error) {
	   t.post('api/global/saveerror', JSON.stringify(error, ['message', 'stack'], 2)).catch(err => {
		  return Promise.reject(err);
	   });
    }
};