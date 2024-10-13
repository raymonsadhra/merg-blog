Full stack MERN (Mongo DB, Express, React, Node.js) project.
Blog Site

API Folder \n
Controller Folder:
auth.controller.js: Handles authentication-related logic like login, registration, and user session management.
comment.controller.js: Manages comment-related functionality, such as creating, deleting, and retrieving comments.
post.controller.js: Manages post-related operations, including creating, updating, deleting, and retrieving blog posts.
user.controller.js: Handles user-specific actions like profile updates, user management, and retrieving user data.
Models Folder:
comment.model.js: Defines the schema and structure for comments stored in the database.
post.model.js: Defines the schema for blog posts, including fields like title, content, and author.
user.model.js: Defines the user schema, containing user information such as username, email, password, and roles.
Routes Folder:
auth.route.js: Defines routes for authentication, including login and registration.
comment.route.js: Defines routes for managing comments, such as adding or deleting a comment.
post.route.js: Defines routes for post-related operations, such as creating, updating, and retrieving posts.
user.route.js: Defines routes for user management, including profile updates and user data retrieval.
Utils Folder:
error.js: Contains custom error handling functions for managing API errors.
verifyUser.js: Middleware that verifies user authentication and roles for protected routes.
index.js: Exports utility functions and middleware used across the project.
index.js (in API folder root):
Initializes and configures the API, including setting up middleware, database connection, and route handling.
Client Folder
Components Folder:
CallToAction.jsx: A component that displays a call-to-action section on the site.
Comment.jsx: Manages and displays individual comments on posts.
CommentSection.jsx: Displays a section for users to add and view comments on a post.
DashComments.jsx: Dashboard component for managing comments as an admin.
DashPosts.jsx: Dashboard component for managing posts as an admin.
DashProfile.jsx: Dashboard component displaying the user's profile.
DashSidebar.jsx: Sidebar component for the admin dashboard navigation.
DashUsers.jsx: Dashboard component for managing users in the system.
DashboardComp.jsx: Main dashboard component that aggregates different dashboard features.
Footer.jsx: Footer component displayed across the site.
Header.jsx: Header component, including navigation links.
OAuth.jsx: Handles OAuth integration for third-party login providers.
OnlyAdminPrivateRoute.jsx: Route protection component allowing access only to admin users.
PostCard.jsx: Displays a summarized version of a post, typically used in lists of posts.
PrivateRoute.jsx: Protects certain routes and ensures only authenticated users can access them.
ScrollToTop.jsx: Automatically scrolls the page to the top when navigating between routes.
ThemeProvider.jsx: Provides and manages the theme for the site, including colors and styles.
Pages Folder:
About.jsx: Displays an "About" page with information about the blog or project.
CreatePost.jsx: Page allowing users to create new posts.
Dashboard.jsx: Main dashboard page that links to different administrative functions.
Home.jsx: The homepage displaying a feed of recent posts or blog highlights.
PostPage.jsx: Displays a full view of a single blog post.
Projects.jsx: A page listing or detailing different projects related to the blog.
Search.jsx: Allows users to search for posts or content on the site.
SignIn.jsx: Page for user login.
SignUp.jsx: Page for user registration.
UpdatePost.jsx: Page allowing users to edit and update their posts.
Redux Folder:
Contains the Redux setup for managing global application state, including actions, reducers, and store configuration.
