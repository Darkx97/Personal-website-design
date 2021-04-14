window.addEventListener("dragover",function(e)
{
    e = e || event;
    e.preventDefault();
    window.addEventListener("drop",function(e)
    {
        e = e || event;
        e.preventDefault();
    });

});

let files=[];



function ChangeTheme(Switch)
{
    if (Switch.chekced) 
    {
        if (document.documentElement.getAttribute('data-theme')=='dark')
        {
            document.documentElement.setAttribute('data-theme','light');
            localStorage.setItem('Theme','light')
        }
        else
        {
            document.documentElement.setAttribute('data-theme','dark');
            localStorage.setItem('Theme','dark')
        }
    }
    else
    {
        if(document.documentElement.getAttribute('data-theme')=='light')
        {
            document.documentElement.setAttribute('data-theme','dark');
            localStorage.setItem('Theme','dark')
        }
        else
        {
            document.documentElement.setAttribute('data-theme','light');
            localStorage.setItem('Theme','light')
        }
    }
}

function ActiveDropZone(element)
{
    element.parentElement.parentElement.querySelector(".dropzone").classList.add("drag");
}

function DeActiveDropZone(element)
{
    element.parentElement.parentElement.querySelector(".dropzone").classList.remove("drag");
}

function DropFile(element , event)
{
    // event.preventDefault();
    console.log("test");
    // console.log("test");
    let dropzone = element.parentElement.parentElement.querySelector(".dropzone");
    dropzone.classList.remove("drag");

    let data = element.files || event.dataTransfer.files;

 
    for(let i = 0 ; i < data.length; i++)
    {
        if(data.item(i).type.indexOf("image") === -1)
        {
            console.log(i," not an image\n",data.item(i).type);
        }
        else
        {
            console.log(i," is an image\n",data.item(i).type);
            files.push(data.item(i));
            ShowDropedFile(dropzone,data.item(i),i)
        }
    }

}

function ShowDropedFile(dropzone,file,index)
{
    const reader = new FileReader();
    dropzone.classList.add("active")
    reader.readAsDataURL(file);
    if(dropzone.classList.contains("single") && index === files.length-1)
    {
        reader.onload = ()=>
        {
            dropzone.innerHTML=`<img class='dropitem' onclick="RemoveFile(this)" src='${reader.result}'>`;
        }
    }
    else
    {
        reader.onload = ()=>
        {
            dropzone.innerHTML+=`<img class='dropitem' onclick="RemoveFile(this)" src='${reader.result}'>`;
        }
    }

}

function RemoveFile(file)
{
    let dropzone = file.parentElement;
    file.remove()
    if (dropzone.children.length == 0)
    {
        dropzone.classList.remove("active")
    }
}


function ToggleUI(button)
{
    let section = button.parentElement.parentElement.querySelector(".comment-section") || button.parentElement.parentElement.parentElement.querySelector(".comment-section");
    let arrow = button.querySelector(".arrow");

    arrow.classList.toggle("active");
    section.classList.toggle("active");
}