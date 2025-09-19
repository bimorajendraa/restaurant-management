# Big Boy Restaurant System

A modern, **performance-optimized restaurant management system** built with **Next.js**.  
The application includes core features such as customer ordering via QR code, a real-time admin dashboard for monitoring, and role-based access control for managing staff permissions.  
With **Socket.io**, the system supports real-time order placement and instant status updates.

---

## Key Features

### 1. **Customer Ordering via QR Code**

- **Easy Ordering**: Customers scan a QR code at their table to view the digital menu and place orders directly.
- **Real-Time Updates**: Orders are immediately transmitted to the backend and reflected on the admin dashboard.

### 2. **Admin Dashboard**

- **Monitor Orders**: Track all customer orders in real time.
- **Live Order Status**: Updates (pending, preparing, completed) appear instantly via **Socket.io**.
- **Manage Staff Roles**: Assign roles and permissions using RBAC for waiters, chefs, and managers.

### 3. **Role-Based Access Control (RBAC)**

- **Granular Permissions**: Each staff role is assigned the appropriate access level to ensure secure operations.

### 4. **Real-Time Communication with Socket.io**

- **Instant Synchronization**: Orders and updates are pushed instantly to all dashboards.
- **Notifications**: Staff and admins receive alerts when orders are placed or updated.

---

## Performance Optimization

### 1. **Incremental Static Regeneration (ISR)**

- Updates static pages automatically without a full rebuild.
- Example: Menu pages regenerate every 60 seconds to keep data fresh.

### 2. **Static Site Generation (SSG)**

- Pre-renders non-dynamic pages (e.g., About, Contact) at build time for fast performance and SEO benefits.

### 3. **Server-Side Rendering (SSR)**

- Renders dynamic content (e.g., live order tracking) on request for up-to-date information.

### 4. **Image Optimization**

- Uses the Next.js **Image Component** for automatic compression and modern formats like WebP.

### 5. **Code Splitting & Lazy Loading**

- Loads only what’s needed per page, improving performance.

### 6. **Optimized Caching**

- Uses caching and Service Worker for fast loads and offline support.

---

## Technologies

- **Frontend**:

  - Next.js (React Framework)
  - Tailwind CSS
  - ShadCNUI
  - React
  - Socket.io
  - TypeScript

- **Backend**:

  - Node.js (via Next.js API routes)
  - Socket.io

- **Performance Features**:
  - Static Site Generation (SSG)
  - Incremental Static Regeneration (ISR)
  - Server-Side Rendering (SSR)
  - Code Splitting & Lazy Loading
  - Next.js Image Optimization

---

## Getting Started

### Prerequisites

Make sure you have **Node.js** and **npm** (or **yarn**) installed.  
Download Node.js from [here](https://nodejs.org/).

### Installation

Clone the repository:

```bash
git clone https://github.com/td041/restaurant-management.git
cd restaurant-management
npm install
```