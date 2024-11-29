# Auth Service

This repository contains the **Authentication Service** built using Node.js. Below are instructions to set up and run the service and its dependencies using Docker.

## Prerequisites

1. **Install Docker**: Ensure Docker is installed and running on your system.
2. **Environment Variables**: Create a `.env` file in the project root directory with all necessary environment variables.

## Running the Services with Docker

### 1. Run the Authentication Service

Run the following command to start the authentication service in development mode:

```bash
docker run --rm -it -v ${PWD}:/usr/src/app -v /usr/src/app/node_modules --env-file ${PWD}/.env /-p 5501:5501  -e NODE_ENV=development  auth-service:dev
```

```bash
docker run --rm --name pg-container  -e POSTGRES_USER=root  -e POSTGRES_PASSWORD=root  -v pgdata:/var/lib/postgresql/data  -p 5432:5432  -d postgres
```
