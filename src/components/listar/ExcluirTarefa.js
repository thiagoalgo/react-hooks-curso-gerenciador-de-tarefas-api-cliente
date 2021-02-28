import { Button, Modal } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { PropTypes } from 'prop-types'
import axios from 'axios'

function ExcluirTarefa(props) {
  const API_URL_ATUALIZAR_TAREFAS = 'http://localhost:3001/gerenciador-tarefas'

  const [exibirModal, setExibirModal] = useState(false)
  const [exibirModalErro, setExibirModalErro] = useState(false)

  function handleFecharModal(event) {
    event.preventDefault()
    setExibirModal(false)
  }

  function handleFecharModalErro(event) {
    event.preventDefault()
    setExibirModalErro(false)
  }

  function handleAbrirModal(event) {
    event.preventDefault()
    setExibirModal(true)
  }

  async function handleExcluir(event) {
    event.preventDefault()
    try {
      await axios.delete(API_URL_ATUALIZAR_TAREFAS + '/' + props.tarefa.id)
      props.recarregarTarefas(true)
      setExibirModal(false)
    } catch (error) {
      setExibirModalErro(true)
      console.log(error)
    }
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
            data-testid="btn-excluir">
            Excluir
          </Button>
          <Button
            variant="light"
            onClick={handleFecharModal}
            data-testid="btn-fechar-modal">Cancelar</Button>
        </Modal.Footer>
        <Modal
          show={exibirModalErro}
          onHide={handleFecharModalErro}
          data-testid='modalErro'>
          <Modal.Header closeButton>
            <Modal.Title>Erro</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Erro ao excluir tarefa
          </Modal.Body>
          <Modal.Footer>
            <Button variant="warning" onClick={handleFecharModalErro}>Fechar</Button>
          </Modal.Footer>
        </Modal>
      </Modal>
    </span>
  )
}

ExcluirTarefa.propTypes = {
  recarregarTarefas: PropTypes.func.isRequired,
  tarefa: PropTypes.object.isRequired
}

export default ExcluirTarefa