# MINE. - E-Commerce Platform

A full-stack e-commerce platform built with React, Node.js, and MongoDB. Features a customer-facing frontend, admin dashboard, and robust backend API.

![MINE. Logo](frontend/public/logo.png)

## 🌟 Features

### Customer Features
- **Product Browsing**: Browse products with search and filtering capabilities
- **Shopping Cart**: Add/remove items with quantity management
- **User Authentication**: Secure login/signup with JWT tokens
- **Order Management**: Place orders and track order status
- **Payment Integration**: Cash on Delivery (COD) payment method
- **Responsive Design**: Mobile-first responsive UI
- **Product Details**: Detailed product pages with image galleries
- **Order History**: View past orders and their status

### Admin Features
- **Product Management**: Add, edit, and delete products
- **Order Management**: View and update order statuses
- **Analytics Dashboard**: Sales analytics and performance metrics
- **User Management**: View customer information
- **Settings Management**: Configure platform settings
- **Image Upload**: Cloudinary integration for product images

### Technical Features
- **RESTful API**: Complete backend API with authentication
- **Database**: MongoDB with Mongoose ODM
- **File Upload**: Cloudinary cloud storage integration
- **Security**: JWT authentication, password hashing
- **Real-time Updates**: Live order status updates
- **Search Functionality**: Product search and filtering

## 🏗️ Architecture

### Frontend (Customer Portal)
- **Framework**: React 19 with Vite
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Notifications**: React Toastify

### Admin Dashboard
- **Framework**: React 19 with Vite
- **Styling**: Tailwind CSS
- **Authentication**: JWT-based admin auth
- **Components**: Modular component architecture
- **Analytics**: Real-time dashboard with charts

### Backend API
- **Runtime**: Node.js with Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT tokens with bcrypt
- **File Upload**: Multer with Cloudinary
- **Validation**: Input validation and sanitization
- **CORS**: Cross-origin resource sharing enabled

## 📁 Project Structure

```
Mine/
├── frontend/                 # Customer-facing React app
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context providers
│   │   └── assets/         # Static assets
│   ├── public/             # Public assets
│   └── package.json
├── admin/                   # Admin dashboard React app
│   ├── src/
│   │   ├── components/     # Admin UI components
│   │   ├── pages/         # Admin page components
│   │   └── assets/        # Admin assets
│   └── package.json
└── backend/                # Node.js API server
    ├── config/            # Configuration files
    ├── controllers/       # Route controllers
    ├── middleware/        # Custom middleware
    ├── models/           # MongoDB schemas
    ├── routes/           # API routes
    └── server.js         # Main server file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- Cloudinary account (for image uploads)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Mine
   ```

2. **Install dependencies for all applications**
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install

   # Install admin dependencies
   cd ../admin
   npm install
   ```

3. **Environment Setup**

   Create `.env` files in the backend directory:
   ```env
   # Backend .env
   PORT=4000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

   Create `.env` files in frontend and admin directories:
   ```env
   # Frontend/Admin .env
   VITE_BACKEND_URL=http://localhost:4000
   ```

4. **Database Setup**
   - Ensure MongoDB is running
   - The application will automatically create collections on first run

5. **Cloudinary Setup**
   - Create a Cloudinary account
   - Get your cloud name, API key, and API secret
   - Update the backend `.env` file with your credentials

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm run server  # Development mode with nodemon
   # or
   npm start       # Production mode
   ```

2. **Start the frontend (customer portal)**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Start the admin dashboard**
   ```bash
   cd admin
   npm run dev
   ```

4. **Access the applications**
   - Frontend: http://localhost:5173
   - Admin Dashboard: http://localhost:5174
   - Backend API: http://localhost:4000

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/user/register` - User registration
- `POST /api/user/login` - User login
- `POST /api/user/admin/login` - Admin login

### Product Endpoints
- `GET /api/product/getAllProduct` - Get all products
- `POST /api/product/add` - Add new product (Admin)
- `PUT /api/product/update/:id` - Update product (Admin)
- `DELETE /api/product/delete/:id` - Delete product (Admin)

### Cart Endpoints
- `POST /api/cart/add` - Add item to cart
- `POST /api/cart/get` - Get user cart
- `POST /api/cart/remove` - Remove item from cart

### Order Endpoints
- `POST /api/order/place` - Place new order
- `POST /api/order/userOrders` - Get user orders
- `POST /api/order/list` - Get all orders (Admin)
- `PUT /api/order/update/:id` - Update order status (Admin)

### Analytics Endpoints
- `POST /api/analytics/dashboard` - Get analytics data (Admin)

## 🔧 Configuration

### Database Configuration
The application uses MongoDB with Mongoose. Update the `MONGODB_URI` in your backend `.env` file.

### Cloudinary Configuration
For image uploads, configure Cloudinary credentials in the backend `.env` file.

### JWT Configuration
Set a secure JWT secret in the backend `.env` file for token generation and validation.

## 🛠️ Development

### Code Structure
- **Components**: Reusable UI components in `src/components/`
- **Pages**: Main page components in `src/pages/`
- **Context**: Global state management in `src/context/`
- **Controllers**: Business logic in `backend/controllers/`
- **Models**: Database schemas in `backend/models/`

### Adding New Features
1. Create new components in the appropriate directory
2. Add routes in the main App component
3. Create corresponding API endpoints in the backend
4. Update the database schema if needed

### Styling
The application uses Tailwind CSS for styling. Custom styles can be added in `src/index.css`.

## 🚀 Deployment

### Backend Deployment (Vercel)
1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy the backend directory

### Frontend Deployment (Vercel)
1. Build the frontend application
2. Deploy the built files to Vercel
3. Set environment variables for production

### Admin Dashboard Deployment (Vercel)
1. Build the admin application
2. Deploy to Vercel with proper environment variables

### Environment Variables for Production
```env
# Production Backend
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_production_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Production Frontend/Admin
VITE_BACKEND_URL=https://your-backend-domain.vercel.app
```

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt for password security
- **Input Validation**: Request validation and sanitization
- **CORS Protection**: Cross-origin resource sharing configuration
- **Environment Variables**: Secure configuration management

## 📊 Performance Features

- **Image Optimization**: Cloudinary integration for optimized images
- **Lazy Loading**: Efficient component loading
- **Responsive Design**: Mobile-first approach
- **Caching**: Browser caching for static assets

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Yousef Saad**
- Email: mine.access00ries@gmail.com
- Phone: +20 01285503980

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- MongoDB for the flexible database solution
- Cloudinary for image management services
- Vercel for seamless deployment

## 📞 Support

For support and questions:
- Email: mine.access00ries@gmail.com
- Phone: +20 01285503980

---

**MINE.** - Your complete e-commerce solution 