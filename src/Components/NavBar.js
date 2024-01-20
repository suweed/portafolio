import React from "react";
import { Link } from "react-router-dom";
const NavBar = () => {

    function closeMenu() {
        var burgerMenu = document.getElementById('burger-menu');
        var overlay = document.getElementById('menu');
    
        burgerMenu.classList.toggle("close");
        overlay.classList.toggle("overlay");
    }

    return(
        <div className="nav">
            <div id="burger-menu" className="nav-item" onClick={() => closeMenu()}>
                <span></span>
            </div>
            <div className="nav-item">
                lan
            </div>

            <div id="menu">
                <ul>
                    <li>
                        <Link className="nav-link" onClick={() => closeMenu()} to="/">Home</Link>
                    </li>
                    <li>
                        <Link className="nav-link" onClick={() => closeMenu()} to="/about">About</Link>
                    </li>
                    <li>
                        <Link className="nav-link" onClick={() => closeMenu()} to="/work"> Work</Link>
                    </li>
                    <li>
                        <Link className="nav-link" onClick={() => closeMenu()} to="/contact">Contact</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default NavBar;