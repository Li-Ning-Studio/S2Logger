# s2logger
s2logger provides a library for simple logging as shown below on both frontend and backend, and a drop-in replacement for ```axios``` that works exactly as axios since it just uses interceptors for logging, and logs key events such as all (200 or Error Code) requests and the time taken by the request. **This is not an alternative to catching or handling errors in axios, but it will allow you to not have to think about the bare minimum of logging that a request happened and whether it failed or was a success.**
```typescript
import {log} from 's2logger';
log.trace("Trace Event");
log.debug("This is a debug event", SOME_OBJ);
log.info(res.status_code, res.url);
log.warn("You are using this without a key");
log.error("Unable to reach host");
```

```javascript
axios.post('http://httpstat.us/200', {"hello":"world"});
```
## Log

### Log Levels
#### Trace
This level of logging is used in development and shows a full trace leading to that particular log.
```javascript
log.trace(...);
```
#### Debug
This level of logging is used in development and is used to show logs that are used during development such as logging the body and header of request.
```javascript
log.debug(...);
```
#### Info
This level of logging is used in production and development and is used to show points of interest such as a request being made, or a request coming in.
```javascript
log.info(...);
```
#### Warn
This level of logging is used in production and development and is used to show warnings that should be noted.
```javascript
log.warn(...);
```
### Error
This level of logging is used in production and development and is used to show errors that should be noted for example failed requests.
```javascript
log.error(...);
```

## Axios
Axios part of s2logger works exactly like axios, just instead of importing from axios  you can import from s2logger.

```javascript
import {axios} from 's2logger';
axios.post('http://httpstat.us/200', {"hello":"world"});
```

### Error Log
An error log of axios will look like
```
[2021-10-31T12:44:24.768Z] [ERROR] [AXIOS] 500 POST http://httpstat.us/500 229ms
Request Body {}
```

An error log of success will look like 
```
[2021-10-31T12:44:44.309Z] [INFO] [AXIOS] 200 POST http://httpstat.us/200 273ms
```

## Set Log Level
The purpose of this library is to allow us to set the Log Level of the current execution of code. When you set a log level you are setting it to display all logs including and above that level. Valid log levels include - 

 - TRACE - Trace and below
 - DEBUG - Debug and below
 - INFO - Info and below
 - WARN - Warn and below
 - ERROR - Errors only
 - SILENT - No logging

By default s2logger looks in the environment for two environment variables. Since this library is designed to be used in both frontend and backend it allows you to set the log levels of both independently. **Both log levels default to ERROR.**
#### Backend Log Level 
```env
LOG_LEVEL = TRACE
```

#### Frontend Log Level
```env
NEXT_PUBLIC_LOG_LEVEL = ERROR
```

## Environments without Env Variables (e.g Firebase)
In environments without environment variables you can force set the log level by - 
```javascript
import {log} from 's2logger';
import * as functions from "firebase-functions";
const config = functions.config();
log.setLevel(config.LogLevel);

```