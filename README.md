# Campus Connect

<img src="https://github.com/amoghar29/CampusConnect-FE/blob/main/public/logo.jpeg" width="150" height="150"/>

Campus Connect is a centralized platform designed to revolutionize event and club management in college campuses. The platform bridges the gap between event organizers and students by providing a seamless interface for event discovery, club management, and community engagement.

## 🌟 Features

### 1. Event Discovery & Management
- Centralized hub for all campus events and hackathons
- Detailed event listings with comprehensive information
- Easy-to-use interface for event discovery
- Real-time updates on upcoming events

### 2. Club Community
- Comprehensive club directory
- Detailed club profiles and information
- Club membership management
- Direct connection with club administrators

### 3. Achievement Showcase
- Dedicated section for event and hackathon winners
- Recognition of student achievements
- Showcase of club activities and accomplishments

### 4. Interactive Features
- Event feedback system
- Suggestion portal for new events
- User profiles for students
- Administrative dashboard for club managers

## 📱 Key Components

### User Features
- **Home Page:** Gateway to all features with quick access to events and clubs
- **Event Explorer:** Browse and search for campus events
- **Club Directory:** Discover and join campus clubs
- **Feedback System:** Share experiences and suggestions
- **Profile Section:** Manage personal information and preferences

### Administrative Features
- **Dashboard:** Comprehensive admin interface
- **Event Management:** Post and edit events
- **Club Management:** Register and manage clubs
- **Feedback Management:** View and address user feedback
- **Analytics:** Track engagement and participation

## 🔒 Security Features
- Hashed the passwords using bcrypt library before storing in the database
- Used JWT for authentication
- Protected routes for administrative functions
- Public routes for general access
- User authentication system

### Project Structure
```
src/
├── controllers/       # Controllers for handling requests
├── models/            # Database models
├── routes/            # API routes
├── middlewares/       # Custom middleware functions
├── utils/             # Utility functions
└── config/            # Configuration files 
```
## 🚀 Getting Started

### Prerequisites
- Node.js
- npm or yarn
- Modern web browser

## 🛠️ Technical Stack

### Frontend
- **Framework:** React.js
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **Icons:** Lucide React
- **Routing:** React Router DOM

### Backend
- **Runtime Environment:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens)
- **Password Encryption:** Bcrypt
- **File Storage:** AWS S3 & Cloudinary

### Installation
1. Clone the repository:
```bash
git clone https://github.com/amoghar29/CampusConnect-BE.git
cd CampusConnect-BE
```
2.Install dependencies
```
npm install
```
3.Create a .env file in the root directory with the following variables:
```
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=your_aws_region
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```
4.Start the development server
```
node index.js
```


