import React from "react";
import { useLocation } from "react-router-dom";
import Menu from '../Components/Home/Menu/menu';


//Children renderiza as rotas (vindas do App.jsx para o Layout 
function Layout({ children }) {
    //Nessa função faço o gerenciamento em quais rotas o menu irá renderizar através do location    

    const location = useLocation();
    const noMenuPaths = ["/", "/login", "/cadastro", "/resetPassword", "/additionalDiv"];
    //pathname = rota-atual
    const showMenu = !noMenuPaths.includes(location.pathname);

    return (
        <div style={{ display: 'flex', backgroundColor: "#e3e9f7" }}>
            {showMenu && <Menu />}
            {children}
        </div>
    );
}

export default Layout;