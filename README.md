# Key-Value store for Oander HW

## Versions used

* NodeJS: `12.18.0`
* Docker Desktop Stable (with WSL2): `2.3.0.2`

## Running standalone

You can start the server by using the `node index.js` command.

Use the following environment variables to control the application:

* `LOG_LEVEL`: Configures the verbosity of the logs, defaults to 3, see details below
* `PORT`: The port express listens on, defaults to 3000
* `REDIS_HOST`: Redis's host url, defaults to *localhost*
* `REDIS_PORT`: Redis's port, defaults to 6379

## Running using docker

Start the app and a redis container using `docker-compose up`. The environment variables described above can be adjusted in the *docker-compose.yml* file

## Log levels

Log levels can be controlled by using LOG_LEVEL environment variable. The possible values are:

* `0`: Will only log errors
* `1`: Will show errors and warnings
* `2`: All above, plus info lines
* `3`: All above, plus debug lines

Here's how to use it on a linux system:
```bash
LOG_LEVEL=3 node index.js
```

## Testing

Run `npm run test` for unit testing
