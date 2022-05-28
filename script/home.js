
document.querySelector("[data-button='show-new-posts']").addEventListener('click',showPosts);
document.querySelector("[data-button='load-more']").addEventListener('click',showPostsMore);
document.querySelector("[data-button='write-post']").addEventListener('click',writePostShow);
document.querySelector(".containerForm").addEventListener('submit',sendPost);
const startContent = document.querySelector('#startContent');
document.querySelector("[data-button='your-posts']").addEventListener('click',viewUserPosts);
document.querySelector("[data-button='show-random-fox']").addEventListener('click',showRandomFox);
if(document.querySelector('.messageContainer') != null){
    const xbuttons = document.querySelectorAll(".xButton");
    for(const xbutton of xbuttons){
        xbutton.addEventListener('click',hideBox);
    }
}


const search = document.getElementById('searchPost');
search.addEventListener('submit',searchPost);


let viewPost = 0;
nPosts = 0;
let nPostsShown = 0;

function hideBox(event){
    event.currentTarget.parentNode.parentNode.classList.add('hidden');
}

function searchPostJson(json){
    const startContent = document.querySelector("#startContent");
    const buttonsDivEnd = document.querySelector(".buttonsDivEnd");
    const username = document.getElementById('user');
    if(json[0].found != false){
        if(startContent.classList.contains("hidden")){
        startContent.classList.remove("hidden");
    }
    if(buttonsDivEnd.classList.contains("hidden")){
        buttonsDivEnd.classList.add("hidden");
    }
    startContent.innerHTML='';
    let nFetchedPosts = json.length;
    const textStartDiv = document.createElement('div');
    textStartDiv.classList.add('textStart');
    textStartDiv.textContent = "Risultati della ricerca per: " + json[0].search + ". Risultati trovati: " + json[0].numberOfResults;
    startContent.appendChild(textStartDiv);
    for(let i=0; i<nFetchedPosts; i++){      

        const pageElement = document.createElement('section');
        pageElement.classList.add('element');
        const pageNumber = document.createElement('div');
        pageNumber.classList.add("number");
        pageNumber.classList.add("hidden");
        const pageContent = document.createElement('div');
        pageContent.classList.add('content');
        const pageTitle = document.createElement('div');
        pageTitle.classList.add('title');
        const pageUsernamePosts = document.createElement('span');
        pageUsernamePosts.classList.add('usernamePosts');
        
        const pageTimePosts = document.createElement('span');
        pageTimePosts.classList.add('timePosts');
        const pageText = document.createElement('p');
        pageText.classList.add('text');
        const pageDeleteContent = document.createElement('div');
        pageDeleteContent.classList.add('deletecontent');
        const pageDelete = document.createElement('button');
        pageDelete.classList.add('delete');
        pageDelete.textContent = "Elimina post";
        //aggiungo immagine Francesco B.
        pageImgBox = document.createElement('div');
        pageImgBox.classList.add('imgboxPost');
        pageFoxImage = document.createElement('img');
        pageFoxImage.src = json[i].fox;
        

        pageNumber.textContent = json[i].postid;
        pageTitle.textContent = json[i].title;
        pageUsernamePosts.textContent = "Di: " + json[i].username;
        pageText.textContent = json[i].story;
        pageTimePosts.textContent = "Pubblicato " + json[i].time;
        pageDelete.dataset.postId = json[i].postid;


        startContent.appendChild(pageElement);
        pageElement.appendChild(pageNumber);
        pageElement.appendChild(pageContent);
        pageContent.appendChild(pageTitle);
        pageContent.appendChild(pageUsernamePosts);
        pageContent.appendChild(pageTimePosts);
        pageContent.appendChild(pageText);
        pageContent.appendChild(pageDeleteContent);
        pageImgBox.appendChild(pageFoxImage);
        pageContent.appendChild(pageImgBox);
        pageContent.appendChild(pageDeleteContent);

    }

    }
    else{
        const emptyPostList = document.createElement('div');
        startContent.innerHTML='';
        emptyPostList.classList.add('buttonsDivDelete');
        if(startContent.classList.contains('hidden')){
            startContent.classList.remove('hidden');
        }
        emptyPostList.textContent = "Nessun post trovato!"
        startContent.appendChild(emptyPostList);
    }
}

