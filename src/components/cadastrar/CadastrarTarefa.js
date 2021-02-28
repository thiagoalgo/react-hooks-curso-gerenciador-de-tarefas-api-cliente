import { Jumbotron, Form, Modal, Button } from 'react-bootstrap'
import { useState } from 'react'
import { navigate, A } from 'hookrouter'
import Tarefa from '../../models/Tarefa'
import axios from 'axios'

function CadastrarTarefa() {
  const API_URL_CADASTRAR_TAREFAS = 'http://localhost:3001/gerenciador-tarefas'

  const [exibirModal, setExibirModal] = useState(false)
  const [exibirModalErro, setExibirModalErro] = useState(false)
  const [tarefa, setTarefa] = useState('')
  const [formValidado, setFormValidado] = useState(false)

  function handleTarefa(event) {
    setTarefa(event.target.value)
  }

  function handleFecharModal() {
    navigate('/')
  }

  function handleFecharModalErro() {
    setExibirModalErro(false)
  }

  async function cadastrar(event) {
    event.preventDefault()
    setFormValidado(true)
    if (event.currentTarget.checkValidity() === true) {
      try {
        await axios.post(
          API_URL_CADASTRAR_TAREFAS,
          new Tarefa(null, tarefa, false))
        setExibirModal(true)
      } catch (error) {
        setExibirModalErro(true)
        console.log(error)
      }
    }
  }

  return (
    <div>
      <h1 className='text-center'>CadastrarTarefa</h1>
      <Jumbotron>
        <Form
          validated={formValidado}
          noValidate
          onSubmit={cadastrar}>
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
              data-testid='btn-cadastrar'>
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
            Tarefa cadastrada com sucesso
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={handleFecharModal}>Fechar</Button>
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
            Erro ao cadastrar tarefa
          </Modal.Body>
          <Modal.Footer>
            <Button variant="warning" onClick={handleFecharModalErro}>Fechar</Button>
          </Modal.Footer>
        </Modal>
      </Jumbotron>
    </div>
  )
}

export default CadastrarTarefa