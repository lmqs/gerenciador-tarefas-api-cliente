import React, {useState} from 'react';
import {Button, Form, FormLabel, Jumbotron, Modal} from 'react-bootstrap';
import {navigate, A} from 'hookrouter';
import Tarefa from '../models/tarefa.model';
import axios from 'axios';

function CadastrarTarefa() {

    const API_URL_LISTAR_TAREFAS = 'http://localhost:3001/gerenciador-tarefas';


    const [tarefa, setTarefa] = useState('');
    const [formValidado, setFormValidado] = useState(false);
    const [exibeModal, setExibeModal] = useState(false);
    const [exibeModalErro, setExibeModalErro] = useState(false);


    // function cadastrar(event){
    //     event.preventDefault(); //inibir a atualização da página
    //     setFormValidado(true)        ;
    //     if(event.currentTarget.checkValidity() === true){
    //         //obtém as tarefas
    //         const tarefasDb = localStorage['tarefas'];
    //         const tarefas = tarefasDb ? JSON.parse(tarefasDb) : [];

    //         //persistir a tarefa
    //         tarefas.push(new Tarefa(new Date().getTime(), tarefa, false));
    //         localStorage['tarefas'] = JSON.stringify(tarefas);
    //         setExibeModal(true);
    //     }   
    // }



    async function cadastrar(event){
        event.preventDefault(); //inibir a atualização da página
        setFormValidado(true);
        if(event.currentTarget.checkValidity() === true){
            try{
                const novaTarefa = new Tarefa(null, tarefa, false);
                await axios.post(API_URL_LISTAR_TAREFAS, novaTarefa);
                setExibeModal(true);
            }catch(err){
                setExibeModalErro(true);
            }
        }   
    }


    function handleTxtTarefa(event){
        setTarefa(event.target.value);
    }

    function handleFecharModal(event){
        navigate('/');
    }


    function handleFecharModalErro(event){
        setExibeModalErro(false);
        navigate('/');}

    return (
        <div>
            <h3 className="text-center"> Cadastrar</h3>
            <Jumbotron>
                <Form validated={formValidado} noValidate onSubmit={cadastrar}>
                    <Form.Group>
                        <FormLabel>Tarefa</FormLabel>
                        <Form.Control type="text" placeholder="Digite a tarefa"
                            minLength="5" maxLength="100" required 
                            value={tarefa} 
                            onChange={handleTxtTarefa}
                            data-testid="txt-tarefa" //serve para a classe de teste
                        />
                    <Form.Control.Feedback type="invalid">
                        A tarefa deve conter ao menos 5 caracteres
                    </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="text-center">
                        <Button variant="success" type="submit" data-testid="btn-cadastrar">Cadastrar </Button>
                        &nbsp;
                        <A href="/" className="btn btn-light"> Voltar</A>
                    </Form.Group>
                </Form>
                <Modal show={exibeModal} onHide={handleFecharModal} data-testid="modal">
                    <Modal.Header closeButton>
                        <Modal.Title>Sucesso</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Tarefa adicionada com sucesso!
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" 
                        onClick={handleFecharModal}  >Continuar</Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={exibeModalErro} onHide={handleFecharModalErro} data-testid="modalErro">
                    <Modal.Header closeButton>
                        <Modal.Title>Erro</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Erro ao adicionar tarefa, tente novamente em instantes
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="warning" 
                        onClick={handleFecharModalErro}  >Fechar</Button>
                    </Modal.Footer>
                </Modal>
            </Jumbotron>
        </div>
    );
}


export default CadastrarTarefa;