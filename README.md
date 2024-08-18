# cs465-fullstack

---

# Travlr Getaways Full Stack Web Application

## Overview

This full stack web application serves both customer-facing and administrative functionalities for Travlr Getaways, a travel booking platform. The project involved developing a secure, responsive, and efficient platform using a combination of Express HTML, JavaScript, Angular SPA, and a NoSQL MongoDB database. The final iteration includes security features for admin login authentication, ensuring safe access to administrative features.

---

## Architecture

### Frontend Development Comparison

In this project, I used two types of frontend development: traditional Express HTML with JavaScript and a modern single-page application (SPA) built with Angular. The Express HTML and JavaScript approach involved serving static HTML pages that required full-page reloads for navigation. While this method is straightforward, it results in slower interactions due to the need to reload the entire page with each user action.

On the other hand, the Angular SPA provides a richer user experience by allowing dynamic content updates without requiring full-page reloads. This is achieved through Angular's component-based architecture, which organizes the application into reusable pieces that handle specific parts of the UI. This modular approach not only improves performance but also enhances maintainability and scalability.

### Why Use NoSQL MongoDB?

The backend of this application uses a NoSQL MongoDB database because of its flexibility in handling unstructured data. MongoDB is schema-less, allowing for rapid development and easy scaling as the application grows. It efficiently handles data in JSON-like documents, which aligns well with the application's data requirements, especially when dealing with varying trip details and user-generated content.

---

## Functionality

### JSON and JavaScript Integration

JSON (JavaScript Object Notation) is a lightweight data format used for data exchange between the frontend and backend. While JavaScript is a scripting language used to create dynamic content on the frontend, JSON is a format that represents data as key-value pairs, making it easy to transmit data from the server to the client and vice versa. In this project, JSON was crucial for API communication, allowing Angular to send and receive data from the backend built with Express and MongoDB, ensuring a seamless integration between the frontend and backend.

### Code Refactoring and Reusable UI Components

Throughout the development process, I refactored code to improve functionality and efficiency. For example, I restructured the trip data handling in the SPA by updating the `getTrip` method to return a single Trip object instead of an array. This change aligned the component code with the actual API response, simplifying the logic and improving performance. Additionally, the use of reusable UI components, like the trip form, allowed me to maintain consistency across the application while reducing redundancy, making future updates easier and faster to implement.

---

## Testing

### API Testing and Security Challenges

Testing the API endpoints involved using tools like Postman to ensure that GET, POST, PUT, and DELETE requests were functioning correctly. Each endpoint was tested to verify that data was being accurately retrieved and updated in the MongoDB database. However, adding layers of security, such as the admin login authentication, introduced additional challenges. Ensuring that the secure endpoints were properly authenticated required careful testing of token validation and user authorization processes. This approach not only safeguarded sensitive administrative functions but also maintained the integrity of the overall application.

---

## Reflection

### Professional Growth and Skill Development

This course has significantly contributed to my professional growth by equipping me with full stack development skills that are highly marketable in the tech industry. I have learned to build and deploy a comprehensive web application from scratch, covering both frontend and backend technologies. The experience of working with Angular, Express, and MongoDB has expanded my understanding of modern web development practices, and the focus on security and testing has underscored the importance of building robust, secure applications. These skills have made me a more competitive candidate in the job market, prepared to tackle complex development challenges in my career.
