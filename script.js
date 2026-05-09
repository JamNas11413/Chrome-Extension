const inputBtn = document.getElementById('input-btn');
const inputEl = document.getElementById('input-el');
const ulEl = document.getElementById('ul-el');
const renderLeadsBtn = document.getElementById('render-leads-btn');
const msg0 = document.getElementById("msg0");
const deleteBtn = document.getElementById("Delete-btn");
const saveTabBtn = document.getElementById("save-tab-btn");

// 1. Get leads from local storage
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("leads"));

let myLead = [];

// 2. Check if leads exist, then render them immediately
if (leadsFromLocalStorage) {
    myLead = leadsFromLocalStorage;
    render(myLead);
}

// 3. Reusable Render Function (Fixes Bug #4)
function render(leads) {
    let listItems = "";
    for (let i = 0; i < leads.length; i++) {
        // Using template literals for cleaner code
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

// 4. Save Input Button
inputBtn.addEventListener('click', function() {
    if (inputEl.value !== "") {
        myLead.push(inputEl.value);
        inputEl.value = "";
        
        // Save to local storage and Render immediately
        localStorage.setItem("leads", JSON.stringify(myLead));
        render(myLead);
        
        msg0.textContent = "";
    } else {
        msg0.textContent = "Please enter a valid URL!";
    }
});

// 5. Save Tab Button
saveTabBtn.addEventListener("click", function() {
    // Chrome API to get current tab
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLead.push(tabs[0].url);
        localStorage.setItem("leads", JSON.stringify(myLead));
        render(myLead); // Render immediately to show the new tab
        msg0.textContent = "";
    });
});

// 6. Delete Button (Fixes Bug #3)
deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear();
    myLead = []; // Important: Clear the array in memory too!
    render(myLead); // Render the empty list
});

// 7. Render/Show All Button (Optional)
// Since we auto-render on load, this button is mostly redundant, 
// but we can keep it to manually refresh the view if needed.
renderLeadsBtn.addEventListener('click', function() {
    // Fixes Bug #1: Removed the 'myLead' parameter here
    render(myLead); 
});