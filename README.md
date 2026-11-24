# Farm Crop Monitoring and Inventory System API

A RESTful backend API built with **NestJS**, **TypeORM**, and **MySQL** for **ITEC 116 — Systems Integration and Architecture**. This system manages farm users, crop records, crop health monitoring, agricultural supply inventory with automated low-stock alerts, harvest tracking, scheduled farm activities, and user notifications.

## Tech Stack
* **Framework:** NestJS (Node.js / TypeScript)
* **Database:** MySQL (via XAMPP / phpMyAdmin)
* **ORM:** TypeORM
* **Authentication & Security:** JWT (`@nestjs/jwt`, `passport-jwt`), `bcrypt` password hashing, and Role-Based Access Control (`RolesGuard`)
* **Validation:** `class-validator` & `class-transformer`

---

## Prerequisites
* **Node.js** (v18 or higher)
* **XAMPP** (or any local MySQL server)
* **Postman** (for testing API endpoints)

---

## Setup & Installation

### 1. Clone the Repository
```bash
git clone https://github.com/Lacaba-Bry/farm-monitoring-api.git
cd farm-monitoring-api
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory and configure your local database and JWT secret:
```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=
DB_NAME=farm_monitoring_db
JWT_SECRET=your_secret_key_here
PORT=3000
```

### 4. Create the MySQL Database
1. Start **Apache** and **MySQL** in XAMPP.
2. Open `http://localhost/phpmyadmin` and create a new database named **`farm_monitoring_db`** (or import the provided `.sql` export file).
3. TypeORM (`synchronize: true`) will automatically generate all 7 tables on startup.

### 5. Run the Application
```bash
# Development watch mode
npm run start:dev
```
The API will be available at: `http://localhost:3000/api/v1`

---

## User Roles (RBAC)
* **`farm manager`** — Full access to user management, crop deletion, supply inventory updates, and all operational modules.
* **`farmer`** — Can create and update crops, log crop monitoring, record harvests, and schedule farm activities.
* **`farm worker`** — Can view farm data, log crop monitoring observations, and update activity statuses.

---

## Core API Modules (`/api/v1`)
* **Auth:** `/auth/register`, `/auth/login`, `/auth/profile`
* **Users:** `/users`
* **Crops:** `/crops`, `/crops/:id/crop-monitoring`
* **Crop Monitoring:** `/crop-monitoring`
* **Supplies:** `/supplies` *(Automatically triggers a low-stock notification when `quantity <= minimumStock`)*
* **Harvests:** `/harvests`
* **Farm Activities:** `/farm-activities`
* **Notifications:** `/notifications`

---

## Author
**Bryan Camantigue Lacaba** — BSIT 4th Year (ITEC 116 Final Project)