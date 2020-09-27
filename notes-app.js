'use strict'

const getNotes = () => {
try {
  const notesJSON = localStorage.getItem('notes')
  let notes = notesJSON!=null ? JSON.parse(notesJSON) :  []
   return notes
} catch (error) {
  return []
}
}

const generateNotesDOM = (filteredNotes) => {
  document.querySelector('#notes').innerHTML = ''
  filteredNotes.forEach((note) => {
    let notesEl = document.createElement('div')
    notesEl.setAttribute('id','notes-element')
    let buttonEl = document.createElement('button')
    buttonEl.textContent='Remove'
    let textEl = document.createElement('a')
    textEl.href = `edit.html#${note.id}`
    textEl.textContent = note.title
    notesEl.appendChild(buttonEl)
    notesEl.appendChild(textEl)
    document.querySelector('#notes').appendChild(notesEl)
    buttonEl.addEventListener('click', (e) => {
      e.preventDefault()
      const newNotes = getNotes()
      const removedTasks = newNotes.filter(element => element.id!=note.id)
      localStorage.setItem('notes',JSON.stringify(removedTasks))
      renderNotes(removedTasks,filters)
    })
  })

}

const sortNotes = (notes,filters) => {
  if(filters.sortBy == 'byEdited') {
    notes.sort((a,b) => {
      if(a.updatedAt > b.updatedAt) return -1
      else if(a.updatedAt < b.updatedAt) return 1  
      else return 0 
    })
  }
  else if(filters.sortBy == 'byCreated') {
    notes.sort((a,b) => {
      if(a.createdAt > b.createdAt) return -1
      else if(a.createdAt < b.createdAt) return 1  
      else return 0 
    })
  }
  else {
    notes.sort((a,b) => {
      if(a.title.toLowerCase() < b.title.toLowerCase()) return -1
      else if(a.title.toLowerCase() > b.title.toLowerCase()) return 1  
      else return 0 
    })
  }
  
  return notes
}

const renderNotes = (notes, filters) => {
  notes = sortNotes(notes,filters)
  const filteredNotes = notes.filter(note => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))
  generateNotesDOM(filteredNotes)
}

window.addEventListener('storage',(e) => {
  let notes = getNotes()
  notes = JSON.parse(e.newValue)
  renderNotes(notes,filters)
})