import React from 'react'
import ReactDOM from 'react-dom'
import ExcluirTarefa from './ExcluirTarefa';
import Tarefa from '../../models/Tarefa'
import { render, fireEvent } from '@testing-library/react'
import axiosMock from 'axios';

describe('Testa o componente de Excluir Tarefa', () => {
  const nomeTarefa = 'Tarefa teste'
  const tarefa = new Tarefa(1, nomeTarefa, false)

  it('deve abrir o modal de confirmação', () => {
    const { getByTestId } = render(<ExcluirTarefa tarefa={tarefa} recarregarTarefas={() => { }} />)
    fireEvent.click(getByTestId('btn-abrir-modal'))
    expect(getByTestId('modal')).toHaveTextContent('Deseja realmente excluir a seguinte tarefa?')
    expect(getByTestId('modal')).toHaveTextContent(nomeTarefa)
  })

  it('deve excluir uma tarefa', async () => {
    const { getByTestId, findByTestId } = render(<ExcluirTarefa tarefa={tarefa} recarregarTarefas={() => { }} />)
    fireEvent.click(getByTestId('btn-abrir-modal'))
    fireEvent.click(getByTestId('btn-excluir'))
    await findByTestId('modal')
    expect(axiosMock.delete).toHaveBeenCalledTimes(1)
  })

})