import React from 'react'
import ReactDOM from 'react-dom'
import ConcluirTarefa from './ConcluirTarefa';
import Tarefa from '../../models/Tarefa'
import { render, fireEvent } from '@testing-library/react'
import axiosMock from 'axios'

describe('Testa o componente de Concluir Tarefa', () => {
  const nomeTarefa = 'Tarefa teste'
  const tarefa = new Tarefa(1, nomeTarefa, false)

  it('deve abrir o modal de confirmação', () => {
    const {getByTestId} = render(<ConcluirTarefa tarefa={tarefa} recarregarTarefas={() => {}} className={null} />)
    fireEvent.click(getByTestId('btn-abrir-modal'))
    expect(getByTestId('modal')).toHaveTextContent('Deseja realmente concluir a seguinte tarefa?')
    expect(getByTestId('modal')).toHaveTextContent(nomeTarefa)
  })

  it('deve concluir uma tarefa', async () => {
    const {getByTestId, findByTestId} = render(<ConcluirTarefa tarefa={tarefa} recarregarTarefas={() => {}} className={null} />)
    fireEvent.click(getByTestId('btn-abrir-modal'))
    fireEvent.click(getByTestId('btn-concluir'))
    await findByTestId('modal')
    expect(axiosMock.put).toHaveBeenCalledTimes(1)
  })

})