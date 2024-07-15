import React from "react";
import styles from './AdditionalDivToken.module.css';



// module export default

function AdditionalDivToken({ setContainerDisplay }){
    <div className={styles['additional-div']}>
    <p>Conteúdo da div adicional</p>
    <button onClick={() => setContainerDisplay('block')}>Mostrar Container</button>
</div>
}


export default AdditionalDivToken;