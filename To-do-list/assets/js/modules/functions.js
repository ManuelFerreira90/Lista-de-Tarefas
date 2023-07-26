let conts = 0;
window.addEventListener('load', function(event){
    event.preventDefault();
    if(conts == 0){
        load();
        conts += 1;
    }
});

function load() {

    /* lista onde ficam as novas tarefas */
    const list0 = document.querySelector("#to-do-list");

    /* lista onde ficam as tarefas completadas */
    const list1 = document.querySelector('#to-do-list-complet');

    /* carregando todas as tarefas salvas */
    for (let i = 0; i < localStorage.length; i++) {
        const chave = localStorage.key(i);
        const valor = localStorage.getItem(chave); 

        /* carregando tarefas à concluir */
        if(chave[0] === 't'){ /* 't' incluído no inicio para identificação da tarefa */
            addnewtask(valor, list0, list1);
        }

        /* carregando tarefas concluídas */
        else if(chave[0] === 'c'){ /* 'c' incluído no inicio para identificação da tarefa */
            addoldtask(valor, list1)
        }
    }
}

function addnewtask(task, list0 , list1) {

    /* clonando template de tarefas */
    const template = document.querySelector(".template");
    const newtask = template.cloneNode(true);

    /* usado para informar caso haja conclusão de uma tarefa*/
    let convertion = false;

    /* adicionando a task ao novo template */
    newtask.querySelector(".tasks-name").textContent = task;

    /* removendo hide */
    newtask.classList.remove("template");
    newtask.classList.remove("hide");
    list0.appendChild(newtask);

    /* remover tag li*/
    const remove = newtask.querySelector('.remove-btn');
    remove.addEventListener('click', function () {

        /* aux usado para encontrar a tag li do elemento */
        const aux = this.parentNode.parentNode;
        const spanElement = aux.querySelector('span');
        const textoDoSpan = spanElement.textContent;

        /* '0' para informar a função delete quem vai remover 
            tarefas concluídas ou as não concluídas */
        dlt(aux, textoDoSpan, convertion, '0');
    });

    /* tarefa concluída */
    const completed = newtask.querySelector('.s');
    completed.addEventListener('click', function () {

        /* aux usado para encontrar a tag li do elemento */
        const aux1 = this.parentNode.parentNode;
        const spanElement1 = aux1.querySelector('span');
        const task_text = spanElement1.textContent;

        /* convertion true, pois botão de concluído foi ativo */
        convertion = true;

        /* deletar tarefa para ser adicionada novamente no campo complet */
        dlt(aux1, task_text, convertion);

        /* adicionar no campo complete a tarefa concluída */
        addoldtask(task_text, list1, convertion);

        /* acessando contagem de tarefas */
        let acont = parseInt(localStorage.getItem('acont'));

        /* acessando tarefa para converte-lá */
        for (let i = 0; i < localStorage.length; i++) {
            const chave = localStorage.key(i);
            const valor = localStorage.getItem(chave);

            if (valor == task_text && chave[0] == 't') {
                
                /* salvando índice da tarefa para atribuir à depois de convertida*/
                const tam = chave.length;
                /* diminindo '9' para acessar somente o índice */
                const auxtam = tam - 9;
                /* índice acessado */
                const textaux = chave.slice(tam - auxtam);

                /* salvando a tarefa convertida */
                localStorage.removeItem(chave);
                localStorage.setItem('ctask_text' + textaux, task_text);
                break;
            }
        }
    });
}

/* adicionando ao complet tarefas concluídas */
function addoldtask(task, list, convertion) { 

    /* clonando template da lista */
    const template1 = document.querySelector('.template1');
    const completedtask = template1.cloneNode(true);
    completedtask.querySelector(".textdone").textContent = task;

    /* removendo hide */
    completedtask.classList.remove("template1");
    completedtask.classList.remove("hide");
    list.appendChild(completedtask);

    /* remover lista */
    const remove = completedtask.querySelector('.remove-btn1');
    remove.addEventListener('click', function () {
        const aux = this.parentNode;
        const spanElement = aux.querySelector('span');
        const textoDoSpan = spanElement.textContent;
        convertion = false;
        dlt(aux, textoDoSpan, convertion, '1');
    });
}

/* deletar tarefas não concluídas */
function dlt(li_task, text, convertion, confirm) {
    li_task.remove();

    for (let i = 0; i < localStorage.length; i++) {
        const chave = localStorage.key(i);
        const valor = localStorage.getItem(chave);

        /* to do somente remove suas tarefas */
        if(valor == text && confirm == '0' && chave[0] == 't'){
            localStorage.removeItem(chave);
            break;
        }

        /* complet somente remove suas tarefas */
        else if(valor == text && confirm == '1' && chave[0] == 'c'){
            localStorage.removeItem(chave);
            break;
        }
    } 

    /* caso não haja uma conversão de tarefa, seu índice é decrementado */
    if(!convertion){
        let acont = 0;
        const contStr = localStorage.getItem('acont');
        if (contStr !== null) {
            acont = parseInt(contStr);
        } 
        acont = acont - 1;
        localStorage.setItem('acont', acont);   
    }
}

/* função que ajuda na criação do menu para mobile */
const btn_mobile = document.querySelector('.btn-mobile');
btn_mobile.addEventListener('click', function(event){
    event.preventDefault();

    const nav = document.querySelector('nav');
    const footer = document.querySelector('#to-do-footer');
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
        footer.style.marginTop = '51em';
    }
});