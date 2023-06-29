import { useState } from "react";
import './App.css'
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://infoweb-api.vercel.app/uf'
})

const AppNavBar = () => {
  return (
  <h1>Título da aplicação</h1>
  )
}

const AppUFLista = () => {
  const listaUfs = [
    {nome:'São Paulo', sigla:'SP'},
    {nome:'Rio Grande do Norte', sigla:'RN'},
    {nome:'Amazonas', sigla:'AM'},
    {nome:'Alagoas', sigla:'AL'},
    {nome:'Paraíba', sigla:'PB'}
  ]
  return (
  <div classNome='card'>
    <ul>
    {listaUfs.map( (unid : string, index: number) => {
      return <li key={index}>{unid.sigla}</li>
    }
    )}
    </ul>
  </div>
  )
}

const AppUFDetalhe = (props:any) => {
  return (
    <p>{props.sigla} | {props.nome}</p>
  )
}

function App() {
  const [listaUfs,setListaUfs] = useState([])
  const [uf, setUf] = useState({})

  const tratarClique = () => {
    api.get('uf').then((response) => {
      const lista = response.data.map((item:any => item.sigla))
    })
  }

  return (
    <>
    <AppNavBar />
    <AppUFDetalhe sigla = {uf.sigla} nome = {uf.nome}/>
    <AppUFLista />
    </>
  )
}

export default App
