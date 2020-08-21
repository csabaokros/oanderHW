# Key-Value store for Oander HW

## Versions used

* NodeJS: `12.18.0`
* Docker Desktop Stable (with WSL2): `2.3.0.2`

## Running standalone

1. Install dependencies using `npm i`
2. You can start the server by using the `node index.js` command.

Use the following environment variables to control the application:

* `LOG_LEVEL`: Configures the verbosity of the logs, defaults to 3, see details below
* `PORT`: The port express listens on, defaults to 3000
* `REDIS_HOST`: Redis's host url, defaults to *localhost*
* `REDIS_PORT`: Redis's port, defaults to 6379

## Running using docker

Start the app and a redis container using `docker-compose up`. The environment variables described above can be adjusted in the *docker-compose.yml* file

## Using the app

The purpose of the app is to operate a redis store using an http api.

All operations can be carried out on the `/:key` end-point:
* `GET /:key`: Returns the JSON stored under `key` if it exists. Returns `204` otherwise
* `POST /:key`: Saves a new JSON string to the store under `key`. If a value already exists under the key, it returns `405` with an `Allow` header stating `PUT` as a valid option
* `DELETE /:key`: Removes a key and its value from the store if it exists and sends  `200`. Returns `404` otherwise
* `PUT /:key`: Updates the JSON stored under `key` if it exists, then replies with `200`. Otherwise returns `405` with an `Allow` header stating `POST` as a valid option

## Log levels

Log levels are controlled by using LOG_LEVEL environment variable. The possible values are:

* `0`: Will only log errors
* `1`: Will show errors and warnings
* `2`: All above, plus info lines
* `3`: All above, plus debug lines

Here's how to use it on a linux system when running standalone:
```bash
LOG_LEVEL=3 node index.js
```

## Testing

Run `npm run test` for unit testing. Files with the extension `.test.js` in the `./test/unit` folder will be loaded and run.

## Timetable:

Day 1: 5 hours
Day 2: 3 hours
Day 3: 1 hour
