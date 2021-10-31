let axios = require('./dist/index').axios;

axios.post('http://httpstat.us/200', {"hello":"world"});
// log.trace("Trace Event");
// log.debug("This is a debug event");
// log.info("This is a info event");
// log.warn("You are using this without a key");
// log.error("Unable to reach host");