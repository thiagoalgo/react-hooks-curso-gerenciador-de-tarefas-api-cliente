import PropTypes from 'prop-types'
import { Button, Modal } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboardCheck } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

function ConcluirTarefa(props) {

  const [exibirModal, setExibirModal] = useState(false)

  function handleAbrirModal(event) {
    event.preventDefault()
    setExibirModal(true)
  }

  function handleFecharModal(event) {
    event.preventDefault()
    setExibirModal(false)
  }

  function handleConcluir() {
    const tarefasDb = localStorage['tarefas']
    let tarefas = tarefasDb ? JSON.parse(tarefasDb) : null
    
    tarefas = tarefas.map(t => {
      if (t.id === props.tarefa.id) {
        t.concluida = true
      }
      return t
    })
    localStorage['tarefas'] = JSON.stringify(tarefas)
    setExibirModal(false)
    props.recarregarTarefas(true)
  }

  return (
    <span className={props.className}>
      <Button
        className='btn btn-sm'
        onClick={handleAbrirModal}
        data-testid="btn-abrir-modal">
        <FontAwesomeIcon icon={faClipboardCheck} />
      </Button>
      <Modal
        show={exibirModal}
        onHide={handleFecharModal}
        data-testid='modal'>
        <Modal.Header closeButton>
          <Modal.Title>Confirmação</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Deseja realmente concluir a seguinte tarefa?
          <br/>
          <strong>{props.tarefa.nome}</strong>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            onClick={handleConcluir}
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

ConcluirTarefa.propTypes = {
  tarefa: PropTypes.object.isRequired,
  recarregarTarefas: PropTypes.func.isRequired,
  className: PropTypes.string
}

export default ConcluirTarefa