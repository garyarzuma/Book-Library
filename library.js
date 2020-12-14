
//When user Presses buttons//
document.querySelector('.newBookButton').addEventListener('click', newBookPopUp); 
document.querySelector('.closeButton').addEventListener('click', closePopUp); 
document.querySelector('.submitButton').addEventListener('click', handleFormInput); 

let myLibrary = [];


//book object definition
function Book(title, author, numOfPages, haveRead){
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.haveRead = haveRead;
    this.info = function(){
      const infoText = `${title} by ${author}, ${numOfPages} pages, ${haveRead === "on" ? "have read":"not read yet"}`
      return infoText;
    }
  }

function addBookToLibrary(title, author, numOfPages, haveRead){
    const myBook = new Book(title, author, numOfPages, haveRead);
    myLibrary.push(myBook);
}

//Sample books
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, "on");
addBookToLibrary("The Hobbit", "234234", 295, "off");
addBookToLibrary("The Hobbit", "iran", 295, "off");
addBookToLibrary("The Hobbit", "killer", 295, "on");
addBookToLibrary("The Hobbit", "fred", 295, "off");


function displayCurrentBooks(){
    myLibrary.forEach(element => createBookCard(element));
}

function createBookCard(myBook){
    myDivNode = document.createElement('div');

    myDivNode.className = "bookCard";
    myDivNode.setAttribute('data-array', myLibrary.indexOf(myBook)); //sets data-array attribute for each book to the index it is in the myLibrary array;
    myDivNode.textContent = myBook.info();
    //remove
    console.log(myDivNode);
    //remove
    document.querySelector("body").appendChild(myDivNode);
}

function handleFormInput(e){
    const myForm = e.target.form;

    addBookToLibrary(myForm.title.value, 
                     myForm.author.value,
                     myForm.numberOfPages.value,
                     myForm.haveRead.value
    )

    closePopUp();
    createBookCard(myLibrary[myLibrary.length-1]);
}
//open new book addition menu popup
function newBookPopUp(){
    document.getElementById("myForm").style.display = "flex";
}

//close new book addition menu popup without submitting
function closePopUp(){
    document.getElementById("myForm").style.display = "none";
}

displayCurrentBooks();