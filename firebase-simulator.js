/**
 * firebase-simulator.js
 *
 * This file simulates basic interactions with Firebase services like Firestore,
 * Functions, and Authentication. Since we cannot use the actual Firebase SDK
 * in this environment, these functions provide a placeholder for future
 * integration.
 */

// Simulate Firestore data model
const simulatedData = {
  projects: [
    {
      id: "project1",
      name: "Project 1",
      description: "Description for Project 1",
      technologies: ["React", "JavaScript", "HTML", "CSS"],
    },
    {
      id: "project2",
      name: "Project 2",
      description: "Description for Project 2",
      technologies: ["Node.js", "Express", "MongoDB"],
    },
  ],
  skills: [
    {
      id: "skill1",
      name: "JavaScript",
    },
    {
      id: "skill2",
      name: "React",
    },
  ],
  experience: [
    {
      id: "exp1",
      name: "Company A",
      description: "Experience in Company A",
    },
    {
      id: "exp2",
      name: "Company B",
      description: "Experience in Company B",
    },
  ],
  achievements: [
    {
      id: "achievement1",
      name: "Achievement 1",
      description: "Description for achievement 1",
    },
    {
      id: "achievement2",
      name: "Achievement 2",
      description: "Description for achievement 2",
    },
  ],
  saas: {
    id: "saas1",
    name: "SAAS 1",
    description: "Description for SAAS 1",
    benefits: ["Benefit 1", "Benefit 2", "Benefit 3"],
  },
};

/**
 * Simulates fetching data from Firestore.
 * @param {string} collection - The Firestore collection name.
 * @returns {Promise<object|null>} - A promise that resolves with the fetched data or null if not found.
 */
async function getData(collection) {
 console.log(`[Firebase Simulator] Simulating fetching data from Firestore collection: ${collection}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (simulatedData[collection]) {
        resolve(simulatedData[collection]);
      } else {
        resolve(null);
      }
    }, 500);
  });
}

/**
 * Simulates saving data to Firestore.
 * @param {string} collection - The Firestore collection name.
 * @param {object} data - The data to save.
 * @returns {Promise<void>} - A promise that resolves when the data is saved (simulated).
 */
async function saveData(collection, data) {
 console.log(`[Firebase Simulator] Simulating saving data to Firestore collection: ${collection}`, data);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!simulatedData[collection]) {
        simulatedData[collection] = [];
      }
      simulatedData[collection].push(data);
      resolve();
    }, 500);
  });
}

/**
 * Simulates calling a Firebase Function.
 * @param {string} functionName - The name of the Firebase Function to call.
 * @param {object} args - The arguments to pass to the function.
 * @returns {Promise<any>} - A promise that resolves with the result of the function call (simulated).
 */
async function callFunction(functionName, args) {
 console.log(`[Firebase Simulator] Simulating calling Firebase Function: ${functionName}`, args);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ message: `Function ${functionName} called successfully.` });
    }, 500);
  });
}

/**
 * Simulates user login with Firebase Authentication.
 * @param {string} username - The username of the user trying to log in.
 * @param {string} password - The password of the user trying to log in.
 * @returns {Promise<any>} - A promise that resolves when the login is successful.
 */
async function login(username, password) {
 console.log(`[Firebase Simulator] Simulating login for user: ${username}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ message: `User ${username} logged in successfully.` });
    }, 500);
  });
}

/**
 * Simulates user logout with Firebase Authentication.
 * @returns {Promise<any>} - A promise that resolves when the logout is successful.
 */
async function logout() {
 console.log(`[Firebase Simulator] Simulating logout`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ message: `User logged out successfully.` });
    }, 500);
  });
}

// Export the functions
export { getData, saveData, callFunction, login, logout };