const taskContainer = document.querySelector(".task_container");

const globalStore = [];

const generateNewCard = (taskData) => `
<div class="col-md-6 col-lg-4" id=${taskData.id}>
                <div class="card">
                    <div class="card-header d-flex justify-content-end gap-2">
                        <button type="button" class="btn btn-outline-success"><i class="fas fa-pencil-alt"></i></button>
                        <button type="button" class="btn btn-outline-danger"><i class="fas fa-trash"></i></button>
                    </div>
                    <img src=${taskData.imageUrl} 
                    class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${taskData.taskTitle}</h5>
                      <p class="card-text">${taskData.taskDescription}</p>
                      <a href="#" class="btn btn-success">${taskData.taskType}</a>
                    </div>
                    <div class="card-footer text-muted">
                        <a href="#" class="btn float-end btn-outline-success rounded-pill">Open Task</a>
                    </div>
                  </div>
            </div>
`;

const loadInitialCardData = () => {
    //local storage to get tasky card data

    //convert to nomal object

    //loop over those array of task object to create HTML card, inject it to DOM
};

const saveChanges = () => {
    const taskData = {
        id: `${Date.now()}`,//unique num for id
        imageUrl: document.getElementById("imageurl").value,
        taskTitle:document.getElementById("tasktytle").value,
        taskType:document.getElementById("tasktype").value,
        taskDescription:document.getElementById("taskdescription").value,
    };

    taskContainer.insertAdjacentHTML("beforeend", generateNewCard(taskData));

    globalStore.push(taskData);

    localStorage.setItem("tasky", JSON.stringify({cards:globalStore}));

} ;