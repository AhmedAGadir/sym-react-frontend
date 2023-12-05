# Frontend Candidate Test

Welcome to my submission for the frontend candidate test. This project is implemented using React and Tailwind CSS and is designed to be run in either a frontend-only mode or a full-stack mode.

Below, you'll find detailed instructions for setting up and running the project in your preferred configuration. You can check the specific project requirements [here](requirements.md).

![Sample Organization Demo](https://github.com/AhmedAGadir/sym-react-frontend/blob/main/sample-organization-demo.gif)

<!-- ![Sample Organization Screenshot](https://github.com/AhmedAGadir/sym-react-frontend/blob/main/sample-organization-screenshot.png) -->

## Getting Started

These steps will guide you in getting a copy of the project up and running on your local machine for development and testing purposes.

### Setup for Frontend or Fullstack

To configure the project for either frontend-only or full-stack mode:

1. Open `frontend/src/App.js`.
2. Change the `mode` variable to either `"frontend"` or `"fullStack"` based on your desired setup.

#### For Frontend-Only Mode

If you're running the project in frontend-only mode, navigate to the frontend directory:

```bash
cd frontend
```

After navigating to the frontend directory, perform the following steps:

1. Install the dependencies:

   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

This will launch the frontend application in development mode, opening a new browser window if possible, or you can manually visit [http://localhost:3000](http://localhost:3000) to view it.

#### For Fullstack Mode

In full-stack mode, the project will run both the frontend and backend services. Follow the instructions in the "Installing" and "Running the Project" sections.

### Prerequisites

Ensure you have Node.js installed on your machine. If not, download and install it from the [Node.js official website](https://nodejs.org/).

### Installing

To clone and set up the project:

1. Clone the repository:

   ```bash
   git clone https://github.com/AhmedAGadir/sym-react-frontend.git
   ```

2. Navigate to the project directory:

   ```bash
   cd sym-react-frontend-main
   ```

3. Install the necessary dependencies:
   ```bash
   npm install
   npm run client-install
   ```

### Running the Project

Depending on your mode (frontend-only or full-stack), the running instructions will differ:

#### Backend Server (for Fullstack Mode)

Start the backend server:

```bash
npm run server
```

#### Frontend Client

Start the frontend client:

```bash
npm run client
```

#### Concurrently (for Fullstack Mode)

To run both the server and client concurrently (useful during development):

```bash
npm run dev
```

### Project Structure

- `main.js`: The entry point for the backend server.
- `frontend`: Contains all files related to the frontend client.

### Available Scripts

- `start`: Launches the backend server using Node.
- `server`: Starts the backend server with Nodemon for automatic reloading.
- `client`: Initiates the frontend client.
- `client-install`: Installs dependencies for the frontend client.
- `dev`: Concurrently runs both backend and frontend in development mode.

## License

This project is licensed under the MIT License.
