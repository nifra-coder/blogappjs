document.addEventListener("DOMContentLoaded", loadNavbar);

function loadNavbar() {
  const navbar = document.getElementById("navbar");

  auth.onAuthStateChanged((user) => {
    if (user) {
      navbar.innerHTML = `
      
<div class="logo">Conectify</div>
      <div class="nav-all-items"> 
      <a href="home.html">Home</a>
      <a href="create-post.html">Create Post</a>
      <a href="profile.html">Profile</a>
       <a href="#"><div id="notification-container" style="position: absolute; top: 15px; right: 20px;">
      <i class="fa-solid fa-bell" style="font-size: 24px; cursor: pointer; position: relative;" onclick="showNotifications()">
        <span id="notification-badge" style="
          position: absolute;
          top: -8px;
          right: -8px;
          background-color: red;
          color: white;
          font-size: 12px;
          padding: 2px 6px;
          border-radius: 50%;
          display: none;
        ">0</span>
      </i>
    </div></a>
     
        </div>
       
      `;
    } else {
      navbar.innerHTML = `
      <div class="logo">Conectify</div>
       
        <div class="nav-all-items"> 
       <a href="index.html">Home</a>
        <a href="signin.html">Sign In</a>
        <a href="signup.html">Sign Up</a>
        </div>
      `;
      const currentPath = window.location.pathname;
      if (!currentPath.endsWith("index.html") && !currentPath.endsWith("signin.html") && !currentPath.endsWith("signup.html")) {
        window.location.href = "index.html";
      }
    }
  });
}

  
        // Redirect non-logged-in users trying to access protected pages
      
  function handleSignout() {
    auth
      .signOut()
      .then(() => {
        alert("Signed out successfully!");
        window.location.href = "index.html";
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  }
  