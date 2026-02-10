#  Full-Stack MERN E-Commerce Platform

A **E-Commerce application** built using the **MERN stack**, following real-world backend architecture and DevOps practices.  
The project includes **secure authentication**, **Redis-backed session control**, **Docker orchestration**, and **AWS EC2 deployment**.

---

## Features

### Product Management
- Dynamic product catalog with categories like **Jeans, Glasses, Jackets, Bags**
- Optimized product image delivery using **Cloudinary CDN**

### Authentication & Security
- **JWT-based authentication** using Access & Refresh tokens
- **bcryptjs** for secure password hashing
- **Upstash Redis** to store refresh tokens, enabling:
  - instant logout
  - session invalidation
  - solving the stateless JWT logout problem

### Admin Dashboard
- Protected admin routes
- Full **CRUD operations** for product management

### ⚡ Frontend State Management
- Uses **Zustand** for lightweight and scalable global state
- Cleaner and faster alternative to Redux for this project

---

## Architecture & DevOps

- **Upstash Redis**
  - Stores refresh tokens
  - Enables secure session revocation without server memory overhead

- **Dockerized Application**
  - Frontend and backend run in separate containers

- **Docker Compose**
  - Manages networking between Vite frontend and Node.js backend

- **Cloud Deployment**
  - Hosted on **AWS EC2 (Ubuntu)**
  - Custom security group configuration for external access

---

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Zustand

### Backend
- Node.js
- Express.js

### Database
- MongoDB (Primary Database)
- Upstash Redis (Authentication & Session Management)

### Infrastructure
- Docker
- Docker Compose
- AWS EC2

---

## Environment Variables

Create a `.env` file in the **root directory (for Docker)**  
or inside the `backend/` folder (for local development):

```env
PORT=3000
MONGO_URI=your_mongodb_uri
UPSTASH_REDIS_URI=your_upstash_redis_link
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
