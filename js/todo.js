let input_task = document.querySelector('.input_container input');

let addBtn = document.querySelector('#addBtn');

let counter = document.querySelector('#taskCount');

let count = 0;

let tasks = document.querySelector('#tasks');

const addTask = () => {
    let content = input_task.value;
    if (!content) {
        error.style.display = "block";
        setTimeout(() => {
            error.style.display = "none";
        }, 5000);
        return;
    }
    count++;
    let div = document.createElement('div');
    div.classList.add('task');
    div.innerHTML = `<input type="checkbox" class="check_box">
    <span>${content}</span>
    <i class="fa-solid fa-pen-to-square update"></i>
    <i class="fa-solid fa-trash trash"></i>`;

    tasks.insertAdjacentElement('beforeend', div);

    let check_box = div.querySelector('.check_box');
    let span = div.querySelector('span');
    check_box.addEventListener('click', (event) => {
        console.log(event);
        if (event.srcElement.checked) {
            span.classList.add('complete');
            count--;
            counter.innerHTML = count;


        } else {
            span.classList.remove('complete');
            count++;
            counter.innerHTML = count;
        }
    })


    let Delete = div.querySelector('.trash');
    Delete.addEventListener('click', () => {
        if (confirm("Are you sure you want to delete")) {

            div.remove();
            count--;
            counter.innerHTML = count;
        }
    })

    let update_content = "";

    let update = div.querySelector('.update');
    let check = false;
    update.addEventListener('click', () => {
        count--;
        counter.innerHTML = count;
        input_task.value = content;
        check = true;
        div.remove();
    })


    if (check) {
        update_content = input_task.value;
        count++;
    }
    counter.innerHTML = count;
    input_task.value = update_content;


}

addBtn.addEventListener('click', addTask);
