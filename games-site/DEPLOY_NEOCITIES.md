# 🚀 Deploying to Neocities

Complete guide to upload GameVault to Neocities and keep it running.

## Prerequisites
- [ ] Firebase project set up and configured
- [ ] Google OAuth credentials created
- [ ] All configurations filled in `js/app.js`
- [ ] Files organized in `games-site` folder

## Step 1: Create Neocities Account

1. Go to https://neocities.org
2. Click "Sign Up"
3. Choose a site name (e.g., `gamevault`, `unblockedgames`)
4. Complete signup
5. You now have a free website at `yourname.neocities.org`

## Step 2: Upload Files

### Method A: Web Upload (Easiest)
1. Log in to Neocities
2. Click "Files" in the dashboard
3. Click "Upload Files"
4. Select all files from `games-site` folder:
   - index.html
   - js/ folder (with app.js)
   - config.js
   - All .md files (optional)
5. Click "Upload"
6. Wait for upload to complete

### Method B: Neocities CLI (Advanced)
```bash
# Install Neocities CLI (requires Node.js)
npm install -g neocities

# Upload entire folder
neocities upload games-site
```

## Step 3: Update Google OAuth

1. Go to Google Cloud Console
2. Go to APIs & Services → Credentials
3. Edit your OAuth 2.0 Client ID
4. Add authorized redirect URI:
   ```
   https://yourname.neocities.org
   ```
5. Add authorized JavaScript origins:
   ```
   https://yourname.neocities.org
   ```
6. Save changes
7. Copy updated Client ID
8. Update Client ID in Firebase app

## Step 4: Update Firebase

1. Go to Firebase Console
2. Select your project
3. Go to Project Settings → Authorized Domains
4. Add: `yourname.neocities.org`
5. Firestore should allow the new domain automatically

## Step 5: Test Your Site

1. Visit `https://yourname.neocities.org`
2. Check that:
   - [ ] Page loads and looks good
   - [ ] Styling and gradients display correctly
   - [ ] Search bar works
   - [ ] Login button is clickable
3. Open browser console (F12) for errors
4. If errors occur, see Troubleshooting section

## Step 6: Test Login & Admin

1. Click "Login with Google"
2. Try to login with test account
3. Verify you see your profile
4. If admin email, verify Admin tab appears
5. Test creating a game (if admin)

## Ongoing Maintenance

### Update Files
If you make changes locally:
1. Edit files in `games-site` folder
2. Go to Neocities Files
3. Click file and "Edit" or re-upload new version
4. Changes go live immediately

### Monitor Usage
1. Check Neocities Dashboard for:
   - Bandwidth usage
   - Visitors
   - Performance
2. Monitor Firebase:
   - Firestore quota
   - Authentication usage

### Backup Data
1. Export Firestore data monthly:
   - Go to Firestore
   - Click "⋮" menu
   - Select "Export collections"
2. Save backup to safe location

## Troubleshooting Deployment

### Site is blank or errors in console

**Solution:**
1. Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
2. Clear browser cache
3. Try incognito window
4. Check Firebase config is correct
5. Verify Google Client ID is valid

### Login doesn't work

**Solution:**
1. Check domain is authorized in Google Cloud Console
2. Verify Firebase authentication is enabled
3. Check browser console for error messages
4. Try different browser
5. Disable browser extensions that block content

### Games won't load

**Solution:**
1. Test game URL works from school network first
2. Some games may not support iframe
3. Try games from GAME_URLS.md
4. Check if school blocks the game domain
5. Use proxy-friendly alternatives

### Firebase connection fails

**Solution:**
1. Verify Firebase credentials in `js/app.js`
2. Check Firestore database is created
3. Verify security rules are set
4. Check if domain is in Firestore authorized domains
5. Look at Firebase console for errors

## Monitoring Your Site

### Firebase Console
- Check Authentication sign-ins
- Monitor Firestore reads/writes
- View error logs
- Track quota usage

### Neocities Dashboard
- View visitor stats
- Monitor bandwidth
- Check site uptime
- Manage files

## Updates & Changes

### Adding More Admin Users
Edit `js/app.js`:
```javascript
const ADMIN_EMAILS = [
    'tfoepc@gmail.com',
    'sagec@longviewschools.org',
    'newemail@example.com'  // Add here
];
```
Then re-upload `js/app.js` to Neocities.

### Changing Site Name
1. Edit `index.html` title and heading
2. Upload new `index.html` to Neocities
3. Changes appear instantly

### Updating Game URLs
Use Admin panel → Create New Game
No Neocities upload needed!

## Performance Tips

- Neocities free tier: 300 GB bandwidth/month (plenty for school site)
- Firebase free tier: 50,000 reads/20,000 writes daily (plenty for school)
- Images load faster from: images.unsplash.com, pixabay.com
- Keep Firestore security rules strict (faster queries)

## Security Checklist

- [ ] Firebase config hidden in deployed site (it's public-safe by design)
- [ ] Google Client ID is correct
- [ ] Firestore security rules properly configured
- [ ] Admin emails verified
- [ ] HTTPS enabled (Neocities default)
- [ ] Regular data backups

## Rollback / Restore

If something breaks:
1. Upload backup HTML from previous version
2. Or re-upload original files
3. Changes take effect immediately
4. Neocities keeps version history

## Get Help

- **Firebase Issues**: https://firebase.google.com/support
- **Neocities Help**: https://neocities.org/help
- **Google OAuth Issues**: https://developers.google.com/identity/help
- **Browser Console Errors**: Press F12 and check Console tab

## Congratulations! 🎉

Your GameVault is now live on the internet!

Students can access it at: `https://yourname.neocities.org`

Share the link and they can start playing games! 🎮
