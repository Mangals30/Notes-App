'use strict'

let notes = getNotes()
const noteId = location.hash.substring(1)
let titleInput = document.querySelector('#title')
let bodyInput = document.querySelector('#body')
let lastUpdated = document.querySelector('#last-updated')
let timeStamp = moment().valueOf()
let note = notes.find(element => element.id == noteId)
const saveNote = (notes) => {
  localStorage.setItem('notes',JSON.stringify(notes))
}
const updateNotes = (notes,note,index) => {
  notes[index].updatedAt = timeStamp
  lastUpdated.textContent = moment(note.updatedAt).fromNow()
  saveNote(notes)
}
const getIndex = () => {
  let index = notes.findIndex(note => note.id == noteId)
  return index
}
if(!note) {
  location.assign('index.html')
}

else {
  titleInput.value = note.title
  bodyInput.value = note.body
  lastUpdated.textContent = moment(note.updatedAt).fromNow()
  titleInput.addEventListener('input', (e) => {
  note.title = e.target.value.trim().length==0 ? 'Untitled' : e.target.value  
    let index = getIndex()
    notes[index].title = note.title
    updateNotes(notes,note,index)
  })
  bodyInput.addEventListener('input', (e) => {
    note.body = e.target.value
    let index = getIndex()
    notes[index].body = note.body
    updateNotes(notes,note,index)
  })
  
  document.querySelector('#home').addEventListener('click',(e) => {
    e.preventDefault()
    location.assign('index.html')
  })

  document.querySelector('#remove-note').addEventListener('click',(e) => {
    e.preventDefault()
    let index = getIndex()
    notes.splice(index,1)
    saveNote(notes)
    location.assign('index.html')
  })

  document.querySelector('#save-note').addEventListener('click',(e) =>{
    e.preventDefault()
   location.assign('index.html')
  })
  
}

window.addEventListener('storage',(e) =>{
  if(e.key == 'notes') {
    let notes = getNotes()
    notes = JSON.parse(e.newValue)
    let note = notes.find(element => element.id == noteId)
    if(!note) {
      location.assign('index.html')
    }
    else {
      titleInput.value = note.title
      bodyInput.value = note.body
     
    }
  }
 
})