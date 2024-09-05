import { generateId } from "./generateIds.js";
import { createProjectFromForm } from "./data.js";
import { populateMainDiv } from "./projects.js";

let taskNumber = 0;

function createProjectDialog() {

    const dialog = document.createElement('dialog');
    dialog.id = 'addProjectDialog';

    const form = document.createElement('form');
    form.id = 'addProjectForm';
    form.name = 'addProjectForm';
    form.method = 'dialog';

    const formTitleDiv = document.createElement('div');
    formTitleDiv.classList = 'formTitleDiv';

    const titleHeading = document.createElement('h2');
    titleHeading.textContent = 'Create New Project';

    formTitleDiv.appendChild(titleHeading);
    form.appendChild(formTitleDiv);

    //Form div
    const formDiv = document.createElement('div');
    formDiv.className = 'formDiv'

    // Project Title
    const projectId = generateId();
    const titleLabel = document.createElement('label');
    titleLabel.setAttribute('for', 'projectTitle');
    titleLabel.textContent = 'Project Title';
    formDiv.appendChild(titleLabel);

    const projectIdBox = document.createElement('input');
    projectIdBox.type = 'text';
    projectIdBox.id = 'projectId';
    projectIdBox.name = 'projectId';
    projectIdBox.required = true;
    projectIdBox.hidden = true;
    projectIdBox.value = projectId;
    formDiv.appendChild(projectIdBox);

    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.id = 'projectTitle';
    titleInput.name = 'projectTitle';
    titleInput.required = true;
    formDiv.appendChild(titleInput);

    // Project Description
    const descriptionLabel = document.createElement('label');
    descriptionLabel.setAttribute('for', 'projectDescription');
    descriptionLabel.textContent = 'Project Description';
    formDiv.appendChild(descriptionLabel);

    const descriptionTextarea = document.createElement('textarea');
    descriptionTextarea.id = 'projectDescription';
    descriptionTextarea.name = 'projectDescription';
    descriptionTextarea.rows = 3;
    descriptionTextarea.required = false;
    formDiv.appendChild(descriptionTextarea);

    formDiv.appendChild(document.createElement('hr'));

    // Tasks Section
    const tasksSection = document.createElement('div');
    tasksSection.id = 'tasksSection';

    const tasksHeading = document.createElement('h3');
    tasksHeading.textContent = 'Tasks';
    tasksSection.appendChild(tasksHeading);

    /**THIS MUST BE MADE A FUNCTIN OF TO GENERATE AS MANY TASK FIELD AS NEEDED WHEN CLICKING ON THE NEWTASK BUTTON*/
    /**    IN THE FUNCTION THAT APPENDS THE DATA IN LOCALSTORAGE, A UNIQUE ID MUST BE GIVE TO EACH TASKS     */
    taskNumber = 0;
    function displayTasks(generateTasksDiv) {

        taskNumber++;

        const taskId = generateId();
        const fieldset = document.createElement('fieldset');
        
        const legend = document.createElement('legend');
        legend.innerHTML = `Task <span class="task-number">${taskNumber}</span>`;
        fieldset.appendChild(legend);

        // Task Title
        const taskTitleLabel = document.createElement('label');
        taskTitleLabel.setAttribute('for', `taskTitle-${taskNumber}`);
        taskTitleLabel.textContent = 'Task Title';
        fieldset.appendChild(taskTitleLabel);

        const taskIdBox = document.createElement('input');
        taskIdBox.type = 'text';
        taskIdBox.id = `taskId-${taskNumber}`;
        taskIdBox.name = `taskId-${taskNumber}`;
        taskIdBox.required = true;
        taskIdBox.hidden = true;
        taskIdBox.value = taskId;
        fieldset.appendChild(taskIdBox);

        const taskTitleInput = document.createElement('input');
        taskTitleInput.type = 'text';
        taskTitleInput.id = `taskTitle-${taskNumber}`;
        taskTitleInput.name = `taskTitle-${taskNumber}`;
        taskTitleInput.required = true;
        fieldset.appendChild(taskTitleInput);

        // Task Priority
        const taskPriorityLabel = document.createElement('label');
        taskPriorityLabel.setAttribute('for', `taskPriority-${taskNumber}`);
        taskPriorityLabel.textContent = 'Priority';
        fieldset.appendChild(taskPriorityLabel);

        const taskPrioritySelect = document.createElement('select');
        taskPrioritySelect.id = `taskPriority-${taskNumber}`;
        taskPrioritySelect.name = `taskPriority-${taskNumber}`;
        taskPrioritySelect.required = true;
        ['high', 'medium', 'low'].forEach(priority => {
            const option = document.createElement('option');
            option.value = priority.toLowerCase();
            option.textContent = priority;
            taskPrioritySelect.appendChild(option);
        });
        fieldset.appendChild(taskPrioritySelect);

        // Task Description
        const taskDescriptionLabel = document.createElement('label');
        taskDescriptionLabel.setAttribute('for', `taskDescription-${taskNumber}`);
        taskDescriptionLabel.textContent = 'Task Description';
        fieldset.appendChild(taskDescriptionLabel);

        const taskDescriptionTextarea = document.createElement('textarea');
        taskDescriptionTextarea.id = `taskDescription-${taskNumber}`;
        taskDescriptionTextarea.name = `taskDescription-${taskNumber}`;
        taskDescriptionTextarea.rows = 3;
        taskDescriptionTextarea.required = false;
        fieldset.appendChild(taskDescriptionTextarea);

        // Task Due Date
        const taskDueDateLabel = document.createElement('label');
        taskDueDateLabel.setAttribute('for', `taskDueDate-${taskNumber}`);
        taskDueDateLabel.textContent = 'Task Due Date';
        fieldset.appendChild(taskDueDateLabel);

        const taskDueDateInput = document.createElement('input');
        taskDueDateInput.type = 'date';
        taskDueDateInput.id = `taskDueDate-${taskNumber}`;
        taskDueDateInput.name = `taskDueDate-${taskNumber}`;
        taskDueDateInput.required = true;
        fieldset.appendChild(taskDueDateInput);

        // Task ToDo's
        /**    IN THE FUNCTION THAT APPENDS THE DATA IN LOCALSTORAGE, AN ID MUST BE GIVE TO ALL TODOS     */
        const taskChecklistLabel = document.createElement('label');
        taskChecklistLabel.setAttribute('for', `taskChecklist-${taskNumber}`);
        taskChecklistLabel.textContent = "ToDo's";
        fieldset.appendChild(taskChecklistLabel);

        const taskChecklistInput = document.createElement('input');
        taskChecklistInput.type = 'text';
        taskChecklistInput.id = `taskChecklist-${taskNumber}`;
        taskChecklistInput.name = `taskChecklist-${taskNumber}`;
        taskChecklistInput.placeholder = 'Separate items by semicolons';
        taskChecklistInput.required = true;
        fieldset.appendChild(taskChecklistInput);

        // Delete Task Button
        const deleteTaskButton = document.createElement('button');
        deleteTaskButton.type = 'button';
        deleteTaskButton.className = 'deleteTaskButton';
        deleteTaskButton.textContent = 'Delete Task';
        fieldset.appendChild(deleteTaskButton);

        //Delete the fieldset relative to the task to be deleted
        deleteTaskButton.addEventListener("click", (e) => {
            e.target.closest("fieldset").remove();
            taskNumber--;
            const taskNumberSpans = document.querySelectorAll(".task-number");
            console.log(`Task number: ${taskNumber} - Span number ${taskNumberSpans.length}`)

            let i = 1
            taskNumberSpans.forEach(span => {
                
                    console.log(i)
                    span.textContent = i;

                    taskTitleLabel.setAttribute('for', `taskTitle-${i}`);

                    taskIdBox.id = `taskId-${i}`;
                    taskIdBox.name = `taskId-${i}`;
            
                    taskTitleInput.id = `taskTitle-${i}`;
                    taskTitleInput.name = `taskTitle-${i}`;
            
                    taskPriorityLabel.setAttribute('for', `taskPriority-${i}`);
            
                    taskPrioritySelect.id = `taskPriority-${i}`;
                    taskPrioritySelect.name = `taskPriority-${i}`;
            
                    taskDescriptionLabel.setAttribute('for', `taskDescription-${i}`);
            
                    taskDescriptionTextarea.id = `taskDescription-${i}`;
                    taskDescriptionTextarea.name = `taskDescription-${i}`;
            
                    taskDueDateLabel.setAttribute('for', `taskDueDate-${i}`);
            
                    taskDueDateInput.id = `taskDueDate-${i}`;
                    taskDueDateInput.name = `taskDueDate-${i}`;
            
                    taskChecklistLabel.setAttribute('for', `taskChecklist-${i}`);
            
                    taskChecklistInput.id = `taskChecklist-${i}`;
                    taskChecklistInput.name = `taskChecklist-${i}`;

                    console.log(taskChecklistInput.name);
            


                    i++
            })

        })

        // taskTemplate.appendChild(fieldset);
        generateTasksDiv.appendChild(fieldset);
    }

/** UP TO HERE */

    //Add div for generting tasks
    const generateTasksDiv = document.createElement('div');
    generateTasksDiv.className = 'generateTasksDiv';
    tasksSection.appendChild(generateTasksDiv);

    // Add Task Button
    const addTaskButton = document.createElement('button');
    addTaskButton.type = 'button';
    addTaskButton.id = 'addTaskButton';
    addTaskButton.textContent = 'Add Task';
    tasksSection.appendChild(addTaskButton);

    addTaskButton.addEventListener("click", () => {
        displayTasks(generateTasksDiv);
    })

    formDiv.appendChild(tasksSection);

    formDiv.appendChild(document.createElement('hr'));

    form.appendChild(formDiv);

    // Form Submit Buttons
    const formButtonsDiv = document.createElement('div');
    formButtonsDiv.className = 'form-buttons';

    const createProject = document.createElement('button');
    createProject.type = 'submit';
    createProject.id = 'addProjectSubmit';
    createProject.textContent = 'Create Project';
    formButtonsDiv.appendChild(createProject);

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        console.log(e.submitter)
        createProjectFromForm(e.submitter);
        populateMainDiv();
        resetDialog(form);
        e.target.closest('dialog').close();
    })

    const cancelProjectButton = document.createElement('button');
    cancelProjectButton.type = 'button';
    cancelProjectButton.id = 'cancelProjectSubmit';
    cancelProjectButton.textContent = 'Cancel';
    formButtonsDiv.appendChild(cancelProjectButton);

    form.appendChild(formButtonsDiv);
    dialog.appendChild(form);

    return dialog;
}



