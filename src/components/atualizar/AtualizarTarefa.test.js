import React from 'react'
import ReactDOM from 'react-dom'
import AtualizarTarefa from './AtualizarTarefa'

describe('Testa o componente de Atualização Tarefas', () => {
  test('deve renderizar o componente sem erros', () => {
    const div = document.createElement('div')
    ReactDOM.render(<AtualizarTarefa id={1}/>, div)
    ReactDOM.unmountComponentAtNode(div)
  });
})