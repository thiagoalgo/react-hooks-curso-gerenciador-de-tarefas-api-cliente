import PropTypes from 'prop-types'
import { Button, Modal } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboardCheck } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import axios from 'axios'

function ConcluirTarefa(props) {
  const API_URL_ATUALIZAR_TAREFAS = 'http://localhost:3001/gerenciador-tarefas/:id/concluir'

  const [exibirModal, setExibirModal] = useState(false)
  const [exibirModalErro, setExibirModalErro] = useState(false)

  function handleAbrirModal(event) {
    event.preventDefault()
    setExibirModal(true)
  }

  function handleFecharModal(event) {
    event.preventDefault()
    setExibirModal(false)
  }

  function handleFecharModalErro(event) {
    event.preventDefault()
    setExibirModalErro(false)
  }

  async function handleConcluir() {
    try {
      await axios.put(API_URL_ATUALIZAR_TAREFAS.replace(':id', props.tarefa.id))
      setExibirModal(false)
      props.recarregarTarefas(true)
    } catch (error) {
      setExibirModalErro(true)
      console.log(error)
    }
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
      <Modal
          show={exibirModalErro}
          onHide={handleFecharModalErro}
          data-testid='modalErro'>
          <Modal.Header closeButton>
            <Modal.Title>Erro</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Erro ao concluir tarefa
          </Modal.Body>
          <Modal.Footer>
            <Button variant="warning" onClick={handleFecharModalErro}>Fechar</Button>
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