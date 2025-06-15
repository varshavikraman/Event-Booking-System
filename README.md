# 🎟️ Event Booking System  

![MERN](https://img.shields.io/badge/MERN-Stack-green) ![Docker](https://img.shields.io/badge/Docker-Containerization-blue)  

## 📌 Overview  

The **Event Booking System** is a user-friendly platform designed to streamline the event booking process for both users and administrators. Users can effortlessly browse, book, and manage their tickets, while administrators have the tools to efficiently manage events and ticket availability.  

Built with the **MERN Stack (MongoDB, Express.js, React, and Node.js)** and **Docker** for containerization.  

---

## 📖 Table of Contents  

- [Objective](#objective)
- [Key Features](#key-features)
- [Technologies Used](#technologies-used)
- [Other Tools](#other-tools)
- [Getting Started](#getting-started)
  - [Installation](#installation)  
- [Demo Video Link](#demo-video-link)  

---

## 🎯 Objective  

To create a seamless and efficient event booking platform that enhances the user experience while providing robust management tools for administrators.  

---

## 🚀 Key Features  

### 🛡️ Admin Panel  
- **Event Management**: Add, edit, and manage events and ticket pricing.  
- **Booking Management**: View booked tickets.  

### 🔑 User Authentication & Roles  
- **Secure Authentication**: Separate roles for Users and Admins.  
- **User Features**:  
  - Sign up and sign in.  
  - Browse events and book tickets.  
  - Cancel tickets and manage profiles.  

### 🎫 Event Booking  
- Explore available events.  
- Select shows, choose seating types, and make secure bookings.  

### 💳 Payment & Confirmation *(Future Integration)*  
- Integrated payment system for seamless transactions.  
- Instant ticket confirmation with booking details.  

### 🔍 Search & Cancellation  
- Search for events based on preferences.  
- Ability to cancel bookings if needed.  

### 📁 File Uploads  
- Admins can upload images for events.  

---

## 🛠️ Technologies Used  

- **Frontend**: React.js ⚛️  
- **Backend**: Node.js 🚀, Express.js 🌐  
- **Database**: MongoDB 🍃  
- **Containerization**: Docker 🐳  

---

## 🔧 Other Tools  

- **JWT (JSON Web Token)** 🔒: Secure authentication and authorization.  
- **Multer** 🖼️: For handling image uploads.  
- **Payment Processing** 💰 *(Future integration)*: Secure transactions using Stripe, PayPal, etc.  

---

## ⚙️ Getting Started  

### Installation  

1. **Clone the repository:**  

    ```bash
    git clone [repository URL]
    cd event-booking-system
    ```

2. **Set up environment variables:** 
 
   - Create a `.env` file in the project root directory.  
   - Add the necessary environment variables (PORT, JWT secret, etc.).  

3. **Docker Setup:**  

    ```bash
    docker-compose up --build
    ```

4. **Access the Application:**  

   - Once the containers are up, visit `localhost:3030` to access the app.  

---

## 📺 Demo Video Link  

▶️ [Watch Demo](https://youtu.be/bzRUIGGu_j8)  
