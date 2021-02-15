function Tarefa(id, nome, concluida) {
  this.id = id
  this.nome = nome
  this.concluida = concluida

  return {
    id: this.id,
    nome: this.nome,
    concluida: this.concluida
  }
}

export default Tarefa