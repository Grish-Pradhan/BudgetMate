Sure! Here's the full content of the **frontend `README.md`** file for your **BudgetMate** project:

````markdown
# 🎨 BudgetMate Frontend

This is the **frontend** of the BudgetMate web application, built using React and Tailwind CSS. It handles all user interactions, data visualization, and UI logic, communicating with the backend server via RESTful APIs.

---

## 🚀 Features

- User registration and login  
- JWT-based authentication with token persistence  
- Add, edit, and delete income/expense transactions  
- Responsive and mobile-friendly layout  
- Dark mode support  
- Dashboard with financial summaries and charts  
- Notifications using React Toastify  

---

## 🛠️ Tech Stack

- **React** (with Vite for fast dev environment)  
- **Tailwind CSS** for styling  
- **React Router DOM** for routing  
- **Axios** for API requests  
- **React Toastify** for alerts and notifications  

---

## 📦 Installation

### 1. Navigate to frontend folder

```bash
cd frontend
````

### 2. Install dependencies

```bash
npm install
```

### 3. Start the frontend dev server

```bash
npm run dev
```

Access the app at:
📍 **[http://localhost:5173](http://localhost:5173)** (default Vite port)

---

## 🔐 Authentication

* Stores JWT token securely in local storage
* Sends token in Authorization header for protected API routes
* Redirects unauthenticated users to the login page

---

## 🌙 Dark Mode

Toggle dark/light theme using a switch in the navbar. Theme preference is persisted across sessions.

---


## 🌐 API Communication

* All API calls are made to the backend running at `http://localhost:5000` (or the port you set in `.env`)
* Token is included automatically in headers for protected routes

---

## 🧪 To-Do / Improvements

* Add charts for income vs expenses breakdown
* Add filtering/sorting of transactions
* Improve error handling and form validations

---

## 🧾 License

This frontend is developed as part of the coursework for the module **ST4056CEM - Introduction to Web Development and Database Systems** at Softwarica College.

---

## 📚 References

* [React Docs](https://react.dev/learn)
* [Tailwind CSS Docs](https://tailwindcss.com/docs)
* [React Toastify](https://fkhadra.github.io/react-toastify/introduction)
* [Axios](https://axios-http.com/docs/intro)

```


