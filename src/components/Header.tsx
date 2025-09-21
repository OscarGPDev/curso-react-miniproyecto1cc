import { Link, useLocation } from "react-router-dom";

export default function Header() {
    const location = useLocation();
    
    return <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <a className="navbar-brand" href="#">Wolf Bank</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link 
                            className={`nav-link ${location.pathname === '/products' ? 'active' : ''}`} 
                            aria-current="page" 
                            to="/products"
                        >
                            Productos
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link 
                            className={`nav-link ${location.pathname === '/balance' ? 'active' : ''}`} 
                            aria-current="page" 
                            to="/balance"
                        >
                            Balance ETH
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link 
                            className={`nav-link ${location.pathname === '/form-send' ? 'active' : ''}`} 
                            aria-current="page" 
                            to="/form-send"
                        >
                            Transfer ETH
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
}