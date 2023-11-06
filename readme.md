# Short Link Agent -- LV-T2

## Setup guide

1. Use `npm` to install libraries: `npm -i`
2. Create an `.env` file and fill values
3. Run it: `npm run start_prod`
4. Kill it: `npm run stop_prod`

The `.env` file should look like this:
```txt
# SERVER CONFIG
SERVER_PORT=3000
SERVER_DEV=1

# DB CONFIG
DB_HOST=localhost 
DB_USER=root
DB_PASSWORD=
DB_DATABASE=project
DB_DIALECT=sqlite
DB_PATH=app_data/dev_data.db

# User idle timeout
USER_IDLE_TIMEOUT = 3600000

# JWT_CONFIG
JWT_SECRET_KEY="key_here"
```