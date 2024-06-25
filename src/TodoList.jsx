
import React from 'react';
import './index.css'
import { useState } from "react";
import Icone from './assets/black.png';

export default function TodoList() {

    const [lista, setLista] = useState([]);
    const [novoItem, setNovoItem] = useState();

    function adicionaItem(form) {
        form.preventDefault();
        if (!novoItem) {
            return;
        }
        setLista([...lista, {text: novoItem, isCompleted: false }]);
        setNovoItem();
        document.getElementById('#input-entrada').focus();

    }

    function clicou(index) {
        const listaAux = [...lista];
        listaAux[index].isCompleted = !listaAux[index].isCompleted;
        setLista(listaAux);
    }

    function deleta(index) {
        const listaAux = [...lista];
        listaAux.splice(index, 1);
        setLista(listaAux);
    }

    function deletarTodos() {
        setLista([]);
    }

    let nome;
    

    return (
        <div className="w-full h-screen justify-center flex flex-col space-y-4 items-center bg-neutral-950">
            <h1 className="h-[50px] font-bold mt-5 text-3xl text-neutral-50">Bem-vindo ao <span className="bg-yellow-400 p-2 rounded-b-[20px] rounded-l-[20px] text-neutral-950">TODO</span> </h1>

            <form className="flex relative top-2 items-center justify-center w-[400px] bg-neutral-950" action="" onSubmit={adicionaItem}>

                <input id="input-entrada" className="outline-none h-[40px] rounded-s-[10px] border-yellow-400 border-2 p-2 w-[400px] placeholder:text-neutral-500 text-neutral-50 bg-neutral-950" type="text" placeholder="O'que você irá fazer hoje?" value={novoItem} onChange={(e) => {setNovoItem(e.target.value)}} />

                <button className="bg-yellow-400 h-[40px] p-2 rounded-e-[10px] text-neutral-950" type="submit" >Adicionar</button>
            </form>
            <div className="border-neutral-800 relative top-4 p-2 border-2 rounded-[10px] w-[400px] flex flex-col items-center space-y-4">
            {lista.length < 1 ? 
                <img src={Icone} className='blur-[4px]' alt="Ícone" /> 
                : 
                lista.map((item, index) => (
                    <div 
                        key={index} 
                        className={`w-full flex p-2 border-neutral-800 border-b-2 text-neutral-100 justify-between items-center ${item.isCompleted ? 'item completo' : 'item'}`}
                        
                    >
                        <span className={item.isCompleted ? 'line-through text-neutral-100' : ''} onClick={() => {clicou(index)}} >{item.text}</span>
                        <button className="text-red-600 border-2 p-2 border-red-600 z-10 rounded-[10px] hover:bg-red-600 hover:text-white ease transition-all" onClick={() => {deleta(index)}}>Excluir</button>
                    </div>
                ))
            }
                {
                    lista.length < 1 ? <h1 className='flex text-neutral-50 items-center relative bottom-5  space-x-2'><span>CRIE UMA NOVA TAREFA</span> <span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide relative top-[1px] text-yellow-400 lucide-circle-alert"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg></span></h1> : <button className="w-[80%] bg-red-300 h-[40px] rounded-[5px] border-2 border-red-400 text-red-600" onClick={() => {deletarTodos()}}>Deletar todas as tarefas</button>
                }
            </div>
        </div>
    )
}