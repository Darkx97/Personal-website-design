let theme = localStorage.getItem("Theme");

function CheckTheme() 
{
    let check = document.querySelector("#theme");
    if(theme == 'dark')
    {
        document.documentElement.setAttribute('data-theme','dark');
        check.checked=false;
    }
    else
    {
        document.documentElement.setAttribute('data-theme','light');
        check.checked=true;
    }

}


function CheckPage()
{
    let title = document.querySelector("title")
    let navbar = document.querySelector(".nav-bar-options");
    let navmenu = document.querySelector(".nav-bar-menu");

    if(title.innerHTML == "About" || title.innerHTML == "about" )
    {
        navbar.parentElement.querySelector(".logo").children[0].classList.add("at");
    }
    else
    {
        for (let i = 0; i < navbar.children.length; i++) {
            if(title.innerHTML == navbar.children[i].innerHTML)
            {
                navbar.children[i].classList.add("at");
            }
            else
            {
                navbar.children[i].classList.remove("at");
            }
    
        }
        for (let i = 0; i < navmenu.children.length; i++) {
            if(title.innerHTML == navmenu.children[i].innerHTML)
            {
                navmenu.children[i].classList.add("at");
            }
            else
            {
                navmenu.children[i].classList.remove("at");
            }
        }
    }
}


function ClearFiles(input)
{
    console.log("testetset");
    let FileData = new ClipboardEvent("").clipboardData || new DataTransfer();
    files.splice(0,files.length)
    files.length=0;
    input.files = FileData;
    console.log("clearing input value : \n",input.files,"\n clear Files[] value : \n",files);
}