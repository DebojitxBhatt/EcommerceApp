

An E-commerce application built with **Spring Boot** for the backend, **ReactJS** for the frontend, and **PostgreSQL** for the database. This app simulates a simple e-commerce platform where users can browse products, add items to the cart, and proceed to checkout.

## Features

- **User Authentication**: Users can register and log in.
- **Product Listing**: Display a list of products fetched from the backend.
- **Search Functionality**: Users can search for products.
- **Cart System**: Add products to the cart, update quantities, and view total.
- **Checkout**: Users can review their cart and proceed to the checkout page.
- **Responsive UI**: Fully responsive user interface made with Material UI.

## Tech Stack

- **Backend**: Spring Boot (Maven)
- **Frontend**: ReactJS with Material UI
- **Database**: PostgreSQL

## Setup Instructions

Follow the steps below to get the project running on your local machine.

### Step 1: Set up PostgreSQL

1. **Install PostgreSQL** if you don't have it already.
2. **Create a database** for the project (e.g., `ecommerce_db`).
3. Update the PostgreSQL connection details in the **Spring Boot** configuration file (see Step 4 for details).

### Step 2: Set up Backend (Spring Boot with Maven)

1. Navigate to the `backend` folder in your terminal:
   ```bash
   cd EcommerceApp/backend
   ```

2. **Edit the application.properties** file in `src/main/resources/application.properties`:
   - Update the following database connection properties to match your local PostgreSQL setup:
     ```properties
     spring.datasource.url=jdbc:postgresql://localhost:5432/ecommerce_db
     spring.datasource.username=your_db_username
     spring.datasource.password=your_db_password
     spring.jpa.hibernate.ddl-auto=update
     ```

3. **Build and run the Spring Boot application** using Maven:
   - To install the necessary dependencies and build the project, run:
     ```bash
     mvn clean install
     ```
   - To run the application:
     ```bash
     mvn spring-boot:run
     ```

   The backend should now be running on `http://localhost:8080`.

### Step 3: Set up Frontend (React)

1. Navigate to the `frontend` folder in your terminal:
   ```bash
   cd EcommerceApp/frontend
   ```

2. Install the necessary dependencies:
   ```bash
   npm install
   ```

3. **Edit the frontend to connect to the backend**:
   - Open `frontend/src/Services/api.js` or wherever your API URLs are set.
   - Make sure that the backend URL is correctly set (e.g., `http://localhost:8080`):
     ```javascript
     const BASE_URL = "http://localhost:8080"; // Update this URL if necessary
     ```

4. **Start the React development server**:
   ```bash
   npm run dev
   ```

   The frontend should now be running on `http://localhost:3000`.

### Step 4: Test the Application

- Visit `http://localhost:3000` in your browser to see the frontend.
- The backend should be accessible at `http://localhost:8080`.
- Ensure that the backend is properly interacting with the PostgreSQL database.

### Step 5: Common Issues & Solutions

- **CORS Issues**: If you're facing CORS (Cross-Origin Resource Sharing) issues, make sure to enable CORS in your Spring Boot backend by adding the following annotation in your `@SpringBootApplication` class:
  ```java
  @SpringBootApplication
  @CrossOrigin(origins = "http://localhost:3000")  // Add this line
  public class Application {
      public static void main(String[] args) {
          SpringApplication.run(Application.class, args);
      }
  }
  ```

- **Database Connection**: If the backend cannot connect to PostgreSQL, verify the database URL, username, and password in `application.properties` and ensure PostgreSQL is running.

### Folder Structure

- `EcommerceApp/`
  - `frontend/` - ReactJS frontend code
  - `backend/` - Spring Boot backend code
  - `README.md` - Project documentation (this file)
  
---



