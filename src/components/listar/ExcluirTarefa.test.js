import React from 'react'
import ReactDOM from 'react-dom'
import ExcluirTarefa from './ExcluirTarefa';
import Tarefa from '../../models/Tarefa'
import { render, fireEvent } from '@testing-library/react'


describe('Testa o componente de Excluir Tarefa', () => {
  const nomeTarefa = 'Tarefa teste'
  const tarefa = new Tarefa(1, nomeTarefa, false)

  test('deve renderizar o componente sem erros', () => {
    const div = document.createElement('div')
    ReactDOM.render(<ExcluirTarefa tarefa={tarefa} recarregarTarefas={() => {}}/>, div)
    ReactDOM.unmountComponentAtNode(div)
  });

  it('deve abrir o modal de confirmação', () => {
    const {getByTestId} = render(<ExcluirTarefa tarefa={tarefa} recarregarTarefas={() => {}}/>)
    fireEvent.click(getByTestId('btn-abrir-modal'))
    expect(getByTestId('modal')).toHaveTextContent('Deseja realmente excluir a seguinte tarefa?')
    expect(getByTestId('modal')).toHaveTextContent(nomeTarefa)
  })

  it('deve excluir uma tarefa', () => {
    localStorage['tarefas'] = JSON.stringify([tarefa])
    const {getByTestId} = render(<ExcluirTarefa tarefa={tarefa} recarregarTarefas={() => {}}/>)
    fireEvent.click(getByTestId('btn-abrir-modal'))
    fireEvent.click(getByTestId('btn-excluir'))
    const tarefasDb = JSON.parse(localStorage['tarefas'])
    expect(tarefasDb.length).toBe(0)
  })

})