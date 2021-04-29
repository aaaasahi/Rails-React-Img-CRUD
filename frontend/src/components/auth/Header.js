import React from 'react'
import axios from 'axios'
import { useHistory } from "react-router-dom";

export const Header = () => {
  const history = useHistory();
  const currentUser = localStorage.getItem('user')
  const handleSignOut = function(e) {
    e.preventDefault();
    axios({
      method: 'DELETE',
      url: 'http://localhost:8000/auth/sign_out',
      data: JSON.parse(localStorage.user)
    })
    .then(() => {
      localStorage.removeItem('user')
      history.push("/login");
    })
  }
  return (
    <div>
    {currentUser &&
    <div>
        {JSON.parse(currentUser).name}
      <a href="#" onClick={handleSignOut} >Sign out</a>
    </div>
    }
  </div>
  )
}