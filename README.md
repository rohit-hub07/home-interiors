# Home Design - Interior Design Management Platform

A Next.js-based interior design management platform with admin capabilities for uploading, editing, and managing design posts across different categories.

## Features

- 🏠 Interior design gallery with multiple categories (Kitchen, Bedroom, Living Room, etc.)
- 🔐 Admin authentication and authorization
- 📤 Media upload with Cloudinary integration
- ✏️ Post creation, editing, and deletion
- 🎨 Category-based design filtering
- 📱 Responsive design
- 🔄 Real-time updates with context API

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB database
- Cloudinary account

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd homedesign
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Create a `.env` file in the root directory (see Environment Variables section below)

4. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# MongoDB Connection
DB_CONNECTION_STRING=mongodb://localhost:27017/homedesign
# or for MongoDB Atlas:
# DB_CONNECTION_STRING=your connection string

# JWT Secret (use a strong random string)
JWT_SECRET=your_jwt_secret_key_here

# Admin Creation Secret (used for creating admin users)
CREATEADMIN_SECRET=your_admin_creation_secret_here

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Node Environment
NODE_ENV=development
```

### How to Get Environment Variables

**MongoDB Connection String:**

- Local: `mongodb://localhost:27017/homedesign`
- Cloud (MongoDB Atlas): Sign up at [mongodb.com](https://www.mongodb.com/cloud/atlas) and create a cluster

**JWT Secret:**

- Generate a secure random string (32+ characters)
- Example: `openssl rand -base64 32` (in terminal)

**Cloudinary:**

- Sign up at [cloudinary.com](https://cloudinary.com)
- Find credentials in Dashboard → Account Details

## API Documentation

### Authentication Endpoints

#### POST `/api/user/signup`

Create a new admin user (protected by admin secret).

**Headers:**

```json
{
  "admin-secret": "your_admin_secret"
}
```

**Request Body:**

```json
{
  "email": "admin@example.com",
  "password": "securepassword123",
  "role": "admin"
}
```

**Response:**

```json
{
  "message": "User created successfully!",
  "success": true
}
```

---

#### POST `/api/user/login`

Login as admin user.

**Request Body:**

```json
{
  "email": "admin@example.com",
  "password": "securepassword123"
}
```

**Response:**

```json
{
  "message": "User logged in successfully",
  "success": true
}
```

---

#### GET `/api/user/logout`

Logout current user (clears authentication cookie).

**Response:**

```json
{
  "message": "Logout successfully",
  "success": true
}
```

---

#### GET `/api/user/me`

Get current authenticated user ID.

**Headers:**

```
Cookie: token=<jwt_token>
```

**Response:**

```json
{
  "message": "User fetched successfully!",
  "success": true,
  "userId": "user_id_here"
}
```

---

### Post Management Endpoints

#### POST `/api/post/upload-media`

Upload media file to Cloudinary.

**Request:** Multipart form data

```
file: <image/video file>
```

**Response:**

```json
{
  "message": "File uploaded successfully!",
  "success": true,
  "mediaUrl": "https://res.cloudinary.com/.../image.jpg",
  "mediaType": "image"
}
```

---

#### POST `/api/post/upload`

Create a new design post.

**Request Body:**

```json
{
  "title": "Modern Kitchen Design",
  "mediaUrl": "https://res.cloudinary.com/.../image.jpg",
  "mediaType": "image",
  "category": "kitchen"
}
```

**Response:**

```json
{
  "message": "Post created successfully!",
  "success": true,
  "post": {
    "_id": "post_id",
    "title": "Modern Kitchen Design",
    "mediaUrl": "...",
    "mediaType": "image",
    "category": "kitchen"
  }
}
```

---

#### GET `/api/post/designs/[category]`

Get all posts by category.

**URL Parameters:**

- `category`: kitchen | bedroom | living-room | etc.

**Response:**

```json
{
  "message": "Posts fetched successfully!",
  "success": true,
  "posts": [
    {
      "_id": "post_id",
      "title": "Modern Kitchen",
      "mediaUrl": "...",
      "category": "kitchen"
    }
  ]
}
```

---

#### GET `/api/post/getpost/[id]`

Get a single post by ID.

**URL Parameters:**

- `id`: post ID

**Response:**

```json
{
  "message": "Post fetched successfully!",
  "success": true,
  "post": {
    "_id": "post_id",
    "title": "Modern Kitchen",
    "mediaUrl": "...",
    "category": "kitchen"
  }
}
```

---

#### PUT `/api/post/edit/[id]`

Update an existing post.

**URL Parameters:**

- `id`: post ID

**Request Body:**

```json
{
  "title": "Updated Kitchen Design",
  "mediaUrl": "https://res.cloudinary.com/.../new-image.jpg",
  "mediaType": "image",
  "category": "kitchen"
}
```

**Response:**

```json
{
  "message": "Post updated successfully!",
  "success": true,
  "data": {
    "_id": "post_id",
    "title": "Updated Kitchen Design",
    ...
  }
}
```

---

#### DELETE `/api/post/delete/[id]`

Delete a post by ID.

**URL Parameters:**

- `id`: post ID

**Response:**

```json
{
  "message": "Post deleted successfully!",
  "success": true
}
```

---

### Slider Endpoints

#### GET `/api/slider/[componentName]`

Get slider data for a specific component.

**URL Parameters:**

- `componentName`: Component name for slider

---

## Project Structure

```
src/
├── app/              # Next.js app directory
│   ├── api/          # API routes
│   ├── admin-login/  # Admin login page
│   ├── home/         # Home page
│   ├── interiors/    # Interior category pages
│   └── upload-design/# Design upload page
├── Components/       # React components
├── context/          # Context API providers
├── db/               # Database connection
├── lib/              # Third-party integrations
├── model/            # Mongoose models
└── utilities/        # Helper functions
```

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT with HTTP-only cookies
- **File Storage:** Cloudinary
- **Styling:** CSS/Tailwind CSS
- **State Management:** React Context API

## Learn More

To learn more about Next.js:

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
