const btnMostrarPosts=document.getElementById('btnMostrarPosts');
fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(usuarios =>{
        selectUsuarios.innerHTML="";
        usuarios.forEach(usuario=>{
            selectUsuarios.innerHTML+=`<option value="${usuario.id}">${usuario.name}</option>`;
        })
    })



btnMostrarPosts.addEventListener('click',()=>{
    const selectUsuarios=document.getElementById('selectUsuarios');
    let id=selectUsuarios.value;
    const divPosts=document.getElementById('divPosts');
    divPosts.innerHTML="";
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
    .then(response => response.json())
    .then(posts=>{
        posts.forEach(post=>{
            divPosts.innerHTML+=`
            <div id="divPost${post.id}" class="divPost">
                <h3 id="titlePost${post.id}" class="h3Post">${post.title}</h3>
                <p id="bodyPost${post.id}" class="pPost">${post.body}</p>
                <div class="divBotones">
                    <button onclick="verComentarios(${post.id})" class="btnPost" id="btnVerComentarios${post.id}"> Ver comentarios</button>
                    <button onclick="ocultarComentarios(${post.id})" class="visibilidad btnPost" id="btnOcultarComentarios${post.id}"> Ocultar comentarios</button>
                </div>
                <div id="divComentarios${post.id}"></div>
            </div>
            `;
        })
    })
    const btnOcultarPosts=document.getElementById('btnOcultarPosts');
    btnOcultarPosts.classList.remove('visibilidad');
})

function verComentarios(idPost){
    const divComentarios=document.getElementById(`divComentarios${idPost}`);
    divComentarios.innerHTML="";
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${idPost}`)
    .then(response => response.json())
    .then(comentarios=>{
        comentarios.forEach(comentario=>{
            divComentarios.innerHTML+=`
            <div id="divComentario${comentario.id}" class="divComentarios">
                <h4 id="nameComentario${comentario.id}" class="h4Comentarios" >${comentario.name}</h4>
                <p id="emailComentario${comentario.id}" class="pComentarios">${comentario.email}</p>
                <p id="bodyComentario${comentario.id}" class="pComentarios">${comentario.body}</p>
            </div>
            `;
        })
        const btnOcultarComentarios=document.getElementById(`btnOcultarComentarios${idPost}`);
        btnOcultarComentarios.classList.toggle('visibilidad');
        const btnVerComentarios=document.getElementById(`btnVerComentarios${idPost}`);
        btnVerComentarios.classList.toggle('visibilidad');
    })
}
function ocultarComentarios(idPost){
    const divComentarios=document.getElementById(`divComentarios${idPost}`);
    divComentarios.innerHTML="";
    const btnOcultarComentarios=document.getElementById(`btnOcultarComentarios${idPost}`);
    btnOcultarComentarios.classList.toggle('visibilidad');
    const btnVerComentarios=document.getElementById(`btnVerComentarios${idPost}`);
    btnVerComentarios.classList.toggle('visibilidad');
}
const btnOcultarPosts=document.getElementById('btnOcultarPosts');

btnOcultarPosts.addEventListener('click',()=>{
    const divPosts=document.getElementById('divPosts');
    divPosts.innerHTML="";
    btnOcultarPosts.classList.toggle('visibilidad');
})
const selectUsuarios=document.getElementById("selectUsuarios");
    selectUsuarios.addEventListener("change",()=>{
        btnMostrarPosts.classList.remove("visibilidad");
        btnOcultarPosts.classList.add("visibilidad");
        document.getElementById("divPosts").innerHTML="";
    })