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

    for (let i = 0; i < localStorage.length; i++) {
        const chave = localStorage.key(i);
        const valor = localStorage.getItem(chave); 

        /* carregando tarefas à concluir */
        if(chave[0] === 't'){
            addnewtask(valor, list0, list1);
        }

        /* carregando tarefas concluídas */
        else if(chave[0] === 'c'){
            addoldtask(valor, list1)
        }
    }
}

function addnewtask(task, list0 , list1) {

    /* clonando template de tarefas */
    const template = document.querySelector(".template");
    const newtask = template.cloneNode(true);
    let convertion = false;
    /* adicionando a task ao novo template */
    newtask.querySelector(".tasks-name").textContent = task;

    /* removendo hide */
    newtask.classList.remove("template");
    newtask.classList.remove("hide");
    list0.appendChild(newtask);

    /* remover lista */
    const remove = newtask.querySelector('.remove-btn');
    remove.addEventListener('click', function () {
        const aux = this.parentNode.parentNode;
        const spanElement = aux.querySelector('span');
        const textoDoSpan = spanElement.textContent;
        dlt(aux, textoDoSpan, convertion, '0');
    });

    /* tarefa concluída */
    const completed = newtask.querySelector('.s');
    completed.addEventListener('click', function () {
        const aux1 = this.parentNode.parentNode;
        const spanElement1 = aux1.querySelector('span');
        const task_text = spanElement1.textContent;
        convertion = true;
        dlt(aux1, task_text, convertion);
        addoldtask(task_text, list1, convertion);

        let acont = parseInt(localStorage.getItem('acont'));

        for (let i = 0; i < localStorage.length; i++) {
            const chave = localStorage.key(i);
            const valor = localStorage.getItem(chave);

            if (valor == task_text) {
                const tam = chave.length;
                const auxtam = tam - 9;
                const textaux = chave.slice(tam - auxtam);
                localStorage.setItem('ctask_text' + textaux, task_text);
                localStorage.removeItem(chave);
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
        if(valor == text && confirm == '0' && chave[0] == 't'){
            localStorage.removeItem(chave);
            break;
        }
        else if(valor == text && confirm == '1' && chave[0] == 'c'){
            localStorage.removeItem(chave);
            break;
        }
    } 
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

