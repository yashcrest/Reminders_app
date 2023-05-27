const inputField = document.querySelector("#inputField");
const remind_btn = document.querySelector("#remind_btn");
const itemList = document.querySelector("#itemList");
const msg = document.querySelector("#msg");
const searchInput = document.querySelector("#searchInput");

const weatherData = document.querySelector("#weatherData");

//On Refresh, get all the items from localStorage
window.onload = loadReminders();

//OnClick AddReminder Button add task
remind_btn.addEventListener('click', addReminder);
inputField.addEventListener('keyup', (e) => {
    if(e.key === 'Enter'){
        addReminder();
    }
})

//loading reminder from localStorage
function loadReminders(){
    //Check if local storage has any items, if not then return 
    if(localStorage.getItem('reminders') === null) return;

    //Get reminders from localStorage and convert it to an arrray
    let reminders = Array.from(JSON.parse(localStorage.getItem("reminders")));

    reminders.forEach(reminder => {
        //create a list item, add innerHTML 
        const li = document.createElement('li');
        li.classList = reminder.completed ? ['checked'] : []
        li.innerHTML =`  <span class ='remind' id="task" onClick="checkReminder(this)"> ${reminder.reminder} </span>
        <span class="close" onClick="removeReminder(this)">\u00D7 </span>` ;
        itemList.appendChild(li); 
    })
}


//add Reminder to DOM and localStorage
function addReminder(){
    //if the reminder field is empty
    if (inputField.value === ''){
        msg.classList.add('error')
        msg.textContent = "No input received"
        msg.style.display = 'block'
        setTimeout(() => msg.style.display = 'none', 1000);
        return false;
    }


    //remove white spaces from start & end of the users input
    let userInput = inputField.value.trim();

     //add reminder to localStorage 
     localStorage.setItem("reminders", JSON.stringify([...JSON.parse(localStorage.getItem("reminders") || "[]"), {reminder: userInput, completed: false}]));
    

    //create li
    const li = document.createElement('li');
    li.innerHTML = `<span class="remind" onClick="checkReminder(this)">${userInput}</span>
    <span class="close" onClick="removeReminder(this)">\u00D7</span>`
    itemList.appendChild(li)
    inputField.value = ''; 

    //will make the li in the scrollable view when new li elements are added
    li.scrollIntoView({behavior:"smooth", block: "end", inline: "nearest"});


    //testing right click event in 'li'
    li.addEventListener('dblclick' , (e) => {
        e.preventDefault();
        console.log(1);
    });

}


//Tick reminder and Cross
function checkReminder(e){
    let reminders = Array.from(JSON.parse(localStorage.getItem('reminders')));
    const updatedItems = reminders.map(item => { 
        if (item.reminder === e.parentElement.children[0].innerText) { 
            return {...item, completed: !item.completed};
        }
            else {
                 return item; 
                } 
            }); 

    localStorage.setItem("reminders", JSON.stringify(updatedItems));
    e.parentElement.classList.toggle('checked');
}

//Remove Reminder
function removeReminder(e){
    let reminders = Array.from(JSON.parse(localStorage.getItem("reminders")));
    localStorage.setItem("reminders", JSON.stringify(reminders.filter(item => item.reminder != e.parentElement.children[0].innerText)));
    e.parentElement.remove();
}


//Search for a reminder
searchInput.addEventListener('keyup', function(e){
    if(e.key === "Enter"){
        searchItem(e);
    }
});

function searchItem(e){
    let text = e.target.value.toLowerCase();
    var items = Array.from(itemList.getElementsByTagName('li'));

    items.forEach(item => {
        if(item.children[0].innerText.toLowerCase().includes(text.toLowerCase())) {
            item.style.display = 'block';
        }
        else {
            item.style.display = 'none';
        }
    })
} 

