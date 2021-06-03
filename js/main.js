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
    let dropzone =input.parentElement.querySelector(`.dropzone`)
    for (let i = 0; i < input.files.length; i++) {
        files.push(input.files[i]);
        ShowDropedFile(dropzone,input.files[i]);
    }
    input.files = SaveFilesDATA(files);

    console.log( input.files);

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
    dropzone.classList.remove("drag");

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
            ShowDropedFile(dropzone,files[i])
        }
    }
    let input =dropzone.parentElement.querySelector(`[type="file"]`)
    input.files = SaveFilesDATA(files);
    console.log("files : ",files,"\ninput.files : ",input.files);

}

function SaveFilesDATA(files)
{
    let FileData = new ClipboardEvent("").clipboardData || new DataTransfer();
    for (let i = 0; i < files.length; i++)
    {
        FileData.items.add(files[i]);
    }
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
    else
    

    files.splice(index-1,1);
    // console.log("\n \n files length : ",files.length,"files : \n",files);
    let input =dropzone.parentElement.querySelector(`[type="file"]`)
    input.files = SaveFilesDATA(files);
    console.log("files : ",files,"\ninput.files : ",input.files);
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


