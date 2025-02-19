# mcs-scenario-checker-for-maker

This project is a React 18 application named "mcs-scenario-checker-for-maker" designed for deployment on Azure App Service. It features a visually appealing user interface with a structured layout including a header, footer, and a left navigation menu.

## Project Structure

```
mcs-scenario-checker-for-maker
├── public
│   ├── index.html
│   └── favicon.ico
├── src
│   ├── components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── LeftNav.tsx
│   ├── pages
│   │   ├── AddTest.tsx
│   │   └── ExecuteTests.tsx
│   ├── App.tsx
│   ├── index.tsx
│   └── styles
│       └── App.css
├── package.json
├── tsconfig.json
└── README.md
```

## Features

- **Header**: Displays the application title and navigation links.
- **Footer**: Contains copyright information.
- **Left Navigation Menu**: Provides links to "Add test" and "Execute tests" pages.

## Pages

### Add Test
- A large text box for JSON input.
- A submit button to send the payload to CosmosDB.
- A batch import button for multiple test cases.
- Validation for the JSON payload.

### Execute Tests
- A button to fetch JSON payloads.
- Calls an external API using the "query" field.
- Displays results in a tabular format showing pass and fail status.
- Allows individual test execution from the table.

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd mcs-scenario-checker-for-maker
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Start the development server:
   ```
   npm start
   ```

## Usage Guidelines

- Navigate to the "Add test" page to input test cases.
- Use the "Execute tests" page to run and view results of the tests.

## Deployment

This application is designed for deployment on Azure App Service. Follow Azure's documentation for deploying React applications to set up your environment and deploy your app.