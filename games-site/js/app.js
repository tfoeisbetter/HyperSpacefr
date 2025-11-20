// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDmKwN6f8N_p0qRpJ0q0q0q0q0q0q0q0q0",
    authDomain: "gamevault-unblocked.firebaseapp.com",
    projectId: "gamevault-unblocked",
    storageBucket: "gamevault-unblocked.firebasestorage.app",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdef123456789012"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Admin emails
const ADMIN_EMAILS = ['tfoepc@gmail.com', 'sagec@longviewschools.org'];

let currentUser = null;
let isAdmin = false;
let userBanned = false;
let allGames = [];
let allApps = [];

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    setupGoogleAuth();
    setupEventListeners();
    auth.onAuthStateChanged((user) => {
        currentUser = user;
        if (user) {
            handleUserLoggedIn(user);
        } else {
            handleUserLoggedOut();
        }
    });
    loadGamesAndApps();
    setupNotificationListener();
});

// Google Auth Setup
function setupGoogleAuth() {
    google.accounts.id.initialize({
        client_id: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com',
        callback: handleGoogleLogin
    });
}

// Handle Google Login
async function handleGoogleLogin(response) {
    try {
        const credential = firebase.auth.GoogleAuthProvider.credential(response.credential);
        await auth.signInWithCredential(credential);
    } catch (error) {
        showNotification('Login Error', error.message, 'error');
    }
}

// Handle Login Button
function handleLogin() {
    google.accounts.id.renderButton(document.getElementById('login-btn'), {
        theme: 'filled_blue',
        size: 'large',
        text: 'signin_with'
    });
    google.accounts.id.prompt();
}

// Handle User Logged In
async function handleUserLoggedIn(user) {
    document.getElementById('login-btn').style.display = 'none';
    document.getElementById('user-profile').classList.remove('hidden');
    document.getElementById('user-name').textContent = user.displayName;
    document.getElementById('user-avatar').src = user.photoURL;

    // Check if user is banned
    try {
        const userDoc = await db.collection('users').doc(user.uid).get();
        if (userDoc.exists && userDoc.data().banned) {
            userBanned = true;
            showNotification('Access Denied', 'Your account has been banned', 'error');
            setTimeout(() => handleLogout(), 2000);
            return;
        }
    } catch (error) {
        console.error('Error checking ban status:', error);
    }

    // Check if admin
    isAdmin = ADMIN_EMAILS.includes(user.email);
    if (isAdmin) {
        document.getElementById('admin-btn').classList.remove('hidden');
        document.getElementById('admin-btn-mobile').classList.remove('hidden');
        loadAdminData();
    }

    // Create user document if new
    try {
        await db.collection('users').doc(user.uid).set({
            email: user.email,
            name: user.displayName,
            photoURL: user.photoURL,
            lastLogin: new Date(),
            banned: false
        }, { merge: true });
    } catch (error) {
        console.error('Error creating user document:', error);
    }
}

// Handle User Logged Out
function handleUserLoggedOut() {
    document.getElementById('login-btn').style.display = 'block';
    document.getElementById('user-profile').classList.add('hidden');
    isAdmin = false;
    document.getElementById('admin-btn').classList.add('hidden');
    document.getElementById('admin-btn-mobile').classList.add('hidden');
}

// Handle Logout
function handleLogout() {
    auth.signOut();
}

// Setup Event Listeners
function setupEventListeners() {
    document.getElementById('search-input').addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        if (query.length > 0) {
            const results = [...allGames, ...allApps].filter(item =>
                item.name.toLowerCase().includes(query) ||
                (item.description && item.description.toLowerCase().includes(query))
            ).slice(0, 8);
            
            const searchResultsDiv = document.getElementById('search-results');
            if (results.length > 0) {
                searchResultsDiv.innerHTML = results.map(item => `
                    <div class="p-3 hover:bg-gray-700 cursor-pointer border-b border-gray-600 last:border-b-0"
                         onclick="playGame('${item.id}')">
                        <div class="font-semibold">${item.name}</div>
                        <div class="text-sm text-gray-400">${item.type}</div>
                    </div>
                `).join('');
                searchResultsDiv.classList.remove('hidden');
            } else {
                searchResultsDiv.classList.add('hidden');
            }
        } else {
            document.getElementById('search-results').classList.add('hidden');
        }
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-bar')) {
            document.getElementById('search-results').classList.add('hidden');
        }
    });
}

