# User Management Dashboard

A responsive, single-page React application that allows users to view, add, edit, and delete user details. This project interfaces with the JSONPlaceholder mock API to simulate real-world backend interactions.

## Features
* **CRUD Operations:** View, add, edit, and delete users.
* **Smart Mocking:** Safely handles the limitations of the read-only JSONPlaceholder API by managing newly created users in local state without crashing.
* **Advanced Table Controls:**
  * Pagination (10, 25, 50, or 100 users per page)
  * Sorting (by ID, First Name, Department)
  * General text search and advanced field-specific filtering
* **Form Validation:** Client-side validation to ensure complete data entry.
* **Error Handling:** Graceful UI feedback for loading states and network errors.

## Tech Stack
* **Frontend:** React (Vite)
* **Styling:** Vanilla CSS
* **HTTP Client:** Axios

## Setup and Run Instructions

1. **Clone the repository**

   git clone <YOUR_GITHUB_REPO_URL_HERE>
   cd user-management-dashboard

  ### Install dependencies
   Ensure you have Node.js installed, then run:


        npm install
   Start the development server


       npm run dev

   Open your browser and navigate to http://localhost:5173 (or the port specified in your terminal).

## Reflection & Challenges Faced
The primary challenge during development was managing the disconnect between a read-only mock API (JSONPlaceholder) and an interactive frontend UI. Because JSONPlaceholder does not actually persist new POST or PUT requests in its database, sending subsequent update or delete requests for locally created users (IDs > 10) resulted in 500 Internal Server Error responses.

To solve this, I implemented a conditional routing system in the service layer. The app intelligently checks if a user is from the original mock dataset or added locally, bypassing API calls for local users and updating the React state directly. This provided a seamless UX while still demonstrating full CRUD logic.

## Future Improvements
If given more time, I would improve this project by:

Adding a State Management Library: Migrating the local state to Redux Toolkit or Zustand to avoid prop-drilling as the application scales.

Implementing a Real Backend: Connecting the application to a Node.js/Express backend with a PostgreSQL or MongoDB database for true data persistence.

End-to-End Testing: Writing Cypress test suites to automate the testing of the search, filter, and pagination logic.

# Author
Mahitha