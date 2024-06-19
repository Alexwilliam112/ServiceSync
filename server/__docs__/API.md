# API DOCUMENTATION

#### SERVER ADDRESS:

&nbsp;

&nbsp;

## Global Error

> __Response (401 - UNAUTHORIZED)__

```json
{
  "message": "Unauthorized Access. Please LogIn"
}
```

> __Response (403 - FORBIDDEN)__

```json
{
  "message": "You are not authorized!"
}
```

> __Response (500 - INTERNAL SERVER ERROR)__

```json
{
  "message": "Internal server error"
}
```

## POST /login

### body:

```json
{
  "username": "string",
  "password": "string"
}
```

> __Response (200 - OK)__

```json
{
  "access_token": "eyJhbGciOiJIUbta_uOSDU",
  "username": "IamUser12",
  "role": "user",
  "cases": [
    {
      "id": 1,
      "userId": 2,
      "status": true,
      "autoreply": true,
      "createdAt": "2024-06-19T10:40:22.000Z",
      "updatedAt": "2024-06-19T10:40:25.000Z"
    }
  ]
}
```

> __Response (400 - BAD REQUEST)__

```json
{
  "message": "Username and Password is required"
}
```

> __Response (401 - UNAUTHORIZED)__

```json
{
  "message": "Invalid username or password"
}
```

## POST /cases

> __Response (201 - CREATED)__

```json
{
  "message": "Success Create New Room",
  "data": {
    "status": true,
    "autoreply": true,
    "id": 3,
    "userId": 2,
    "updatedAt": "2024-06-19T12:23:45.676Z",
    "createdAt": "2024-06-19T12:23:45.676Z"
  }
}
```

> __Response (401 - UNAUTHORIZED)__

```json
{
  "message": "Unauthorized Access. Please LogIn"
}
```

## GET /cases

### header:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

> __Response (200 - OK)__

```json
{
  "message": "Success Read All Rooms",
  "data": [
    {
      "roomId": 1,
      "createdAt": "2024-06-19"
    },
    {
      "roomId": 7,
      "createdAt": "2024-06-19"
    }
  ]
}
```

> __Response (404 - NOT FOUND)__

```json
{
  "message": "Data Not Found"
}
```

## GET /chat-history/:roomId

### header:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

### params:

```json
{
  "roomId": "Room ID from User Login"
}
```

> __Response (200 - OK)__

```json
[
  {
    "message": "hello there",
    "roomId": 1,
    "username": "Alex",
    "timestamp": {
      "_seconds": 1718792485,
      "_nanoseconds": 485000000
    }
},
{
    "message": "boboubouvouo",
    "roomId": 1,
    "username": "Alex",
    "timestamp": {
      "_seconds": 1718792476,
      "_nanoseconds": 444000000
    }
},
{
    "message": "AISNDOIANSDOINADAOISD",
    "roomId": 1,
    "username": "Alex",
    "timestamp": {
      "_seconds": 1718792481,
      "_nanoseconds": 761000000
    }
  }
]
```

> __Response (404 - NOT FOUND)__

```json
{
  "message": "Data Not Found"
}
```
