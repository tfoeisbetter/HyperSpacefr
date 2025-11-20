# 🔧 Troubleshooting Guide

## Common Issues & Solutions

### 1. Site Won't Load / Blank Page

**Symptoms:** White or blank page, nothing displays

**Solutions:**
1. **Check console for errors:**
   - Press F12
   - Go to "Console" tab
   - Look for red error messages

2. **Hard refresh browser:**
   - Windows: Ctrl+Shift+R
   - Mac: Cmd+Shift+R
   
3. **Clear browser cache:**
   - Chrome: Settings → Privacy → Clear browsing data
   - Firefox: History → Clear Recent History
   - Safari: Develop → Empty Web Storage

4. **Try incognito/private window:**
   - Chrome: Ctrl+Shift+N
   - Firefox: Ctrl+Shift+P
   - Safari: Cmd+Shift+N

5. **Check if JavaScript is enabled:**
   - Chrome: Settings → JavaScript → Allow
   - Firefox: type `about:config` → `javascript.enabled` → true

**If still blank:**
- Make sure index.html is in root folder
- Check js/app.js is in correct location
- Verify all files were uploaded to Neocities

---

### 2. Firebase Configuration Error

**Symptoms:** Console errors mentioning "Firebase" or "apiKey"

**Error message:** `"Firebase: Error (auth/invalid-api-key)"` or similar

**Solutions:**

1. **Verify Firebase config:**
   - Check `js/app.js` lines 10-17
   - Make sure all values are filled (not "YOUR_API_KEY")
   - No extra spaces or quotes

2. **Get correct config:**
   - Go to Firebase Console
   - Select your project
   - Go to Settings → Project Settings
   - Scroll to "Your apps" → Web app
   - Copy entire config

3. **Re-paste config:**
   - Replace everything from `apiKey` to `appId`
   - Upload file to Neocities
   - Hard refresh browser

4. **Check project is active:**
   - Firebase Console → Your project
   - If project is deleted/suspended, create new one

---

### 3. Google Login Not Working

**Symptoms:** Click login button → nothing happens or error

**Solutions:**

1. **Check Google Client ID:**
   - Make sure Google Client ID is in `js/app.js` line ~47
   - Should end with `.apps.googleusercontent.com`
   - No quotation mark errors

2. **Verify domain authorization:**
   - Go to Google Cloud Console
   - APIs & Services → Credentials
   - Edit OAuth 2.0 Client ID
   - Check "Authorized JavaScript origins" includes:
     ```
     http://localhost:3000        (for testing)
     https://yourname.neocities.org (for production)
     ```
   - Check "Authorized redirect URIs" includes same

3. **Check Firebase authentication:**
   - Firebase Console → Authentication
   - "Sign-in method" tab
   - Ensure "Google" is ENABLED
   - Click on Google
   - Verify it says "Enabled"

4. **Test in different browser:**
   - Try Chrome, Firefox, Safari
   - Try private/incognito window

5. **Check for popup blockers:**
   - Google Sign-in may try to open popup
   - Disable popup blocker
   - Check browser extensions blocking scripts

**Error in console:** If you see CORS errors:
- Domain not authorized in Google Cloud Console
- Add your exact domain to authorized list
- Wait 5-10 minutes for changes to propagate

---

### 4. Games Won't Load / Blocked

**Symptoms:** Click Play → blank or loading forever

**Solutions:**

1. **Test game URL outside site:**
   - Copy the game URL
   - Open in new tab
   - If it works, problem is iframe/embedding
   - If it doesn't work, game is blocked by school network

2. **Check if school blocks it:**
   - Try from home network
   - If works at home but not school, it's network blocked
   - Try different game from GAME_URLS.md

3. **Some games don't support iframe:**
   - These open in new window instead
   - If new window opens but blank:
     - Check if new window blocked
     - Try disabling extensions
     - Game may be blocked

4. **Recommended unblocked games:**
   - https://pacman.withgoogle.com/
   - https://playsnake.org/
   - https://play2048.co/
   - These work from most schools

---

### 5. Firestore Database Connection Failed

**Symptoms:** Console error about "Firestore" or "database"

**Error:** `"Firestore: (permission-denied)"` or "no database"

**Solutions:**

1. **Create Firestore database:**
   - Go to Firebase Console
   - Click "Firestore Database"
   - If not created:
     - Click "Create Database"
     - Select "Production mode"
     - Choose closest region
     - Click "Create"
   - Wait 5 minutes

2. **Fix Firestore security rules:**
   - Go to Firestore → Rules tab
   - Replace with rules from SETUP.md
   - Click "Publish"
   - Rules take 5-10 minutes to apply

3. **Check rules allow your domain:**
   - Go to Firestore → Rules
   - Should have:
     ```
     match /games/{document=**} {
         allow read: if true;
     ```

4. **Verify admin emails in rules:**
   - Rules should check:
     ```
     request.auth.token.email in ['tfoepc@gmail.com', 'sagec@longviewschools.org']
     ```
   - Add your admin emails here if different

---

### 6. Admin Features Not Showing

**Symptoms:** Admin tab missing, can't manage games

**Solutions:**

1. **Check you're using admin email:**
   - Login with tfoepc@gmail.com or sagec@longviewschools.org
   - Other emails won't see admin features

2. **Verify admin emails in code:**
   - Open `js/app.js`
   - Search for `ADMIN_EMAILS`
   - Make sure your email is in the list:
     ```javascript
     const ADMIN_EMAILS = ['YOUR_EMAIL@example.com', ...];
     ```

3. **Re-upload JavaScript file:**
   - Edit `js/app.js`
   - Upload to Neocities
   - Hard refresh browser
   - Login again