function searchPost(event){
    event.preventDefault();
    const startContent = document.querySelector("#startContent");
    const containerForm = document.querySelector(".containerForm");
    containerForm.classList.add("hidden");
    const mypostsbutton = document.querySelector("[data-button='your-posts']");
    mypostsbutton.textContent = "Chiudi i post";
    const textbox = document.querySelector('#searchInput');
    const buttonsDivEnd = document.querySelector(".buttonsDivEnd");
    if(!buttonsDivEnd.classList.contains("hidden")){
        buttonsDivEnd.classList.add("hidden");
    }
    fetch("search_post.php?q=" + textbox.value).then(fetchResponse).then(searchPostJson);
}

function randomFoxJson(json){
    const buttonsDivEnd = document.querySelector('.buttonsDivEnd');
    if(!buttonsDivEnd.classList.contains("hidden")){
        buttonsDivEnd.classList.add("hidden");
    }
    const containerForm = document.querySelector(".containerForm");
    containerForm.classList.add("hidden");
    const startContent = document.querySelector("#startContent");
    startContent.innerHTML='';
    if(startContent.classList.contains("hidden")){
        startContent.classList.remove("hidden");
    }
    const pageElement = document.createElement('section');
    pageElement.classList.add('element');
    pageImgBox = document.createElement('div');
    pageImgBox.classList.add('imgbox');
    pageFoxImage = document.createElement('img');
    pageFoxImage.src = json.image;
    
    pageElement.appendChild(pageImgBox);
    pageImgBox.appendChild(pageFoxImage);
    startContent.appendChild(pageElement);
    

}

function showRandomFox(event){
    fetch("fox.php").then(fetchResponse).then(randomFoxJson);
}
function checkPostJson(json){
    const startContent = document.querySelector("#startContent");
    const buttonsDivEnd = document.querySelector(".buttonsDivEnd");
    const username = document.getElementById('user');
    if(json[0].found != false){
        if(startContent.classList.contains("hidden")){
        startContent.classList.remove("hidden");
    }
    if(buttonsDivEnd.classList.contains("hidden")){
        buttonsDivEnd.classList.remove("hidden");
    }
    startContent.innerHTML='';
    const textStartDiv = document.createElement('div');
    textStartDiv.classList.add('textStart');
    textStartDiv.textContent = "Post mostrati dal più recente. Numero di post mostrati: "+ json[0].numberOfPosts;
    startContent.appendChild(textStartDiv);
    
    let nFetchedPosts = json.length;
    for(let i=0; i<nFetchedPosts; i++){       
        const pageElement = document.createElement('section');
        pageElement.classList.add('element');
        const pageNumber = document.createElement('div');
        pageNumber.classList.add("number");
        pageNumber.classList.add("hidden");
        const pageContent = document.createElement('div');
        pageContent.classList.add('content');
        const pageTitle = document.createElement('div');
        pageTitle.classList.add('title');
        const pageUsernamePosts = document.createElement('span');
        pageUsernamePosts.classList.add('usernamePosts');
        const pageTimePosts = document.createElement('span');
        pageTimePosts.classList.add('timePosts');
        const pageText = document.createElement('p');
        pageText.classList.add('text');
        const pageDeleteContent = document.createElement('div');
        pageDeleteContent.classList.add('deletecontent');
        const pageDelete = document.createElement('button');
        pageDelete.classList.add('delete');
        pageDelete.textContent = "Elimina post";
        pageImgBox = document.createElement('div');
        pageImgBox.classList.add('imgboxPost');
        pageFoxImage = document.createElement('img');
        pageFoxImage.src = json[i].fox;

        pageNumber.textContent = json[i].postid;
        pageTitle.textContent = json[i].title;
        pageUsernamePosts.textContent = "Di: " + json[i].username;
        pageText.textContent = json[i].story;
        pageTimePosts.textContent = "Pubblicato " + json[i].time;
        pageDelete.dataset.postId = json[i].postid;

        pageDiv = document.createElement('div');
        pageDiv.classList.add('buttonsDiv');
        pageDiv.textContent = "Nessun altro post da mostrare!"

        startContent.appendChild(pageElement);
        pageElement.appendChild(pageNumber);
        pageElement.appendChild(pageContent);
        pageContent.appendChild(pageTitle);
        pageContent.appendChild(pageUsernamePosts);
        pageContent.appendChild(pageTimePosts);
        pageContent.appendChild(pageText);
        pageContent.appendChild(pageDeleteContent);
        pageImgBox.appendChild(pageFoxImage);
        pageContent.appendChild(pageImgBox);

    }
    if(nFetchedPosts < nPosts){
        startContent.appendChild(pageDiv);
        buttonsDivEnd.classList.add('hidden');
    }

    }
    else{
        const emptyPostList = document.createElement('div');
        startContent.innerHTML='';
        emptyPostList.classList.add('buttonsDivDelete');
        if(startContent.classList.contains('hidden')){
            startContent.classList.remove('hidden');
        }
        emptyPostList.textContent = "Nessun post trovato!"
        startContent.appendChild(emptyPostList);
    }
}

