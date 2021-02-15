import React from 'react'
import ReactDOM from 'react-dom'
import CadastrarTarefa from './CadastrarTarefa'
import { render, fireEvent } from '@testing-library/react'

describe('Testa o componente de Cadastro de Tarefas', () => {
  it('deve renderizar o componente sem erros', () => {
    const div = document.createElement('div')
    ReactDOM.render(<CadastrarTarefa />, div)
    ReactDOM.unmountComponentAtNode(div)
  });

  it('deve cadastrar uma nova tarefa', () => {
    const { getByTestId } = render(<CadastrarTarefa/>)
    fireEvent.change(getByTestId('txt-tarefa', {target: {value: 'Nova tarefa teste'}}))
    fireEvent.click(getByTestId('btn-cadastrar'))
    //expect(getByTestId('modal')).toHaveTextContent('Sucesso')
    //expect(getByTestId('modal')).toHaveTextContent('Tarefa cadastrada com sucesso')
  })
})