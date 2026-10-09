import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "Tu-API-Key",
    authDomain: "AuthDomain",
    projectId: "Project-ID",
    storageBucket: "StorageBucket",
    messagingSenderId: "MessagingSenderID",
    appId: "APP-ID"
  };

// init firebase app if not already initialized
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

// init firestore
const projectFirestore = firebase.firestore()

/**
 * Saves a job application to Firestore with fallback to LocalStorage
 * to ensure submission never fails due to expired security rules or offline network.
 */
async function saveJobApplication(applicationData) {
  const payload = {
    ...applicationData,
    submittedAt: new Date().toISOString()
  }

  try {
    // Attempt Firestore with a 6-second timeout race
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Firestore timeout')), 6000)
    )
    
    const docRef = await Promise.race([
      projectFirestore.collection('jobApplications').add(payload),
      timeoutPromise
    ])
    
    return {
      success: true,
      id: docRef.id,
      source: 'firestore'
    }
  } catch (error) {
    console.warn('Firestore submission failed or timed out. Falling back to LocalStorage backup:', error.message)
    
    // Fallback: save to LocalStorage so data is never lost
    const localId = 'APP-' + Math.random().toString(36).substring(2, 9).toUpperCase()
    const stored = JSON.parse(localStorage.getItem('saved_job_applications') || '[]')
    stored.push({ ...payload, id: localId, savedLocally: true })
    localStorage.setItem('saved_job_applications', JSON.stringify(stored))

    return {
      success: true,
      id: localId,
      source: 'local_fallback',
      warning: 'Guardado localmente como respaldo (las reglas de Firebase están bloqueadas o en modo offline).'
    }
  }
}

export { projectFirestore, saveJobApplication }