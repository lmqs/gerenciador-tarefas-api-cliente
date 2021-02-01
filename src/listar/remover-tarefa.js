import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button }  from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';


function RemoverTarefa(props){


    const [exibirModal, setExibirModal] = useState(false);

    function handleAbrirModal(event){
        // para evitar que abra navegação ou atualize a tela
        event.preventDefault();
        setExibirModal(true);
         
    }


    function handleFecharModal(){
        setExibirModal(false);
    }

    function handleRemoverTarefa(event){
        event.preventDefault();
        const tarefasDb = localStorage['tarefas'];
        let tarefas = tarefasDb ? JSON.parse(tarefasDb) : [];
        /**ignora a tarefa que o id for igual a tarefa.id */
        tarefas = tarefas.filter(tarefa => tarefa.id !== props.tarefa.id);
        

        localStorage['tarefas'] = JSON.stringify(tarefas);
        setExibirModal(false);
        props.recarregarTarefas(true); //atualizar a listafem da tarefa atual
    }

    /**
     * vamos usar o modal, então precisamos controlar sua visibilidade
    */
    return(
        //um elemento para encapsular -> elemento neutro
        <span >
            <Button className="btn-sm" variant="danger" onClick={handleAbrirModal} data-testid="btn-abrir-modal" >
                <FontAwesomeIcon icon={faTrashAlt} />
            </Button>
            <Modal show={exibirModal} onHide={handleFecharModal} data-testid="modal">
                <Modal.Header closeButton>
                    <Modal.Title>Remover tarefa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Deseja realmente remover a tarefa?
                    <br/>
                    <strong>{props.tarefa.nome}</strong>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleRemoverTarefa} data-testid="btn-remover">
                        Sim
                    </Button>
                    <Button variant="light" onClick={handleFecharModal} data-testid="btn-fechar-modal">
                        Não
                    </Button>
                </Modal.Footer>
            </Modal>
        </span>
    );

}


RemoverTarefa.propTypes= {
    tarefa: PropTypes.object.isRequired,
    recarregarTarefas: PropTypes.func.isRequired //função obrigatório

}

export default RemoverTarefa;