const container = document.querySelector('.card-container')
const bookDialog = document.querySelector('#book-dialog')
const showDialog = document.querySelector('#show-dialog')
const closeDialog = document.querySelector('#close-dialog')
const submitForm = document.querySelector('#submit-form')
const titleInput = bookDialog.querySelector('#title')
const authorInput = bookDialog.querySelector('#author')
const pagesInput = bookDialog.querySelector('#pages')
const readInput = bookDialog.querySelector('#read')
const form = document.querySelector('form')
const titleErr = document.querySelector('.titleErr')
const authErr = document.querySelector('.authErr')
const pageErr = document.querySelector('.pageErr')
const readErr = document.querySelector('.readErr')

form.addEventListener('submit',(e) => {
    e.preventDefault()
    if(!titleInput.validity.valid){
        showInputErr()
    }else if(!authorInput.validity.valid){
        showAuthorErr()
    }else if(!pagesInput.validity.valid){
        showPageErr()
    }
    else{
        if(readInput.value == 'yes' || readInput.value === 'no' ){
            addToLibrary()
            readErr.textContent = ''
        }else{
            readErr.textContent = 'It should be yes or no.'
        }
    }
})

titleInput.addEventListener('input',() => {
    if(!titleInput.validity.valid){
        showTitleErr()
    }else{
        titleErr.textContent = ''
    }
})

authorInput.addEventListener('input',() => {
    if(!authorInput.validity.valid){
        showAuthorErr()
    }else{
        authErr.textContent = ''
    }
})

pagesInput.addEventListener('input',() => {
    if(!pagesInput.validity.valid){
        showPageErr()
    }else{
        pageErr.textContent = ''
    }
})

function showTitleErr() {
    if(titleInput.validity.typeMismatch){
        titleErr.textContent = 'It must be a valid title.'
    }else if(titleInput.validity.tooShort){
        titleErr.textContent = 'Too short value it must greater than 2 characters.'
    }
}
function showAuthorErr() {
    if(authorInput.validity.typeMismatch){
        authErr.textContent = 'It must be a valid author.'
    }else if(authorInput.validity.tooShort){
        authErr.textContent = 'Too short value it must greater than 2 characters.'
    }
}
function showPageErr(){
    if(pagesInput.validity.typeMismatch){
        pageErr.textContent = 'It must be a valid.'
    }else if(pagesInput.validity.rangeOverflow){
        pageErr.textContent = 'Too high value it must lower than 10000.'
    }
}

class Book {
    constructor(title, author, pages, read) {
        this.title = title
        this.author = author
        this.pages = pages
        this.read = read
    }
    #info() {
        return `The ${this.title} by ${this.author}, ${this.pages} ,${this.read}`
    }
}

let book1 = new Book('Harry Potter and the Goblet of Fire','J.K Rowling','734','yes')
let book2 = new Book('The Lord of the Rings','J.R.R Tolkien','1216','no')
let book3 = new Book('Marienbad My Love','Mark Leach','10,710','yes')
let book4 = new Book('The Blah Story ','Nigel Tomm','7312 ','no')
let book5 = new Book('Infinite Jest','David Foster Wallace','1088 ','no')
let book6 = new Book('The Stand','Stephen King','1152','yes')
let book7 = new Book('The Goldfinch','Donna Tartt','771','yes')
let book8 = new Book('Vanity Fair','William Makepeace Thackeray','816 ','no')
let book9 = new Book('A Suitable Boy','A Suitable Boy','1349','no')

const myBook = [
    book1,book2,book3,book4,book5,book6,book7,book8,book9
    
  ]
function clearInput(){
    titleInput.value = ''
    authorInput.value = ''
    pagesInput.value = ''
    readInput.value = ''
}

function addToLibrary(){
    let bookTitle = titleInput.value
    let bookAuthor = authorInput.value
    let bookPages = pagesInput.value
    let bookRead = readInput.value
    container.textContent = ''
    let newBooks = new Book(bookTitle,bookAuthor,bookPages,bookRead)
    myBook.push(newBooks)
    displayBook(myBook)
    clearInput()  
}

function displayBook(book){
    book.map(x =>{
        const card = document.createElement('div')
        const removeBtn = document.createElement('button')
        const toggleRead = document.createElement('button')
        const cardTitle = document.createElement('div')
        const cardAuthor = document.createElement('div')
        const cardPages = document.createElement('div')
        const cardRead = document.createElement('div')
        const cardBtnDiv = document.createElement('div')

        toggleRead.textContent = `Toggle Read`
        removeBtn.textContent = 'Remove'

        card.classList.add('display-card')
        container.appendChild(card)
        card.appendChild(cardTitle)
        cardTitle.textContent = `Title : ${x.title}`
        card.appendChild(cardAuthor)
        cardAuthor.textContent = `Author : ${x.author}`
        card.appendChild(cardPages)
        cardPages.textContent = `Pages : ${x.pages}`
        card.appendChild(cardRead)
        cardRead.textContent = `Read : ${x.read}`

        card.appendChild(cardBtnDiv)
        cardBtnDiv.classList.add('btn-div')
        cardBtnDiv.appendChild(removeBtn)
        cardBtnDiv.appendChild(toggleRead)

        removeBtn.addEventListener('click',()=>{
            card.setAttribute('data-index',`${book.indexOf(x)}`)
            book.splice(card.dataset.index,1)
            container.removeChild(card)
            console.log(myBook)
        })
        toggleRead.addEventListener('click',()=>{
           
            if(x.read.toLowerCase() === 'yes'){
                x.read = 'no'
                cardRead.textContent = `Read : ${x.read}`
            }
            else if(x.read.toLowerCase() === 'no'){
                x.read = 'yes'
                cardRead.textContent = `Read : ${x.read}`
                
            }   
    })
    })
}
displayBook(myBook)

showDialog.addEventListener('click',()=>{
    bookDialog.showModal()
})

closeDialog.addEventListener('click',()=>{
    bookDialog.close()
    clearInput()
})


