import { NavLink } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar navbar-expand navbar-dark bg-primary px-4">
            <span className="navbar-brand">Spixworth Dental</span>

            <div className="navbar-nav">
                <NavLink
                    to="/"
                    end
                    className={({ isActive }) =>
                        isActive ? "nav-link active fw-bold" : "nav-link"
                    }
                >
                    Home
                </NavLink>

                <NavLink
                    to="/services"
                    className={({ isActive }) =>
                        isActive ? "nav-link active fw-bold" : "nav-link"
                    }
                >
                    Services
                </NavLink>

                <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                        isActive ? "nav-link active fw-bold" : "nav-link"
                    }
                >
                    Contact
                </NavLink>
            </div>
        </nav>
    );
}

export default Navbar;
