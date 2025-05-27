# 🧵 Tailor Boy Backend

This is the backend API for the Tailor Boy application — a simple customer and design management system built for tailors. It includes user authentication, customer management, design uploads, and delivery scheduling.

## 🚀 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB** with **Mongoose**
- **JWT Authentication**
- **Multer** for file uploads
- **CORS** for cross-origin requests

---

## 📦 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/tailor-boy-backend.git
cd tailor-boy-backend
##  Install dependencies
npm install
## Create a .env file
touch .env
`Add the following to your .env file:`
PORT=8080
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-secret-key
FRONTEND_URL=http://localhost:3000
note:
Replace your-mongodb-connection-string with your MongoDB URI. You can use MongoDB Atlas or run a local MongoDB instance.
## Run the server
npm run dev
Server will start on http://localhost:8080 (or the port you specify in .env).
API Routes Overview
Auth
POST /api/auth/signup – Create an account

POST /api/auth/login – Authenticate user

Customers
GET /api/customers – List all customers for a user

POST /api/customers – Add a new customer

PUT /api/customers/:id – Update customer

DELETE /api/customers/:id – Delete customer

Designs
GET /api/designs – List designs for a user

POST /api/designs – Upload a design image

DELETE /api/designs/:id – Delete design

Schedules
GET /api/schedules/:date – View schedule by date

POST /api/schedules/:date – Assign customer/design to date

DELETE /api/schedules/:date/:customerId – Remove schedule

### Folder Structure

tailor-boy-backend/
│
├── models/              # Mongoose schemas
├── routes/              # API route handlers
├── middleware/          # Auth, upload middlewares
├── uploads/             # Uploaded design images
├── server.js            # Entry point
├── .env                 # Environment config
└── package.json

### Postman Collection
You can use Postman to test all the endpoints. Just make sure to:

Set the Authorization header with Bearer <your_token> where required.

Send form-data for image uploads.
```
