import  { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'
import axios from 'axios';

function Login() { 
    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = (event: { preventDefault: () => void }) => {
        event.preventDefault();

        axios.post('http://localhost:8081/login', values, { withCredentials: true })
        .then(res => {

            if(res.data.Status === "User logged in successfully"){

                axios.get('http://localhost:8081/', { withCredentials: true })
                .then(userRes => {
                    console.log("User data:", userRes.data);

                    if(userRes.data.isAdmin){
                        localStorage.setItem("isAdmin", "true");
                    } else {
                        localStorage.removeItem("isAdmin");
                    }

                    alert("Login successful");
                    window.location.href = "/store";
                });

            } else {
                alert(res.data.Error || "Error login user");
            }
        })
        .catch(err => console.log("Błąd axios:", err));
    }

    return (
        <div className='d-flex justify-content-center align-item-center'> 
            <div className='bg-dark p-3 rounded w-25'>
                <h2>Sign-in</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label><strong>Email</strong></label>
                        <input 
                            type="email" 
                            className="form-control rounded-0"
                            placeholder="Enter your email"
                            onChange={e => setValues({...values, email: e.target.value})}
                        />
                    </div>

                    <div className="mb-3">
                        <label><strong>Password</strong></label>
                        <input 
                            type="password" 
                            className="form-control rounded-0"
                            placeholder="Enter your password"
                            onChange={e => setValues({...values, password: e.target.value})}
                        />
                    </div>

                    <button type="submit" className="btn btn-success w-100 rounded-0">
                        Sign-in
                    </button>

                    <p>You are agree to the privacy policy of our company</p>

                    <Link 
                        to="/register" 
                        className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'
                    >
                        Register
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default Login