function deletePostJson(json){
    const buttonsdivdelete = document.querySelector('.buttonsDivDelete');
    const body = document.querySelector('body')
    if(json[0].deleted){
        /* const emptyPostList = document.createElement('div');
        emptyPostList.classList.add('buttonsDivDelete');
        emptyPostList.textContent = "Post cancellato correttamente!"
        startContent.appendChild(emptyPostList); */
        const divMessageContainer = document.createElement('div');
        divMessageContainer.classList.add('messageContainer');
        const divMessageTop = document.createElement('div');
        divMessageTop.classList.add('messageTop');
        const spanXButton = document.createElement('span');
        spanXButton.classList.add('xButton');
        spanXButton.textContent = "X";
        divMessageTop.textContent = "Post cancellato con successo!";
        divMessageContainer.appendChild(divMessageTop);
        divMessageTop.appendChild(spanXButton);
        body.appendChild(divMessageContainer);
        const buttonsDivEnd = document.querySelector(".buttonsDivEnd");
        const containerForm = document.querySelector(".containerForm");
        const updateposts = document.querySelector("[data-button='show-new-posts']");
        const yourposts = document.querySelector("[data-button='your-posts']");
        containerForm.classList.add("hidden");
        if(document.querySelector('.messageContainer') != null){
            const xbuttons = document.querySelectorAll(".xButton");
            for(const xbutton of xbuttons){
                xbutton.addEventListener('click',hideBox);
            }
        }
    if(yourposts.textContent == "Chiudi i post"){
        /* if(!buttonsDivEnd.classList.contains("hidden")){
            buttonsDivEnd.classList.add("hidden");
        } */
        if(updateposts.textContent = "Aggiorna i post"){
            updateposts.textContent = "Guarda i nuovi post";
        }
        /* yourposts.textContent = "Vedi i tuoi post"; */
        return;
    }
    
    fetch("show_my_posts.php").then(fetchResponse).then(myPostsJson);
    yourposts.textContent = "Chiudi i post";

    }
}

function deletePost(event){
    event.currentTarget.parentNode.parentNode.parentNode.innerHTML = '';
    fetch("delete_post.php?q=" + event.currentTarget.dataset.postId).then(fetchResponse).then(deletePostJson);
}

