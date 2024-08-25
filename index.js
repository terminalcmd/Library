const container = document.querySelector('.card-container')
const bookDialog = document.querySelector('#book-dialog')
const showDialog = document.querySelector('#show-dialog')
const closeDialog = document.querySelector('#close-dialog')
const submitForm = document.querySelector('#submit-form')
const titleInput = bookDialog.querySelector('#title')
const authorInput = bookDialog.querySelector('#author')
const pagesInput = bookDialog.querySelector('#pages')
const readInput = bookDialog.querySelector('#read')

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

    if(bookTitle !== '' && bookAuthor !== '' && bookPages !== '' && bookRead !== ''){
        if( bookPages !== '0' && !bookPages.includes('-')){
            container.textContent = ''
            let newBooks = new Book(bookTitle,authorInput.value,pagesInput.value,bookRead)
            myBook.push(newBooks)
            displayBook(myBook)
            clearInput()
        }
        else{
            alert('Start No.of pages from 1')
            clearInput()
        }
    }
    else{
        alert('Fill the form to add a book ')
        clearInput()
        
    }
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
submitForm.addEventListener('click', (e)=>{
    e.preventDefault()
    bookDialog.close(addToLibrary())
})

