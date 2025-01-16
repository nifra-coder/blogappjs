// Ensure Firebase and services are initialized
if (!firebase || !auth || !db) {
  console.error("Firebase, Auth, or Firestore is not initialized. Check your firebase-config.js file.");
}

// Function to handle post submissions
async function handlePostSubmit(event) {
  event.preventDefault(); // Prevent form refresh

  // Get form values
  const title = document.getElementById('title').value.trim();
  const content = document.getElementById('content').value.trim();
  const imageUrl = document.getElementById('image-url').value.trim();

  // Validate input
  if (!title || !content) {
    alert("Title and content are required!");
    return;
  }

  // Check user authentication
  const currentUser = auth.currentUser;
  if (!currentUser) {
    alert("You must be signed in to create a post.");
    return;
  }

  try {
    // Construct the post data
    const postData = {
      title,
      content,
      imageUrl: imageUrl || null, // Optional field
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      author: {
        uid: currentUser.uid,
        email: currentUser.email,
        displayName: currentUser.displayName || "Anonymous",
      },
    };

    console.log("Submitting post:", postData); // Debugging log

    // Add the post to Firestore
    const docRef = await db.collection("posts").add(postData);

    console.log("Post successfully added with ID:", docRef.id);
    alert("Post created successfully!");

    // Clear the form fields
    document.getElementById('title').value = '';
    document.getElementById('content').value = '';
    document.getElementById('image-url').value = '';

    // Redirect to home page
    window.location.href = "index.html";
  } catch (error) {
    console.error("Error adding post:", error);
    alert("Failed to create post. Please try again later.");
  }
}

// Load posts dynamically on the home page
async function loadPosts() {
  const postsContainer = document.getElementById("posts-container");

  try {
    const querySnapshot = await db.collection("posts").orderBy("createdAt", "desc").get();

    postsContainer.innerHTML = ""; // Clear container before rendering posts

    querySnapshot.forEach((doc) => {
      const post = doc.data();
      const postId = doc.id; // Document ID for editing or deleting posts

      // Safely handle missing fields
      const title = post.title || "Untitled Post";
      const content = post.content || "No content available.";
      const imageUrl = post.imageUrl || null;
      const authorName = post.author?.displayName || "Anonymous";
      const createdAt = post.createdAt
        ? post.createdAt.toDate().toLocaleString()
        : "Unknown date";

      // Generate the post HTML
      const postElement = `
        <div class="post">
          ${imageUrl ? `<img src="${imageUrl}" alt="Post image" class="post-image"/>` : ""}
          <div class="post-content">
            <h2>${title}</h2>
            <p>${content}</p>
            <small>
              <strong>Author:</strong> ${authorName} |
              <em>Posted on: ${createdAt}</em>
            </small>
            <div class="post-actions">
              <button onclick="editPost('${postId}')">Edit</button>
              <button onclick="deletePost('${postId}')">Delete</button>
            </div>
          </div>
        </div>
      `;
      postsContainer.innerHTML += postElement;
    });
  } catch (error) {
    console.error("Error loading posts:", error);
    postsContainer.innerHTML = "<p>Failed to load posts. Please try again later.</p>";
  }
}

// Placeholder function for editing posts
function editPost(postId) {
  alert(`Edit functionality is not implemented yet. Post ID: ${postId}`);
}

// Placeholder function for deleting posts
async function deletePost(postId) {
  if (confirm("Are you sure you want to delete this post?")) {
    try {
      await db.collection("posts").doc(postId).delete();
      alert("Post deleted successfully.");
      loadPosts(); // Reload posts after deletion
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post. Please try again later.");
    }
  }
}

// Ensure DOM is ready before attaching event listeners
document.addEventListener("DOMContentLoaded", () => {
  // Attach event listener for the post form
  const form = document.getElementById("create-post-form");
  if (form) {
    form.addEventListener("submit", handlePostSubmit);
  }

  // Load posts on the home page
  const postsContainer = document.getElementById("posts-container");
  if (postsContainer) {
    loadPosts();
  }
});
