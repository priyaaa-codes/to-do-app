
const addNewTask = document.querySelector('.adding')
const addButton = document.querySelector('#btn1')
const taskList = document.querySelector('ul')
const completed = document.querySelector('.completed')
const totaltask = document.querySelector(".total")
 
let Myarr = []

function addTask(){
    const input = addNewTask.value 
    const task = {
        id : Date.now(),
        task : input,
        completed : false
    }
    if(input.trim() === ""){
        return;
    }
    Myarr.push(task)
    saveTask()
    displayTask()
    addNewTask.value = ''
updatecount()}

function saveTask(){
    localStorage.setItem("Myarr", JSON.stringify(Myarr))
}

function displayTask(){
    taskList.innerHTML = ""
    Myarr.forEach(function(task){
       const li = document.createElement("li")
      li.innerHTML = `<div class="left"><input class="check" type="checkbox"><span>${task.task}</span></div>
           <button class="delete-btn">Delete</button>`
           taskList.appendChild(li)

           const deleteButton = li.querySelector(".delete-btn")
          deleteButton.addEventListener("click", function(){
           deleteTask(task.id)
           updatecount()

    })
    const span = li.querySelector("span")
    const check = li.querySelector(".check")
        check.checked = task.completed
 if(check.checked){
         span.style.textDecoration = "line-through"
 }

    check.addEventListener("change", function(){
         task.completed = check.checked
         if(task.completed){
         span.style.textDecoration = "line-through"
        }
        else{
         span.style.textDecoration = "none"
        }
        saveTask()
        updatecount()
        
    })
    })
    

}

function loadTask(){
    const data = localStorage.getItem("Myarr")

    if(data === null){
        return;
    }
    else{
        Myarr = JSON.parse(data)
    }    
    updatecount()

    displayTask()
}

function deleteTask(id){
   Myarr = Myarr.filter( task => {
     return task.id !== id
   })
   saveTask()
   displayTask()
}

function updatecount(){
    totaltask.textContent = `TotalTask:${Myarr.length}`
     const checkcount = Myarr.filter(task => task.completed)
         completed.textContent = `completed:${checkcount.length}`
}

addButton.addEventListener("click", addTask)
addNewTask.addEventListener("keydown" , function(e){
    if(e.key === "Enter"){
        addButton.click()
    }
})

loadTask()

