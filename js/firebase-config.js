/* ====================================================================
   FIREBASE REALTIME DATABASE SYNC
   All phones share one database. Changes sync instantly across all devices.
   ==================================================================== */

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBRtDBCEJ6Z7pw1mlj4ssqyTJBLBspEBAs",
  authDomain: "alankarrestaurant.firebaseapp.com",
  databaseURL: "https://alankarrestaurant-default-rtdb.firebaseio.com",
  projectId: "alankarrestaurant",
  storageBucket: "alankarrestaurant.firebasestorage.app",
  messagingSenderId: "768998579953",
  appId: "1:768998579953:web:35b233c5a2fb462ee2d350"
};

let db = null;
let firebaseReady = false;

// Load Firebase SDK
(async () => {
  try {
    const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js');
    const { getDatabase } = await import('https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js');

    const app = initializeApp(FIREBASE_CONFIG);
    db = getDatabase(app);
    firebaseReady = true;

    // Set up real-time sync for all phones
    setupRealtimeSync();
  } catch (err) {
    console.warn('Firebase init failed (offline mode):', err.message);
  }
})();

// Real-time sync: listen for changes and update all phones
async function setupRealtimeSync() {
  if (!firebaseReady || !db) return;

  try {
    const { ref, onValue } = await import('https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js');
    const menuRef = ref(db, 'menuData');

    onValue(menuRef, (snapshot) => {
      if (snapshot.exists() && typeof menuData !== 'undefined') {
        const fbData = snapshot.val();
        if (JSON.stringify(fbData) !== JSON.stringify(menuData)) {
          menuData = fbData;
          localStorage.setItem('menuData', JSON.stringify(fbData));
          // Refresh UI if on customer menu
          if (typeof updateCustomerMenu === 'function' &&
              document.getElementById('customerMenu')?.classList.contains('active')) {
            updateCustomerMenu(true);
          }
        }
      }
    });
  } catch (err) {
    console.warn('Real-time sync setup failed:', err.message);
  }
}

// Load menu data from Firebase (called on page load)
async function loadDataFromFirebase() {
  if (!firebaseReady || !db) return null;

  try {
    const { ref, get } = await import('https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js');
    const menuRef = ref(db, 'menuData');
    const snapshot = await get(menuRef);
    return snapshot.exists() ? snapshot.val() : null;
  } catch (err) {
    console.warn('Firebase load failed:', err.message);
    return null;
  }
}

// Save menu data to Firebase (called after admin changes)
async function saveDataToFirebase(data) {
  if (!firebaseReady || !db) return false;

  try {
    const { ref, set } = await import('https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js');
    const menuRef = ref(db, 'menuData');
    await set(menuRef, data);
    return true;
  } catch (err) {
    console.warn('Firebase save failed:', err.message);
    return false;
  }
}