4. **Check Firestore rules:**
   - Rules must have:
     ```javascript
     function isAdmin() {
         return request.auth.token.email in ['YOUR_EMAILS_HERE'];
     }
     ```

---

### 7. Notifications Not Working

**Symptoms:** Send notification → no one receives it

**Solutions:**

1. **Check Firestore is working:**
   - Go to Firestore → Data
   - Do you see any collections?
   - If empty, notifications aren't being created

2. **Verify notifications collection:**
   - Firestore → Data
   - Should have "notifications" collection
   - Click on it, should see sent notifications

3. **Check security rules:**
   - Rules should allow writing to notifications
   - Check rules have:
     ```javascript
     match /notifications/{document=**} {
         allow read: if request.auth != null;
         allow write: if isAdmin();
     }
     ```

4. **Verify users collection:**
   - Firestore → Data
   - Should have "users" collection
   - If empty, no users logged in yet

---

### 8. Search Not Working

**Symptoms:** Search bar visible but doesn't find games

**Solutions:**

1. **Check games are loaded:**
   - Open browser console (F12)
   - Type: `allGames`
   - Press Enter
   - Should show array of games
   - If empty `[]`, games aren't loading from Firestore

2. **Add sample games:**
   - Go to Admin tab (if admin)
   - Create at least one game manually
   - Should appear in search

3. **Check search code:**
   - Search functionality is in `js/app.js`
   - Look for `CTRL+F` search for "search-input"
   - Make sure it's listening for input

---

### 9. Favorites Not Saving

**Symptoms:** Heart stays white, favorites not persisting

**Solutions:**

1. **Make sure you're logged in:**
   - Click login button
   - Sign in with Google
   - You should see your name and avatar

2. **Check Firestore permissions:**
   - Go to Firestore → Rules
   - Users should be able to write to their favorites:
     ```javascript
     match /users/{userId}/favorites/{document=**} {
         allow read, write: if request.auth.uid == userId;
     }
     ```

3. **Verify user document created:**
   - Login
   - Go to Firestore → Data → users
   - Should see your user ID
   - Click on it, should see user data

4. **Check browser console:**
   - F12 → Console
   - Click heart on game
   - Any errors?

---

### 10. Responsive Design Broken

**Symptoms:** Site doesn't look right on phone/tablet

**Solutions:**

1. **Check viewport meta tag:**
   - Open `index.html`
   - Should have:
     ```html
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     ```
   - If missing, add it

2. **Test on real device:**
   - Open site on phone
   - Try portrait and landscape
   - If broken, browser cache might be issue:
     - Hard refresh on phone
     - Clear browser cache
     - Try incognito

3. **Verify Tailwind CSS loaded:**
   - F12 → Console
   - Should NOT show CSS errors
   - Styles should be applied

---

### 11. Users Getting Banned Unexpectedly

**Symptoms:** User can't login, says "banned"

**Solutions:**

1. **Check user in Firestore:**
   - Go to Firestore → users
   - Find user by email
   - Check `banned` field
   - Should be `false` for active users

2. **Unban user:**
   - Admin: Go to Admin tab
   - Find user in "Users" section
   - Click "Unban"
   - User can now login

3. **Verify ban logic:**
   - Check `js/app.js` for ban checking
   - Admins can set `banned: true` in Firestore
   - User will be blocked

---

### 12. Too Many Firebase Errors / Quota Exceeded

**Symptoms:** "Quota exceeded" errors

**Solutions:**

1. **Check Firestore quota:**
   - Firebase Console → Quotas
   - Free tier includes 50,000 reads/day
   - 20,000 writes/day
   - Should be enough for schools

2. **Optimize Firestore calls:**
   - Review `js/app.js`
   - Too many calls = quota exceeded
   - Cache results in browser

3. **Upgrade plan if needed:**
   - Firebase → Blaze plan (pay as you go)
   - Most schools stay on free tier
   - Check pricing before upgrading

---

## Browser-Specific Issues

### Chrome
- Extensions may block content → Try incognito
- Site not updating → Ctrl+Shift+R (hard refresh)

### Firefox  
- Tracking protection blocks OAuth → Disable for site
- Console → F12 shows JavaScript errors

### Safari
- Private browsing → Sites may not save data
- May require HTTPS (Neocities provides this)

### Mobile (iOS/Android)
- Incognito/private mode → Data won't save
- Slow internet → Games take time to load
- Try landscape orientation for games

---

## Getting More Help

### Check These First
1. Browser console (F12 → Console tab)
2. Read error messages carefully
3. Try different browser
4. Try incognito/private window

### Review Documentation
1. SETUP.md - Configuration steps
2. DEPLOY_NEOCITIES.md - Deployment help
3. GAME_URLS.md - Working game URLs

### Contact Firebase Support
- https://firebase.google.com/support
- May need Firebase account email

### Check Google Documentation
- https://developers.google.com/identity
- OAuth setup issues

### Neocities Help
- https://neocities.org/help
- Upload and deployment issues

---

## Error Messages Decoded

| Error | Meaning | Solution |
|-------|---------|----------|
| `auth/invalid-api-key` | Firebase key wrong | Verify Firebase config |
| `permission-denied` | Firestore rules block | Update security rules |
| `CORS error` | Domain not authorized | Add domain to Google Console |
| `TypeError: Cannot read property` | JavaScript error | Check console for full error |
| `Failed to load iframe` | Game blocked | Try different game |
| `NetworkError: 401` | Authentication failed | Check login credentials |

---

## Performance Issues

### Site Loading Slowly
- Clear browser cache
- Disable browser extensions
- Check internet connection
- Games with large assets may take time

### Games Run Slowly
- Close other browser tabs
- Disable background apps
- Check internet speed
- Some games are graphics-heavy

---

**Still stuck?** Check the console errors (F12) and search for the error message online, or contact your site admin!
