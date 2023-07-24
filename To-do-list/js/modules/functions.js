/* adicionando tarefas */
export function addnewtask() {

        /* tarefa */
        const task = document.querySelector('#input-tasks').value;

        /* lista onde ficam as novas tarefas */
        const list = document.querySelector("#to-do-list");

        /* verificando tarefas vazias */
        if(task){

            /* clonando template de tarefas */
            const template = document.querySelector(".template");
            const newtask = template.cloneNode(true);

            /* adicionando a task ao novo template */
            newtask.querySelector(".tasks-name").textContent = task;

            /* removendo hide */
            newtask.classList.remove("template");
            newtask.classList.remove("hide");
            list.appendChild(newtask);
            document.querySelector('#input-tasks').value = "";

            /* remover lista */
            const remove = newtask.querySelector('.remove-btn');
            remove.addEventListener('click', function () {
                dlt(this.parentNode.parentNode);
            });
            
            /* tarefa concluída */
            const completed = newtask.querySelector('.s');
            completed.addEventListener('click', function () {
                conversion(this.parentNode.parentNode);
            });
        }
}

/* adicionando ao complet tarefas concluídas */
function addoldtask(task) {

    /* identificando lista */
    const list = document.querySelector('#to-do-list-complet');

    /* clonando template da lista */
    const template1 = document.querySelector('.template1');

    /* copiando texto da task concluída */
    const text = task.querySelector('.tasks-name').textContent;
    const completedtask = template1.cloneNode(true);
    completedtask.querySelector(".textdone").textContent = text;

    /* removendo hide */
    completedtask.classList.remove("template1");
    completedtask.classList.remove("hide");
    list.appendChild(completedtask);

    /* remover lista */
    const remove = completedtask.querySelector('.remove-btn1');
    remove.addEventListener('click', function () {
        dlt(this.parentNode);
    });
}

/* deletar tarefas não concluídas */
function dlt(task) {
    task.remove(true);
};

/* tarefas concluídas */
function conversion(task) {
    addoldtask(task);
    dlt(task);
}