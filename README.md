<h1 align="center">Head 2 Head</h1>
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

## Project Setup

This project showcases a client-side login system using Firebase, supporting both [email/password](https://firebase.google.com/docs/auth/web/password-auth) and [Google sign-in](https://firebase.google.com/docs/auth/web/google-signin) methods. It has been updated from the [original project by The Debug Arena](https://www.youtube.com/watch?v=7jOq6SXBF-k) and now uses [Vite](https://vitejs.dev/guide/) for development.

### Dependencies

**Dependencies**:
```json
"dependencies": {
  "@splinetool/react-spline": "^4.0.0",
  "@splinetool/runtime": "^1.8.9",
  "chart.js": "^4.4.3",
  "firebase": "^10.12.3",
  "lucide-react": "^0.407.0",
  "react": "^18.2.0",
  "react-chartjs-2": "^5.2.0",
  "react-dom": "^18.2.0",
  "react-modal": "^3.16.1",
  "react-router-dom": "^6.3.0",
  "react-toastify": "^10.0.5",
  "toastify": "^2.0.1"
},
"devDependencies": {
  "@types/react": "^18.2.37",
  "@types/react-dom": "^18.2.15",
  "@vitejs/plugin-react": "^4.2.0",
  "autoprefixer": "^10.4.19",
  "eslint": "^8.53.0",
  "eslint-plugin-react": "^7.33.2",
  "eslint-plugin-react-hooks": "^4.6.0",
  "eslint-plugin-react-refresh": "^0.4.4",
  "postcss": "^8.4.39",
  "tailwindcss": "^3.4.4",
  "vite": "^5.0.0"
}
```

## Prerequisites

Make sure you have the following installed:
- Node.js (>=14.x)
- npm

## Setup Instructions

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