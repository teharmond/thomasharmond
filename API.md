# Tasks API Documentation

## Create Task

Creates a new task with optional metadata.

### Endpoint

```
POST /api/tasks
```

### Authentication

Requires Bearer token authentication via `Authorization` header:

```
Authorization: Bearer YOUR_API_KEY
```

### Request Body

| Field         | Type   | Required | Description                                                                                              |
| ------------- | ------ | -------- | -------------------------------------------------------------------------------------------------------- |
| `title`       | string | Yes      | The task title/text                                                                                      |
| `userId`      | string | Yes      | User ID to associate the task with                                                                       |
| `status`      | string | No       | Task status. Options: `"backlog"`, `"todo"`, `"in_progress"`, `"completed"`, `"canceled"`, `"duplicate"` |
| `priority`    | string | No       | Task priority. Options: `"low"`, `"medium"`, `"high"`, `"urgent"`                                        |
| `description` | string | No       | Additional task description                                                                              |
| `dueDate`     | string | No       | Due date for the task (ISO string format recommended)                                                    |

### Example Request

```json
{
  "title": "Complete API documentation",
  "userId": "user_123",
  "status": "todo",
  "priority": "high",
  "description": "Write comprehensive API docs for the tasks endpoint",
  "dueDate": "2025-08-10T00:00:00Z"
}
```

### Success Response

**Status Code:** `201 Created`

```json
{
  "success": true,
  "taskId": "k1234567890abcdef",
  "message": "Task created successfully"
}
```

### Error Responses

#### 401 Unauthorized

Missing or invalid Authorization header:

```json
{
  "error": "Unauthorized: Missing or invalid Authorization header"
}
```

Invalid token:

```json
{
  "error": "Unauthorized: Invalid token"
}
```

#### 400 Bad Request

Missing required fields:

```json
{
  "error": "Bad Request: title is required"
}
```

```json
{
  "error": "Bad Request: userId is required"
}
```

#### 500 Internal Server Error

Server error during task creation:

```json
{
  "success": false,
  "error": "Failed to create task"
}
```

### Default Values

- `status`: Defaults to `"todo"` if not provided
- `priority`: Defaults to `"medium"` if not provided
- `description`: Optional, no default
- `dueDate`: Optional, no default

### cURL Example

```bash
curl -X POST https://your-domain.com/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "title": "Review API documentation",
    "userId": "user_123",
    "priority": "medium",
    "description": "Review the new tasks API documentation for completeness"
  }'
```
