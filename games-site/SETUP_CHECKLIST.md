# 📋 Setup Checklist

Use this checklist to ensure everything is configured correctly before uploading to Neocities.

## Firebase Setup
- [ ] Create Firebase project at https://console.firebase.google.com
- [ ] Create Web app in Firebase
- [ ] Copy Firebase credentials
- [ ] Paste credentials into `js/app.js` (lines 10-17)
- [ ] Enable Google Authentication in Firebase Console
- [ ] Create Firestore Database in production mode
- [ ] Copy Firestore security rules from SETUP.md into Firestore Rules tab

## Google OAuth Setup
- [ ] Go to Google Cloud Console (https://console.cloud.google.com)
- [ ] Select your Firebase project
- [ ] Go to APIs & Services → Credentials
- [ ] Create OAuth 2.0 Client ID (Web application)
- [ ] Add authorized redirect URIs:
  - [ ] http://localhost:3000
  - [ ] YOUR_NEOCITIES_DOMAIN.neocities.org
- [ ] Copy Client ID
- [ ] Paste Client ID into `js/app.js` line ~47

## Admin Users
- [ ] Verify admin emails in `js/app.js` (lines ~10):
  - [ ] tfoepc@gmail.com
  - [ ] sagec@longviewschools.org
- [ ] Update to your preferred admin emails if needed

## Test Locally
- [ ] Open `index.html` in browser
- [ ] Page loads without errors (check console with F12)
- [ ] Gradients and styling look good
- [ ] Navigation tabs work (Games, Apps, Admin if logged in as admin)
- [ ] Search bar is functional
- [ ] Login button appears

## Before Uploading to Neocities
- [ ] All Firebase config is filled in correctly
- [ ] Google Client ID is correct
- [ ] No error messages in browser console
- [ ] All files are in the `games-site` folder:
  - [ ] index.html
  - [ ] js/app.js
  - [ ] config.js
  - [ ] SETUP.md
  - [ ] README.md
  - [ ] QUICKSTART.md
  - [ ] SETUP_CHECKLIST.md

## Neocities Upload
- [ ] Create account at https://neocities.org
- [ ] Create new site
- [ ] Upload all files from `games-site` folder
- [ ] Wait for upload to complete
- [ ] Visit your site at `yourname.neocities.org`

## After Upload
- [ ] Homepage loads
- [ ] Login button works (may show popup)
- [ ] Check browser console for any errors (F12)
- [ ] Test search functionality
- [ ] If you're admin: test creating a game
- [ ] If you're admin: test sending notification
- [ ] Test banning a user account (create test account first)

## Game/App URLs to Test
Popular games that work well:
- [ ] Pac-Man: https://pacman.withgoogle.com/
- [ ] Snake: https://playsnake.org/
- [ ] 2048: https://play2048.co/
- [ ] Agar.io: https://agar.io/
- [ ] Slither.io: https://slither.io/

## Troubleshooting
- [ ] If login fails: Check Firebase/Google config
- [ ] If no games load: Check Firestore database is created
- [ ] If styling looks wrong: Hard refresh (Ctrl+Shift+R)
- [ ] If notifications fail: Check Firestore rules are correct
- [ ] Check browser console (F12) for error messages

## Final Checks
- [ ] Site is accessible from school network (if possible)
- [ ] Games load without being blocked
- [ ] Mobile responsiveness works on phones
- [ ] All admin features work (if admin user)
- [ ] Site is ready for students!

## Notes
- You can add/remove admin emails anytime in `js/app.js`
- Games can be added through the Admin panel
- Firestore free tier is sufficient for schools up to ~100 users
- Backup Firestore data regularly

---

**Status:** Ready to deploy ✅
