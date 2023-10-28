# Prime Todo  Hierarchical Todo List App

This is an innovative hierarchical todo list application designed to bring unparalleled clarity and organization to your daily tasks and projects. With its intuitive design and powerful features, Prime Todo transforms the way you manage your to-dos, enabling you to focus on what truly matters – getting things done efficiently and effectively.

## Demo

Check out a live demonstration of the app here: [Loom Video Demo](#)

## Features 
- **Create Multiple Lists:** Organize tasks in different lists.
- **Add Tasks & Subtasks:** Easily break down tasks into subtasks.
- **Edit & Delete:** Modify or remove tasks and lists.
- **Complete Tasks:** Mark off finished tasks and subtasks.
- **Move Tasks:** Transfer tasks between lists.
- **Secure Access:** Reliable sign-up and login for users.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
- Node.js (v14 or later)
- npm (v6 or later)
- Python (v3.8 or later)

### Installing
#### Backend Setup
1. **Clone the repository:**
```bash
    git clone https://github.com/lewiskyron/prime-to-do.git
```

2. **create and activate a virtual environment:**
    
    ```bash
    python -m venv venv
    source venv/bin/activate
    ``` 
3. **Navigate to the backend directory:**

    ```bash
    cd BE
    ```
4. **Install dependencies:**

    ```bash
    pip install -r requirements.txt
    ```


### Frontend Setup
1. **Navigate to the frontend directory:**

    ```bash
    cd front-end
    ```
     ```bash
    cd to-do
    ```


2. **Install NPM packages:**

    ```bash
    npm install
    ```

### Starting the Application

#### Running the Backend

- In the main project directory, run the following command:
    ```bash
       cd BE
    ```
    ```bash
        python server.py
    ```

  This will start the backend server on `http://127.0.0.1:8000`.


#### Running the Frontend

- In a new terminal, navigate to the frontend directory:
    ```bash
    cd front-end
    cd to-do
    ```

    ```bash
    npm run dev
    ```

  This will start the React app and should automatically open `http://localhost:5173/` in your web browser.


