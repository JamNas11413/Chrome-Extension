const inputBtn = document.getElementById('input-btn');
const inputEl = document.getElementById('input-el');
const ulEl = document.getElementById('ul-el');
const renderLeadsBtn = document.getElementById('render-leads-btn');
const msg0 = document.getElementById("msg0");
const deleteBtn = document.getElementById("Delete-btn");
const saveTabBtn = document.getElementById("save-tab-btn");

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("leads"));

let myLead = [];

if (leadsFromLocalStorage) {
    myLead = leadsFromLocalStorage;
    render(myLead);
}

function render(leads) {
    let listItems = "";
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `;
    }
    ulEl.innerHTML = listItems;
}

inputBtn.addEventListener('click', function() {
    if (inputEl.value !== "") {
        myLead.push(inputEl.value);
        inputEl.value = "";
        
        localStorage.setItem("leads", JSON.stringify(myLead));
        render(myLead);
        
        msg0.textContent = "";
    } else {
        msg0.textContent = "Please enter a valid URL!";
    }
});

saveTabBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLead.push(tabs[0].url);
        localStorage.setItem("leads", JSON.stringify(myLead));
        render(myLead); 
        msg0.textContent = "";
    });
});


deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear();
    myLead = []; 
    render(myLead); 
});

renderLeadsBtn.addEventListener('click', function() {
    render(myLead); 
});