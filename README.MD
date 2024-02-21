# Authentication and Role-based Permissions - Backend

This is the backend part of the Authentication and Role-based Permissions project. It provides API endpoints for user authentication, product management, user management, and order handling. The backend is developed using Node.js and MongoDB.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Documentation](#documentation)

## Prerequisites

- Node.js and npm installed on your system.
- MongoDB installed and configured on your local machine or a remote server.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Abdoo-270/ShopShine-Backend
```

2. Navigate to the project directory:

```bash
cd ShopShine-Backend
```

3. Install dependencies:

```bash
npm install
```

4. Create a .env file in the root directory of the project and add the following environment variables:

```bash
MONGO_URL=your_mongodb_url_here
JWT_SECRET=your_jwt_secret_here
```

Replace `your_mongodb_uri_here` with the connection URL for your MongoDB database. If you're using a local MongoDB instance, the URL might look like `mongodb://localhost:27017/your_database_name`.

Replace `your_jwt_secret_here` with a secure secret key for JWT token generation.

## Usage

Start the backend server:

```bash
npm start
```

This will start the backend server, and it will be ready to handle requests from the frontend.

## Documentation

### JWT Authentication Endpoints

- **Register:** `POST /api/auth/register`
  Registers a new user with the provided credentials.
- **Login:** `POST /api/auth/login`
  Authenticates a user with the provided credentials and returns a JWT token.
- **Logout:** `DELETE /api/auth/logout`
  Logs out the currently authenticated user and invalidates the JWT token.

### Products Endpoints

- **Get All Products:** `GET /api/products`

  - Description: Retrieves a list of all products from the database.

- **Get Single Product:** `GET /api/products/:id`

  - Description: Retrieves a single product by its ID.

- **Create Product:** `POST /api/products`

  - Description: Creates a new product in the database.

- **Update Product:** `PATCH /api/products/:id`

  - Description: Updates an existing product with the provided ID.

- **Delete Product:** `DELETE /api/products/:id`
  - Description: Deletes a product from the database by its ID.

### Users Endpoints

- **Get All Users:** `GET /api/users`

  - Description: Retrieves a list of all users from the database.

- **Get Single User:** `GET /api/users/:id`

  - Description: Retrieves a single user by their ID.

- **Delete User:** `DELETE /api/users/:id`
  - Description: Deletes a user from the database by their ID.

## Orders Endpoints

- **Get All Orders:** `GET /api/orders`

  - Description: Retrieves a list of all orders from the database.

- **Get Single Order:** `GET /api/orders/:id`

  - Description: Retrieves a single order by its ID.

- **Create Order:** `POST /api/orders`

  - Description: Creates a new order in the database.

- **Show Current User Orders:** `GET /api/orders showAllMyOrders`
  - Description: Creates the current user orders.
