/* verificando ações botão de enviar tarefa */
let btnnewtask = document.querySelector('#btn');
btnnewtask.addEventListener('click', function(event){
    event.preventDefault();
    add();
});

/* contagem das tarefas */
let acont = 0;

/* função para gerar um nova tarefa e salvar no local storage */
function add() {

    /* recuperando tarefa do campo entrada */
    const task_text = document.querySelector('#input-tasks').value;

    /* verificando tarefas vazias */
    if(task_text){

        /* acont para  enumerar as tarefas*/
        const contStr = localStorage.getItem('acont');
        if (contStr !== null) {

            /* tranfosrmando em inteiro */
            acont = parseInt(contStr);
        } 
        /* salvando tarefa */
        localStorage.setItem('task_text' + acont, task_text);
        acont = acont + 1;

        /* salvando contagem de tarefas*/
        localStorage.setItem('acont', acont);

        /* limpando campo de entrada */
        document.querySelector('#input-tasks').value = "";
    }

}

/* função que ajuda na criação do menu para mobile */
const btn_mobile = document.querySelector('.btn-mobile');
btn_mobile.addEventListener('click', function(event){
    event.preventDefault();

    const nav = document.querySelector('nav');
    const footer = document.querySelector('#home');
    const main = document.querySelector('main');

    /* adiciona classe ativo caso botão para expansão do menu seja pressionado */
    nav.classList.toggle('active');
    if (nav.classList.contains('active')) {
        /* esconde campo para melhor exibição do menu */
        footer.style.marginTop = '0';
        main.classList.add('hide');
    }
    else {
        /* volta ao normal quando menu é fechado */
        main.classList.remove('hide');
        footer.style.marginTop = '36em';
    }
});



