
async function saveProject() {
    async function fetchProjects() {
        const requestURL = "./projects.json"
        console.log("Requesting JSON from:", requestURL)

        const response = await fetch(requestURL)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const projectsText = await response.text();
        const projects = JSON.parse(projectsText);


        return projects
    }

    // Await the result of fetchProjects
    const projectList = await fetchProjects()

    // Now you can safely access projectList and save it to localStorage
    localStorage.setItem('projects', JSON.stringify(projectList))
}

function updateChecklistStatus(projectIndex, taskIndex, checklistIndex, newStatus) {
    // Get the current list of projects from local storage
    let projects = JSON.parse(localStorage.getItem('projects'));

    if (projects && projects[projectIndex] && projects[projectIndex].tasks[taskIndex]) {
        // Update the checklist status
        projects[projectIndex].tasks[taskIndex].checklist[checklistIndex].status = newStatus;

        // Save the updated projects array back to local storage
        localStorage.setItem('projects', JSON.stringify(projects));
    } else {
        console.warn('Could not find the task or checklist item to update.');
    }
}

function getTaskById(taskId) {
    // Retrieve the projects array from localStorage
    let projects = JSON.parse(localStorage.getItem('projects'));
    
    // Split the taskId into components
    const parts = taskId.split('-');
    
    // Extract and convert to zero-based indices
    const projectIndex = parseInt(parts[0].replace('task', '')) - 1;
    const taskIndex = parseInt(parts[1]) - 1;
    
    // Check if the project and task exist and return both the task and its indices
    if (projects[projectIndex]?.tasks[taskIndex]) {
        return { projectIndex, taskIndex, task: projects[projectIndex].tasks[taskIndex] };
    } else {
        console.warn(`Task with ID ${taskId} not found.`);
        return null;
    }
}

function deleteTask(e) {
    let projects = JSON.parse(localStorage.getItem('projects'));
    let toDelete = e.target.closest(".task").id;
    
    // Get the task and its indices using the modified getTaskById
    let result = getTaskById(toDelete);
    
    if (result) {
        const { projectIndex, taskIndex } = result;

        // Remove the task from the tasks array
        projects[projectIndex].tasks.splice(taskIndex, 1);

        // Save the updated projects array back to localStorage
        localStorage.setItem('projects', JSON.stringify(projects));

        // Optionally, remove the task element from the DOM
        document.getElementById(toDelete).remove();
    }
}


export {saveProject, updateChecklistStatus, deleteTask};