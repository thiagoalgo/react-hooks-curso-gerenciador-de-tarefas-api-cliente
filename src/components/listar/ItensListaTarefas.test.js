import React from 'react'
import ReactDOM from 'react-dom'
import ItensListaTarefas from './ItensListaTarefas'
import Tarefa from '../../models/Tarefa'
import { render, fireEvent } from '@testing-library/react'

describe('Testa o componente Itens de listar Tarefas', () => {
  const nomeTarefa = 'Tarefa'
  const tarefa = new Tarefa(1, nomeTarefa, false)
  const tarefaConcluida = new Tarefa(2, nomeTarefa, true)

  test('deve renderizar o componente sem erros', () => {
    const div = document.createElement('div')
    ReactDOM.render(<ItensListaTarefas tarefas={[]} recarregarTarefas={() => { }} />, div)
    ReactDOM.unmountComponentAtNode(div)
  });

  it('deve renderizar a tabela sem erros', () => {
    const { getByTestId } = render(
      <table>
        <tbody>
          <ItensListaTarefas tarefas={[tarefa]} recarregarTarefas={() => { }} />
        </tbody>
      </table>
    )
    expect(getByTestId('tarefa')).toHaveTextContent(nomeTarefa)
  })

  it('deve renderizar uma tarefa concluida', () => {
    const { getByTestId } = render(
      <table>
        <tbody>
          <ItensListaTarefas tarefas={[tarefaConcluida]} recarregarTarefas={() => { }} />
        </tbody>
      </table>
    )
    expect(getByTestId('nome-tarefa')).toHaveStyle('text-decoration: line-through')
  })
})