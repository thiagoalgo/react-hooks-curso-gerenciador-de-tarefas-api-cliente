import PropTypes from 'prop-types'
import { Jumbotron, Form, Modal, Button } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { navigate, A } from 'hookrouter'
import Tarefa from '../../models/Tarefa'
import axios from 'axios'

function AtualizarTarefa(props) {
  const API_URL_ATUALIZAR_TAREFAS = 'http://localhost:3001/gerenciador-tarefas'

  const [exibirModal, setExibirModal] = useState(false)
  const [exibirModalErro, setExibirModalErro] = useState(false)
  const [tarefa, setTarefa] = useState('')
  const [formValidado, setFormValidado] = useState(false)
  const [carregarTarefa, setCarregarTarefa] = useState(true)

  function handleTarefa(event) {
    setTarefa(event.target.value)
  }

  function handleFecharModal() {
    navigate('/')
  }

  function handleFecharModalErro() {
    setExibirModalErro(false)
  }

  async function atualizar(event) {
    event.preventDefault()
    setFormValidado(true)
    if (event.currentTarget.checkValidity() === true) {
      try {
        await axios.put(
          API_URL_ATUALIZAR_TAREFAS + '/' + props.id,
          new Tarefa(null, tarefa, false))
        setExibirModal(true)
      } catch (error) {
        setExibirModalErro(true)
        console.log(error)
      }
    }
  }

  useEffect(() => {
    async function obterTarefa() {
      try {
        let {data} = await axios.get(API_URL_ATUALIZAR_TAREFAS + '/' + props.id)
        setTarefa(data.nome)
      } catch (error) {
        navigate('/')
        console.log(error);
      }
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
        <Modal
          show={exibirModalErro}
          onHide={handleFecharModalErro}
          data-testid='modalErro'>
          <Modal.Header closeButton>
            <Modal.Title>Erro</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Erro ao atualizar tarefa
          </Modal.Body>
          <Modal.Footer>
            <Button variant="warning" onClick={handleFecharModalErro}>Fechar</Button>
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