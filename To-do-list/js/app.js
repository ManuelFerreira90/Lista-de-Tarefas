/* imports */
import * as help from './modules/functions.js';

/* cadastrando tarefa */
let btnnewtask = document.querySelector('#btn');
btnnewtask.addEventListener('click', function(event){
    event.preventDefault();
    help.addnewtask();
});





