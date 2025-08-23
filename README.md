# Study-Notion
# 📚 EdTech Platform Backend

This is the backend for an EdTech platform that supports user authentication, course management, ratings & reviews, and more.  
It is built using **Node.js**, **Express**, and **MongoDB**.

---

## 🚀 Features
- User authentication with JWT
- Role-based access control (Student, Instructor, Admin)
- Password reset with secure token
- Course creation & progress tracking
- Ratings & Reviews for courses
- Secure API with middlewares

---

## 🛠 Tech Stack
- **Backend Framework:** Node.js, Express
- **Database:** MongoDB + Mongoose
- **Authentication:** JWT + bcrypt
- **Environment Variables:** dotenv
- **Other:** nodemon (dev), cookie-parser

---

## 📂 Folder Structure
SERVER/ ├── config/ ├── database.js  ├── controllers/ │ ├── Auth.js │ ├── ResetPassword.js ├── middlewares/ │ ├── auth.js ├── models/ │ ├── Course.js │ ├── CourseProgress.js │ ├── OTP.js │ ├── Profile.js │ ├── RatingAndReview.js │ ├── Section.js │ ├── SubSection.js │ ├── tags.js │ ├── User.js ├── routes/ ├── utils/ ├── .env ├── index.js ├── package.json ├── package-lock.json


---

## ⚙️ Installation & Setup
```bash
# 1. Clone the repo
git clone https://github.com/demonayush11/Study-Notion.git

# 2. Navigate into the project folder
cd SERVER

# 3. Install dependencies
npm install

# 4. Create a .env file in the root directory
# (see Environment Variables section below)

# 5. Start the server
npm run dev
