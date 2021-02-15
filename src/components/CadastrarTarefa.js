import { Jumbotron, Form, Modal, Button } from 'react-bootstrap'
import { useState } from 'react'
import { A } from 'hookrouter'

function CadastrarTarefa() {

  const [exibirModal, setExibirModal] = useState(false)
  const [tarefa, setTarefa] = useState('')
  const [formValidado, setFormValidado] = useState(false)

  function handleTarefa(event) {
    setTarefa(event.target.value)
  }

  function handleFecharModal() {
    setExibirModal(false)
  }

  function cadastrar() {
    
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
              onChange={handleTarefa} />
          </Form.Group>
          <Form.Control.Feedback type='invalid'>
            A tarefa deve conter entre 5 e 100 caracters
          </Form.Control.Feedback>
          <Form.Group className='text-center'>
            <Button
              variant='success'
              type='submit'>
              Salvar
            </Button>
            &nbsp;
            <A href='/'
              className='btn btn-light'>
              Cancelar
              </A>
          </Form.Group>
        </Form>
        <Modal show={exibirModal} onHide={handleFecharModal}>
          <Modal.Header closeButton>
            <Modal.Title>Cadastrar Tarefa</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Tarefa cadastrada com sucesso
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={handleFecharModal}>Fechar</Button>
          </Modal.Footer>
        </Modal>
      </Jumbotron>
    </div>
  )
}

export default CadastrarTarefa