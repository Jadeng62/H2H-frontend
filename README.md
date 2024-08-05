<h1 align="center">Head 2 Head - Client Side</h1>
<p align="center">
  <img src="https://res.cloudinary.com/dwygxzqku/image/upload/v1722631715/H2H/h2h-logos/H2H-Logo_jnhf5q.png" 
    alt="H2H Logo" 
    style="border-radius: 15px;"
  />
</p>

## Live Demo

Check out the live demo of the Head 2 Head app here: [Deployed App](http://your-deployed-app-url.com)

## App Overview

H2H is your ultimate app for finding teammates, creating matches, and elevating your basketball experience. Our platform simplifies the process of building teams and setting up games, helping you reconnect with the thrill of competitive sports. 

- **Find Teammates**: Easily discover and connect with players who share your passion for basketball.
- **Create Matches**: Set up and organize games with just a few clicks, ensuring smooth and efficient match scheduling.
- **Personalized Player Profiles**: Showcase your skills and achievements with detailed profiles tailored to your playing style.
- **Professional Athlete-Like Stats**: Track your performance with advanced statistics that mirror those of professional athletes, adding depth to your game.
- **Opportunities for Excellence**: Whether you aim for individual recognition or team glory, H2H offers various ways to shine and be acknowledged.

Experience the perfect blend of digital convenience and real-life sports excitement with H2H, where every game and player counts.

## Key Features

- **Authentication**:
  - Email/Password sign-in
  - Google sign-in

- **User Management**:
  - Authentication state handled in the `App.jsx` component.
  - Manage user data using the `getUserData` function.

- **Frontend Components**:
  - Includes Login, Register, Profile, Matches, MyTeam, Leaderboard, and more.
  - Features conditional rendering and modals for user interactions.

- **Routing**:
  - Configured with `react-router-dom`.
  - Protected routes and redirects based on authentication status.

- **Component Structure**:
  - Manages components for users, teams, badges, and match management.
  - Routes are defined in `App.jsx`.
  - Image upload with drag-and-drop functionality using Cloudinary API.
  - Tailwind CSS for GUI.

### Dependencies

This project relies on a set of packages to function correctly. Here's a quick overview of the main ones:

**Core Dependencies:**
- **`@splinetool/react-spline`**: For integrating spline animations.
- **`chart.js`**: To create interactive charts and graphs.
- **`firebase`**: For authentication and backend services.
- **`lucide-react`**: A library for beautiful icons.
- **`react`** and **`react-dom`**: Essential for building and rendering your user interface.
- **`react-chartjs-2`**: To integrate Chart.js with React.
- **`react-modal`**: For displaying modal dialogs.
- **`react-router-dom`**: Manages routing and navigation within your app.
- **`react-toastify`**: To show toast notifications for user feedback.

**Development Dependencies:**
- **`@types/react`** and **`@types/react-dom`**: TypeScript type definitions for React.
- **`@vitejs/plugin-react`**: Vite plugin for React support.
- **`autoprefixer`** and **`postcss`**: Tools for automatically adding vendor prefixes to your CSS.
- **`eslint`**, **`eslint-plugin-react`**, **`eslint-plugin-react-hooks`**, and **`eslint-plugin-react-refresh`**: Tools for linting and code quality checks.
- **`tailwindcss`**: A utility-first CSS framework for building custom designs quickly.
- **`vite`**: A fast build tool that helps with development and bundling.

## Project Setup

This project showcases a client-side login system using Firebase, supporting both [email/password](https://firebase.google.com/docs/auth/web/password-auth) and [Google sign-in](https://firebase.google.com/docs/auth/web/google-signin) methods. It has been updated from the [original project by The Debug Arena](https://www.youtube.com/watch?v=7jOq6SXBF-k) and now uses [Vite](https://vitejs.dev/guide/) for development.

### Prerequisites

Make sure you have the following installed:
- Node.js (>=14.x)
- npm

### Setup Instructions

1. **Clone the Client-Side Repository**
   ```bash
   git clone https://github.com/Jadeng62/H2H-frontend.git
   ```

2. **Clone the Server-Side Repository**
   ```bash
   git clone https://github.com/Jadeng62/H2H-backend.git
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Configure Firebase**

   - **Create a Firebase Project**:
     - Go to the [Firebase Console](https://console.firebase.google.com/).
     - Create a new Firebase project.

   - **Enable Authentication**:
     - Enable Email/Password and Google sign-in methods.

   - **Configure Firestore** (Optional):
     - If using Firestore, set rules to allow read and write operations only if authenticated:
       ```js
       rules_version = '2';
       service cloud.firestore {
         match /databases/{database}/documents {
           match /{document=**} {
             allow read, write: if request.auth != null;
           }
         }
       }
       ```

5. **Set Up Environment Variables**

   Create a `.env` file in the root directory of your project with the following content, replacing placeholders with your Firebase configuration values:
   ```env
   VITE_FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY
   VITE_FIREBASE_AUTH_DOMAIN=YOUR_FIREBASE_AUTH_DOMAIN
   VITE_FIREBASE_PROJECT_ID=YOUR_FIREBASE_PROJECT_ID
   VITE_FIREBASE_STORAGE_BUCKET=YOUR_FIREBASE_STORAGE_BUCKET
   VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_FIREBASE_MESSAGING_SENDER_ID
   VITE_FIREBASE_APP_ID=YOUR_FIREBASE_APP_ID
   VITE_FIREBASE_MEASUREMENT_ID=YOUR_FIREBASE_MEASUREMENT_ID
   VITE_BASE_URL=http://localhost:3003
   ```

6. **Start the Development Server for Client-Side and Server-Side Repositories**
   ```bash
   npm run dev
   ```
   Open your browser and go to `http://localhost:3000` to see the app in action!

---