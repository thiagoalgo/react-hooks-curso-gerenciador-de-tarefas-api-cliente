import React from 'react'
import ReactDOM from 'react-dom'
import GerenciadorTarefas from './GerenciadorTarefas'

describe('Testa a aplicação Gerenciador de Tarefas', () => {
  test('deve renderizar a aplicação sem erros', () => {
    const div = document.createElement('div')
    ReactDOM.render(<GerenciadorTarefas />, div)
    ReactDOM.unmountComponentAtNode(div)
  });
})