import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button }  from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardCheck } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function ConcluirTarefa(props){

    const API_URL_CONCLUIR_TAREFAS = 'http://localhost:3001/gerenciador-tarefas/:id/concluir';


    const [exibirModal, setExibirModal] = useState(false);
    const [exibirModalErro, setExibirModalErro] = useState(false);


    function handleAbrirModal(event){
        // para evitar que abra navegação ou atualize a tela
        event.preventDefault();
        setExibirModal(true);
         
    }

    function handleFecharModalErro(){
        setExibirModalErro(false);
    }




    function handleFecharModal(){
        setExibirModal(false);
    }

    function handleConcluirTarefa(event){
        event.preventDefault();
        const tarefasDb = localStorage['tarefas'];
        let tarefas = tarefasDb ? JSON.parse(tarefasDb) : [];
        tarefas = tarefas.map(tarefa => {
            //iterar todo o array salvo no localstoriga
            if(tarefa.id ===props.tarefa.id){
                tarefa.concluida = true;
            }
            return tarefa;
        });
        localStorage['tarefas'] = JSON.stringify(tarefas);
        setExibirModal(false);
        props.recarregarTarefas(true);
    }

    /**
     * vamos usar o modal, então precisamos controlar sua visibilidade
    */
    return(
        //um elemento para encapsular -> elemento neutro
        <span className={props.className}>
            <Button className="btn-sm" onClick={handleAbrirModal} data-testid="btn-abrir-modal" >
                <FontAwesomeIcon icon={faClipboardCheck} />
            </Button>
            <Modal show={exibirModal} onHide={handleFecharModal} data-testid="modal">
                <Modal.Header closeButton>
                    <Modal.Title>Concluir tarefa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Deseja realmente concluir a seguinte tarefa?
                    <br/>
                    <strong>{props.tarefa.nome}</strong>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleConcluirTarefa} data-testid="btn-concluir">
                        Sim
                    </Button>
                    <Button variant="light" onClick={handleFecharModal} data-testid="btn-fechar-modal">
                        Não
                    </Button>
                </Modal.Footer>
            </Modal>


            <Modal show={exibirModalErro} onHide={handleFecharModalErro} data-testid="modal">
                <Modal.Header closeButton>
                    <Modal.Title>Erro </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Erro ao excluir tarefa, tente novamente em instantes.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={handleFecharModalErro}>
                        Fechar
                    </Button>

                </Modal.Footer>
            </Modal>

        </span>
    );

}


ConcluirTarefa.propTypes= {
    tarefa: PropTypes.object.isRequired,
    recarregarTarefas: PropTypes.func.isRequired, //função obrigatório
    className: PropTypes.string //se  o botão vai ficar escondido ou não

}

export default ConcluirTarefa;