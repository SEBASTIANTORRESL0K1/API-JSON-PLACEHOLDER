let contador=100;
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
                    <button onclick="eliminarPost(${post.id})" class="btnPost"> - </button>

                </div>
                <div id="divComentarios${post.id}"></div>
            </div>
            `;
        })
    })
    const btnOcultarPosts=document.getElementById('btnOcultarPosts');
    btnOcultarPosts.classList.remove('visibilidad');
    const formulario=document.getElementById('formulario');
    formulario.classList.remove('visibilidad');
    formulario.innerHTML=`
        <form id="form">
            <label>Título del Post</label>
            <input type="text" id="postText">
            <label>Cuerpo del Post</label>
            <textarea type="text" id="postBody"></textarea>
            <button onclick="enviarPost()" type="button">Enviar Post</button>
        </form>
    `;
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
        const divForm=document.getElementById("formulario");
        divForm.classList.add("visibilidad");
    })

function enviarPost(){
    const selectUsuarios=document.getElementById('selectUsuarios');
    let id=selectUsuarios.value;
    let postText=document.getElementById("postText").value;
    let postBody=document.getElementById("postBody").value;
    let post={"userId":id,"id":++contador,title:postText,body:postBody};
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
          title: postText,
          body: postBody,
          userId: id,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((json) => console.log(json));
    document.getElementById("postText").value="";
    document.getElementById("postBody").value="";
    const divPosts=document.getElementById('divPosts');
    divPosts.innerHTML+=`
    <div id="divPost${post.id}" class="divPost">
        <h3 id="titlePost${post.id}" class="h3Post">${post.title}</h3>
        <p id="bodyPost${post.id}" class="pPost">${post.body}</p>
        <div class="divBotones">
            <button onclick="verComentarios(${post.id})" class="btnPost" id="btnVerComentarios${post.id}"> Ver comentarios</button>
            <button onclick="ocultarComentarios(${post.id})" class="visibilidad btnPost" id="btnOcultarComentarios${post.id}"> Ocultar comentarios</button>
            <button onclick="eliminarPost(${post.id})" class="btnPost"> - </button>

        </div>
        <div id="divComentarios${post.id}"></div>
    </div>
    ` ;
}
function eliminarPost(id){
    let divPosts=document.getElementById("divPosts");
    let postEliminar=document.getElementById(`divPost${id}`);
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE',
    })
      .then((response) => {
        if(response.ok){
            console.log("Eliminado");
            divPosts.removeChild(postEliminar);

        }
        else{
            console.log("No se eliminó");
        }
      })
}