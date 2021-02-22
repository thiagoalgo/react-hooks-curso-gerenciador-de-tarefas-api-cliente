import React from 'react'
import ReactDOM from 'react-dom'
import Paginacao from './Paginacao'
import { render } from '@testing-library/react'


describe('Testa o componente de Paginacao', () => {
  test('deve renderizar o componente sem erros', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Paginacao totalItens='123' paginaAtual='17' itensPorPagina='3' mudarPagina={() => {}}/>, div)
    ReactDOM.unmountComponentAtNode(div)
  });

  it('deve exibir a paginação contendo 3 paginas', () => {
    const { getByTestId } = render(<Paginacao totalItens='25' paginaAtual='1' itensPorPagina='3' mudarPagina={() => {}}/>)
    const paginacao = getByTestId('paginacao')
    expect(paginacao).toHaveTextContent('1')
    expect(paginacao).toHaveTextContent('2')
    expect(paginacao).toHaveTextContent('3')
  })
})