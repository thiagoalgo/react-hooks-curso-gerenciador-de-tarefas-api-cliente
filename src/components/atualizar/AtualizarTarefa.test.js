import React from 'react'
import ReactDOM from 'react-dom'
import AtualizarTarefa from './AtualizarTarefa'
import Tarefa from '../../models/Tarefa'
import { render, fireEvent } from '@testing-library/react'
import axiosMock from 'axios'

describe('Testa o componente de Atualização Tarefas', () => {

  const tarefaId = 1
  const tarefa = new Tarefa(tarefaId, 'Nova tarefa', false)

  it('deve exibir o modal de sucesso ao atualizar uma tarefa', async () => {
    axiosMock.get.mockResolvedValueOnce({ data: tarefa })
    const { getByTestId, findByTestId } = render(<AtualizarTarefa id={tarefaId} />)
    fireEvent.change(getByTestId('txt-tarefa'), { target: { value: 'Nova tarefa atualizada' } })
    fireEvent.click(getByTestId('btn-atualizar'))
    const modal = await findByTestId('modal')
    expect(modal).toHaveTextContent('Sucesso')
    expect(modal).toHaveTextContent('Tarefa alterada com sucesso')
  })
})