function editProjectDialog(input = '') {

    const dialog = document.createElement('dialog');
    dialog.id = 'editProjectDialog';

    const form = document.createElement('form');
    form.id = 'editProjectForm';
    form.name = 'editProjectForm';
    form.method = 'dialog';

    const formTitleDiv = document.createElement('div');
    formTitleDiv.classList = 'formTitleDiv';

    const titleHeading = document.createElement('h2');
    titleHeading.textContent = 'Edit Project';

    formTitleDiv.appendChild(titleHeading);
    form.appendChild(formTitleDiv);

    //Form div
    const formDiv = document.createElement('div');
    formDiv.className = 'formDiv'

    const selectProject = document.createElement('select')
    selectProject.multiple = true;
    // Create the placeholder option
    const placeholderOption = document.createElement('option');
    placeholderOption.textContent = 'Please select a project';
    placeholderOption.value = null;
    placeholderOption.disabled = true;
    selectProject.classList = "selectProject"

    // Add the placeholder option to the select element
    selectProject.appendChild(placeholderOption);

    // Retrieve all keys from localStorage
    const projectKeys = Object.keys(localStorage).filter(key => key !== "firstTime");

    let projectId;
    let project;

    // Iterate over each project key to add an option
    projectKeys.forEach(key => {
        const project = JSON.parse(localStorage.getItem(key));
        const projectTitle = project.title;
        const option = document.createElement('option');
        option.textContent = projectTitle;
        option.value = project.id;
        option.placeholder = "Selelect a project";
        selectProject.appendChild(option);
    });

    formDiv.appendChild(selectProject)
    selectProject.addEventListener("change", (e) => {
        let value = e.target.value;
        if (selectProject.value == "") {console.log("The value for project ID is: " + selectProject.value)}
        else {
            project = JSON.parse(localStorage.getItem(value));
            console.log(project);
            projectId = project.id;
            console.log(projectId);

            /***POPULATE THE FIELDS WITH DATE FROM PROJECTS */
            projectIdBox.value = projectId;
            titleInput.value = project.title;
            descriptionTextarea.value = project.description;

            /*** CREATE TASK FIELDS */
            displayTask(project)
        }

    })

        /**THIS MUST BE MADE A FUNCTIN OF TO GENERATE AS MANY TASK FIELD AS NEEDED WHEN CLICKING ON THE NEWTASK BUTTON*/
    /**    IN THE FUNCTION THAT APPENDS THE DATA IN LOCALSTORAGE, A UNIQUE ID MUST BE GIVE TO EACH TASKS     */
    
    function displayTask(project) {

        taskNumber = 0;
        generateTasksDiv.innerHTML = '';

        project.tasks.forEach(task => {
            taskNumber++;
            const taskId = task.id;
            const fieldset = document.createElement('fieldset');
            
            const legend = document.createElement('legend');
            legend.innerHTML = `Task <span class="task-number">${taskNumber}</span>`;
            fieldset.appendChild(legend);

            // Task Title
            const taskTitleLabel = document.createElement('label');
            taskTitleLabel.setAttribute('for', `taskTitle-${taskNumber}`);
            taskTitleLabel.textContent = 'Task Title';
            fieldset.appendChild(taskTitleLabel);

            const taskIdBox = document.createElement('input');
            taskIdBox.type = 'text';
            taskIdBox.id = `taskId-${taskNumber}`;
            taskIdBox.name = `taskId-${taskNumber}`;
            taskIdBox.required = true;
            taskIdBox.hidden = true;
            taskIdBox.value = taskId;
            fieldset.appendChild(taskIdBox);

            const taskTitleInput = document.createElement('input');
            taskTitleInput.type = 'text';
            taskTitleInput.id = `taskTitle-${taskNumber}`;
            taskTitleInput.name = `taskTitle-${taskNumber}`;
            taskTitleInput.required = true;
            taskTitleInput.value = task.title;
            fieldset.appendChild(taskTitleInput);

            // Task Priority
            const taskPriorityLabel = document.createElement('label');
            taskPriorityLabel.setAttribute('for', `taskPriority-${taskNumber}`);
            taskPriorityLabel.textContent = 'Priority';
            fieldset.appendChild(taskPriorityLabel);

            const taskPrioritySelect = document.createElement('select');
            taskPrioritySelect.id = `taskPriority-${taskNumber}`;
            taskPrioritySelect.name = `taskPriority-${taskNumber}`;
            taskPrioritySelect.required = true;
            ['high', 'medium', 'low'].forEach(priority => {
                const option = document.createElement('option');
                option.value = priority.toLowerCase();
                option.textContent = priority;
                taskPrioritySelect.appendChild(option);
            });
            fieldset.appendChild(taskPrioritySelect);

            // Task Description
            const taskDescriptionLabel = document.createElement('label');
            taskDescriptionLabel.setAttribute('for', `taskDescription-${taskNumber}`);
            taskDescriptionLabel.textContent = 'Task Description';
            fieldset.appendChild(taskDescriptionLabel);

            const taskDescriptionTextarea = document.createElement('textarea');
            taskDescriptionTextarea.id = `taskDescription-${taskNumber}`;
            taskDescriptionTextarea.name = `taskDescription-${taskNumber}`;
            taskDescriptionTextarea.rows = 3;
            taskDescriptionTextarea.required = false;
            taskDescriptionTextarea.value = task.description;
            fieldset.appendChild(taskDescriptionTextarea);

            // Task Due Date
            const taskDueDateLabel = document.createElement('label');
            taskDueDateLabel.setAttribute('for', `taskDueDate-${taskNumber}`);
            taskDueDateLabel.textContent = 'Task Due Date';
            fieldset.appendChild(taskDueDateLabel);

            const taskDueDateInput = document.createElement('input');
            taskDueDateInput.type = 'date';
            taskDueDateInput.id = `taskDueDate-${taskNumber}`;
            taskDueDateInput.name = `taskDueDate-${taskNumber}`;
            taskDueDateInput.required = true;
            taskDueDateInput.value = task.dueDate;
            fieldset.appendChild(taskDueDateInput);

            // Task ToDo's
            /**    IN THE FUNCTION THAT APPENDS THE DATA IN LOCALSTORAGE, AN ID MUST BE GIVE TO ALL TODOS     */
            const taskChecklistLabel = document.createElement('label');
            taskChecklistLabel.setAttribute('for', `taskChecklist-${taskNumber}`);
            taskChecklistLabel.textContent = "ToDo's";
            fieldset.appendChild(taskChecklistLabel);

            const taskChecklistInput = document.createElement('input');
            taskChecklistInput.type = 'text';
            taskChecklistInput.id = `taskChecklist-${taskNumber}`;
            taskChecklistInput.name = `taskChecklist-${taskNumber}`;
            taskChecklistInput.placeholder = 'Separate items by semicolons';
            taskChecklistInput.required = true;

            function convertToString(checkList) {
                return checkList.map(item => item.label).join('; ');
            }

            let result = convertToString(task.checkList);  
            
            taskChecklistInput.value = result;

            fieldset.appendChild(taskChecklistInput);

            // Delete Task Button
            const deleteTaskButton = document.createElement('button');
            deleteTaskButton.type = 'button';
            deleteTaskButton.className = 'deleteTaskButton';
            deleteTaskButton.textContent = 'Delete Task';
            fieldset.appendChild(deleteTaskButton);

            //Delete the fieldset relative to the task to be deleted
            deleteTaskButton.addEventListener("click", (e) => {
                e.target.closest("fieldset").remove();
                taskNumber--;
            })
        

            // taskTemplate.appendChild(fieldset);
            generateTasksDiv.appendChild(fieldset);
        }
        );
    }

    /**
     * SELECT PROJECT BASED ON THE OPTION SELECT
     * POPULATE THE FIELDS WITH THE DATE FROM LOCALSTORAGE
     *     PROJECT.TASK.FOREACH(TASK => ...)
     *          TASK.CHECKLIST.FOREACH(INVERT THE PROCESS)
     */
    // Project Title
    
    const titleLabel = document.createElement('label');
    titleLabel.setAttribute('for', 'projectTitle');
    titleLabel.textContent = 'Project Title';
    formDiv.appendChild(titleLabel);

    const projectIdBox = document.createElement('input');
    projectIdBox.type = 'text';
    projectIdBox.id = 'projectId';
    projectIdBox.name = 'projectId';
    projectIdBox.required = true;
    projectIdBox.hidden = true;
    projectIdBox.value = '';
    formDiv.appendChild(projectIdBox);

    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.id = 'projectTitle';
    titleInput.name = 'projectTitle';
    titleInput.required = true;
    formDiv.appendChild(titleInput);

    // Project Description
    const descriptionLabel = document.createElement('label');
    descriptionLabel.setAttribute('for', 'projectDescription');
    descriptionLabel.textContent = 'Project Description';
    formDiv.appendChild(descriptionLabel);

    const descriptionTextarea = document.createElement('textarea');
    descriptionTextarea.id = 'projectDescription';
    descriptionTextarea.name = 'projectDescription';
    descriptionTextarea.rows = 3;
    descriptionTextarea.required = false;
    descriptionTextarea.maxLength = 40;
    formDiv.appendChild(descriptionTextarea);

    formDiv.appendChild(document.createElement('hr'));

    // Tasks Section
    const tasksSection = document.createElement('div');
    tasksSection.id = 'tasksSection';

    const tasksHeading = document.createElement('h3');
    tasksHeading.textContent = 'Tasks';
    tasksSection.appendChild(tasksHeading);

    // Task Template
    // const taskTemplate = document.createElement('div');
    // taskTemplate.className = 'task-template';
    // taskTemplate.id = 'task-template'



/** UP TO HERE */

    //Add div for generating tasks
    const generateTasksDiv = document.createElement('div');
    generateTasksDiv.className = 'generateTasksDiv';
    tasksSection.appendChild(generateTasksDiv);

    function displayTasks(generateTasksDiv) {

        taskNumber++;

        const taskId = generateId();
        const fieldset = document.createElement('fieldset');
        
        const legend = document.createElement('legend');
        legend.innerHTML = `Task <span class="task-number">${taskNumber}</span>`;

        const legendSpan = legend.querySelector("span");

        console.log(legendSpan)

        fieldset.appendChild(legend);

        // Task Title
        const taskTitleLabel = document.createElement('label');
        taskTitleLabel.setAttribute('for', `taskTitle-${taskNumber}`);
        taskTitleLabel.textContent = 'Task Title';
        fieldset.appendChild(taskTitleLabel);

        const taskIdBox = document.createElement('input');
        taskIdBox.type = 'text';
        taskIdBox.id = `taskId-${taskNumber}`;
        taskIdBox.name = `taskId-${taskNumber}`;
        taskIdBox.required = true;
        taskIdBox.hidden = true;
        taskIdBox.value = taskId;
        fieldset.appendChild(taskIdBox);

        const taskTitleInput = document.createElement('input');
        taskTitleInput.type = 'text';
        taskTitleInput.id = `taskTitle-${taskNumber}`;
        taskTitleInput.name = `taskTitle-${taskNumber}`;
        taskTitleInput.required = true;
        fieldset.appendChild(taskTitleInput);

        // Task Priority
        const taskPriorityLabel = document.createElement('label');
        taskPriorityLabel.setAttribute('for', `taskPriority-${taskNumber}`);
        taskPriorityLabel.textContent = 'Priority';
        fieldset.appendChild(taskPriorityLabel);

        const taskPrioritySelect = document.createElement('select');
        taskPrioritySelect.id = `taskPriority-${taskNumber}`;
        taskPrioritySelect.name = `taskPriority-${taskNumber}`;
        taskPrioritySelect.required = true;
        ['high', 'medium', 'low'].forEach(priority => {
            const option = document.createElement('option');
            option.value = priority.toLowerCase();
            option.textContent = priority;
            taskPrioritySelect.appendChild(option);
        });
        fieldset.appendChild(taskPrioritySelect);

        // Task Description
        const taskDescriptionLabel = document.createElement('label');
        taskDescriptionLabel.setAttribute('for', `taskDescription-${taskNumber}`);
        taskDescriptionLabel.textContent = 'Task Description';
        fieldset.appendChild(taskDescriptionLabel);

        const taskDescriptionTextarea = document.createElement('textarea');
        taskDescriptionTextarea.id = `taskDescription-${taskNumber}`;
        taskDescriptionTextarea.name = `taskDescription-${taskNumber}`;
        taskDescriptionTextarea.rows = 3;
        taskDescriptionTextarea.required = false;
        fieldset.appendChild(taskDescriptionTextarea);

        // Task Due Date
        const taskDueDateLabel = document.createElement('label');
        taskDueDateLabel.setAttribute('for', `taskDueDate-${taskNumber}`);
        taskDueDateLabel.textContent = 'Task Due Date';
        fieldset.appendChild(taskDueDateLabel);

        const taskDueDateInput = document.createElement('input');
        taskDueDateInput.type = 'date';
        taskDueDateInput.id = `taskDueDate-${taskNumber}`;
        taskDueDateInput.name = `taskDueDate-${taskNumber}`;
        taskDueDateInput.required = true;
        fieldset.appendChild(taskDueDateInput);

        // Task ToDo's
        /**    IN THE FUNCTION THAT APPENDS THE DATA IN LOCALSTORAGE, AN ID MUST BE GIVE TO ALL TODOS     */
        const taskChecklistLabel = document.createElement('label');
        taskChecklistLabel.setAttribute('for', `taskChecklist-${taskNumber}`);
        taskChecklistLabel.textContent = "ToDo's";
        fieldset.appendChild(taskChecklistLabel);

        const taskChecklistInput = document.createElement('input');
        taskChecklistInput.type = 'text';
        taskChecklistInput.id = `taskChecklist-${taskNumber}`;
        taskChecklistInput.name = `taskChecklist-${taskNumber}`;
        taskChecklistInput.placeholder = 'Separate items by semicolons';
        taskChecklistInput.required = true;
        fieldset.appendChild(taskChecklistInput);

        // Delete Task Button
        const deleteTaskButton = document.createElement('button');
        deleteTaskButton.type = 'button';
        deleteTaskButton.className = 'deleteTaskButton';
        deleteTaskButton.textContent = 'Delete Task';
        fieldset.appendChild(deleteTaskButton);

        //Delete the fieldset relative to the task to be deleted
        deleteTaskButton.addEventListener("click", (e) => {
            e.target.closest("fieldset").remove();
        })

        // taskTemplate.appendChild(fieldset);
        generateTasksDiv.appendChild(fieldset);
    }

        // Add Task Button
        const addTaskButton = document.createElement('button');
        addTaskButton.type = 'button';
        addTaskButton.id = 'addTaskButton';
        addTaskButton.textContent = 'Add Task';
        tasksSection.appendChild(addTaskButton);
    
        addTaskButton.addEventListener("click", () => {
            displayTasks(generateTasksDiv)
        })

    formDiv.appendChild(tasksSection);

    formDiv.appendChild(document.createElement('hr'));

    form.appendChild(formDiv);

    // Form Submit Buttons
    const formButtonsDiv = document.createElement('div');
    formButtonsDiv.className = 'form-buttons';

    const saveProject = document.createElement('button');
    saveProject.type = 'submit';
    saveProject.id = 'saveProject';
    saveProject.textContent = 'Save';
    formButtonsDiv.appendChild(saveProject);

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        console.log("prevented default behaviour of button");
        createProjectFromForm(e.submitter);
        console.log("Creating project from form");
        populateMainDiv();
        console.log("Repopulated main");
        resetDialog(form)
        console.log("dialog reset");
        e.target.closest('dialog').close();
        console.log("closed dialog");
        e.target.closest('dialog').remove();
    })

    const cancelProjectButton = document.createElement('button');
    cancelProjectButton.type = 'button';
    cancelProjectButton.id = 'cancelProjectSubmit';
    cancelProjectButton.textContent = 'Cancel';
    formButtonsDiv.appendChild(cancelProjectButton);

    form.appendChild(formButtonsDiv);
    dialog.appendChild(form);

    // Function to populate fields based on selected project ID
    function populateFields(projectId) {
        const project = JSON.parse(localStorage.getItem(projectId));
        if (project) {
            titleInput.value = project.title;
            descriptionTextarea.value = project.description;
            projectIdBox.value = project.id;
            displayTask(project);
        }
    }

    if (input !== '') {
        selectProject.value = input; // Select the project in the dropdown
        populateFields(input); // Populate the form fields
    }

    return dialog;
}

function resetDialog(form) {
    form.reset(); // Reset all fields
    taskNumber = 0; // Reset any counters or state
    form.querySelector('.generateTasksDiv').innerHTML = '';
}



export {createProjectDialog, editProjectDialog};