import React, {useState, useEffect} from 'react';
import { A } from 'hookrouter';
import {Table, Form} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ItensListaTarefas from './itens-lista-tarefas';
import Paginacao from './paginacao';
import Ordenacao from './ordenacao';

function ListarTarefas(){

    const ITENS_POR_PAG = 3;


    const [tarefas, setTarefas] = useState([]);
    const [carregarTarefas, setCarregarTarefas] = useState(true);
    const [totalItems, setTotalItems] = useState(0); //definir com 0 e deverá ser  atualizado no useEffect
    const [paginaAtual, setPaginaAtual] = useState(1); //sempre a pagina atual vai ser 1
    const [ordenarAsc, setOrdernarAsc] = useState(false);
    const [ordenarDesc, setOrdernarDesc] = useState(false);
    const [filtroTarefa, setFiltroTarefa] = useState('');

    //carregar assim que o componente for criado
    useEffect(()=> {
        function obterTarefas(){
            const tarefasDb = localStorage['tarefas'];
            let listaTarefas = tarefasDb ? JSON.parse(tarefasDb) : [];

            /**filtrar */
            listaTarefas = listaTarefas.filter(
                t => t.nome.toLowerCase().indexOf(filtroTarefa.toLowerCase()) >= 0
            );

            /**ordernar */
            if(ordenarAsc){
                listaTarefas.sort( (t1, t2) => (t1.nome.toLowerCase() > t2.nome.toLowerCase()) ? 1 : -1 );
            }else if(ordenarDesc){
                listaTarefas.sort( (t1, t2) => (t1.nome.toLowerCase() < t2.nome.toLowerCase()) ? 1 : -1 );
            }
            
            /**PAGINAR */
            setTotalItems(listaTarefas.length);
            //começa na posicao array 0
            setTarefas(listaTarefas.splice((paginaAtual-1) * ITENS_POR_PAG, ITENS_POR_PAG));
            
        }
        //se nao for carregado, carregue!!
        if(carregarTarefas){
            obterTarefas();
            setCarregarTarefas(false);
        }
    }, [carregarTarefas, paginaAtual, ordenarAsc, ordenarDesc, filtroTarefa]); //vai ficar escutando também o página atual
    //seja chamado apenas qdo algum state trabalhe com ele, qdo esse
    //estado seja alterado


    function handleMudarPagina(pagina){
        setPaginaAtual(pagina);
        setCarregarTarefas(true);
    }


    function handleOrdenar(event){
        ///sempre q clicar no link de tarefas, atualiza a ordenacao e chama o setCarregarTarefas
        event.preventDefault(); //só utilizar o comportamento do click
        if(!ordenarAsc && !ordenarDesc){
            setOrdernarAsc(true);
            setOrdernarDesc(false);
        }else if(ordenarAsc){
            setOrdernarAsc(false);
            setOrdernarDesc(true);
        }else{
            setOrdernarAsc(false);
            setOrdernarDesc(false);
        }
        setCarregarTarefas(true);
    }


    function handleFiltrar(event){
        setFiltroTarefa(event.target.value);
        setCarregarTarefas(true);
    }
    return (
        
        <div className="text-center">
            <h3>Tarefas a fazer</h3>
            <Table striped bordered hover responsive data-testid="tabela">
                <thead>
                    <tr>
                        <th>
                            <a href="/"  onClick={handleOrdenar} >
                                Tarefa
                                &nbsp;
                                <Ordenacao ordenarAsc={ordenarAsc} 
                                    ordenarDesc={ordenarDesc}
                                />
                            </a>
                        </th>
                        <th><A href="/cadastrar" className="btn btn-success btn-sm" data-testid="btn-nova-tarefa">
                                <FontAwesomeIcon icon={faPlus} />
                                &nbsp;
                                Nova Tarefa
                            </A>
                         </th>
                    </tr>
                    <tr>
                        <th>
                            <Form.Control type="text"
                                value={filtroTarefa}
                                onChange={handleFiltrar}
                                data-testid="txt-tarefa" 
                                className="filtro-tarefa"
                                />
                        </th>
                        <th>
                            &nbsp;
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <ItensListaTarefas tarefas={tarefas} recarregarTarefas={setCarregarTarefas}/>
                </tbody>
            </Table>


            <Paginacao 
                totalItems={totalItems}
                itemsPorPagina={ITENS_POR_PAG}
                paginaAtual={paginaAtual}
                mudarPagina={handleMudarPagina}
            />

        </div>
        
    );
}


export default ListarTarefas;