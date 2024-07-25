import { React, useState} from "react";
import styles from './menu.module.css';
import { faChartLine, faUser, faBell, faBox, faImage, faGear, faChevronRight, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from "react-router-dom";

function Menu() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
   

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    }

    //Função que redireciona para tela de perfil
    const perfilRedirect = () => {
        navigate('/perfil');
    }

    const homeRedirect = () => {
        navigate('/Home')
    }

    // Função para encerrar a sessão do usuário logado
    const finishSession = () => {
        const sessions = ["EMAIL_USER", "NAME_USER", "SENHA_USER"];
        sessions.forEach(session => {
            sessionStorage.removeItem(session)
        });
        navigate('/login');
    }


    return (
        <nav className={`${styles.sidebar} ${isOpen ? styles.openSidebar : ''}`}>
            <div className={styles.sidebarContent}>
                <div className={styles.user}>
                    <img src="src/images/avatar.jpg" className={styles.userAvatar} alt="Avatar" />
                    <p className={styles.userInfos}>
                        <span className={styles.itemDescription}>{sessionStorage.NAME_USER}</span>
                        <span className={styles.itemDescription}>Lorem Ipsum</span>
                    </p>
                </div>

                <ul className={styles.sideItems}>
                    <li className={`${styles.sideItem} ${styles.active}`}>
                        <a href="#" onClick={homeRedirect}>
                            <FontAwesomeIcon icon={faChartLine} />
                            <span className={styles.itemDescription}>Dashboard</span>
                        </a>
                    </li>
                    <li className={styles.sideItem}>
                        <a href="#" onClick={perfilRedirect}>
                            <FontAwesomeIcon icon={faUser} />
                            <span className={styles.itemDescription}>Perfil</span>
                        </a>
                    </li>
                    <li className={styles.sideItem}>
                        <a href="#">
                            <FontAwesomeIcon icon={faBell} />
                            <span className={styles.itemDescription}>Notificações</span>
                        </a>
                    </li>
                    <li className={styles.sideItem}>
                        <a href="#">
                            <FontAwesomeIcon icon={faBox} />
                            <span className={styles.itemDescription}>Tarefas</span>
                        </a>
                    </li>
                    <li className={styles.sideItem}>
                        <a href="#">
                            <FontAwesomeIcon icon={faImage} />
                            <span className={styles.itemDescription}>Imagens</span>
                        </a>
                    </li>
                    <li className={styles.sideItem}>
                        <a href="#">
                            <FontAwesomeIcon icon={faGear} />
                            <span className={styles.itemDescription}>Configurações</span>
                        </a>
                    </li>
                </ul>

                <button className={styles.openBtn} onClick={toggleSidebar}>
                    <FontAwesomeIcon className={styles.openBtnIcon} icon={faChevronRight} />
                </button>
            </div>

            <div className={styles.logout}>

                <button className={styles.logoutBtn} onClick={finishSession}>
                    <FontAwesomeIcon icon={faRightFromBracket} />
                    <span className={styles.itemDescription}>Logout</span>
                </button>
            </div>
        </nav>

    )
}

export default Menu;