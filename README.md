
# EcommerceApp

A full-stack e-commerce web application with user authentication, product browsing, cart, and checkout functionality.

## Tech Stack

### Frontend
- Next.js
- React
- Tailwind CSS
- Context API

### Backend
- Spring Boot
- Spring Security (JWT Auth)
- Stripe API
- PostgreSQL

## Features

### User
- Signup / Login
- JWT Authentication
- Browse Products
- Add to Cart
- Checkout via Stripe

### Admin
- Manage Products
- Secure Admin Access

## Setup Instructions

### Prerequisites
- Node.js (>= 16)
- Java 17+
- PostgreSQL

### Backend Setup
```bash
cd backend
./mvnw clean install
./mvnw spring-boot:run
```

Update `application.properties` with your database and Stripe credentials.

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Database
Create a PostgreSQL database and update the backend configuration.

### Stripe
Add your Stripe secret/public keys in the backend properties.

## Folder Structure
```
EcommerceApp/
├── backend/       # Spring Boot backend
└── frontend/      # Next.js frontend
```

## Git Workflow
