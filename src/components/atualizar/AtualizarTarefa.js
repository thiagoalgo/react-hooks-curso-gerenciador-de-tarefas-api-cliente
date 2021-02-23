import PropTypes from 'prop-types'
import { Jumbotron, Form, Modal, Button } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { navigate, A } from 'hookrouter'

function AtualizarTarefa(props) {

  const [exibirModal, setExibirModal] = useState(false)
  const [tarefa, setTarefa] = useState('')
  const [formValidado, setFormValidado] = useState(false)
  const [carregarTarefa, setCarregarTarefa] = useState(true)

  function handleTarefa(event) {
    setTarefa(event.target.value)
  }

  function handleFecharModal() {
    navigate('/')
  }

  function atualizar(event) {
    event.preventDefault()
    setFormValidado(true)
    if (event.currentTarget.checkValidity() === true) {
      const tarefasDb = localStorage['tarefas']
      let tarefas = tarefasDb ? JSON.parse(tarefasDb) : []
      tarefas = tarefas.map(t => {
        if (t.id === parseInt(props.id)) {
          t.nome = tarefa
        }
        return t
      })
      localStorage['tarefas'] = JSON.stringify(tarefas)
      setExibirModal(true)
    }
  }

  useEffect(() => {
    function obterTarefa() {
      const tarefasDb = localStorage['tarefas']
      const tarefas = tarefasDb ? JSON.parse(tarefasDb) : []
      const tarefaAtual = tarefas.find(t => t.id === parseInt(props.id))
      setTarefa(tarefaAtual.nome)
    }
    if (carregarTarefa) {
      obterTarefa()
      setCarregarTarefa(false)
    }
  }, [carregarTarefa, props])

  return (
    <div>
      <h1 className='text-center'>AtualizarTarefa</h1>
      <Jumbotron>
        <Form
          validated={formValidado}
          noValidate
          onSubmit={atualizar}>
          <Form.Group>
            <Form.Label>Tarefa</Form.Label>
            <Form.Control
              type='text'
              minLength='5'
              maxLength='100'
              required
              placeholder='Descrição da Tarefa'
              value={tarefa}
              onChange={handleTarefa}
              data-testid='txt-tarefa' />
            <Form.Control.Feedback type='invalid'>
              A tarefa deve conter entre 5 e 100 caracters
          </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='text-center'>
            <Button
              variant='success'
              type='submit'
              data-testid='btn-atualizar'>
              Salvar
            </Button>
            &nbsp;
            <A href='/'
              className='btn btn-light'>
              Cancelar
              </A>
          </Form.Group>
        </Form>
        <Modal
          show={exibirModal}
          onHide={handleFecharModal}
          data-testid='modal'>
          <Modal.Header closeButton>
            <Modal.Title>Sucesso</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Tarefa alterada com sucesso
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={handleFecharModal}>Fechar</Button>
          </Modal.Footer>
        </Modal>
      </Jumbotron>
    </div>
  )
}

AtualizarTarefa.propTypes = {
  id: PropTypes.number.isRequired
}

export default AtualizarTarefa