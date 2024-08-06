# VinoVault

VinoVault is an application designed to help users curate and manage their wine collections. This README outlines the test cases for the VinoVault application, covering various aspects including user authentication, search functionality, filtering, user interface, and database interactions.

## Table of Contents

- [VinoVault](#vinovault)
  - [Table of Contents](#table-of-contents)
  - [Test Cases](#test-cases)
    - [User Authentication](#user-authentication)
    - [Search Functionality](#search-functionality)
    - [Filter Functionality](#filter-functionality)
    - [User Experience / User Interface](#user-experience--user-interface)
    - [Authentication & Authorization](#authentication--authorization)
    - [Database Interactions](#database-interactions)
    - [Logging and Error Handling](#logging-and-error-handling)
  - [Running the Tests](#running-the-tests)
  - [Reporting Issues](#reporting-issues)
  - [Contributing](#contributing)

## Test Cases

### User Authentication

1. **New user registration with valid information**: Ensure that a new user can register with valid username, email, and password.
2. **New user registration with existing email**: Verify that the registration process handles duplicate emails correctly.
3. **User login with valid information**: Ensure that a user can log in with a valid email and password.
4. **User login attempt with incorrect password**: Verify that the application handles incorrect passwords properly.
5. **User login attempt with non-existent email**: Ensure that the application handles logins with non-existent emails.
6. **Verify successful login after successful registration**: Confirm that a user can log in immediately after registering.

### Search Functionality

7. **Perform a basic search with a single keyword**: Verify that the search functionality works with a single keyword.
8. **Perform a search with multiple keywords**: Ensure that the search functionality works with multiple keywords.
9. **Verify search results from both PostgreSQL and MongoDB databases**: Confirm that search results are returned correctly from both databases.
10. **Test empty search query handling**: Ensure that the application handles empty search queries appropriately.

### Filter Functionality

11. **Filter wines by country**: Verify that filtering by country works correctly.
12. **Filter wines by color**: Ensure that filtering by color works correctly.
13. **Filter wines by type of wine**: Verify that filtering by type of wine works correctly.
14. **Filter wines by winery**: Ensure that filtering by winery works correctly.
15. **Filter wines by multiple filters combined**: (Not currently implemented) Confirm that combining multiple filters works correctly once implemented.

### User Experience / User Interface

16. **Verify responsive design on different screen sizes**: Ensure the application displays correctly on various screen sizes.
17. **Verify correct display of wine information**: Confirm that wine information is displayed accurately.
18. **Test navigation between different pages**: Ensure that navigation between different pages works smoothly.

### Authentication & Authorization

19. **Verify protected routes are inaccessible without login**: Confirm that protected routes cannot be accessed without logging in.
20. **Test JWT token expiration and renewal**: Ensure that JWT tokens expire correctly and can be renewed.
21. **Verify user logout functionality**: Confirm that the logout functionality works correctly.

### Database Interactions

22. **Test database connection error handling**: Verify that the application handles database connection errors gracefully.
23. **Verify correct storage of user search history**: Ensure that user search history is stored correctly.

### Logging and Error Handling

24. **Verify logging of user actions (login, search, logout)**: Confirm that user actions are logged correctly.
25. **Test error logging for failed database queries**: Ensure that failed database queries are logged correctly.

## Running the Tests

To run the tests, follow these steps:

1. **Set up the testing environment**: Ensure that you have the necessary dependencies installed. This might include setting up a virtual environment and installing required packages.
2. **Run through each of the usercases above.
3. **View test results**: After running the tests, check the results to see which tests passed and which failed. Investigate any failures to understand the issues.

## Reporting Issues

To report issues found during testing, follow these steps:

1. **Document the issue**: Provide detailed information about the issue, including steps to reproduce it, expected behavior, and actual behavior.
2. **Submit the issue**: Use the project's issue tracking system (e.g., GitHub Issues, JIRA) to submit the documented issue. Include any relevant logs, screenshots, or other supporting information.

## Contributing

To contribute to the testing process or suggest new test cases:

1. **Fork the repository**: Fork the repository to your own account.
2. **Create a new branch**: Create a new branch for your changes.
3. **Make your changes**: Add new test cases or improve existing ones.
4. **Submit a pull request**: Once your changes are complete, submit a pull request to the main repository. Provide a detailed description of your changes and why they are necessary.
5. **Review and feedback**: Collaborate with the project maintainers to review your changes and address any feedback.

---

This README provides a comprehensive guide for testing the VinoVault application, ensuring thorough coverage and facilitating contributions from other developers.
