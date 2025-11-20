# 🚀 Quick Start Guide

Get GameVault up and running in 5 minutes!

## 1. Get Your Firebase Credentials (2 min)

1. Go to https://console.firebase.google.com
2. Click "Create a new project"
3. Name it "GameVault" and continue through setup
4. Once created, click the "Web" app icon
5. Copy all the credentials shown

## 2. Get Your Google Client ID (2 min)

1. Go to https://console.cloud.google.com
2. Make sure your Firebase project is selected
3. Go to "APIs & Services" → "Credentials"
4. Click "Create Credentials" → "OAuth 2.0 Client ID"
5. Choose "Web application"
6. Add your Neocities domain under "Authorized redirect URIs"
7. Copy the "Client ID"

## 3. Update Configuration (1 min)

Edit `js/app.js` and find these lines:

**Line ~10-17:** Replace with your Firebase config:
```javascript
const firebaseConfig = {
    apiKey: "PASTE_YOUR_API_KEY",
    authDomain: "PASTE_YOUR_AUTH_DOMAIN",
    projectId: "PASTE_YOUR_PROJECT_ID",
    storageBucket: "PASTE_YOUR_STORAGE_BUCKET",
    messagingSenderId: "PASTE_YOUR_MESSAGING_ID",
    appId: "PASTE_YOUR_APP_ID"
};
```

**Line ~47:** Replace with your Google Client ID:
```javascript
client_id: 'PASTE_YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com',
```

## 4. Test Locally

1. Open `index.html` in your browser
2. You should see the GameVault homepage
3. Try clicking "Login with Google" (may need HTTPS)

## 5. Upload to Neocities

1. Create account at https://neocities.org
2. Upload all files from `games-site/` folder
3. Your site is live at `yourname.neocities.org`!

## Done! 🎉

Your GameVault is ready to use! Admin users can start adding games from the Admin tab.

## Quick Tips

- **First Login?** Check your Firebase rules are set correctly
- **Games Not Working?** Make sure the game URLs work from school networks
- **Need Help?** See SETUP.md for detailed instructions
- **Want to Add Admin Users?** Edit `js/app.js` line ~10 and add more emails to `ADMIN_EMAILS`

## Adding Your First Game (As Admin)

1. Login with an admin email (tfoepc@gmail.com or sagec@longviewschools.org)
2. Go to "Admin" tab
3. Fill in:
   - **Name:** "Pac-Man"
   - **URL:** "https://pacman.withgoogle.com/"
   - **Image URL:** "https://images.unsplash.com/photo-1559208456-641a0ac8b3f7"
   - **Type:** "Game"
4. Click "Create"
5. Your first game appears in the Games tab!

## That's It!

You now have a fully functional unblocked games site! 🎮
