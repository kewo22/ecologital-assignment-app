import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { User } from './interfaces/user.interface'

const seed = () => {
  const users = localStorage.getItem('users');
  if (!users) {
    const superAdminObj = {
      "firstName": "Super",
      "lastName": "Admin",
      "email": "sa@gmail.com",
      "gender": "male",
      "address": "No 1, Address Line 1, Address Line 1, Colombo.",
      "age": 10,
      "id": -1,
      "password": "123",
      "role": "superAdmin"
    }
    const toSeed = JSON.stringify([superAdminObj]);
    localStorage.setItem('users', toSeed)
  }
};
seed();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
