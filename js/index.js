function login(){

    
}

function editDiary(){

}

function deleteDiary(){

}

function newEntry(){

}

function previousPage(){

}

function darkMode(){

}

function actuallyDeleting(){

}

function callDiary(){
    
}

function signUp(){
    
}

const root=document.querySelector(":root");

document
    .getElementById("theme-switcher-grid")
    .addEventListener("click", function () {
        this.classList.toggle("night-theme");
        if (this.classList.contains("night-theme")){
            dark();
        }
        else{
            light();
        }

    });

function dark(){
    root.style.setProperty('--text-color', '#cdd6f4');
    root.style.setProperty('--bg-color', '#1e1e2e');
    root.style.setProperty('--link-color', '#89dceb');
    root.style.setProperty('--btn-color', '#74c7ec');
    root.style.setProperty('--btn-text', '#45475a');
    root.style.setProperty('--shadow', 'rgba(0, 0, 0, 0.53)');

}

function light(){
    root.style.setProperty('--text-color', '#4c4f69');
    root.style.setProperty('--bg-color', '#eff1f5');
    root.style.setProperty('--link-color', '#04a5e5');
    root.style.setProperty('--btn-color', '#209fb5');
    root.style.setProperty('--btn-text', '#eff1f5');
    root.style.setProperty('--shadow', 'rgba(0, 0, 0, 0.2)');
}
