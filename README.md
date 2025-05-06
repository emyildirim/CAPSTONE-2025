# Job Application Website

Welcome to the Job Application Website project! This application serves as a fully functional job board. We are calling it TheJobGetter. With added features for enhanced usability and a seamless user experience. Below, you’ll find all the information needed to understand, set up, and contribute to this project.

<img width="1457" alt="image" src="https://github.com/user-attachments/assets/bc070cef-6f23-4d85-96a7-e0ff2f1452bc" />


### Contributors and Developers
| Name | GitHub Username |
|--|--|
| Ivan Gabrovsky | [IvaniGabrovsky](https://github.com/IvaniGabrovsky) |
| Aziz Nosirov | [Aziz-Nosirov223](https://github.com/Aziz-Nosirov223) |
| Erkam Yildirim | [emyildirim](https://github.com/emyildirim) |
| Hekmatullah Shren Zada | [hekmat-shrez](https://github.com/hekmat-shrez) |

## Features

### Core Features

+ Job Search: Users can search for jobs by title, location, company, or keyword.
+ Job Listings: Employers can post job opportunities with detailed descriptions.
+ User Profiles: Users can create and manage profiles, upload resumes, and save jobs for later.
+ Application Tracking: Applicants can track the status of their applications.
+ Advanced Filtering: Filter jobs by category, salary range, and job type (full-time, part-time, remote, etc.).

### Additional Features

+ Fallback Information Handling: If certain job details (e.g., benefits or qualifications) are unavailable, the system will display "N/A" instead of leaving blank fields.

+ Real-time Notifications: Users receive alerts for application status updates, saved job deadlines, and new job postings matching their preferences.

+ Integrated Messaging System: Direct communication between applicants and employers.

+ Salary Insights: Provides an average salary range for job roles based on user data and market research (optional).

+ Skill-Based Job Suggestions: Personalized job recommendations based on users’ profiles and uploaded resumes (optional).

## Tech Stack

### Frontend
+ Designing: Figma
+ Framework: React.js
+ Styling: Material UI
+ Routing: React Router

### Backend
+ Framework: Node.js (Express)
+ Database: MongoDB (NoSQL database)
+ Authentication: JSON Web Tokens (JWT)

**Deployment:** Vercel
**CI/CD:** GitHub Actions

## Figma Design Guideline

### Overview
This guideline outlines how our team collaborates in Figma and transitions designs into our React.js tech stack. By following these guidelines, we ensure a smooth design-to-development workflow in our project.

### Team Collaboration
-   **Project Structure:** Maintain separate pages for wireframes, components, and final designs.
-   **Component Standardization:** Use reusable Figma components that align with React components.
-   **Naming Conventions:** Use meaningful names (ex. `Navbar/Header`, `Button/Primary`).
-   **Auto Layout & Constraints:** Design responsive layouts using Auto Layout.
-   **Colors & Typography:** Follow Material UI conventions for styles.

### Designing
-   **Frame Organization:** Match Figma frames with React component hierarchy.
-   **Styling Mapping:** Use Material UI utility classes for consistency.
-   **State & Interactions:** Define hover, active, and disabled states.
-   **Icons & Assets:** Export SVG icons and optimize images.

### Transition to React.js
-   **Component Breakdown:** Structure reusable components (ex. `Navbar.js`, `Button.js`).
-   **Responsive Design:** Align breakpoints with Material UI (`sm`, `md`, `lg`).
-   **Best Practices:** Maintain consistent naming, use design tokens(colour, animation, etc.), and conduct regular reviews.

## Installation and Setup

### Prerequisites
Ensure you have the following installed:

- [Node.js](https://nodejs.org/en/download) (v18.20)
- [MongoDB](https://account.mongodb.com/account/login) (local or cloud instance)

### Dependencies
-   [Express](https://www.npmjs.com/package/express) for server
-   [Dotenv](https://www.npmjs.com/package/dotenv) for environment variables
-   [Mongoose](https://www.npmjs.com/package/mongoose) for MongoDB connection
-   [Body parser](https://www.npmjs.com/package/body-parser) for middleware
-  [Cors](https://www.npmjs.com/package/cors) for security
-   [React hook form](https://www.npmjs.com/package/react-hook-form) for form validation
- [Yup](https://www.npmjs.com/package/yup) for input validation
-   [Material UI](https://mui.com/material-ui/getting-started/) for pre-built UI components and customization

### Steps

Clone the Repository:

    git clone https://github.com/your-repo/job-application-website.git

    cd job-application-website

#### Install Dependencies:

Frontend:

    cd frontend
    npm install

Backend:

    cd backend
    npm install

#### Environment Configuration:

Create .env files in both frontend and backend directories using the provided .env.example templates.

*Example for backend:*

    PORT=5000
    MONGO_URI=<your_mongo_connection_string>
    JWT_SECRET=<your_jwt_secret>

#### Run the Application:

Backend:

    cd backend
    npm start

Frontend:

    cd frontend
    npm start

#### Access the Application:

Open your browser and navigate to http://localhost:3000 for the frontend.

## API Endpoints

### User Endpoints

| Method | Endpoint | Description |
|--|--|--|
|POST | /api/users/register | Register a new user
|POST |/api/users/login | User login |
|GET |/api/users/profile |Fetch user profile (authentication required)|

### Job Endpoints

| Method | Endpoint | Description |
|--|--|--|
|GET |/api/jobs |Fetch all job listings|
|POST |/api/jobs|Create a new job (admin/employer only)|
|GET |/api/jobs/:id|Get details of a specific job|

## Contributing

Please follow the steps below:
+ Fork the repository.
+ Create a new branch for your feature or bug fix:

    git checkout -b your-feature-name

+ Commit your changes and push the branch to your fork:
+

    git add .
    git commit -m "Add your message here"
    git push origin your-feature-name

+ Open a pull request.

## License
This project is licensed under the MIT License. See LICENSE for more details.

Happy coding!