// Load Games and Apps from Firestore
async function loadGamesAndApps() {
    try {
        const gamesSnapshot = await db.collection('games').where('type', '==', 'game').get();
        const appsSnapshot = await db.collection('games').where('type', '==', 'app').get();

        allGames = gamesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        allApps = appsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        displayGames();
        displayApps();
    } catch (error) {
        console.error('Error loading games:', error);
        // Load sample data if Firestore fails
        loadSampleData();
    }
}

// Load sample data
function loadSampleData() {
    allGames = [
        {
            id: '1',
            name: 'Pac-Man',
            url: 'https://pacman.withgoogle.com/',
            image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"%3E%3Crect fill="%23FFD700" width="200" height="200"/%3E%3Ccircle cx="100" cy="100" r="80" fill="black"/%3E%3C/svg%3E',
            type: 'game',
            description: 'Classic Pac-Man game'
        },
        {
            id: '2',
            name: 'Snake',
            url: 'https://playsnake.org/',
            image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"%3E%3Crect fill="%2300FF00" width="200" height="200"/%3E%3C/svg%3E',
            type: 'game',
            description: 'Classic Snake game'
        },
        {
            id: '3',
            name: 'Tetris',
            url: 'https://tetris.com/play-tetris',
            image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"%3E%3Crect fill="%23FF0000" width="200" height="200"/%3E%3C/svg%3E',
            type: 'game',
            description: 'Classic Tetris game'
        }
    ];

    allApps = [
        {
            id: 'a1',
            name: 'Calculator',
            url: 'https://calculator.withgoogle.com/',
            image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"%3E%3Crect fill="%234285F4" width="200" height="200"/%3E%3C/svg%3E',
            type: 'app',
            description: 'Google Calculator'
        },
        {
            id: 'a2',
            name: 'Draw',
            url: 'https://quickdraw.withgoogle.com/',
            image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"%3E%3Crect fill="%234285F4" width="200" height="200"/%3E%3C/svg%3E',
            type: 'app',
            description: 'Google Quick Draw'
        }
    ];

    displayGames();
    displayApps();
}

