import React, { useState, useEffect } from "react";
import styles from './home.module.css';
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegUserCircle } from "react-icons/fa";

import { MdEdit } from "react-icons/md";
import ReactModal from "react-modal";

function Home() {
    const [titleTask, setTitleTask] = useState("");
    const [categoryTask, setCategoryTask] = useState("");
    const [notesTask, setNotesTask] = useState("");
    const [idUser, setIdUser] = useState("");
    const [tasks, setTasks] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
    // if (!titleTask || !categoryTask || !notesTask) {
    //     alert("Prencha todos os campos!");
    //     return;
    // }
    const listTask = async () => {

        try {
            const response = await fetch(`http://localhost:4000/task/listTask/${sessionStorage.ID_USER}`, {
                method: "GET"
            });
            if (response.ok) {
                const data = await response.json();
                setTasks(data.task);
                console.log("Resposta do servidor: ", data.task);
            } else {
                throw new Error("Erro ao listar as tarefas");
            }
        } catch (error) {
            console.error("Erro: ", error.message);
        }
    };

    //Chama a função listTask quando o componente é montado
    useEffect(() => {
        setIdUser(sessionStorage.ID_USER);
        listTask();
    }, []);

    // console.log("Função list: " + listTask);

    const newTask = async (event) => {
        event.preventDefault();

        if (!titleTask || !categoryTask || !notesTask) {
            alert("Prencha todos os campos!");
            return;
        }
        try {
            const response = await fetch('http://localhost:4000/task/newTask', {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ title: titleTask, category: categoryTask, notes: notesTask, id: sessionStorage.ID_USER })
            });
            if (response.ok) {
                const data = await response.json();
                console.log("Resposta do servidor: " + data);
                alert("OK")
                listTask(); // Atualiza a lista de tarefas após criar uma nova
            } else {
                throw new Error("Erro ao criar nova tarefa");
            }
        } catch (error) {
            console.error("Erro na requisição: " + error.message);
        }
    };

    ReactModal.setAppElement('#root');




    return (
        <div className={styles.container}>

            <div className={styles.containerContent}>
                <div>
                    <nav className={styles.nav}>
                        <div className={styles.navContent}>
                            <FaRegUserCircle className={styles.logo} />
                            <p className={styles.userName}>{sessionStorage.NAME_USER}</p>
                        </div>
                    </nav>
                </div>
                <button className={styles.buttonNewTask} onClick={openModal}>New Task</button>

                <ReactModal
                    isOpen={modalOpen}
                    onRequestClose={closeModal}
                    contentLabel="Example Modal"
                    overlayClassName={styles.modalOverlay} //Class para estilizar a sobreposição do modal
                    className={styles.modalInside} // Class para estilizar dentro do modal 
                >    <div className={styles.divNewTask}>
                        <button className={styles.buttonClsoModal} onClick={closeModal}>X</button>
                        <form onSubmit={newTask}>
                            <h2 className={styles.titleFormTask}>Nova tarefa</h2>
                            <input type="text" placeholder="Digite o título" value={titleTask} onChange={(e) => setTitleTask(e.target.value)} className={styles.input} />
                            <select value={categoryTask} onChange={(e) => setCategoryTask(e.target.value)} className={styles.select}>
                                <option value="#">Selecione uma categoria</option>
                                <option value="estudos">Estudos</option>
                                <option value="trabalho">Trabalho</option>
                                <option value="pessoal">Pessoal</option>
                            </select>
                            <input type="date" className={styles.input} />

                            <textarea value={notesTask} className={styles.textarea} placeholder="Anotações" onChange={(e) => setNotesTask(e.target.value)}></textarea>
                            <button className={styles.buttonFormNewTask}>Criar</button>

                        </form>

                    </div>
                </ReactModal>
                <div className={styles.flexContainer}>

                    <div className={styles.divTableTask}>
                        <table className={styles.modernTable}>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Título</th>
                                    <th>Categoria</th>
                                    <th>Anotações</th>
                                    <th>Status</th>
                                    <th>Data Limite</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(tasks) && tasks.length > 0 ? (
                                    tasks.map((task) => (
                                        <tr key={task.id}>
                                            <td>{task.id}</td>
                                            <td>{task.titulo}</td>
                                            <td>{task.categoria}</td>
                                            <td>{task.anotacoes}</td>
                                            <td>
                                                <span className={`${styles.status} ${task.status === 'Ativo' ? styles.active : styles.inactive}`}>
                                                    {task.status}
                                                </span>
                                            </td>
                                            <td>{new Date(task.dataLimite).toLocaleDateString('pt-BR')}</td>
                                            <td className={styles.deleteTask}>
                                                <MdEdit />
                                                <AiOutlineDelete />

                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7">Nenhuma tarefa encontrada.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

        </div >
    );
}


export default Home;
