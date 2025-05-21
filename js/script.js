document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.querySelector('.task-input input');
    const addBtn = document.querySelector('.add-btn');
    const addFloatingBtn = document.querySelector('.add-floating-btn');
    const clearBtn = document.querySelector('.clear-btn');
    const taskColumns = {
        backlog: document.getElementById('backlog'),
        inProgress: document.getElementById('in-progress'),
        done: document.getElementById('done'),
        trash: document.getElementById('trash')
    };

    // Add task to backlog
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText) {
            const taskElement = document.createElement('div');
            taskElement.classList.add('task');
            taskElement.textContent = taskText;
            taskElement.draggable = true;
            
            // Add drag event listeners
            taskElement.addEventListener('dragstart', dragStart);
            
            // Add to backlog
            taskColumns.backlog.appendChild(taskElement);
            
            // Clear input
            taskInput.value = '';
        }
    }

    // Add task when Add button is clicked
    addBtn.addEventListener('click', addTask);
    
    // Add task when Enter key is pressed
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    
    // Focus input when floating button is clicked
    addFloatingBtn.addEventListener('click', () => {
        taskInput.focus();
        // Scroll to the input if needed
        document.querySelector('.new-task').scrollIntoView({ behavior: 'smooth' });
    });
    
    // Clear trash when clear button is clicked
    clearBtn.addEventListener('click', () => {
        taskColumns.trash.innerHTML = '';
    });
    
    // Enable task drag and drop functionality
    let draggedItem = null;
    
    function dragStart() {
        draggedItem = this;
        setTimeout(() => {
            this.style.opacity = '0.5';
        }, 0);
    }
    
    // Add drag over event listeners to task columns
    document.querySelectorAll('.tasks').forEach(column => {
        column.addEventListener('dragover', e => {
            e.preventDefault();
        });
        
        column.addEventListener('dragenter', e => {
            e.preventDefault();
            column.classList.add('drag-over');
        });
        
        column.addEventListener('dragleave', () => {
            column.classList.remove('drag-over');
        });
        
        column.addEventListener('drop', () => {
            column.classList.remove('drag-over');
            column.appendChild(draggedItem);
            draggedItem.style.opacity = '1';
        });
    });
    
    // Make tasks movable by clicking
    document.addEventListener('click', e => {
        const task = e.target.closest('.task');
        if (!task) return;
        
        const column = task.parentElement;
        const columnId = column.id;
        
        // Define the next column based on current column
        let nextColumn;
        switch (columnId) {
            case 'backlog':
                nextColumn = taskColumns.inProgress;
                break;
            case 'in-progress':
                nextColumn = taskColumns.done;
                break;
            case 'done':
                nextColumn = taskColumns.trash;
                break;
            case 'trash':
                // If in trash, remove the task
                task.remove();
                return;
        }
        
        if (nextColumn) {
            nextColumn.appendChild(task);
        }
    });
}); 