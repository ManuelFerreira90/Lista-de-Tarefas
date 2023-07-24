/* imports */
import * as help from './modules/functions.js';

/* cadastrando tarefa */
let btnnewtask = document.querySelector('#btn');
let test;
btnnewtask.addEventListener('click', function(event){
    event.preventDefault();
    help.add();
});

/* enviar tarefas com enter */
let input = document.querySelector('#input-tasks');
input.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        help.add();
    }
}); 



