import { useState } from 'react';
import './App.css'
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://infoweb-api.vercel.app'
})

const AppNavBar = (props : any) => {
  const TratarClique = (e: any) => {
    props.setCarregando(false)
    api.get('/uf')
      .then((resposta) => resposta.data.data)
      .then((json) => props.mudar(json))
  }
  return (
  <div className='card'>
  <h1>Título da aplicação</h1>
  {
    props.carregando && (<button onClick={TratarClique}>Atualizar lista de UFs</button>)
  }
  </div>
  )
}

const AppUFLista = (props : any) => {
  return (
  <div className='card'>
    <ul style={{listStyle : 'none'}}>
      {props.dados.map(
        (item : any) => (
          <button 
          key={item.sigla}
          onClick={(e) => props.mudar(item)}>
            {item.sigla}
          </button>
        )
      )}
    </ul>
  </div>
  )
}

const AppUFDetalhe = (props : any) => {
  
  return (
    <div className='card'>
      <p>{props.dados.sigla}</p>
      <p>{props.dados.nome}</p>
    </div>
  )
}

function App() {
  const [uf, setUf] = useState({
    sigla:'',
    nome:''
  })
  const [ufs, setUfs] = useState([])
  const [carregando, setCarregando] = useState(true)

  return (
    <>
    <AppNavBar mudar={setUfs} carregando={carregando} setCarregando={setCarregando}/>
    <AppUFDetalhe dados={uf}/>
    <AppUFLista dados={ufs} mudar={setUf}/>
    </>
  )
}

export default App
