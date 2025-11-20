# GameVault - Unblocked Games & Apps Setup Guide

## Overview
GameVault is a modern, responsive web application for hosting unblocked games and apps at school. It includes admin features like game management, user banning, and system-wide notifications.

## Features
- ✅ Responsive design with gradients (works on all devices)
- ✅ Google OAuth login
- ✅ Favorite games/apps
- ✅ Search functionality
- ✅ Admin dashboard (for tfoepc@gmail.com & sagec@longviewschools.org)
- ✅ Game/App management
- ✅ User ban system
- ✅ Real-time notifications to all users
- ✅ Fully compatible with Neocities

## Setup Instructions

### Step 1: Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Create a new project"
3. Name it "GameVault"
4. Wait for project creation
5. Click "Create app" → Web app
6. Copy your Firebase config

### Step 2: Update Firebase Config
In `js/app.js`, replace the firebaseConfig with your actual credentials:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_ID",
    appId: "YOUR_APP_ID"
};
```

### Step 3: Enable Firebase Services
1. In Firebase Console, go to **Authentication** → **Sign-in method**
2. Enable **Google** sign-in
3. Go to **Firestore Database**
4. Click "Create database" in production mode
5. Set location to nearest to you
6. Click "Create"

### Step 4: Setup Firestore Security Rules
In Firestore, go to **Rules** and paste:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /games/{document=**} {
      allow read: if true;
      allow write: if request.auth != null && isAdmin();
    }
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId || isAdmin();
      allow read: if isAdmin();
    }
    match /users/{userId}/favorites/{document=**} {
      allow read, write: if request.auth.uid == userId;
    }
    match /users/{userId}/notifications/{document=**} {
      allow read: if request.auth.uid == userId;
      allow write: if isAdmin();
    }
    match /notifications/{document=**} {
      allow read: if request.auth != null;
      allow write: if isAdmin();
    }
    
    function isAdmin() {
      return request.auth.token.email in ['tfoepc@gmail.com', 'sagec@longviewschools.org'];
    }
  }
}
```

### Step 5: Create Google OAuth Credentials
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Select or create a project
3. Go to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth 2.0 Client ID**
5. Select **Web application**
6. Add authorized redirect URIs:
   - `http://localhost:3000`
   - `YOUR_NEOCITIES_DOMAIN.neocities.org`
7. Copy the Client ID

### Step 6: Update Google Client ID
In `index.html`, find this line:
```javascript
client_id: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com',
```

Replace with your actual Client ID.

### Step 7: Prepare for Neocities Upload

1. All files are already Neocities-compatible (no build step needed!)
2. To upload to Neocities:
   - Create account at [Neocities.org](https://neocities.org)
   - Upload the entire `games-site` folder
   - Your site will be at `yoursite.neocities.org`

## File Structure
```
games-site/
├── index.html              # Main HTML file
├── js/
│   └── app.js             # JavaScript application
├── SETUP.md               # This file
└── README.md              # User guide
```

## Default Admin Emails
- `tfoepc@gmail.com`
- `sagec@longviewschools.org`

Change these in `js/app.js`:
```javascript
const ADMIN_EMAILS = ['tfoepc@gmail.com', 'sagec@longviewschools.org'];
```

## Testing Locally
1. Open `index.html` in a web browser
2. Some features (like Google OAuth) may require HTTPS
3. For full testing, deploy to Neocities or use a local HTTPS server

## Adding Games & Apps
Admin users can:
1. Go to **Admin** tab
2. Fill in game/app details:
   - Name
   - URL (must be accessible from school networks)
   - Image URL
   - Type (Game or App)
3. Click "Create"

## Game/App URL Tips
- Use direct game URLs that work without authentication
- Test URLs work from school networks first
- For iframe compatibility, use games that allow embedding
- If a game doesn't support iframe, it will open in a new window

## Notifications
Admin users can send notifications that:
- Appear in real-time on all devices
- Show custom title and message
- Are stored and visible to new users

## Banning Users
Admin users can ban/unban users:
1. Go to **Admin** tab
2. Find user in "Users" section
3. Click "Ban" to restrict access
4. Banned users see message and cannot use the site

## Troubleshooting

### Google Login Not Working
- Check Firebase Google sign-in is enabled
- Verify Google Client ID is correct
- Check domain is authorized in Google Cloud Console

### Firestore Connection Issues
- Verify Firebase config is correct
- Check Firestore is created in Firebase Console
- Check security rules are properly set

### Games Not Loading
- Test URL works from school network
- Check if URL requires authentication
- Try different game URLs
- Some games may not support iframe embedding

## Support
For issues, check:
1. Browser console for errors (F12)
2. Firebase Console for quota/errors
3. Firestore security rules
4. Network tab for blocked requests
