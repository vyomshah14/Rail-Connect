# RailConnect

> **Smart Railway Operations & Passenger Management Platform**

RailConnect is a full-stack, next-generation smart railway management platform designed to streamline passenger bookings, real-time schedule tracking, station directory management, PNR lookups, cancellation workflows, user notifications, and administrative operational analytics.

Built using **React.js**, **Vite**, **Node.js**, **Express.js**, and **MongoDB with Mongoose**, it offers a modern SaaS UI, robust role-based access control, and aggregation-driven administrative insights.

---

## For Running This Project Follow The Commands Below

- **1. Clone the Repository:**
  ```bash
  git clone https://github.com/vyomshah14/Rail-Connect.git
  cd Railconnect
  ```

- **2. Install Dependencies:**
  ```bash
  npm install
  cd server && npm install && cd ..
  ```

- **3. Setup Environment Variables:**
  - Create a `.env` file in the root directory:
    ```env
    VITE_API_URL=http://localhost:5000
    ```
  - Create a `server/.env` file in the `server` directory:
    ```env
    MONGO_URI=mongodb://localhost:27017/Rail-connect
    JWT_SECRET=railconnectsecret
    ```

- **4. Run the Project:**
  - **Start Backend Server:**
    ```bash
    node server/server.js
    ```
    *(Backend runs on `http://localhost:5000`)*

  - **Start Frontend Dev Server:**
    ```bash
    npm run dev
    ```
    *(Frontend opens at `http://localhost:5173`)*

---

# Screenshots

### **Homepage & Landing Page**
![Homepage Hero](./screenshots/01-homepage-hero.png)
![Homepage Features & How It Works](./screenshots/02-homepage-features.png)

### **Authentication (Login & Register)**
![Login Page](./screenshots/03-login-page.png)
![Register Page](./screenshots/04-register-page.png)

### **Passenger Dashboard & Profile**
![Passenger Dashboard](./screenshots/05-passenger-dashboard.png)
![Passenger Profile](./screenshots/06-passenger-profile.png)

### **Train Search & Booking Flow**
![Train Search & Filtering](./screenshots/07-train-search.png)
![Train Details & Booking](./screenshots/08-train-booking.png)

### **Bookings, PNR Lookup & History**
![My Bookings](./screenshots/09-my-bookings.png)
![PNR Search Page](./screenshots/10-pnr-search.png)
![Journey History](./screenshots/11-journey-history.png)

### **Notifications & System Alerts**
![Notifications Page](./screenshots/12-notifications.png)

### **Admin Console & Operations**
![Admin Dashboard Aggregation](./screenshots/13-admin-dashboard.png)
![Admin Train Management](./screenshots/14-admin-trains.png)
![Admin Station Directory](./screenshots/15-admin-stations.png)
![Admin Broadcast Notification Modal](./screenshots/16-admin-broadcast-modal.png)

---

## Key Features & Highlights

1. **Advanced Train Search, Filtering, Sorting & Pagination**
   - Search by train name or train number.
   - Filter by operational status (`scheduled`, `boarding`, `in_transit`, `delayed`, `cancelled`, etc.).
   - Sort by departure time or train name (ascending/descending).
   - Server-side pagination with dynamic seat availability badges.

2. **Role-Based Access Control (RBAC)**
   - Role-protected routes for Admin vs Passenger vs Staff.
   - `AccessDeniedPage` (403) guard when non-admins attempt to access admin routes.

3. **MongoDB Aggregation-Based Admin Dashboard**
   - Aggregation pipelines (`$match`, `$lookup`, `$group`, `$sort`, `$unwind`) calculating total users, fleet count, booking status breakdowns (`confirmed`/`cancelled`), and joined passenger-train-station records.

4. **User Notification & System Alert Engine**
   - Automatic notifications generated on ticket bookings & cancellations.
   - Admin Broadcast Notification Modal for sending system-wide or user-targeted alerts.
   - Real-time unread badge counter in navbar with inline mark-as-read.

5. **Passenger Profile & PNR Management**
   - Auto-checks passenger profile completeness before allowing booking.
   - Unique PNR number allocation & instant PNR query lookup engine.

---

## Tech Stack

