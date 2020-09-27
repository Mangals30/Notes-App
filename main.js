'use strict'

let notes = getNotes()

const filters = {
  searchText : '',
  sortBy : 'byEdited'
}

let timeStamp = moment().valueOf()


document.querySelector('#add-notes').addEventListener('click', (e) => {
  e.preventDefault()
  const newNotes = getNotes()
  let addInput = document.querySelector('#add-notes-input')
  if(addInput.value.trim().length==0) {
    addInput.value = 'Untitled'
     }
    const id = uuidv4()
    newNotes.push({id,title:addInput.value,body:'',createdAt: timeStamp, updatedAt: timeStamp})
    localStorage.setItem('notes',JSON.stringify(newNotes))
    //renderNotes(notes,filters)
    addInput.value=''
    location.assign(`edit.html#${id}`)
})

document.querySelector('#search-text').addEventListener('input', (e) => {
  const newNotes = getNotes()
  filters.searchText = e.target.value
  renderNotes(newNotes,filters)
})

document.querySelector('#filter-by').addEventListener('change', (e) => {
  let notes = getNotes()
  filters.sortBy = e.target.value
  renderNotes(notes,filters)
})

renderNotes(notes,filters)


