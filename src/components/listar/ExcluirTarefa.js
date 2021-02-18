import { Button, Modal } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { PropTypes } from 'prop-types'

function ExcluirTarefa(props) {

  const [exibirModal, setExibirModal] = useState(false)

  function handleFecharModal(event) {
    event.preventDefault()
    setExibirModal(false)
  }

  function handleAbrirModal(event) {
    event.preventDefault()
    setExibirModal(true)
  }

  function handleExcluir(event) {
    event.preventDefault()
    
    let tarefasDb = JSON.parse(localStorage['tarefas'])
    tarefasDb = tarefasDb.filter(t => {
      return t.id !== props.tarefa.id
    })
    localStorage['tarefas'] = JSON.stringify(tarefasDb)

    props.recarregarTarefas(true)
    setExibirModal(false)
  }

  return (
    <span>
      <Button
        variant='danger'
        className='btn btn-sm'
        onClick={handleAbrirModal}
        data-testid="btn-abrir-modal">
        <FontAwesomeIcon icon={faTrashAlt} />
      </Button>
      <Modal
        show={exibirModal}
        onHide={handleFecharModal}
        data-testid='modal'>
        <Modal.Header closeButton>
          <Modal.Title>Confirmação</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Deseja realmente excluir a seguinte tarefa?
          <br />
          <strong>{props.tarefa.nome}</strong>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            onClick={handleExcluir}
            data-testid="btn-concluir">
            Concluir
          </Button>
          <Button
            variant="light"
            onClick={handleFecharModal}
            data-testid="btn-fechar-modal">Cancelar</Button>
        </Modal.Footer>
      </Modal>
    </span>
  )
}

ExcluirTarefa.propTypes = {
  recarregarTarefas: PropTypes.func.isRequired,
  tarefa: PropTypes.object.isRequired
}

export default ExcluirTarefa