import {ToDo, Task, Project, createProject, populateMainDiv} from "./projects.js"
import { generateId } from "./generateIds.js";

const templateProjects =
[
    {
      "id": "xl67mc",
      "title": "Website Redesign",
      "description": "Redesign the company website",
      "tasks": [
        {
          "id": "fr743f",
          "title": "Create wireframes",
          "dueDate": "2024-09-10",
          "priority": "High",
          "description": "Wireframes for the new design",
          "checkList": [
            {
              "id": "jdbi3v",
              "status": false,
              "label": "Sketch homepage"
            },
            {
              "id": "hf2ovn",
              "status": false,
              "label": "Sketch contact page"
            }
          ]
        },
        {
          "id": "n8fvgh",
          "title": "Develop frontend",
          "dueDate": "2024-10-01",
          "priority": "Medium",
          "description": "Develop the frontend using React",
          "checkList": [
            {
              "id": "kpi9km",
              "status": false,
              "label": "HTML/CSS"
            },
            {
              "id": "wd432f",
              "status": false,
              "label": "JavaScript"
            }
          ]
        }
      ]
    },
    {
      "id": "4slxvh",
      "title": "Mobile App",
      "description": "Develop a mobile app for iOS and Android",
      "tasks": [
        {
          "id": "66ytos",
          "title": "Design UI",
          "dueDate": "2024-11-01",
          "priority": "High",
          "description": "Design the user interface",
          "checkList": [
            {
              "id": "hgg65b",
              "status": false,
              "label": "Main Screen"
            },
            {
              "id": "tttr54",
              "status": false,
              "label": "Settings Screen"
            }
          ]
        },
        {
          "id": "so7qcf",
          "title": "Implement API",
          "dueDate": "2022-12-01",
          "priority": "Low",
          "description": "Integrate with the backend API",
          "checkList": [
            {
              "id": "cxdaf4",
              "status": false,
              "label": "Login endpoint"
            },
            {
              "id": "mnlog7",
              "status": false,
              "label": "User endpoint"
            }
          ]
        }
      ]
    }
  ];



function addTemplates() {

    if (JSON.parse(localStorage.getItem("firstTime")) == true) {
        console.table(templateProjects)
    templateProjects.forEach(template => {localStorage.setItem(template.id, JSON.stringify(template)); console.log(`added project ${template.id}`)})
    localStorage.setItem("firstTime", false);
    }
}

function deleteProject(e) {
    let projectId = e.target.closest(".project").id;
    localStorage.removeItem(projectId);
    populateMainDiv()
}

function deleteTask(taskId, projectId) {
    let projects = JSON.parse(localStorage.getItem(projectId));

    if (projects) {
        const taskIndex = projects.tasks.findIndex(task => task.id === taskId);
        if (taskIndex > -1) {
            projects.tasks.splice(taskIndex, 1); // Remove the task from the array
            localStorage.setItem(projectId, JSON.stringify(projects)); // Save the updated project back to localStorage
            populateMainDiv()
        }
    }
}

function changeBoxStatus(checkboxId, taskId, projectId) {
    // Retrieve the project from localStorage using projectId
    let project = JSON.parse(localStorage.getItem(projectId));

    if (project) {
        // Find the task within the selected project using taskId
        const task = project.tasks.find(task => task.id === taskId);
        if (task) {
            // Find the checkbox within the selected task using checkboxId
            const checkbox = task.checkList.find(checkbox => checkbox.id === checkboxId);
            if (checkbox) {
                // Toggle the checkbox "status" element
                checkbox.status = !checkbox.status;

                // Save the updated project back to localStorage
                localStorage.setItem(projectId, JSON.stringify(project));
            }
        }
    }

    // Re-populate the main div to reflect changes
    populateMainDiv();
}

function createToDos(string) {
    const labels = string.split(';').map(label => label.trim()); // Split the string by semicolons and trim any extra spaces
    const todos = labels.map(label => new ToDo(generateId(), false, label)); // Create a ToDo for each label
    return todos;
}

function addProject(project) {

    const stringedProject = JSON.stringify(project);
    localStorage.setItem(project.id, stringedProject);

    console.log(`Project edited: ${project.id}`)

}


function createProjectFromForm(submitter) {

    let count = 1;
    
    const createForm = document.querySelector("dialog#addProjectDialog form");
    const editForm = document.querySelector("dialog#editProjectDialog form");

    let form;

    //Choose which form to use
    const button = submitter.id;
    if (button == 'addProjectSubmit') {form = createForm}
    else if (button == 'saveProject') {form = editForm};
    
    const formData = new FormData(form);

    let projectTasks = [];

    const newProject = new Project(
        formData.get("projectId"),
        formData.get("projectTitle"),
        formData.get("projectDescription"),
        projectTasks
    )

    console.log(formData.get("projectId"),
                formData.get("projectTitle"),
                formData.get("projectDescription"))
    console.log(formData)

    console.log(form);
    console.log(Array.from(formData.entries()));

    const newTaskFieldsets = form.querySelectorAll("fieldset");
/**ADD CONDITION TO RUN THE FOREACH ONLY IF IT IS NOT EMPTY */
    newTaskFieldsets.forEach(taskFieldset => {
        let taskId = `taskId-${count}`
        let taskTitle = `taskTitle-${count}`;
        let taskPriority = `taskPriority-${count}`;
        let taskDueDate = `taskDueDate-${count}`;
        let taskDescription = `taskDescription-${count}`;
        console.log((`taskChecklist-${count}`))
        let taskToDosUnparsed = formData.get(`taskChecklist-${count}`); //prepare the data for todos
        let taskToDosParsed = createToDos(taskToDosUnparsed); //prepare the data for todos

        const newTask = new Task(
            formData.get(taskId),
            formData.get(taskTitle),
            formData.get(taskPriority),
            formData.get(taskDueDate),
            formData.get(taskDescription),
            taskToDosParsed
        )
        count++;
        console.log(newTask)

        newProject.tasks.push(newTask)
    })  

    addProject(newProject)

}




export {addTemplates, deleteTask, deleteProject, changeBoxStatus, templateProjects, createProjectFromForm}