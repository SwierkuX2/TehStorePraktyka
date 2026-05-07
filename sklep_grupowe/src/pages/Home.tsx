import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export function Home() {
    const [auth, setAuth] = useState(false);
    const [message , setMessage] = useState("");
    const [nazwa, setNazwa] = useState("");

    const handleLogout = () => {
    axios.post('http://localhost:8081/logout', {}, { withCredentials: true })
        .then(res => {
            console.log(res.data);
            setAuth(false);  
            setNazwa("");
        })
        .catch(err => console.log(err));
}

    useEffect(() => { 
        axios.get('http://localhost:8081', { withCredentials: true })
            .then(res => {
                console.log("GET / response:", res.data); 
                if(res.data.Status === "User is authenticated") {
                    setAuth(true);
                    setNazwa(res.data.nazwa);
                } else {
                    setAuth(false);
                    setMessage(res.data.Error || "Please log in");
                }
            })
            .catch(err => console.log("Błąd axios:", err))
    }, []) 

    return (
        <>
            <h1>Tech_Store</h1>
            <div>
                { auth ?
    <div className='container mt-4'>
        <h3>You are logged in as {nazwa}</h3>
        <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
    </div>
    :
    <div>
        <h3>{message}</h3>
        <h3>Please log in</h3>
        <Link to="/login">Login</Link>
    </div>
}
            </div>
        </>
    )
}