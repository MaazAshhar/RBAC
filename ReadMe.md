# RBAC Backend (Role-Based-Access-Control)

In this application I created backed of a controlled blogging application. Where a user can post their blogs and can see others post which is approved by the admin or moderator. In this application following three roles are defined.
user - user can register and login, then they can create blogs and flagged other user's post.
moderator - moderator can unflag a flagged post.
admin - admin can do following things.
    1. create an account for other user.
    2. delete a already existing user.
    3. ban or unban a user.
    4. can see all users registered.
    5. can promote other user (means can update the role of the user).

## Table of contenst
-[installation](##installation)
-[api-documentation](##api_documentation)
-[authentication-api-documentation](###Authentication_API_Documentation)
-[user-api-documentation](###User_API_Documentation)
-[admin-api-documentation](###Admin_API_Documentation)
-[blog-management-api-documentation](###Blog_Management_API_Documentation)


## installation
Steps to set up and run project locally

1. Clone the GitHub repository to your local machine
2. cd RBAC  (move to root directory of project)
3. Install mongodb and mongodb compass to your local machine
4. Install node to your local machine
5. Get the url to connect to local mongodb database
6. Create a .env file to project root folder
7. Write following environment variable to .env file
    PORT = 5000 (To run the application on 5000 port).
    DB_URL = "mongodb://localhost:27017/ashhar_blogs"  (url to connect to local mongoDB database).
    JWT_SECRET = <your_jwt_secret> (Secret key for Jwt authentication).
    ADMIN_EMAIL = "admin@gmail.com" (email for admin account)
    ADMIN_PASSWORD = "admin@123" (password for the admin account)
    ADMIN_USERNAME = "admin" (username for the admin account)
    ADMIN_FULLNAME = "Test Admin" (full name for the admin account)
    ADMIN_PHONE = "1234567890" (phone no for the admin account)

8. open terminal in root folder and write command "npm install" to install all the required dependency.
9. run command "npm start" to run the application.


## api_documentation

Base URL (Local) - http://localhost:5000

### Authentication_API_Documentation
    Following are the details about the authentication-related endpoints, including the request format, response structure, and descriptions.

    Endpoints
    1. Register User
        Endpoint: /api/auth/register
        Method: POST 

        Description:
        Registers a new user in the system.

        Request Body

        {
        "username": "user123",
        "email": "user@example.com",
        "phone": "1234567890",
        "password": "password123",
        "fullName": "John Doe"
        }
        Response
        Success (201):
        {
        "status": "success",
        "message": "user registered successfully",
        "userId": "64ab01e45678912345678901"
        }
        Error (400):

        {
        "status": "failed",
        "error": "Username, email, phone Password and fullName can't be empty"
        }
        Error (400 - Password too short):

        {
        "status": "failed",
        "error": "password must be at least 6 characters long"
        }
        Error (500):

        {
        "status": "failed",
        "error": "Internal server error"
        }


    2. Login User
        Endpoint: /api/auth/login
        Method: POST 

        Description:
        Authenticates a user and returns a JWT token upon successful login.

        Request Body

        {
        "username": "user123",
        "email": "user@example.com",
        "password": "password123"
        }
        Either username or email must be provided along with password.

        Response
        Success (200):

        {
        "status": "success",
        "user": {
            "id": "64ab01e45678912345678901",
            "username": "user123",
            "email": "user@example.com"
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5..."
        }
        Error (400):

        {
        "status": "failed",
        "error": "Invalid credentials"
        }
        Error (500):

        {
        "status": "failed",
        "error": "Internal server error"
        }


    3. Change Password
        Endpoint: /api/auth/change-password
        Method: POST 

        Description:
        Allows a user to change their password. This endpoint requires authentication.

        Request Headers

        {
        "Authorization": "Bearer <JWT_TOKEN>"
        }
        Request Body

        {
        "oldPassword": "oldPassword123",
        "newPassword": "newPassword456",
        "confirmNewPassword": "newPassword456",
        "userId": "64ab01e45678912345678901"
        }
        Response
        Success (200):

        {
        "status": "success",
        "message": "password changed successfully"
        }
        Error (400 - Password mismatch):

        {
        "status": "failed",
        "error": "new password and confirm password must match"
        }
        Error (401 - Unauthorized):

        {
        "status": "failed",
        "error": "Unauthorized"
        }
        Error (500):

        {
        "status": "failed",
        "error": "Internal server error"
        }

        Middleware Used
        Authenticate:
        Used for endpoints requiring a logged-in user. It validates the JWT token.
        Notes
        Ensure the Authorization header is included in requests to protected routes.
        JWT tokens have an expiration time; refresh or log in again if expired.
        Passwords are hashed using bcrypt before storage for security.


### User_API_Documentation
    Following are the details about the User Management API endpoints, including the request format, response structure, and descriptions.

    Endpoints

    1. Update User
        Endpoint: /api/user/:id
        Method: PUT

        Description:
        Updates a user's information. This endpoint requires authentication and allows the user to update only their own data.

        Request Headers
        {
        "Authorization": "Bearer <JWT_TOKEN>"
        }
        Request Parameters
        Parameter	Type	Description
        id	String	The ID of the user to update.
        Request Body
        Provide any fields you want to update (excluding sensitive or role-based data):

        
        {
        "phone": "9876543210",
        "fullName": "Updated Name"
        }
        Response
        Success (200):
        {
        "status": "success",
        "message": "User updated successfully"
        }
        Error (403 - Unauthorized):
        
        {
        "message": "You are not authorized to update this user."
        }
        Error (400):
        
        {
        "status": "failed",
        "message": "something went wrong"
        }
        Error (500):
       
        {
        "status": "failed",
        "message": "Internal server error"
        }
    2. Get User By ID
        Endpoint: /api/user/:id
        Method: GET 

        Description:
        Fetches a user's details by their ID. This endpoint requires authentication and allows users to view only their own details.

        Request Headers
        {
        "Authorization": "Bearer <JWT_TOKEN>"
        }
        Request Parameters
        Parameter	Type	Description
        id	String	The ID of the user to fetch.
        Response
        Success (200):
        
        {
        "status": "success",
        "data": {
            "id": "64ab01e45678912345678901",
            "username": "user123",
            "email": "user@example.com",
            "phone": "1234567890",
            "fullName": "John Doe",
            "role": "user",
            "isActive": true
        }
        }
        Error (403 - Unauthorized):
        
        {
        "status": "failed",
        "message": "You are not authorized to view this user."
        }
        Error (500):
        {
        "status": "failed",
        "message": "Internal server error"
        }


    Middleware Used
    Authenticate:
    This middleware ensures the user is logged in by validating the JWT token. It populates the req.user object with the user's data from the token.
    Notes
    Ensure the Authorization header is included in requests to protected routes.
    Users can only update or view their own details. User can't update sensitive information (e.g. role and isActive) also user can't update username and email. Admin-level access would require further permissions and routes.
    Invalid or expired JWT tokens will result in an unauthorized error.


### Admin_API_Documentation
    Following are the comprehensive details about the Admin Management API endpoints, including request format, response structure, and descriptions.

    Endpoints

    1. Create User
        Endpoint: /api/admin/user/create
        Method: POST 

        Description:
        Allows admins to create a new user with specified details.

        Request Headers
        {
        "Authorization": "Bearer <JWT_TOKEN>"
        }
        Request Body
        {
        "username": "newUser",
        "email": "newUser@example.com",
        "phone": "1234567890",
        "password": "securepassword",
        "role": "user",
        "fullName": "New User"
        }
        Response
        Success (201):
        {
        "status": "success",
        "message": "user registered successfully",
        "userId": "64ab01e45678912345678901"
        }
        Error (400):
        
        {
        "status": "failed",
        "error": "Username, email, phone Password and fullName can't be empty"
        }
        Error (500):
        
        {
        "status": "failed",
        "error": "Internal server error"
        }

    2. Delete User
        Endpoint: /api/admin/user/delete/:userId
        Method: DELETE 

        Description:
        Deletes a user by their ID.

        Request Headers

        {
        "Authorization": "Bearer <JWT_TOKEN>"
        }
        Request Parameters
        Parameter	Type	Description
        userId	String	The ID of the user.
        Response
        Success (200):
        {
        "status": "success",
        "message": "User deleted with userId: 64ab01e45678912345678901"
        }
        Error (400):
        {
        "status": "failed",
        "error": "no user found"
        }
        Error (500):
        {
        "status": "failed",
        "message": "Internal server error"
        }

    3. Ban or Unban User
        Endpoint: /api/admin/user/status
        Method: POST 

        Description:
        Updates the active status of a user (bans/unbans).

        Request Headers
        {
        "Authorization": "Bearer <JWT_TOKEN>"
        }
        Request Body
        {
        "userId": "64ab01e45678912345678901",
        "status": false
        }
        Response
        Success (200):
        {
        "status": "success",
        "message": "User active status updated with userId: 64ab01e45678912345678901"
        }
        Error (400):
        {
        "status": "failed",
        "error": "no user found"
        }
        Error (500):
        {
        "status": "failed",
        "message": "Internal server error"
        }

    4. Get All Users
        Endpoint: /api/admin/users
        Method: GET 

        Description:
        Fetches all users in the system.

        Request Headers
        {
        "Authorization": "Bearer <JWT_TOKEN>"
        }
        Response
        Success (200):
        {
        "status": "success",
        "users": [
            {
            "id": "64ab01e45678912345678901",
            "username": "user1",
            "email": "user1@example.com",
            "phone": "1234567890",
            "fullName": "User One",
            "role": "user",
            "isActive": true
            },
            {
            "id": "64ab01e45678912345678902",
            "username": "user2",
            "email": "user2@example.com",
            "phone": "9876543210",
            "fullName": "User Two",
            "role": "user",
            "isActive": false
            }
        ]
        }
        Error (400):
        {
        "status": "failed",
        "error": "no user found"
        }
        Error (500):
        {
        "status": "failed",
        "message": "Internal server error"
        }

    5. Promote User
        Endpoint: /api/admin/user/update-role
        Method: POST 

        Description:
        Updates the role of a user (e.g., promoting a user to an admin).

        Request Headers
        {
        "Authorization": "Bearer <JWT_TOKEN>"
        }
        Request Body
        {
        "userId": "64ab01e45678912345678901",
        "role": "admin"
        }
        Response
        Success (200):
        {
        "status": "success",
        "message": "User's role updated with userId: 64ab01e45678912345678901"
        }
        Error (400):
        {
        "status": "failed",
        "error": "no user found"
        }
        Error (500):
        {
        "status": "failed",
        "message": "Internal server error"
        }
    Middleware Used
    Authenticate: Ensures the requester is logged in and provides a valid JWT token.
    Authorize (Admin Role): Ensures the user has the role of admin.
    Notes
    These routes are protected and accessible only by authenticated users with the admin role.
    Ensure the Authorization header includes a valid JWT token for all requests.
    Errors will return the corresponding status code and message.



### Blog_Management_API_Documentation
    Following are the comprehensive details of the Blog Management API endpoints, including request/response formats, headers, and functionality.

    Endpoints

    1. Create Post
        Endpoint: /api/blog
        Method: POST 

        Description:
        Allows users to create a new blog post.

        Request Headers
        {
        "Authorization": "Bearer <JWT_TOKEN>"
        }
        Request Body
        {
        "title": "My First Blog",
        "body": "This is the content of my first blog post."
        }
        Response
        Success (201):
        {
        "status": 201,
        "message": "Blog created",
        "blogId": "64ab01e45678912345678901"
        }
        Error (400):
        {
        "status": "failed",
        "error": "something went wrong"
        }
        Error (500):
        {
        "status": 500,
        "message": "Error in creating blog"
        }

    2. Update Post
        Endpoint: /api/blog/:blogId
        Method: PATCH

        Description:
        Updates the content of an existing blog post.

        Request Headers
        {
        "Authorization": "Bearer <JWT_TOKEN>"
        }
        Request Parameters
        Parameter	Type	Description
        blogId	String	The ID of the blog post

        Request Body
        {
        "title": "Updated Blog Title",
        "body": "Updated content for the blog."
        }

        Response
        Success (200):
        {
        "status": 200,
        "message": "Blog Updated",
        "blogId": "64ab01e45678912345678901"
        }

        Error (400):
        {
        "status": "failed",
        "error": "Something went wrong"
        }
        
        Error (500):
        {
        "status": 500,
        "message": "Error in updating blog"
        }

    3. Delete Post
        Endpoint: /api/blog/:blogId
        Method: DELETE

        Description:
        Deletes a blog post by its ID.

        Request Headers
        {
        "Authorization": "Bearer <JWT_TOKEN>"
        }

        Request Parameters
        Parameter	Type	Description
        blogId	String	The ID of the blog post

        Response
        Success (200):
        {
        "status": 200,
        "message": "Blog deleted",
        "blogId": "64ab01e45678912345678901"
        }

        Error (400):
        {
        "status": "failed",
        "error": "Something went wrong"
        }

        Error (500):
        {
        "status": 500,
        "message": "Error in creating blog"
        }

    4. Flag or Unflag Post
        Endpoint: /api/blog/:blogId/flag
        Method: POST

        Description:
        Flags or unflags a blog post.

        Request Headers
        {
        "Authorization": "Bearer <JWT_TOKEN>"
        }

        Request Parameters
        Parameter	Type	Description
        blogId	String	The ID of the blog post

        Request Body
        {
        "flag": true
        }
        Response
        Success (200):
        {
        "status": 200,
        "message": "Updated Flag"
        }

        Error (400):
        {
        "status": "failed",
        "message": "User doesn't have permission to unflag"
        }

        Error (500):
        {
        "status": 500,
        "message": "Error in updating flag"
        }

    5. Curate Post
        Endpoint: /api/blog/:blogId/curate
        Method: POST

        Description:
        Allows admins or moderators to curate a blog post by updating its status.

        Request Headers
        {
        "Authorization": "Bearer <JWT_TOKEN>"
        }

        Request Parameters
        Parameter	Type	Description
        blogId	String	The ID of the blog post

        Request Body
        {
        "status": "approved"
        }

        Response
        Success (200):
        {
        "status": 200,
        "message": "Blog having 64ab01e45678912345678901 is curated"
        }

        Error (400):
        {
        "status": "failed",
        "error": "Something went wrong"
        }

        Error (500):
        {
        "status": 500,
        "message": "Error in curating blog"
        }

    6. Get All Blogs by User
        Endpoint: /api/blog/get
        Method: GET

        Description:
        Fetches all blog posts created by the authenticated user.

        Request Headers
        {
        "Authorization": "Bearer <JWT_TOKEN>"
        }

        Response
        Success (200):
        {
        "status": 200,
        "blogs": [
            {
            "id": "64ab01e45678912345678901",
            "title": "My First Blog",
            "body": "This is the content of my first blog post."
            }
        ]
        }

        Error (400):
        {
        "status": "failed",
        "error": "Something went wrong"
        }

        Error (500):
        {
        "status": 500,
        "message": "Error in getting blog"
        }

    7. Get All Posts
        Endpoint: /api/blog/get-all-post
        Method: GET 

        Description:
        Fetches all blog posts in the system.

        Request Headers
        {
        "Authorization": "Bearer <JWT_TOKEN>"
        }

        Response
        Success (200):
        {
        "status": "success",
        "blogs": [
            {
            "id": "64ab01e45678912345678901",
            "title": "My First Blog",
            "body": "This is the content of my first blog post."
            },
            {
            "id": "64ab01e45678912345678902",
            "title": "Another Blog",
            "body": "This is the content of another blog post."
            }
        ]
        }

        Error (400):
        {
        "status": "failed",
        "error": "no blogs found"
        }

        Error (500):
        {
        "status": "failed",
        "error": "Internal server error"
        }

    Middleware Used
    Authenticate: Ensures the requester is logged in and provides a valid JWT token.
    Authorize (Admin/Moderator): Ensures the user has admin or moderator roles where applicable.
    Notes
    Most endpoints require an authenticated user with a valid JWT token.
    Ensure the Authorization header is included in all requests except for public endpoints.
    Use proper user permissions for flagging, unflagging, and curating posts.

