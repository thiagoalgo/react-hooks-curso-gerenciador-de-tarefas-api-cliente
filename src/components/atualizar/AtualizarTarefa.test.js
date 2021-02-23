import React from 'react'
import ReactDOM from 'react-dom'
import AtualizarTarefa from './AtualizarTarefa'
import Tarefa from '../../models/Tarefa'
import { render, fireEvent } from '@testing-library/react'

describe('Testa o componente de Atualização Tarefas', () => {

  const tarefaId = 1
  const tarefa = new Tarefa(tarefaId, 'Nova tarefa', false)

  beforeEach(() => {
    localStorage['tarefas'] = JSON.stringify([tarefa])
  })

  test('deve renderizar o componente sem erros', () => {
    const div = document.createElement('div')
    ReactDOM.render(<AtualizarTarefa id={tarefaId}/>, div)
    ReactDOM.unmountComponentAtNode(div)
  });

  it('deve exibir o modal de sucesso ao atualizar uma tarefa', () => {
    const { getByTestId } = render(<AtualizarTarefa id={tarefaId}/>)
    fireEvent.change(getByTestId('txt-tarefa'), {target: {value: 'Nova tarefa atualizada'}})
    fireEvent.click(getByTestId('btn-atualizar'))
    expect(getByTestId('modal')).toHaveTextContent('Sucesso')
    expect(getByTestId('modal')).toHaveTextContent('Tarefa alterada com sucesso')
  })

  it('deve atualizar uma tarefa', () => {
    const nomeTarefaAtualizada = 'Tarefa Atualizada'
    const { getByTestId } = render(<AtualizarTarefa id={tarefaId}/>)
    fireEvent.change(getByTestId('txt-tarefa'), {target: {value: nomeTarefaAtualizada}})
    fireEvent.click(getByTestId('btn-atualizar'))
    const tarefasDb = JSON.parse(localStorage['tarefas'])
    expect(tarefasDb[0].nome).toBe(nomeTarefaAtualizada)
  })
})