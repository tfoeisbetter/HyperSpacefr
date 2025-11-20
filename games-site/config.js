// Configuration - Edit these values to customize your GameVault instance

// Admin emails - Users with these emails get admin access
const CONFIG = {
    ADMIN_EMAILS: [
        'tfoepc@gmail.com',
        'sagec@longviewschools.org'
    ],
    
    // Site settings
    SITE_NAME: 'GameVault',
    SITE_DESCRIPTION: 'Unblocked Games & Apps for School',
    
    // Firebase Configuration - REQUIRED: Replace with your Firebase config
    FIREBASE_CONFIG: {
        apiKey: "YOUR_API_KEY",
        authDomain: "YOUR_AUTH_DOMAIN",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_STORAGE_BUCKET",
        messagingSenderId: "YOUR_MESSAGING_ID",
        appId: "YOUR_APP_ID"
    },
    
    // Google OAuth Client ID - REQUIRED: Get from Google Cloud Console
    GOOGLE_CLIENT_ID: "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com",
    
    // Notification settings
    NOTIFICATION_TIMEOUT: 5000, // How long notifications stay visible (ms)
    
    // Search settings
    MAX_SEARCH_RESULTS: 8,
    
    // Game card settings
    GRADIENTS: [
        'card-gradient-1',  // Purple to pink
        'card-gradient-2',  // Pink to red
        'card-gradient-3',  // Blue to cyan
        'card-gradient-4'   // Green to teal
    ]
};
