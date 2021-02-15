import React from 'react'
import ReactDOM from 'react-dom'
import ListarTarefas from './ListarTarefas'

describe('Testa o componente de Listar Tarefas', () => {
  test('deve renderizar o componente sem erros', () => {
    const div = document.createElement('div')
    ReactDOM.render(<ListarTarefas />, div)
    ReactDOM.unmountComponentAtNode(div)
  });
})