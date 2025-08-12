# 📊 BudgetMate

**BudgetMate** is a personal finance management web application that enables users to securely track income, expenses, and budgets. With an intuitive dashboard and detailed reporting, BudgetMate empowers users to take control of their financial future.

---

## 🚀 Features

- 🔐 User registration & secure authentication (JWT)
- ➕ Add, 📝 edit, and 🗑️ delete income/expenses
- 📈 Interactive charts and summary reports
- 🌙 Dark mode toggle
- 📱 Fully responsive design (mobile & desktop)
- ⚙️ Clean, modern UI with Tailwind CSS
- 🔔 Real-time notifications with React Toastify

---

## 🛠️ Technologies Used

### Frontend
- React (with Vite)
- Tailwind CSS
- React Router DOM
- Axios
- React Toastify

### Backend
- Node.js & Express.js
- MySQL
- Sequelize ORM
- JWT & bcrypt for authentication
- dotenv, CORS, Helmet for security

---

## 🧑‍💻 Getting Started

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or above)
- [MySQL](https://www.mysql.com/)
- Git

---

## ⚙️ Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/Grish-Pradhan/BudgetMate.git
cd BudgetMate
```

### 2. Backend Setup

```bash
cd backend
npm install
```

- Create a `.env` file in the `backend` directory:
```env
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=budgetmate
JWT_SECRET=your_jwt_secret
```

- Sync your MySQL database (make sure it's running):
```bash
npm run db:sync  # or run manually via Sequelize if set up
npm start        # starts the backend server
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

Access the app at:  
📍 **http://localhost:5173**

---

## 🔐 Security Measures

- Passwords hashed using bcrypt  
- JWT-based session authentication  
- Environment variables for sensitive data  
- CORS & Helmet for HTTP security  
- Input validation on both client & server

---

## 🎥 Demonstration

📺 **Project Demo Video:**  
👉 [Watch on YouTube (Unlisted)](https://www.youtube.com/watch?v=kXcFVwNY6SM)

---

## 🔗 Version Control

🔧 All source code changes are tracked using Git.  
📂 Repository is hosted on GitHub:  
👉 [https://github.com/Grish-Pradhan/BudgetMate](https://github.com/Grish-Pradhan/BudgetMate)

### Branching Strategy:
- `main`: Stable, production-ready code
- `feature/*`: New features (e.g., `feature/login`)
- `bugfix/*`: Bug fixes
- Tags used for major milestones

---

## 📌 To-Do / Future Improvements

- Role-based access (admin vs regular users)  
- Multi-factor authentication  
- Expense categorization and filters  
- Bank API integration for automated import  
- Offline support (PWA)

---

## 🧾 License

This project is for academic use only under Softwarica College ST4056CEM module.

---

## 📚 References

See full list of references in the report.  
Key libraries:
- [React Docs](https://react.dev/learn)
- [Node.js Docs](https://nodejs.org/docs/latest/api/)
- [Sequelize GitHub](https://github.com/sequelize/sequelize)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
