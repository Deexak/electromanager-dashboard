# ElectroManager - Admin Dashboard

A modern, full-featured admin dashboard for electronic retail management with Supabase integration.

## 📁 Project Structure

```
c:\project\
├── public/                 # Web files (HTML, CSS, JS)
│   ├── css/               # Stylesheets
│   │   └── dashboard.css
│   ├── dashboard.html     # Main admin dashboard
│   └── index.html         # Login page
├── scripts/               # Utility scripts
│   ├── init-users.js      # Initialize admin/customer users
│   ├── add-data-fixed.js  # Add sample products & suppliers
│   └── check-database.js  # Database diagnostic tool
├── database/              # Database schemas
│   └── schema.sql         # Supabase table definitions
├── server.js              # Express web server
├── package.json           # Node.js dependencies
└── RUN_WEBSITE.bat        # Quick start script
```

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Supabase Database
- Go to your Supabase SQL Editor
- Run the SQL from `database/schema.sql`

### 3. Initialize Users
```bash
node scripts/init-users.js
```

### 4. Add Sample Data
```bash
node scripts/add-data-fixed.js
```

### 5. Start Server
```bash
node server.js
```
Or double-click `RUN_WEBSITE.bat`

### 6. Access Dashboard
- Open: http://localhost:3000
- Login as Admin: `admin@retail.com` / `Admin123!`
- Login as Customer: `customer@retail.com` / `Customer123!`

## 🎨 Features

### Admin Dashboard
- **📊 Overview**: Real-time stats and revenue charts
- **📦 Inventory Management**: Full CRUD for products
- **🚚 Supplier Management**: Manage vendor relationships
- **👥 Customer Directory**: View registered users
- **🎨 Modern UI**: Glassmorphism design with smooth animations

### Customer View
- **🛒 Product Catalog**: Browse available products
- **💳 Shopping Interface**: Clean, modern product cards

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS, Vanilla JavaScript
- **Backend**: Node.js, Express
- **Database**: Supabase (PostgreSQL)
- **UI**: Custom CSS with Inter font
- **Icons**: Ionicons

## 📝 Supabase Configuration

Update these values in your HTML files if needed:
```javascript
const supabaseUrl = 'https://qzolxhegytfryuomjcsw.supabase.co';
const supabaseKey = 'your-anon-key';
```

## 🔧 Utility Scripts

### Check Database
```bash
node scripts/check-database.js
```
Shows counts of products, suppliers, and profiles.

### Add Sample Data
```bash
node scripts/add-data-fixed.js
```
Adds 7 sample products and 5 sample suppliers.

### Initialize Users
```bash
node scripts/init-users.js
```
Creates admin and customer test accounts.

## 📱 Responsive Design

The dashboard is fully responsive and works on:
- 💻 Desktop (optimized)
- 📱 Tablet
- 📱 Mobile

## 🎯 Admin Features

- ✅ Add, Edit, Delete Products
- ✅ Add, Edit, Delete Suppliers
- ✅ View Customer Profiles
- ✅ Real-time Statistics
- ✅ Revenue Charts
- ✅ Role-based Access Control

## 🔐 Default Credentials

**Admin:**
- Email: `admin@retail.com`
- Password: `Admin123!`

**Customer:**
- Email: `customer@retail.com`
- Password: `Customer123!`

## 📄 License

This project is for educational purposes.

---

**Made with ❤️ for ElectroManager**
