import React, { useState, useEffect } from "react";
import styles from './home.module.css';
import { AiOutlineDelete } from "react-icons/ai";
import ReactModal from "react-modal";

function Home() {
    const [titleTask, setTitleTask] = useState("");
    const [categoryTask, setCategoryTask] = useState("");
    const [notesTask, setNotesTask] = useState("");
    const [idUser, setIdUser] = useState("");
    const [tasks, setTasks] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

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

    function openModal() {
        setModalOpen(true);
    }
    function closeModal() {
        setModalOpen(false)
    }



    return (
        <div className={styles.container}>

            <div className={styles.menu}></div>
            <div className={styles.containerContent}>
                <div>
                    <nav className={styles.nav}>
                        <div className={styles.sessao}>
                            <p>Olá {sessionStorage.NAME_USER}</p>
                        </div>
                    </nav>
                </div>
                <button onClick={openModal}>New Task</button>

                <h1>Olá</h1>
                <button onClick={closeModal}>Fechar</button>
                <ReactModal
                    isOpen={modalOpen}
                    onRequestClose={closeModal}
                    contentLabel="Example Modal"
                    overlayClassName={styles.modalOverlay} //Class para estilizar a sobreposição do modal
                    className={styles.modalInside} // Class para estilizar dentro do modal 
                >    <div className={styles.divNewTask}>
                <h2>Criar tarefa:</h2>
                <form onSubmit={newTask}>
                    <input type="text" placeholder="Digite o título" value={titleTask} onChange={(e) => setTitleTask(e.target.value)} />
                    <select value={categoryTask} onChange={(e) => setCategoryTask(e.target.value)}>
                        <option value="#">Selecione uma categoria</option>
                        <option value="estudos">Estudos</option>
                        <option value="trabalho">Trabalho</option>
                        <option value="pessoal">Pessoal</option>
                    </select>
                    <input type="date" />
                    <input type="time" name="" id="" />
                    <textarea value={notesTask} className={styles.textArea} placeholder="Anotações" onChange={(e) => setNotesTask(e.target.value)}></textarea>
                    <button>Criar tarefas</button>
                </form>
            </div></ReactModal>
            <div className={styles.flexContainer}>
            
                <div className={styles.divTableTask}>
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Título</th>
                                <th>Categoria</th>
                                <th>Anotações</th>
                                <th></th>
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
                                        <td className={styles.deleteTask}><AiOutlineDelete /></td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3">Nenhuma tarefa encontrada.</td>
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
