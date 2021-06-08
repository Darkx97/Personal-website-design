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
let img=0;



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

function InputFiles(input)
{
    let dropzone =input.parentElement.querySelector(".dropzone")

    img = dropzone.children.length;
    if(img > 0  && !dropzone.classList.contains("single"))
    {
        files.splice(0,files.length)
        for(let i = 0 ; i < input.files.length; i++)
        {
            files.push(input.files[i])
        }
        // files.push(input.files);
    }
    else if(dropzone.classList.contains("single"))
    {
        files.splice(0,files.length);
    }
    
    for (let i = 0; i < input.files.length; i++) {
        files.push(input.files[i]);
        ShowDropedFile(dropzone,input.files[i]);
    }
    input.files = SaveFilesDATA(files , dropzone);
    console.log("files : ",files,"\ninput.files : ",input.files);

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
    let dropzone = element.parentElement.parentElement.querySelector(".dropzone");
    let input =dropzone.parentElement.querySelector(`[type="file"]`);

    dropzone.classList.remove("drag");

    img = dropzone.children.length;
    if(img > 0  && !dropzone.classList.contains("single"))
    {
        files.splice(0,files.length)
        for(let i = 0 ; i < input.files.length; i++)
        {
            files.push(input.files[i])
        }
        // files.push(input.files);
    }
    else if(dropzone.classList.contains("single"))
    {
        files.splice(0,files.length);
    }

    console.log(files)
    let data = element.files || event.dataTransfer.files;

    for(let i = 0 ; i < data.length; i++)
    {
        if(data.item(i).type.indexOf("image") === -1)
        {
            // console.log(i," not an image\n",data.item(i).type);
            continue
        }
        else
        {
            // console.log(i," is an image\n",data.item(i).type);
            files.push(data.item(i));
            ShowDropedFile(dropzone,data.item(i))
        }
    }
    input.files = SaveFilesDATA(files ,dropzone);
    console.log("files : ",files,"\ninput.files : ",input.files);

}

function SaveFilesDATA(files , dropzone)
{
    let FileData = new ClipboardEvent("").clipboardData || new DataTransfer();
    if(files.length > 0)
    {
        if(dropzone.classList.contains("single"))
        {
            FileData.items.add(files[0]);
        }
        else
        {
            for (let i = 0; i < files.length; i++)
            {
                
                FileData.items.add(files[i]);
            }
        }
    }
    files.splice(files.length);
    return FileData.files 

}


function ShowDropedFile(dropzone,file)
{
    dropzone.classList.add("active")
    const reader = new FileReader();
    let textarea = dropzone.parentElement.querySelector(".textinput")
    reader.readAsDataURL(file);
    if(dropzone.classList.contains("single"))
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
            img++;
            dropzone.innerHTML+=`<img class='dropitem' onclick="RemoveFile(this)" src='${reader.result}'>`;
            textarea.innerHTML += ` [img${img}] `;
        }
    }

}


function RemoveFile(file)
{
    img--;
    let dropzone = file.parentElement;
    let index = Array.prototype.indexOf.call(dropzone.children, file) + 1;
    let textarea = dropzone.parentElement.querySelector(".textinput");
    if(!dropzone.classList.contains("single"))
    {
        // console.log("removing : ",index);
        textarea.innerHTML = textarea.innerHTML.replace(`[img${index}]`, ` `);

        for(let i = index ; i <= files.length+1 ; i++)
        {
            textarea.innerHTML = textarea.innerHTML.replace(`[img${i}]`, `[img${i-1}]`);
        }
        
    }
    
    files.splice(index-1,1);
    // console.log("\n \n files length : ",files.length,"files : \n",files);
    let input =dropzone.parentElement.querySelector(`[type="file"]`)
    input.files = SaveFilesDATA(files , dropzone);
    // console.log("files : ",files,"\ninput.files : ",input.files);
    file.remove();
    if (dropzone.children.length == 0)
    {
        dropzone.classList.remove("active")
        if (dropzone.classList.contains("single")) {
            dropzone.innerHTML=`<label  for="drop-zone-1">
            <p class="note">drag and drop to add pictures</p>
        </label>`
        }
    }
}

function CloseOptionMenu(option)
{
    let menu = option.parentElement.parentElement.querySelector(".option-list")||option.parentElement.parentElement.querySelector(".edit-button");
    menu.click()
}

function ChangeOption(option)
{
    let text= option.value;
    let textbox = option.parentElement.parentElement.querySelector(".option-list").querySelector("p");
    textbox.innerHTML = text;
}

