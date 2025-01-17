// Ensure Firebase Auth is initialized
if (!auth) {
  showModal("Authentication service is not initialized.");
}

// Function to show the modal with a message
function showModal(message) {
  const modal = document.getElementById("message-modal");
  const modalMessage = document.getElementById("modal-message");

  modalMessage.textContent = message;  // Set the message
  modal.style.display = "flex";         // Show the modal

  // Hide the modal after 5 seconds
  setTimeout(() => {
    modal.style.display = "none";
  }, 5000); // Modal stays for 5 seconds
}

// Add event listener to signup button
document
  .getElementById("signup-button")
  .addEventListener("click", handleSignup);

document
  .getElementById("signin-button")
  .addEventListener("click", handleSignin);

// Handle Sign-Up
function handleSignup(event) {
  event.preventDefault();

  const username = document.getElementById("signup-username").value.trim();
  const email = document.getElementById("signup-email").value.trim();
  const password = document.getElementById("signup-password").value.trim();

  if (!username || !email || !password) {
    showModal("All fields are required!");
    return;
  }

  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // Update the user's displayName
      return user.updateProfile({
        displayName: username,
      });
    })
    .then(() => {
      showModal("Signup successful!");
      window.location.href = "home.html"; // Redirect to home after signup
    })
    .catch((error) => {
      console.error("Error signing up:", error.message);
      showModal(error.message);
    });
}

// Handle Sign-In
function handleSignin(event) {
  event.preventDefault();

  const email = document.getElementById("signin-email").value.trim();
  const password = document.getElementById("signin-password").value.trim();

  if (!email || !password) {
    showModal("Email and password are required!");
    return;
  }

  auth
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      showModal("Signin successful!");
      window.location.href = "home.html";
    })
    .catch((error) => {
      console.error("Error signing in:", error.message);
      showModal(error.message); // Show error message in the modal
    });
}

// Handle Sign-Out
function handleSignout() {
  if (!auth) {
    showModal("Error: Authentication service is not initialized.");
    return;
  }

  auth
    .signOut()
    .then(() => {
      showModal("Signed out successfully!");
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error("Error signing out:", error.message);
      showModal(error.message);
    });
}

// Check Authentication Status and Redirect Appropriately
document.addEventListener("DOMContentLoaded", () => {
  const currentPath = window.location.pathname;

  auth.onAuthStateChanged((user) => {
    if (user) {
      // Redirect logged-in users from public pages
      if (
        currentPath.endsWith("index.html") ||
        currentPath.endsWith("signin.html") ||
        currentPath.endsWith("signup.html")
      ) {
        window.location.href = "home.html";
      }
    } else {
      // Redirect logged-out users from protected pages
      if (
        !currentPath.endsWith("index.html") &&
        !currentPath.endsWith("signin.html") &&
        !currentPath.endsWith("signup.html")
      ) {
        window.location.href = "index.html";
      }
    }
  });
});

// Handle Google Sign-Up/Sign-In
function handleGoogleSignup() {
  const provider = new firebase.auth.GoogleAuthProvider();

  auth
    .signInWithPopup(provider)
    .then((result) => {
      const user = result.user;

      if (!user.displayName) {
        const username = prompt("Please enter your username:");
        if (username) {
          return user.updateProfile({
            displayName: username,
          });
        }
      }
    })
    .then(() => {
      showModal("Signup successful!");
      window.location.href = "home.html"; // Redirect to home
    })
    .catch((error) => {
      console.error("Error during Google Sign-In:", error.message);
      showModal(error.message);
    });
}

document.getElementById("google-signup").addEventListener("click", handleGoogleSignup);
