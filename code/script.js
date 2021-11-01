const taskContainer = document.querySelector(".task_container");

let globalStore = [];

const generateNewCard = (taskData) => `
<div class="col-md-6 col-lg-4" id=${taskData.id}>
                <div class="card">
                    <div class="card-header d-flex justify-content-end  gap-2">

                        <button type="button" id=${taskData.id} class="btn btn-outline-success" 
                        onclick="editCard.apply(this,arguments)">
                        <i class="fas fa-pencil-alt" id=${taskData.id} 
                        onclick="editCard.apply(this,arguments)"></i></button>
                        
                        <button type="button" class="btn btn-outline-danger" 
                        id=${taskData.id} onclick="deleteCard.apply(this,arguments)">
                        <i class="fas fa-trash" 
                        id=${taskData.id} onclick="deleteCard.apply(this,arguments)"></i></button>
                    </div>
                    <img src=${taskData.imageUrl} 
                    class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${taskData.taskTitle}</h5>
                      <p class="card-text">${taskData.taskDescription}</p>
                      <a href="#" class="btn btn-success">${taskData.taskType}</a>
                    </div>
                    <div class="card-footer text-muted">
                        <button type="button" id=${taskData.id} class="btn btn-outline-primary
                        <a href="#" class="btn float-end btn-outline-success rounded-pill">Open Task</a>
                    </div>
                  </div>
            </div>
`;

const loadInitialCardData = () => {
    //local storage to get tasky card data
    const getCardData =localStorage.getItem("tasky");

    //convert to nomal object
    const {cards} = JSON.parse(getCardData);

    //loop over those array of task object to create HTML card, inject it to DOM
    cards.map((cardObject) => {
        taskContainer.insertAdjacentHTML("beforeend", generateNewCard(cardObject));

    //update our global store
        globalStore.push(cardObject);
    });

};

const updateLocalStorage = () => 
    localStorage.setItem("tasky", JSON.stringify({cards: globalStore}));

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

const deleteCard = (event) => {
    event = window.event;
    //id
    const targetID = event.target.id;
    const tagname = event.target.tagName; //BUTTON

    globalStore = globalStore.filter((cardObject) => cardObject.id !== targetID);
    updateLocalStorage();
    //localStorage.setItem("tasky", JSON.stringify({cards:globalStore}));//an object
    //contact parent
    //taskContainer.removeChild(document.getElementById(targetID));
    if(tagname === "BUTTON"){
        return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode);
    }else{
        return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
    }
};

//Edit icon part 
const editCard = (event) => {
    event = window.event;
    //id
    const targetID = event.target.id;
    const tagname = event.target.tagName; //BUTTON

    let parentElement;

    if(tagname === "BUTTON"){
        parentElement = event.target.parentNode.parentNode;
    }else{
        parentElement = event.target.parentNode.parentNode.parentNode;
    }

    let taskTitle = parentElement.childNodes[5].childNodes[1];
    let taskDescription = parentElement.childNodes[5].childNodes[3];
    let taskType = parentElement.childNodes[5].childNodes[5];
    let submitButton = parentElement.childNodes[7].childNodes[1];
    
    taskTitle.setAttribute("contenteditable","true");
    taskDescription.setAttribute("contenteditable","true");
    taskType.setAttribute("contenteditable","true"); 
    submitButton.setAttribute(
        "onclick",
        "saveEditchanges.apply(this, arguments)"
         );
    submitButton.innerHTML = "Save Changes"; 
};

const saveEditchanges = (event) => {
    event = window.event;
    //id
    const targetID = event.target.id;
    const tagname = event.target.tagName; //BUTTON

    let parentElement;

    if(tagname === "BUTTON"){
        parentElement = event.target.parentNode.parentNode;
    }else{
        parentElement = event.target.parentNode.parentNode.parentNode;
    }

    let taskTitle = parentElement.childNodes[5].childNodes[1];
    let taskDescription = parentElement.childNodes[5].childNodes[3];
    let taskType = parentElement.childNodes[5].childNodes[5];
    let submitButton = parentElement.childNodes[7].childNodes[1];

    const updatedData = {
        taskTitle:taskTitle.innerHTML,
        taskType:taskType.innerHTML,
        taskDescription:taskDescription.innerHTML,
    };

    globalStore = globalStore.map((task) => {
        if(task.id === targetID){
            return{
                id: task.id,
                imageUrl: task.imageUrl,
                taskTitle:updatedData.taskTitle,
                taskType:updatedData.taskType,
                taskDescription:updatedData.taskDescription,
            };
        }
        return task; // Important
    });

    updateLocalStorage();

    taskTitle.setAttribute("contenteditable","false");
    taskDescription.setAttribute("contenteditable","false");
    taskType.setAttribute("contenteditable","false"); 

    submitButton.innerHTML = "Open Task"; 

    submitButton.removeAttribute ("onclick");
};
