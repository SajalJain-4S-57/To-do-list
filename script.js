let tasks = [];
document.addEventListener('DOMContentLoaded', () => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks); 
        updateTasksList();            
        updateStats();
    }
});



const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks)); 
}

const addTask = () => {
    const taskInput = document.getElementById('task-input');
    const text = taskInput.value.trim();

    if(text){
        tasks.push({text:text,completed:false});
        taskInput.value="";
        updateTasksList();
        updateStats();
        saveTasks();
    }    
};
const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTasksList();
    updateStats();
    saveTasks();
};
const deleteTask = (index) => {
    tasks.splice(index,1);
    updateTasksList(); 
    updateStats();
    saveTasks();
}
const editTask = (index) => {
    const taskInput = document.getElementById('task-input');
    taskInput.value = tasks[index].text;
    tasks.splice(index, 1);
    updateTasksList();
    updateStats();
    saveTasks();
}
const showToast = () => {
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
};

let celebrationShown = false;

const updateStats = () => {
    const completeTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const progressBar = document.getElementById('progress');
    const progress = totalTasks === 0 ? 0 : (completeTasks / totalTasks) * 100;
    progressBar.style.width = `${progress}%`;
    document.getElementById('numbers').innerText = `${completeTasks} / ${totalTasks}`;
    if (completeTasks === totalTasks && totalTasks !== 0 && !celebrationShown) {
    showToast();
    celebrationShown = true;
}   
}        

const updateTasksList = () => {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ''

    tasks.forEach((task,index) =>{
        const listItem = document.createElement('li');

        listItem.innerHTML = `
        <div class="taskItem">
            <div class="task ${task.completed ? "completed" : ''}">
                <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''}/>
                <p>${task.text}</p>
            </div>
            <div class="icons">
                <img src="./image/edit.png" height="30px" width="30px"onClick="editTask(${index})"/>
                <img src="./image/remove.png" height="30px" width="30px" onClick="deleteTask(${index})" />
            </div>
        </div>
        `;
        const checkbox = listItem.querySelector('.checkbox');
        checkbox.addEventListener('change', () => toggleTaskComplete(index));
        taskList.append(listItem);
    })
}
    
    

document.getElementById('add-task-button').addEventListener('click', function(event){
    event.preventDefault();
    addTask(); 
});

document.querySelector('form').addEventListener('submit', function(event){
    event.preventDefault();
    addTask();
});