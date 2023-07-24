/* adicionando tarefas */
export function add() {
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
        }
}

/* deletar tarefas não concluídas */
function dlt(task) {
    task.remove(true);
};