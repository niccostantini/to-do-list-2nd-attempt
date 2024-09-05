<<<<<<< HEAD
import {updateChecklistStatus} from "./localStorage.js"
import { addListeners } from "./addListeners.js";

let tasks = [];
let projects;

async function populate() {

        let parsedProjects = JSON.parse(localStorage.getItem("projects"));
        populateMainDiv(parsedProjects);

};

const Task = function(title, dueDate, priority, description, checklist = []) {
    this.title = title;
    this.dueDate = dueDate;
    this.priority = priority;
    this.description = description;
    this.checklist = checklist;
}

Task.prototype.addCheckbox = function(label, checked = false) {
    const checkBox = new checkListElement(label);
    this.checklist.push(checkBox);

}

const checkListElement = function(label, checked = false) {
    this.label = label;
    this.status = checked;
}

const Project = function(title, description, tasks = []) {
=======
import { deleteTask, deleteProject, changeBoxStatus } from "./data";
import { editProjectDialog } from "./dialogs";
import { remainingTime } from "./timeCalculations";

const ToDo = function (id, status, label) {
    this.id = id;
    this.status = status;
    this.label = label;
}

const Task = function (id, title, priority, dueDate, description, toDos = []) {
    this.id = id;
    this.title = title;
    this.priority = priority;
    this.dueDate = dueDate;
    this.description = description;
    this.checkList = toDos;
}

// Define a method for adding a toDo to the task
Task.prototype.addToDo = function(toDo) {
    if (toDo instanceof ToDo) {
        this.toDos.push(toDo);
    } else {
        console.warn('The provided item is not a valid toDo.');
    }
}

const Project = function (id, title, description, tasks = []) {
    this.id = id;
>>>>>>> ebe848f98d4fb77fdcbbc30036491ff548641060
    this.title = title;
    this.description = description;
    this.tasks = tasks;
}

<<<<<<< HEAD
Project.prototype.addTask = function(title, dueDate, priority, description, checklist = []) {
    const task = new Task(title, dueDate, priority, description, checklist);
    this.tasks.push(task);
}

function populateMainDiv(Projects) {

    const mainDiv = document.querySelector('#main')
    mainDiv.innerHTML = '' // Clear any existing content

    Projects.forEach((project, projectIndex) => {
        // Create project container
        const projectDiv = document.createElement('div')
        projectDiv.classList.add('project') // This class ensures the sticky note style is applied

        // Create project header
        const projectHeader = document.createElement('header')
        projectHeader.classList.add('projectTitle')
        const projectTitle = document.createElement('h3')
        projectTitle.textContent = project.title
        const projectDescription = document.createElement('span')
        projectDescription.textContent = project.description
        projectHeader.appendChild(projectTitle)
        projectHeader.appendChild(projectDescription)

        // Create content section
        const contentSection = document.createElement('section')
        contentSection.classList.add('content')

        // Create tasks
        if (project.tasks && Array.isArray(project.tasks)) {  // Ensure tasks is an array
            project.tasks.forEach((task, taskIndex) => {
                const taskDiv = document.createElement('div')
                taskDiv.classList.add('task')
                taskDiv.id = `task${projectIndex + 1}-${taskIndex + 1}`

                const taskHeader = document.createElement('header')
                taskHeader.classList.add('task-header')  // Add class for styling
                const taskTitle = document.createElement('h4')
                taskTitle.textContent = task.title
                const taskPriority = document.createElement('span')
                taskPriority.classList.add(`${task.priority.toLowerCase()}Priority`) // Priority color classes
                taskPriority.textContent = task.priority.toUpperCase()
                taskHeader.appendChild(taskTitle)
                taskHeader.appendChild(taskPriority)

                const taskDescriptionDiv = document.createElement('div')
                taskDescriptionDiv.classList.add('description')
                const taskDescription = document.createElement('p')
                taskDescription.textContent = task.description
                taskDescriptionDiv.appendChild(taskDescription)

                if (task.checklist && Array.isArray(task.checklist)) {  // Ensure checklist is an array
                    task.checklist.forEach((checkbox, index) => {
                        
                        const checkBoxDiv = document.createElement('div')
                        checkBoxDiv.classList.add('checkBox')
                
                        const checkBox = document.createElement('input')
                        checkBox.type = 'checkbox'
                        checkBox.id = `item${projectIndex + 1}-${taskIndex + 1}-${index + 1}`
                        checkBox.checked = checkbox.status;
                
                        // Add change event listener to update the local storage when checkbox is toggled
                        checkBox.addEventListener('change', function () {
                            updateChecklistStatus(projectIndex, taskIndex, index, checkBox.checked)
                        });
                
                        const label = document.createElement('label')
                        label.setAttribute('for', checkBox.id)
                        label.textContent = checkbox.label;
                        checkBoxDiv.appendChild(checkBox)
                        checkBoxDiv.appendChild(label)
                        taskDescriptionDiv.appendChild(checkBoxDiv)
                    })
                }

                const taskDeadlines = document.createElement('div')
                taskDeadlines.classList.add('deadlines')
                const dueDate = document.createElement('p')
                dueDate.textContent = `Due: ${task.dueDate}`
                const expiresIn = document.createElement('p')
                // Assuming "Expires in" is calculated elsewhere or omitted
                taskDeadlines.appendChild(dueDate)
                taskDeadlines.appendChild(expiresIn)

                const taskButtons = document.createElement('div')
                taskButtons.classList.add('button')
                const editButton = document.createElement('input')
                editButton.type = 'button'
                editButton.value = 'Edit'
                editButton.classList.add('edit')
                const deleteButton = document.createElement('input')
                deleteButton.type = 'button'
                deleteButton.value = 'Delete'
                deleteButton.classList.add('delete')
                taskButtons.appendChild(editButton)
                taskButtons.appendChild(deleteButton)

                taskDiv.appendChild(taskHeader)
                taskDiv.appendChild(taskDescriptionDiv)
                taskDiv.appendChild(taskDeadlines)
                taskDiv.appendChild(taskButtons)

                contentSection.appendChild(taskDiv)
            })
        }

        projectDiv.appendChild(projectHeader)
        projectDiv.appendChild(contentSection)

        mainDiv.appendChild(projectDiv)
    })
}

function addProject() {
    const form = document.querySelector("dialog #addProjectForm");
    const formData = new FormData(form);
    const taskList = (function (){
        const taskList = [];
        const taskSections = form.querySelectorAll(".taskList section");

        taskSections.forEach((section, index) => {
            const taskNumber = index + 1; // Task number based on section order
            let label = formData.get(`taskChecklist-${taskNumber}`);
            const cleanedLabel = label.replace(/;\s+/g, ';');
            const parsedLabel = cleanedLabel.split(';');

            // Create a new Task object for each task form section
            console.log(`taskTitle-${taskNumber}`);
            let task = new Task(
                formData.get(`taskTitle-${taskNumber}`),
                formData.get(`taskDueDate-${taskNumber}`),
                formData.get(`taskPriority-${taskNumber}`),
                formData.get(`taskDescription-${taskNumber}`)
            );
            parsedLabel.forEach((item, index) => task.addCheckbox(item));
            taskList.push(task);
        });
            console.log(taskList); 
            return taskList;
    })()

    console.log("Creating new project with tasks:", taskList);
    const newProject = new Project(formData.get("projectTitle"), formData.get("projectDescription"), taskList);
    console.log(newProject)

    let currentProjects = JSON.parse(localStorage.getItem("projects"));
    currentProjects.push(newProject);
    localStorage.setItem("projects", JSON.stringify(currentProjects));

    populate()
    addListeners();  // This reattaches the event listeners

}

function deleteTaskSection(e) {
    const taskId = e.target.classList[0]; // Get the id from the class name
    const task = document.getElementById(taskId); // Find the element by its ID
    if (task) {
        task.remove(); // Remove the task section
    } else {
        console.warn(`Task section with id ${taskId} not found.`);
    }
}

function createTaskSection(n) {
    // Create the unordered list (ul) element with the class 'taskList'
    const ul = document.createElement('ul');
    ul.classList.add('taskList');
    ul.id = `task${n}`; //define a unique id for this part of the form

    // Create the section element
    const section = document.createElement('section');

    // Create the legend element for the task title
    const legend = document.createElement('legend');
    legend.textContent = `Task`;

    // Append legend to the section
    section.appendChild(legend);

    // Create delete button for the task
    const deleteButton = document.createElement("input");
    deleteButton.value = "X";
    deleteButton.type = "button";
    deleteButton.classList.add(ul.id);

    // Append delete button for the task
    section.appendChild(deleteButton);
    deleteButton.addEventListener("click", (e) => {
        deleteTaskSection(e);
    })

    // Function to create a list item (li) with an input inside
    function createInputListItem(placeholder, name) {
        const li = document.createElement('li');
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = placeholder;
        input.name = name;
        li.appendChild(input);
        return li;
    }

    // Create and append the input fields
    section.appendChild(createInputListItem('Task title', `taskTitle-${n}`));
    section.appendChild(createInputListItem('Due date', `taskDueDate-${n}`));
    section.appendChild(createInputListItem('Priority', `taskPriority-${n}`));
    section.appendChild(createInputListItem('Description', `taskDescription-${n}`));
    section.appendChild(createInputListItem("To do's", `taskChecklist-${n}`));



    // Append the section to the ul
    ul.appendChild(section);

    // Return the constructed ul element
    return ul;
}

function resetTaskForm() {
    const form = document.querySelector("dialog #addProjectForm");
    const tasks = form.querySelectorAll(".taskList");
    tasks.forEach(task => task.remove())
}



function addTaskSection(e) {
    e.preventDefault();
    const form = document.querySelector("dialog #addProjectForm");
    if (!form) {
        console.error("Form not found");
        return;
    }
    let taskList = form.querySelector(".taskList");
    if (!taskList) {
        // If there's no .taskList in the form, create one
        taskList = document.createElement('ul');
        taskList.classList.add('taskList');
        form.appendChild(taskList);
    }
    let tasks = form.querySelectorAll(".taskList");
    let n = tasks.length;
    let newTaskForm = createTaskSection(n);
    form.appendChild(newTaskForm);
}



// Call the function to populate the .main div
export { populate, addProject, addTaskSection, resetTaskForm, }
=======
// Define a method for adding a task to the project
Project.prototype.addTask = function(task) {
    if (task instanceof Task) {
        this.tasks.push(task);
    } else {
        console.warn('The provided item is not a valid Task.');
    }
}

function createProject(id, title, description, tasks) {
    const newProject = new Project(id, title, description, tasks)
    tasks.forEach(task => newProject.addTask(task));
}

/************** */

// Function to populate the .main div with projects
function populateMainDiv() {
    const mainDiv = document.querySelector('#main');
    mainDiv.innerHTML = ''; // Clear existing content

    // Retrieve all keys from localStorage
    const projectKeys = Object.keys(localStorage).filter(key => key !== "firstTime");

    // Iterate over each project key
    projectKeys.forEach(key => {
        const project = JSON.parse(localStorage.getItem(key));

        // Create the project container
        const projectDiv = document.createElement('div');
        projectDiv.classList.add('project');
        projectDiv.id = project.id;

        // Create the project header
        const projectHeader = document.createElement('header');
        projectHeader.classList.add('projectTitle');

        const projectTitle = document.createElement('h3');
        projectTitle.textContent = project.title;
        const projectDescription = document.createElement('span');
        projectDescription.textContent = project.description;

        const deleteProjectButton = document.createElement('input');
        deleteProjectButton.type = 'button';
        deleteProjectButton.value = '✖';
        deleteProjectButton.title = 'Delete project';
        deleteProjectButton.className = `delete ${project.id}`

        /** EDIT PROJECT */

        const editButton = document.createElement('input');
        editButton.type = 'button';
        editButton.value = '✍🏼';
        editButton.title = 'Edit';
        editButton.classList.add('edit');

        //Add event listener
        
        editButton.addEventListener("click", (e) => {
            const projectId = e.target.closest(".project").id;
            const dialog = editProjectDialog(projectId);
            console.log(`${projectId} is the ID for the project to be edited`)
            document.body.appendChild(dialog);
            dialog.showModal();
        })

        const projectDetails = document.createElement('div');
        projectDetails.className = "projectDetails";

        projectDetails.appendChild(projectTitle);
        projectDetails.appendChild(projectDescription);

        projectHeader.appendChild(projectDetails);

        const headerButtons = document.createElement('div');
        headerButtons.className = "headerButtons";

        headerButtons.appendChild(editButton);
        headerButtons.appendChild(deleteProjectButton);

        projectHeader.appendChild(headerButtons)

        //Add event listener
        deleteProjectButton.addEventListener('click', (e) => {
            const userConfirmed = window.confirm("Are you sure you want to delete this project?");

            if (userConfirmed == true) {deleteProject(e)}
            
        })

        projectDiv.appendChild(projectHeader);

        // Create the content section
        const contentSection = document.createElement('section');
        contentSection.classList.add('content');

        // Iterate through the tasks in the project
        project.tasks.forEach((task, taskIndex) => {
            const taskDiv = document.createElement('div');
            taskDiv.classList.add('task');
            taskDiv.id = `${task.id}`; // Unique ID for the task

            const taskHeader = document.createElement('header');
            taskHeader.title = "Click to toggle collapsing";
            const taskTitle = document.createElement('h4');
            taskTitle.textContent = task.title;
            const taskPriority = document.createElement('span');
            taskPriority.classList.add(task.priority.toLowerCase() + 'Priority');
            taskPriority.textContent = task.priority.toUpperCase();

            taskHeader.appendChild(taskTitle);
            taskHeader.appendChild(taskPriority);

            const taskDescriptionDiv = document.createElement('div');
            taskDescriptionDiv.classList.add('description');

            const taskDescription = document.createElement('p');
            taskDescription.textContent = task.description;
            taskDescriptionDiv.appendChild(taskDescription);

            const checkBoxDiv = document.createElement('div');
            checkBoxDiv.classList.add('checkBox');

            // Create checklist items
            const checklistUl = document.createElement('ul');
            task.checkList.forEach(item => {
                const checklistItem = document.createElement('li');

                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.id = item.id;
                checkbox.checked = item.status;

                checkbox.addEventListener('change', (e) => {
                    
                    let projectId = e.target.closest('.project').id;
                    let taskId = e.target.closest('.task').id;
                    let checkboxId = e.target.id;

                    changeBoxStatus(checkboxId, taskId, projectId)

                })

                const label = document.createElement('label');
                label.setAttribute('for', item.id);
                label.textContent = item.label;

                checklistItem.appendChild(checkbox);
                checklistItem.appendChild(label);
                checklistUl.appendChild(checklistItem);
            });

            checkBoxDiv.appendChild(checklistUl);
            taskDescriptionDiv.appendChild(checkBoxDiv);

            const taskDeadlines = document.createElement('div');
            taskDeadlines.classList.add('deadlines');

            const dueDate = document.createElement('p');
            dueDate.textContent = `Due: ${task.dueDate}`;
            taskDeadlines.appendChild(dueDate);

            // Assuming you have logic to calculate "Expires in"
            const expiresIn = document.createElement('p');
            let timeRemaining = remainingTime(task.dueDate);
            let timeRemainingString = "";

            if(timeRemaining.days < 0) {
                for (let key in timeRemaining) {
                    // Access the value using timeRemaining[key]
                    const value = timeRemaining[key];
                    timeRemainingString =
                        `${timeRemainingString} \n
                        ${-value} ${key}`;
                }

                expiresIn.textContent = 
                `Expires in:\n
                ${timeRemainingString}`; // Replace with actual logic
            } else {
                expiresIn.textContent = "Overdue!"
                expiresIn.classList.add("expired")
            }

            taskDeadlines.appendChild(expiresIn);

            const taskButtons = document.createElement('div');
            taskButtons.classList.add('button');

            /** DELETE TASK  */

            const deleteButton = document.createElement('input');
            deleteButton.type = 'button';
            deleteButton.value = '❌';
            deleteButton.title = 'Delete task';
            deleteButton.classList.add('delete');

            //Add event listener
            deleteButton.addEventListener('click', () => {

                const userConfirmed = window.confirm("Are you sure you want to delete this task?");

                if (userConfirmed == true) {
                    deleteTask(task.id, project.id);
                    populateMainDiv(); // Re-populate the main div after deletion
                }


            });

            taskButtons.appendChild(deleteButton);

            taskDiv.appendChild(taskHeader);
            taskDiv.appendChild(taskDescriptionDiv);
            taskDiv.appendChild(taskDeadlines);
            taskDiv.appendChild(taskButtons);

            contentSection.appendChild(taskDiv);
        });

        projectDiv.appendChild(contentSection);
        mainDiv.appendChild(projectDiv);
    });

    const taskHeaders = document.querySelectorAll(".task > header");
    taskHeaders.forEach(taskHeader => taskHeader.addEventListener("click", (event) => {
        const clickedTask = event.currentTarget.closest('.task')
        clickedTask.classList.toggle("collapsed")
    }))

}


export {populateMainDiv, Project, Task, ToDo}
>>>>>>> ebe848f98d4fb77fdcbbc30036491ff548641060
