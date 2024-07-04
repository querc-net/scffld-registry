# API for scffld.dev

```sh
docker compose up -d
dotnet watch
```

## Docker build & run

```sh
cp .env.example .env
docker build -t scffld-api .
docker run --rm -p 8080:8080 --env-file ./.env scffld-api
```

http://localhost:8080/Templates?name=react-hook
