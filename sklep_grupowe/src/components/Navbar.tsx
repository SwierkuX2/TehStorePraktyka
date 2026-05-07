import { Button, Container, Nav, Navbar as NavbarBs } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext";
import Logo from "../assets/Logo_TEH.png";
import { useEffect, useState } from "react";
import axios from "axios";

export function Navbar() {


    const handleLogout = () => {
        axios.post("http://localhost:8081/logout", {}, { withCredentials: true })
        .then(() => {
            window.location.reload();
        });
    };

    const { openCart, cartQuantity } = useShoppingCart();

    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); 

    useEffect(() => {
        fetch("http://localhost:8081/", {
            credentials: "include"
        })
        .then(res => res.json())
        .then(data => {
            if (data.Status) {
                setIsLoggedIn(true); 
            }
            if (data.isAdmin) {
                setIsAdmin(true);
            }
        })
        .catch(() => {});
    }, []);

    return (
        <NavbarBs sticky="top" style={{ background: "#060607"}} className="shadow-sm mb-3">
            <div style={{ width: "100px", height: "50px" }}>
                <Nav.Link style={{ color: "#E6E6E6"}} to="/store" as={NavLink}>
                    <img style={{ width: "150px", height: "75px"}} src={Logo} alt="" />
                </Nav.Link>
            </div>

            <Container>
                <Nav className="me-auto">
                    <Nav.Link style={{ color: "#E6E6E6"}} to="/" as={NavLink}>
                        🏠︎Home
                    </Nav.Link>

                    <Nav.Link style={{ color: "#E6E6E6"}} to="/store" as={NavLink}>
                        💵Store
                    </Nav.Link>

                    <Nav.Link style={{ color: "#E6E6E6"}} to="/about" as={NavLink}>
                        🛈About
                    </Nav.Link>

                    {isAdmin && (
                        <Nav.Link style={{ color: "#E6E6E6"}} to="/admin" as={NavLink}>
                            🛠️Admin
                        </Nav.Link>
                    )}

                    {isLoggedIn ? (
                        <Nav.Link 
                            onClick={handleLogout} 
                            style={{ color: "#E6E6E6", cursor: "pointer" }}
                        >
                            🙎🏻‍♂️Logout
                        </Nav.Link>
                    ) : (
                        <Nav.Link style={{ color: "#E6E6E6"}} to="/register" as={NavLink}>
                            🪪Register
                        </Nav.Link>
                    )}

                </Nav>

                {cartQuantity > 0 && (
                    <Button
                        onClick={openCart}
                        style={{ color: "#E6E6E6", background: "#3A7BFF", position: "relative" }}
                    >
                        🛒 Koszyk
                        <div
                            className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
                            style={{
                                color: "#E6E6E6",
                                width: "1.5rem",
                                height: "1.5rem",
                                position: "absolute",
                                transform: "translate(300%, -50%)",
                            }}
                        >
                            {cartQuantity}
                        </div>
                    </Button>
                )}
            </Container>
        </NavbarBs>
    );
}