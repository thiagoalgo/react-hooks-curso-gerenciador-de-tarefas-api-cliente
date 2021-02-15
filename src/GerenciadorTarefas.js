import './GerenciadorTarefas.css';
import {useRoutes} from 'hookrouter'
import ListarTarefas from './components/ListarTarefas'
import CadastrarTarefa from './components/CadastrarTarefa'
import AtualizarTarefa from './components/AtualizarTarefa'

const routes = {
  '/': () => <ListarTarefas/>,
  '/cadastrar': () => <CadastrarTarefa/>,
  '/atualizar/:id': ({id}) => <AtualizarTarefa id={id}/>
}

function GerenciadorTarefas() {
  return useRoutes(routes)
}

export default GerenciadorTarefas;