function myPostsJson(json){
    const buttonsdivdelete = document.querySelector('.buttonsDivDelete');
    const startContent = document.querySelector("#startContent");
    const buttonsDivEnd = document.querySelector(".buttonsDivEnd");
    if(json[0].found){
        
    if(startContent.classList.contains("hidden")){
        startContent.classList.remove("hidden");
    }
    if(!buttonsDivEnd.classList.contains("hidden")){
        buttonsDivEnd.classList.add("hidden");
    }
    startContent.innerHTML='';
    let nFetchedPosts = json.length;
    for(let i=0; i<nFetchedPosts; i++){
        const pageElement = document.createElement('section');
        pageElement.classList.add('element');
        const pageNumber = document.createElement('div');
        pageNumber.classList.add("number");
        pageNumber.classList.add("hidden");
        const pageContent = document.createElement('div');
        pageContent.classList.add('content');
        const pageTitle = document.createElement('div');
        pageTitle.classList.add('title');
        const pageUsernamePosts = document.createElement('span');
        pageUsernamePosts.classList.add('usernamePosts');
        const pageTimePosts = document.createElement('span');
        pageTimePosts.classList.add('timePosts');
        const pageText = document.createElement('p');
        pageText.classList.add('text');
        const pageDeleteContent = document.createElement('div');
        pageDeleteContent.classList.add('deletecontent');
        const pageDelete = document.createElement('button');
        pageDelete.classList.add('delete');
        pageDelete.textContent = "Elimina post";
        pageImgBox = document.createElement('div');
        pageImgBox.classList.add('imgboxPost');
        pageFoxImage = document.createElement('img');
        pageFoxImage.src = json[i].fox;

        pageNumber.textContent = json[i].postid;
        pageTitle.textContent = json[i].title;
        pageUsernamePosts.textContent = "Di: " + json[i].username;
        pageText.textContent = json[i].story;
        pageTimePosts.textContent = "Pubblicato " + json[i].time;
        pageDelete.dataset.postId = json[i].postid;

        
            startContent.appendChild(pageElement);
            pageElement.appendChild(pageNumber);
            pageElement.appendChild(pageContent);
            pageContent.appendChild(pageTitle);
            pageContent.appendChild(pageUsernamePosts);
            pageContent.appendChild(pageTimePosts);
            pageContent.appendChild(pageText);
            pageImgBox.appendChild(pageFoxImage);
            pageContent.appendChild(pageImgBox);
            pageContent.appendChild(pageDeleteContent);
            pageDeleteContent.appendChild(pageDelete);
        
        const deleteButtons = document.querySelectorAll('.delete');
        for (const deleteButton of deleteButtons){
            deleteButton.addEventListener('click',deletePost);
        }
    }
    }
    else{
        const emptyPostList = document.createElement('div');
        startContent.innerHTML='';
        if(startContent.classList.contains('hidden')){
            startContent.classList.remove('hidden');
        }
        emptyPostList.classList.add('buttonsDivDelete');
        emptyPostList.textContent = "Nessun post da mostrare!"
        startContent.appendChild(emptyPostList);
    }
    
}

function viewUserPosts(event){
    const startContent = document.querySelector("#startContent");
    const buttonsDivEnd = document.querySelector(".buttonsDivEnd");
    const containerForm = document.querySelector(".containerForm");
    const updateposts = document.querySelector("[data-button='show-new-posts']");
    containerForm.classList.add("hidden");
    if(event.currentTarget.textContent == "Chiudi i post"){
        startContent.innerHTML='';
        if(!buttonsDivEnd.classList.contains("hidden")){
            buttonsDivEnd.classList.add("hidden");
        }
        if(updateposts.textContent = "Aggiorna i post"){
            updateposts.textContent = "Guarda i nuovi post";
        }
        event.currentTarget.textContent = "Vedi i tuoi post";
        return;
    }
    fetch("show_my_posts.php").then(fetchResponse).then(myPostsJson);
    event.currentTarget.textContent = "Chiudi i post";
}

function fetchResponse(response){
    return response.json();
}

