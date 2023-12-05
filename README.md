# Frontend Candidate Test

This is my submission for a frontend candidate test, implemented using React and Tailwind CSS, without the use of additional libraries.

You can find the project requirements [here](requirements.md).

## Frontend Version

The frontend-only version of the project is deployed and can be viewed at: [https://ahmedgadir-sampleorg.netlify.app/](https://ahmedgadir-sampleorg.netlify.app/)

## Fullstack Version

To switch to the fullstack version of the project, please follow these steps:

1. Delete the current file located at `/frontend/hooks/useOrganizationData.js`.
2. Rename the file `DEPRECATED_useOrganizationData.js` (found in the same directory) to `useOrganizationData.js`.

This will enable the use of the `useOrganizationData` hook tailored for the fullstack version of the project.

![Sample Organization Demo](https://github.com/AhmedAGadir/sym-react-frontend/blob/main/sample-organization-demo.gif)

<!-- ![Sample Organization Screenshot](https://github.com/AhmedAGadir/sym-react-frontend/blob/main/sample-organization-screenshot.png) -->

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have Node.js installed on your machine. If you don't have Node.js installed, download and install it from [Node.js official website](https://nodejs.org/).

### Installing

Clone the repository to your local machine:

```bash
git clone https://github.com/AhmedAGadir/sym-react-frontend.git
```

Navigate to the project directory:

```bash
cd sym-react-frontend-main
```

Install the project dependencies:

```bash
npm install
npm run client-install
```

### Running the Project

To start the backend server:

```bash
npm run server
```

To start the frontend client:

```bash
npm run client
```

To run both the server and client concurrently (for development):

```bash
npm run dev
```

### Structure

- `main.js`: Entry point for the backend server.
- `frontend`: Directory for the frontend client.

### Scripts

- `start`: Starts the backend server using Node.
- `server`: Runs the backend server with Nodemon for auto-reloading.
- `client`: Starts the frontend client.
- `client-install`: Installs dependencies for the frontend client.
- `dev`: Runs both the backend and frontend in development mode concurrently.

## License

This project is licensed under the MIT License.