### **Frontend**
- React.js (v18)
- Vite
- React Router DOM (v6)
- Lucide React (Modern Iconography)
- CSS3 (Custom Design Tokens & Responsive Layout)

### **Backend**
- Node.js
- Express.js
- JSON Web Token (JWT)
- bcryptjs
- Mongoose (MongoDB ODM)
- CORS & Dotenv

### **Database & Tools**
- MongoDB / MongoDB Compass
- Git & GitHub
- Postman / Curl

---

## Project Structure

```text
Railconnect/
├── public/
│   └── favicon.svg               # Application browser icon
│
├── screenshots/                  # Project UI Screenshots
│   ├── 01-homepage-hero.png
│   ├── 02-homepage-features.png
│   ├── 03-login-page.png
│   ├── 04-register-page.png
│   ├── 05-passenger-dashboard.png
│   ├── 06-passenger-profile.png
│   ├── 07-train-search.png
│   ├── 08-train-booking.png
│   ├── 09-my-bookings.png
│   ├── 10-pnr-search.png
│   ├── 11-journey-history.png
│   ├── 12-notifications.png
│   ├── 13-admin-dashboard.png
│   ├── 14-admin-trains.png
│   ├── 15-admin-stations.png
│   └── 16-admin-broadcast-modal.png
│
├── src/
│   ├── api/
│   │   ├── api.js                # Reusable fetch client with auth token & error handling
│   │   ├── authApi.js            # POST /register, POST /login calls
│   │   ├── trainApi.js           # GET /trains (search/filter/pagination), CRUD endpoints
│   │   ├── stationApi.js         # GET /stations, POST, PUT, DELETE station endpoints
│   │   ├── passengerApi.js       # GET /me, POST, PUT, DELETE passenger profile endpoints
│   │   ├── bookingApi.js         # POST /bookings, GET /my, GET /history, GET /pnr/:pnr
│   │   ├── cancellationApi.js    # POST /cancellations ticket cancellation endpoint
│   │   ├── dashboardApi.js       # GET /dashboard/stats aggregation stats endpoint
│   │   └── notificationApi.js    # GET /my, POST, PATCH /:id/read notification calls
│   │
│   ├── components/
│   │   ├── common/               # Navbar, Sidebar, AdminSidebar, Modals, Badges, Loaders
│   │   ├── trains/               # TrainCard, TrainTable, SearchBar, Pagination
│   │   ├── bookings/             # BookingCard with cancellation modal trigger
│   │   ├── notifications/        # NotificationItem with unread status highlight
│   │   └── admin/                # TrainModal, StationModal, CreateNotificationModal
│   │
│   ├── context/
│   │   ├── AuthContext.jsx       # State for token, user, role, passenger profile check
│   │   └── ToastContext.jsx      # Global toast alerts (success, error, warning, info)
│   │
│   ├── hooks/
│   │   ├── useAuth.js            # Custom hook for AuthContext
│   │   └── useToast.js           # Custom hook for ToastContext
│   │
│   ├── layouts/
│   │   ├── PublicLayout.jsx      # Public navigation wrapper
│   │   ├── PassengerLayout.jsx   # Passenger portal dashboard layout
│   │   └── AdminLayout.jsx       # Admin console sidebar layout
│   │
│   ├── pages/
│   │   ├── LandingPage.jsx       # SaaS landing page with hero, features & stats
│   │   ├── LoginPage.jsx         # User login form with role redirect
│   │   ├── RegisterPage.jsx      # Passenger registration form
│   │   ├── DashboardPage.jsx     # Passenger dashboard with metrics & upcoming journey
│   │   ├── TrainsPage.jsx        # Train search, status filter, sort & pagination
│   │   ├── TrainDetailPage.jsx   # Train itinerary & ticket booking date selection
│   │   ├── MyBookingsPage.jsx    # Active booking list & ticket cancellation
│   │   ├── PnrSearchPage.jsx     # Live PNR status enquiry tool
│   │   ├── HistoryPage.jsx       # Chronological travel journey history timeline
│   │   ├── ProfilePage.jsx       # Passenger profile view, setup, edit & delete
│   │   ├── NotificationsPage.jsx # System alerts & admin notification dispatch
│   │   ├── AdminDashboardPage.jsx# MongoDB aggregation analytics console
│   │   ├── AdminTrainsPage.jsx   # Admin train fleet management CRUD
│   │   ├── AdminStationsPage.jsx # Admin railway station directory CRUD
│   │   └── AccessDeniedPage.jsx  # 403 Access Denied security guard page
│   │
│   ├── styles/
│   │   ├── variables.css         # Color palette, shadows, font tokens
│   │   ├── global.css            # Global resets, buttons, cards, toasts & modals
│   │   └── layout.css            # Header, sidebar, grid & drawer responsive styles
│   │
│   ├── App.jsx                   # Central React Router route definitions
│   └── main.jsx                 # Application entry point
│
├── server/
│   ├── config/
│   │   └── db.js                 # Mongoose connection logic to MongoDB
│   │
│   ├── controllers/
│   │   ├── authController.js     # User registration, bcrypt hashing & JWT token sign
│   │   ├── trainController.js    # Train listing query filters, pagination & CRUD logic
│   │   ├── stationController.js  # Station directory listing, create, edit & delete
│   │   ├── passengerController.js# Passenger profile management logic
│   │   ├── bookingController.js  # Ticket booking, PNR allocation, seat update & notification
│   │   ├── cancellationController.js # Booking status update to cancelled & seat release
│   │   ├── dashboardController.js# MongoDB aggregation pipeline ($lookup, $group, $match)
│   │   └── notificationController.js # User notifications fetch, create & mark as read
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT Authorization header verification middleware
│   │   ├── roleMiddleware.js     # Role authorization guard (Admin, Passenger, Staff)
│   │   ├── validate.js           # Required request body field validation middleware
│   │   └── errorMiddleware.js    # Global Express exception handling middleware
│   │
│   ├── models/
│   │   ├── User.js               # User schema (name, email, password, role)
│   │   ├── Passenger.js          # Passenger profile schema (user ref, age, gender, phone)
│   │   ├── Station.js            # Station schema (name, code, city, state)
│   │   ├── Train.js              # Train route schema (trainNumber, source, destination, seats, status)
│   │   ├── Booking.js            # Ticket booking schema (passenger, train, PNR, seatNumber, journeyDate)
│   │   ├── Cancellation.js       # Ticket cancellation record schema (booking, reason, refund)
│   │   └── Notification.js       # System notification schema (user, title, message, type, isRead)
│   │
│   ├── route/
│   │   ├── authRoutes.js         # API routes for POST /register, POST /login
│   │   ├── trainRoutes.js        # API routes for GET, POST, PUT, DELETE /api/trains
│   │   ├── stationRoutes.js      # API routes for GET, POST, PUT, DELETE /api/stations
│   │   ├── passengerRoutes.js    # API routes for GET, POST, PUT, DELETE /api/passengers
│   │   ├── bookingRoutes.js      # API routes for POST, GET /my, GET /history, GET /pnr/:pnr
│   │   ├── cancellationRoutes.js # API routes for POST /api/cancellations
│   │   ├── dashboardRoutes.js    # API routes for GET /api/dashboard/stats
│   │   └── notificationRoutes.js # API routes for GET, POST, PATCH /api/notifications
│   │
│   └── server.js                 # Express application initialization & middleware setup
│
├── .env.example                  # Environment variable template
├── .gitignore                    # Git ignore file configuration
├── index.html                    # HTML root page template
├── package.json                  # Root dependencies & scripts
├── package-lock.json             # Locked dependency tree
├── vite.config.js                # Vite bundler configuration & backend proxy setup
└── README.md                     # Project documentation
```

---

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## License

This project is licensed under the [MIT License](LICENSE). Feel free to modify and distribute it as per terms of the license.

---

## Acknowledgements

We would like to acknowledge the following resources used in the development of this project:
- React.js & Vite
- Express.js & Node.js
- MongoDB & Mongoose
- Lucide React Icons
- Plus Jakarta Sans & JetBrains Mono Fonts

---

## Contact

For any inquiries or questions, please reach out to:
- **Project Maintainer**: Vyom Shah ([vyomshah14](https://github.com/vyomshah14))

Thank you for visiting **RailConnect**! We hope this platform provides a valuable learning and operational experience.
