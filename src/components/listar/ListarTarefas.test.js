import ListarTarefas from './ListarTarefas'
import Tarefa from '../../models/Tarefa'
import { render, fireEvent } from '@testing-library/react'
import axiosMock from 'axios'

describe('Testa o componente de Listar Tarefas', () => {

  const nomePrimeiraTarefa = 'Primeira tarefa'
  const nomeSegundaTarefa = 'Segunda tarefa'
  const nomeTerceiraTarefa = 'Terceira tarefa'

  const listaTarefas = {
    totalItens: 3,
    pagina: 1,
    tarefas: [
      new Tarefa(1, nomePrimeiraTarefa, false),
      new Tarefa(2, nomeSegundaTarefa, false),
      new Tarefa(3, nomeTerceiraTarefa, false),
    ]
  }

  it('deve exibir as 3 tarefas na tabela', async () => {
    axiosMock.get.mockResolvedValueOnce({ data: listaTarefas })

    const { findByTestId } = render(<ListarTarefas />)
    const tabela = await findByTestId('tabela')
    expect(tabela).toHaveTextContent(nomePrimeiraTarefa)
    expect(tabela).toHaveTextContent(nomeSegundaTarefa)
    expect(tabela).toHaveTextContent(nomeTerceiraTarefa)
  })

  it('deve testar o filtro das tarefas', async () => {
    axiosMock.get.mockResolvedValueOnce({ data: listaTarefas })
    axiosMock.get.mockResolvedValueOnce({
      data: {
        totalItens: 3,
        pagina: 1,
        tarefas: [new Tarefa(1, nomePrimeiraTarefa, false)]
      }
    })

    const { findByTestId } = render(<ListarTarefas />)
    fireEvent.change(await findByTestId('txt-tarefa'), { target: { value: nomePrimeiraTarefa } })
    const tabela = await findByTestId('tabela')
    expect(tabela).toHaveTextContent(nomePrimeiraTarefa)
    expect(tabela).not.toHaveTextContent(nomeSegundaTarefa)
    expect(tabela).not.toHaveTextContent(nomeTerceiraTarefa)
  })
})