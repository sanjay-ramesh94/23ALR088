# Maintenance Scheduler Backend

This backend fetches depot and vehicle task data from the evaluation APIs.

## Setup

1. Install dependencies:
   ```powershell
   cd notification_app_be
   npm install
   ```

2. Copy `.env.example` to `.env` and set `BEARER_TOKEN`.

3. Run:
   ```powershell
   npm start
   ```

## API

- `GET /api/depots?token=<token>`
  - Fetches depot details from the evaluation service.
  - Response example:
    ```json
    {
      "depots": [
        { "ID": 1, "MechanicHours": 60 },
        { "ID": 2, "MechanicHours": 135 }
      ]
    }
    ```

- `GET /api/vehicles?token=<token>`
  - Fetches vehicle task data from the evaluation service.
  - Response example:
    ```json
    {
      "vehicles": [
        { "TaskID": "...", "Duration": 1, "Impact": 5 }
      ]
    }
    ```

- `GET /api/health`
  - Returns a simple health check.

## Notes

- `token` can be supplied as a query parameter or via `BEARER_TOKEN` in `.env`.
- This stage only fetches the supplied remote data; the scheduling/selection logic will be added later.