function showPosts(event){
    const startContent = document.querySelector("#startContent");
    const containerForm = document.querySelector(".containerForm");
    containerForm.classList.add("hidden");
    nPosts = 10;
    fetch("show_new_posts.php?q="+nPosts).then(fetchResponse).then(checkPostJson);
    event.currentTarget.textContent = "Aggiorna i post";
    const mypostsbutton = document.querySelector("[data-button='your-posts']");
    mypostsbutton.textContent = "Chiudi i post";
}

function showPostsMore(event){
    const startContent = document.querySelector("#startContent");
    const containerForm = document.querySelector(".containerForm");
    containerForm.classList.add("hidden");
    nPosts +=5;
    nPostsShown = nPosts;
    fetch("show_new_posts.php?q="+nPosts).then(fetchResponse).then(checkPostJson);
}


function newFoxInPostJson(json){
    const containerForm = document.querySelector('.containerForm')
    const ciao = containerForm.querySelector('img');
    ciao.src = json.image;
}

function newFoxInPost(event){
    fetch("fox.php").then(fetchResponse).then(newFoxInPostJson);
}
function randomFoxInPostJson(json){
    

    const containerForm = document.querySelector('.containerForm');
    if(containerForm.querySelector('img') == null){
        pageImgBox = document.createElement('div');
        pageImgBox.classList.add('imgbox');
        pageFoxImage = document.createElement('img');
        pageFoxImage.src = json.image;
    
        pageImgBox.appendChild(pageFoxImage);
        containerForm.appendChild(pageImgBox);
        return;
    }
    const ciao = containerForm.querySelector('img');
    ciao.src = json.image;

    
    

}

function writePostShow(event){
    const elements = document.querySelector("#startContent");
    const containerForm = document.querySelector(".containerForm");
    elements.classList.add("hidden");
    const buttonsDivEnd = document.querySelector(".buttonsDivEnd");
    if(!buttonsDivEnd.classList.contains("hidden")){
        buttonsDivEnd.classList.add("hidden");
    }
    if(containerForm.classList.contains("hidden")){
        containerForm.classList.remove("hidden");
    }
    if(textStartDiv = document.querySelector('.textStartWithButton') == null){
        const textStartDiv = document.createElement('div');
        textStartDiv.classList.add('textStartWithButton');
        textStartDiv.textContent = "Scegli una volpe da includere nel tuo post: ";
        containerForm.appendChild(textStartDiv);
        const button = document.createElement('button');
        button.classList.add('buttonBig');
        button.textContent = "Genera nuova volpe";
        button.dataset.button = "generate-new-fox";
        textStartDiv.appendChild(button);
        const buttonGenerateNewFox = document.querySelector("[data-button='generate-new-fox']");
        buttonGenerateNewFox.addEventListener('click',newFoxInPost);
    }
    fetch("fox.php").then(fetchResponse).then(randomFoxInPostJson);
    
    
}

function sendPost(event){
    const title = document.querySelector("#title");
    const story = document.querySelector("#story");
    const storyForm = document.querySelector("#storyForm");
    const hiddenInput = document.querySelector("#urlFox");
    const urlFox = document.querySelector(".containerForm img");
    hiddenInput.value = urlFox.src;
    if(title.value === '' || story.value === '' || title.value === null || story.value === null){
        if(title.classList.contains("inputError")){
            event.preventDefault();
            return;
        }
        event.preventDefault();
        const errorMessage = document.createElement("span");
        errorMessage.classList.add("errormessage");
        errorMessage.textContent = 'Compila tutti i campi.';
        storyForm.appendChild(errorMessage);
        title.classList.add("inputError");
        story.classList.add("inputError");
         
    }
    else if(title.value.length > 30 || story.value.length > 280){
        if(title.classList.contains("inputError")){
            event.preventDefault();
            return;
        }
        event.preventDefault();
        const errorMessage = document.createElement("span");
        errorMessage.classList.add("errormessage");
        errorMessage.textContent = 'Titolo o storia troppo grande!';
        storyForm.appendChild(errorMessage);
        title.classList.add("inputError");
        story.classList.add("inputError");
    }
}


