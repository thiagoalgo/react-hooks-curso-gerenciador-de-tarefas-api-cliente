import React from 'react'
import ReactDOM from 'react-dom'
import Ordenacao from './Ordenacao'
import { render } from '@testing-library/react'


describe('Testa o componente de Ordenacao', () => {
  test('deve renderizar o componente sem erros', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Ordenacao ordenarAsc={true} ordenarDesc={false}/>, div)
    ReactDOM.unmountComponentAtNode(div)
  });

  it('deve exibir o ícone de ordenação padrão', () =>{
    const { getByTestId } = render(<Ordenacao ordenarAsc={false} ordenarDesc={false}/>)
    expect(getByTestId('faSort')).not.toHaveClass('hidden')
    expect(getByTestId('faSortUp')).toHaveClass('hidden')
    expect(getByTestId('faSortDown')).toHaveClass('hidden')
  })

  it('deve exibir o ícone de ordenação ascendente', () =>{
    const { getByTestId } = render(<Ordenacao ordenarAsc={true} ordenarDesc={false}/>)
    expect(getByTestId('faSort')).toHaveClass('hidden')
    expect(getByTestId('faSortUp')).not.toHaveClass('hidden')
    expect(getByTestId('faSortDown')).toHaveClass('hidden')
  })

  it('deve exibir o ícone de ordenação descendente', () =>{
    const { getByTestId } = render(<Ordenacao ordenarAsc={false} ordenarDesc={true}/>)
    expect(getByTestId('faSort')).toHaveClass('hidden')
    expect(getByTestId('faSortUp')).toHaveClass('hidden')
    expect(getByTestId('faSortDown')).not.toHaveClass('hidden')
  })

  // it('deve exibir a paginação contendo 3 paginas', () => {
  //   const { getByTestId } = render(<Paginacao totalItens='25' paginaAtual='1' itensPorPagina='3' mudarPagina={() => {}}/>)
  //   const paginacao = getByTestId('paginacao')
  //   expect(paginacao).toHaveTextContent('1')
  //   expect(paginacao).toHaveTextContent('2')
  //   expect(paginacao).toHaveTextContent('3')
  // })
})