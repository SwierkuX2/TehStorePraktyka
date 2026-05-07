import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'


function Register() { 
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    });
    const navigate = useNavigate();
    const handleSubmit = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        axios.post('http://localhost:8081/register', values)
        .then(res => {
            if(res.data.Status === "User registered successfully"){
                alert("User registered successfully");
                navigate('/login');
            } else {
                alert("Error registering user")
            }
        })
        .then(err => console.log(err))
    }

 return (
    <div className='d-flex justify-content-center align-item-center '> 
        <div className='bg-dark p-3 rounded w-25'>
            <h2>Sign-up</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name"><strong>Name</strong></label>
                    <input type="text" className="form-control rounded-0" name="name" placeholder="Enter your name" onChange={e => setValues({...values, name: e.target.value})} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email"><strong>Email</strong></label>
                    <input type="email" className="form-control rounded-0" name="email" placeholder="Enter your email" onChange={e => setValues({...values, email: e.target.value})} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password"><strong>Password</strong></label>
                    <input type="password" className="form-control rounded-0" name="password" placeholder="Enter your password" onChange={e => setValues({...values, password: e.target.value})} />
                </div>
                <button type="submit" className="btn btn-success w-100 rounded-0">Sign-up</button>
                <p>You are agree to the privacy policy of our company</p>
                <Link to="/login" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Login</Link>
            </form>
        </div>
    </div>
  )

}
   

export default Register
           