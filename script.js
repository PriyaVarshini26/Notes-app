//query selector
let form = document.querySelector('form');
let inputTitle = document.querySelector('#title');
let inputNote = document.querySelector('#note');

let noteContainer = document.querySelector('.note-container')
console.log(form);

// let template=`
//     <div class="note">
//         <h2 class="note-title">{title}</h2>
//         <p class="note-body">{body}</p>
//     </div>
// `

let notes = [];

//class for new note
class Note {
    constructor(title, body){
        this.title=title;
        this.body = body;
        this.id = Math.random();
    }
}

let removeNote = (e) => {
    e.target.parentNode.removeChild(e.target);
}

let refreshUI = () => {
    console.log(notes);
    let notesHTML = '';
    for(let i=0; i<notes.length; i++){
        let updatedTemplate = getTemplateObject(notes[i].title,notes[i].body);
        noteContainer.appendChild(updatedTemplate);
       // let updatedTemplate = template
         //                           .replace('{title}',notes[i].title)
           //                         .replace('{body}',notes[i].body)
        notesHTML= updatedTemplate + notesHTML;
    }
    //console.log(notesHTML);
    //noteContainer.innerHTML = notesHTML;
}

let getTemplateObject = (title,body) => {
    const newUINote = document.createElement('div')
    newUINote.classList.add('note');
    newUINote.innerHTML = `
     <h2 class = "note-title"> ${title} </h2>
     <p class = "note-body"> ${body} <p>
     `
     newUINote.addEventListener('click',removeNote)

     return newUINote;
}

let submitForm=(e) => {
    e.preventDefault();
    let title = inputTitle.value;
    let note = inputNote.value;

    let newNoteObj = new Note(title, note);

    notes.push(newNoteObj);

    localStorage.setItem('notesApp.notes',JSON.stringify(notes));//to store in local storage

    refreshUI();

//     const newUINote = document.createElement('div')
//     newUINote.classList.add('note');
//     newUINote.innerHTML = `
//     <h2 class = "note-title> ${title} </h2>
//     <p class = "note-body"> ${note} <p>
//     `
//     newUINote.addEventListener('click',removeNote)
//     noteContainer.appendChild(newUINote);
 }
form.addEventListener('submit',submitForm);

let displayNotes = (e) => {
    notes=JSON.parse(localStorage.getItem('notesApp.notes'));
    // notes = localStorage.getItem('notesApp.notes');
    if (notes == null){
        notes =[];
    }
    console.log(notes);
    refreshUI();
}

document.addEventListener('DOMContentLoaded',displayNotes);