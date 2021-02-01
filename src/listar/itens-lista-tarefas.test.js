import React  from 'react';
import ReactDOM from 'react-dom';
import ItensLIstaTarefas from './itens-lista-tarefas';
import Tarefa from '../models/tarefa.model';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';


describe('Teste do componente que exibe um item da listagem de tarefas', () => {

    const nomeTarefa = 'Tarefa';
    const tarefa = new Tarefa(1, nomeTarefa, false);
    const tarefaConcluida = new Tarefa(2, nomeTarefa, true);

    it('deve renderizar o component sem erros', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <ItensLIstaTarefas tarefas={[]} recarregarTarefas={() =>false}  />, div
        );


        ReactDOM.unmountComponentAtNode(div);
    });


    it('deve  exibir a tarefa', () => {
        const  {getByTestId} = render(
            <table>
                <tbody>
                    <ItensLIstaTarefas tarefas={[tarefa]}
                        recarregarTarefas={() => false} />
                </tbody>
            </table>
        );
        
        
        expect(getByTestId('tarefa')).toHaveTextContent(nomeTarefa);
    });

    it('deve  exibir a tarefa concluida', () => {
        const  {getByTestId} = render(
            <table>
                <tbody>
                    <ItensLIstaTarefas tarefas={[tarefaConcluida]}
                        recarregarTarefas={() => false} />
                </tbody>
            </table>
        );
        
        //tem que pegar o elemento textdecoration
        expect(getByTestId('nome-tarefa')).toHaveStyle('text-decoration: line-through');
    });

});


