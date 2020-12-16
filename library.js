//When user Presses buttons//
document.querySelector('.newBookButton').addEventListener('click', newBookPopUp); 
document.querySelector('.closeButton').addEventListener('click', closePopUp); 
document.querySelector('.submitButton').addEventListener('click', handleFormInput); 

let myLibrary = [];

//Sample books
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, "on");
addBookToLibrary("Harry Potter and the Chamber of Secrets", "JK Rowling", 390, "off");

displayCurrentBooks();

//book object definition
function Book(title, author, numOfPages, haveRead){
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.haveRead = haveRead;
}

function addBookToLibrary(title, author, numOfPages, haveRead){
    const myBook = new Book(title, author, numOfPages, haveRead);
    myLibrary.push(myBook);
}

function displayCurrentBooks(){
    myLibrary.forEach(element => createBookCard(element));
}

function createBookCard(myBook){
    //creates Card div and sets up the data-array attribute to hold the location of the book in the myLibrary array
    const myCardNode = document.createElement('div');
    myCardNode.className = "bookCard";
    myCardNode.setAttribute('data-array', myLibrary.indexOf(myBook)); //sets data-array attribute for each book to the index it is in the myLibrary array;
    document.querySelector(".cardContainer").appendChild(myCardNode);

    //adds the x button to corder of card
    addXButton(myCardNode);
    
    //creates Divs for the title, author, pages;
    for(prop in myBook){
        let myDivNode = document.createElement('div');
        if (prop === "title" || prop === "author" || prop === "numOfPages"){
            myDivNode.className = prop;
            myDivNode.textContent = myBook[prop];
            document.querySelector(`[data-array="${myLibrary.indexOf(myBook)}"]`).appendChild(myDivNode);
        }
        if (prop === "numOfPages"){
            myDivNode.textContent += " pages";
        }
        if (prop === "haveRead"){
            let myButtonNode = document.createElement('button');
            myButtonNode.className = (myBook[prop] === "on") ? "read-book" : "not-read-book";
            myButtonNode.textContent = (myBook[prop] === "on") ? "✓ Read" : "X Read";
            document.querySelector(`[data-array="${myLibrary.indexOf(myBook)}"]`).appendChild(myButtonNode);
            myButtonNode.addEventListener("click", toggleRead);
        }
    }
}

function addXButton(myCardNode){
    const myImg = document.createElement('img');
    myImg.src = "xbutton.png";
    myImg.className = "x-button";
    myCardNode.appendChild(myImg);

    myImg.addEventListener("click", removeBook);
}

function removeBook(e){
    const bookToRemove  = myLibrary[e.target.parentElement.dataset.array];
    let j = 0;

    //actually removes the object from myLibrary
    for (let i = 0; i < myLibrary.length; i++) {
       if (myLibrary[i] !== bookToRemove) { //removes the object from myLibrary and shifts other books down 1 index. 
           myLibrary[j] = myLibrary[i];
           document.querySelector(`[data-array="${i}"]`).setAttribute('data-array', j);//updates Div values so they still correspond to the index of myLibrary
           j++;
        }
    }

    //removes just the card from showing
    document.querySelector('.cardContainer').removeChild(e.target.parentElement);
    
    myLibrary.pop(); //remove last element from array because it will end up repeating the last element twice
}

function toggleRead(e){
    //toggle the visuals of the button of the book card
    e.target.textContent = (e.target.className === "read-book") ? "X Read" : "✓ Read";
    e.target.className = (e.target.className === "read-book") ? "not-read-book" : "read-book";

    //toggle whether the book in the library is read or not
    const bookIndex = e.target.parentElement.getAttribute('data-array'); 
    myLibrary[bookIndex].haveRead = (myLibrary[bookIndex].haveRead === "on" ) ? "off" : "on";
}

function handleFormInput(e){
    const myForm = e.target.form;

    addBookToLibrary(myForm.title.value, 
                     myForm.author.value,
                     myForm.numberOfPages.value,
                     myForm.haveRead.value
    )

    closePopUp();
    clearForm(myForm);
    createBookCard(myLibrary[myLibrary.length-1]); //Creates book card for the book we just added to array which would be the last one, hence length - 1;
}

//open new book addition menu popup
function newBookPopUp(){
    document.getElementById("myForm").style.display = "block";
}

//close new book addition menu popup without submitting
function closePopUp(){
    document.getElementById("myForm").style.display = "none";
}

//clears the stuff you entered into the form if you submitted it
function clearForm(myForm){
    myForm.title.value = "";
    myForm.author.value= "";
    myForm.numberOfPages.value = "";
    myForm.haveRead.value = "off";
}

