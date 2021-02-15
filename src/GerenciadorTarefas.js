import './GerenciadorTarefas.css';
import {useRoutes} from 'hookrouter'
import ListarTarefas from './components/listar/ListarTarefas'
import CadastrarTarefa from './components/cadastrar/CadastrarTarefa'
import AtualizarTarefa from './components/atualizar/AtualizarTarefa'

const routes = {
  '/': () => <ListarTarefas/>,
  '/cadastrar': () => <CadastrarTarefa/>,
  '/atualizar/:id': ({id}) => <AtualizarTarefa id={id}/>
}

function GerenciadorTarefas() {
  return useRoutes(routes)
}

export default GerenciadorTarefas;