// Display Games
function displayGames() {
    const container = document.getElementById('games-container');
    if (allGames.length === 0) {
        container.innerHTML = '<p class="col-span-full text-center text-gray-400">No games available yet</p>';
        return;
    }

    container.innerHTML = allGames.map((game, index) => {
        const gradients = ['card-gradient-1', 'card-gradient-2', 'card-gradient-3', 'card-gradient-4'];
        const gradient = gradients[index % gradients.length];
        return `
            <div class="game-card rounded-lg overflow-hidden shadow-lg cursor-pointer" onclick="playGame('${game.id}')">
                <div class="${gradient} h-40 flex items-center justify-center">
                    <img src="${game.image}" alt="${game.name}" class="w-full h-full object-cover">
                </div>
                <div class="bg-gray-800 p-4">
                    <h3 class="font-bold text-lg mb-2">${game.name}</h3>
                    <p class="text-gray-400 text-sm mb-3">${game.description || 'Play now'}</p>
                    <div class="flex justify-between items-center">
                        <button onclick="event.stopPropagation(); playGame('${game.id}')" class="gradient-bg px-4 py-2 rounded text-sm font-semibold hover:opacity-90 transition">Play</button>
                        <button onclick="event.stopPropagation(); toggleFavorite('${game.id}')" class="text-2xl" data-favorited="false">🤍</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Display Apps
function displayApps() {
    const container = document.getElementById('apps-container');
    if (allApps.length === 0) {
        container.innerHTML = '<p class="col-span-full text-center text-gray-400">No apps available yet</p>';
        return;
    }

    container.innerHTML = allApps.map((app, index) => {
        const gradients = ['card-gradient-1', 'card-gradient-2', 'card-gradient-3', 'card-gradient-4'];
        const gradient = gradients[index % gradients.length];
        return `
            <div class="game-card rounded-lg overflow-hidden shadow-lg cursor-pointer" onclick="playGame('${app.id}')">
                <div class="${gradient} h-40 flex items-center justify-center">
                    <img src="${app.image}" alt="${app.name}" class="w-full h-full object-cover">
                </div>
                <div class="bg-gray-800 p-4">
                    <h3 class="font-bold text-lg mb-2">${app.name}</h3>
                    <p class="text-gray-400 text-sm mb-3">${app.description || 'Open app'}</p>
                    <div class="flex justify-between items-center">
                        <button onclick="event.stopPropagation(); playGame('${app.id}')" class="gradient-bg px-4 py-2 rounded text-sm font-semibold hover:opacity-90 transition">Open</button>
                        <button onclick="event.stopPropagation(); toggleFavorite('${app.id}')" class="text-2xl" data-favorited="false">🤍</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Play Game
function playGame(gameId) {
    if (userBanned) return;
    const game = [...allGames, ...allApps].find(g => g.id === gameId);
    if (!game) return;

    const modal = document.getElementById('game-modal');
    document.getElementById('modal-title').textContent = game.name;
    const iframe = document.getElementById('game-iframe');
    const linkSection = document.getElementById('game-link-section');

    // Try to load in iframe, fallback to link
    try {
        iframe.src = game.url;
        iframe.style.display = 'block';
        linkSection.style.display = 'none';
    } catch (e) {
        iframe.style.display = 'none';
        linkSection.style.display = 'block';
        document.getElementById('game-link').href = game.url;
    }

    modal.classList.remove('hidden');
}

// Close Game Modal
function closeGameModal() {
    document.getElementById('game-modal').classList.add('hidden');
    document.getElementById('game-iframe').src = '';
}

// Toggle Favorite
async function toggleFavorite(gameId) {
    if (!currentUser) {
        showNotification('Login Required', 'Please login to favorite games', 'info');
        return;
    }

    try {
        const userFavoritesRef = db.collection('users').doc(currentUser.uid).collection('favorites').doc(gameId);
        const doc = await userFavoritesRef.get();

        if (doc.exists) {
            await userFavoritesRef.delete();
        } else {
            await userFavoritesRef.set({ gameId, addedAt: new Date() });
        }
    } catch (error) {
        console.error('Error toggling favorite:', error);
    }
}

// Admin: Create Game
async function handleCreateGame(event) {
    event.preventDefault();
    if (!isAdmin) return;

    const name = document.getElementById('game-name').value;
    const url = document.getElementById('game-url').value;
    const image = document.getElementById('game-image').value;
    const type = document.getElementById('game-type').value;

    try {
        await db.collection('games').add({
            name,
            url,
            image,
            type,
            createdBy: currentUser.uid,
            createdAt: new Date(),
            description: `${type.charAt(0).toUpperCase() + type.slice(1)} added by admin`
        });

        showNotification('Success', `${name} has been added!`, 'success');
        document.getElementById('create-game-form').reset();
        loadGamesAndApps();
    } catch (error) {
        showNotification('Error', error.message, 'error');
    }
}

// Admin: Send Notification
async function handleSendNotification(event) {
    event.preventDefault();
    if (!isAdmin) return;

    const title = document.getElementById('notification-title').value;
    const message = document.getElementById('notification-message').value;

    try {
        // Add notification to Firestore
        await db.collection('notifications').add({
            title,
            message,
            createdBy: currentUser.uid,
            createdAt: new Date(),
            read: false
        });

        // Get all users
        const usersSnapshot = await db.collection('users').get();
        const batch = db.batch();

        usersSnapshot.docs.forEach(userDoc => {
            const userNotifRef = db.collection('users').doc(userDoc.id).collection('notifications').doc();
            batch.set(userNotifRef, {
                title,
                message,
                createdAt: new Date(),
                read: false
            });
        });

        await batch.commit();
        showNotification('Success', `Notification sent to ${usersSnapshot.size} users!`, 'success');
        document.getElementById('notification-form').reset();
    } catch (error) {
        showNotification('Error', error.message, 'error');
    }
}

// Admin: Load Admin Data
async function loadAdminData() {
    if (!isAdmin) return;

    try {
        // Load all games for management
        const gamesSnapshot = await db.collection('games').get();
        const adminGamesList = document.getElementById('admin-games-list');
        adminGamesList.innerHTML = gamesSnapshot.docs.map(doc => `
            <div class="bg-gray-700 p-3 rounded flex justify-between items-center">
                <div>
                    <div class="font-semibold">${doc.data().name}</div>
                    <div class="text-sm text-gray-400">${doc.data().type}</div>
                </div>
                <button onclick="deleteGame('${doc.id}')" class="bg-red-500 px-3 py-1 rounded text-sm hover:bg-red-600 transition">Delete</button>
            </div>
        `).join('');

        // Load all users
        const usersSnapshot = await db.collection('users').get();
        const usersList = document.getElementById('users-list');
        usersList.innerHTML = usersSnapshot.docs.map(doc => {
            const userData = doc.data();
            return `
                <div class="bg-gray-700 p-3 rounded flex justify-between items-center">
                    <div>
                        <div class="font-semibold">${userData.name}</div>
                        <div class="text-sm text-gray-400">${userData.email}</div>
                        ${userData.banned ? '<div class="text-sm text-red-400">🚫 BANNED</div>' : ''}
                    </div>
                    <button onclick="toggleBanUser('${doc.id}')" class="bg-yellow-500 px-3 py-1 rounded text-sm hover:bg-yellow-600 transition">
                        ${userData.banned ? 'Unban' : 'Ban'}
                    </button>
                </div>
            `;
        }).join('');
    } catch (error) {
        console.error('Error loading admin data:', error);
    }
}

// Admin: Delete Game
async function deleteGame(gameId) {
    if (!isAdmin) return;
    try {
        await db.collection('games').doc(gameId).delete();
        showNotification('Success', 'Game deleted!', 'success');
        loadGamesAndApps();
        loadAdminData();
    } catch (error) {
        showNotification('Error', error.message, 'error');
    }
}

// Admin: Toggle Ban User
async function toggleBanUser(userId) {
    if (!isAdmin) return;
    try {
        const userDoc = await db.collection('users').doc(userId).get();
        const currentBanStatus = userDoc.data().banned || false;
        
        await db.collection('users').doc(userId).update({
            banned: !currentBanStatus
        });

        showNotification('Success', `User ${currentBanStatus ? 'un' : ''}banned!`, 'success');
        loadAdminData();
    } catch (error) {
        showNotification('Error', error.message, 'error');
    }
}

// Show Notification
function showNotification(title, message, type = 'info') {
    const container = document.getElementById('notification-container');
    const notification = document.createElement('div');
    notification.className = 'notification';

    let color = '#667eea';
    if (type === 'error') color = '#ef4444';
    if (type === 'success') color = '#10b981';
    if (type === 'info') color = '#3b82f6';

    notification.style.borderLeftColor = color;
    notification.innerHTML = `
        <div class="font-bold text-gray-800">${title}</div>
        <div class="text-sm text-gray-600">${message}</div>
    `;

    container.appendChild(notification);
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Setup Notification Listener (Real-time updates)
function setupNotificationListener() {
    if (!currentUser) return;

    db.collection('users').doc(currentUser.uid).collection('notifications')
        .onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === 'added') {
                    const notif = change.doc.data();
                    showNotification(notif.title, notif.message);
                }
            });
        });
}

// Tab switching
function showTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.add('hidden'));
    document.getElementById(`${tabName}-tab`).classList.remove('hidden');
    
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll(`[data-tab="${tabName}"]`).forEach(btn => btn.classList.add('active'));
}

// Close modal on escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeGameModal();
    }
});
