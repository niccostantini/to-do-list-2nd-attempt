import { addProject, addTaskSection, resetTaskForm, populate} from "./projects.js";
import { deleteTask } from "./localStorage.js";

function addListeners() {
    const addButton = document.querySelector('#addButton');
    const addProjectButton = document.querySelector('.addProjectButton');
    const addTaskButton = document.querySelector('.addTaskButton');
    const addButtons = document.querySelectorAll("#addButton, .addProjectButton, .addTaskButton");
    const deleteButtons = document.querySelectorAll(".delete");

    const addProjectDialog = document.querySelector("#addProjectDialog");
    const addProjectSubmit = document.querySelector("#addProjectSubmit");
    const resetProjectSubmit = document.querySelector("#resetProjectSubmit");

    const addTaskButton_in_ProjectForm = document.querySelector("dialog #addProjectForm .addTaskButton_in_ProjectForm");

    const projectHeaders = document.querySelectorAll(".projectTitle");
    const taskHeaders = document.querySelectorAll(".task-header");

    // Add listeners for add button graphics
    addButtons.forEach(button => {
        button.removeEventListener("mouseover", handleMouseOver);
        button.addEventListener("mouseover", handleMouseOver);

        button.removeEventListener("mouseout", handleMouseOut);
        button.addEventListener("mouseout", handleMouseOut);
    });

    deleteButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            deleteTask(e);
        })
    })

    function handleMouseOver() {
        addProjectButton.classList.add("showAddProject");
        addTaskButton.classList.add("showAddTask");
    }

    function handleMouseOut() {
        addProjectButton.classList.remove("showAddProject");
        addTaskButton.classList.remove("showAddTask");
    }

    addProjectButton.removeEventListener("click", handleAddProjectClick);
    addProjectButton.addEventListener("click", handleAddProjectClick);

    function handleAddProjectClick() {
        addProjectDialog.showModal();
    }

    taskHeaders.forEach(taskHeader => {
        taskHeader.removeEventListener("click", handleTaskHeaderClick);
        taskHeader.addEventListener("click", handleTaskHeaderClick);
    });

    function handleTaskHeaderClick(event) {
        const clickedTask = event.target.closest(".task");
        console.log(`Clicked: ${clickedTask}`);
        clickedTask.classList.toggle("collapsed");
    }

    projectHeaders.forEach(projectHeader => {
        projectHeader.removeEventListener("click", handleProjectHeaderClick);
        projectHeader.addEventListener("click", handleProjectHeaderClick);
    });

    function handleProjectHeaderClick(event) {
        const clickedProject = event.target.closest(".project");
        console.log(`Clicked: ${clickedProject}`);
        clickedProject.classList.toggle("collapsed");
    }

    addProjectSubmit.removeEventListener("click", handleAddProjectSubmit);
    addProjectSubmit.addEventListener("click", handleAddProjectSubmit);

    function handleAddProjectSubmit(e) {
        e.preventDefault();
        addProject(); // Stores and displays projects
        resetTaskForm();
        document.querySelector("dialog #addProjectForm").reset();
        addProjectDialog.close();

        // Instead of calling addListeners() again, rely on event delegation for new elements.
    };

    resetProjectSubmit.removeEventListener("click", handleResetProjectSubmit);
    resetProjectSubmit.addEventListener("click", handleResetProjectSubmit);

    function handleResetProjectSubmit() {
        resetTaskForm();
        addProjectDialog.close();
    }

    addTaskButton_in_ProjectForm.removeEventListener("click", handleAddTaskButtonClick);
    addTaskButton_in_ProjectForm.addEventListener("click", handleAddTaskButtonClick);

    function handleAddTaskButtonClick(e) {
        addTaskSection(e);
    }

    
}

export {addListeners}