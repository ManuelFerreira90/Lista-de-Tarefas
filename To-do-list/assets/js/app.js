let btnnewtask = document.querySelector('#btn');
btnnewtask.addEventListener('click', function(event){
    event.preventDefault();
    add();
});

let acont = 0;

function add() {
    
    const task_text = document.querySelector('#input-tasks').value;

    if(task_text){
        const contStr = localStorage.getItem('acont');
        if (contStr !== null) {
            acont = parseInt(contStr);
        } 
        localStorage.setItem('task_text' + acont, task_text);
        acont = acont + 1;
        localStorage.setItem('acont', acont);
        document.querySelector('#input-tasks').value = "";
    }

}

const btn_mobile = document.querySelector('.btn-mobile');
btn_mobile.addEventListener('click', function(event){
    event.preventDefault();
    const nav = document.querySelector('nav');
    nav.classList.toggle('active');
});



