import React from 'react'
import ReactDOM from 'react-dom'
import CadastrarTarefa from './CadastrarTarefa'
import { render, fireEvent } from '@testing-library/react'
import axiosMock from 'axios'

describe.skip('Testa o componente de Cadastro de Tarefas', () => {
  it('deve cadastrar uma nova tarefa', async () => {
    const { getByTestId, findByTestId } = render(<CadastrarTarefa/>)
    fireEvent.change(getByTestId('txt-tarefa'), {target: {value: 'Nova tarefa teste'}})
    fireEvent.click(getByTestId('btn-cadastrar')) // usa a chamada de post padrão do arquivo de mock
    const modal = findByTestId('modal')
    expect(modal).toHaveTextContent('Sucesso')
    expect(modal).toHaveTextContent('Tarefa cadastrada com sucesso')
  })
})