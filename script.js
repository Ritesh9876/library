// Book class: represents a book

class Book{
    constructor(title,author,pageNo){
        this.title=title;
        this.author=author;
        this.pageNo=pageNo
    }
}

//UI interface
class UI{
    static displayBooks(){
       const StoredBooks=[
              {
                  title:"Gita",
                  author:"Krishna",
                  pageNo:"100"
              }
              
          ];
          const books=StoredBooks;
          books.forEach((book) => UI.addBookToList(book));
    }
    static addBookToList(book){
        const list=document.querySelector("#book-list");
        const row= document.createElement('tr');
        row.innerHTML=`
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.pageNo}</td>
        <td><a href="#" class="delete">delete</a></td>
        <td><a href="#" class="read">read</a></td>
        `;
        list.appendChild(row);
           }
           static showalert(text,className){
             const NewDiv=document.createElement("div");
             NewDiv.className=`alert-${className}`;
             const para=document.createElement("p");
             para.textContent=text;
             NewDiv.appendChild(para);
             const container=document.querySelector(".container");
             const form=document.querySelector("#form-book");
             container.insertBefore(NewDiv,form);
             setTimeout(() => {document.querySelector(`.alert-${className}`).remove()}, 2000);
           }
           static clearInput(){
            document.querySelector("#title").value="";
            document.querySelector("#author").value="";
            const pageNo=document.querySelector("#pageNo").value="";
           }
           static deleteBook(el){
               if(el.classList.contains("delete")){
                   el.parentElement.parentElement.remove();
               }
           }
           static ReadStatus(el){
               
                  if( el.classList.contains("read")){
                    el.classList.remove("read");
                    el.classList.add("not-read");
                      el.innerHTML="not read";
                  }
                  else{
                    el.classList.remove("not-read");
                    el.classList.add("read");
                      el.textContent="read";
                  }
               
           }
}

//add book 
const submit=document.querySelector("#submit").addEventListener("click",(e)=>{
    e.preventDefault();
    const title=document.querySelector("#title").value;
    const author=document.querySelector("#author").value;
    const pageNo=document.querySelector("#pageNo").value;

    //Check all spaces are filled
    if(title===""||author===""||pageNo===""){
UI.showalert("Please fill the full form","danger");
    }
   else{
    const book= new Book(title,author,pageNo);

    UI.addBookToList(book);
    UI.showalert("Book Add","info");
UI.clearInput();
   }
});
//remove book
document.querySelector('#book-list').addEventListener("click",(e)=>{
    UI.deleteBook(e.target); 
    if(e.target.classList.contains("delete")){   
    UI.showalert("Book Remove","focus");
}
});
//local storage
//Display Books
document.addEventListener('DOMContentLoaded',UI.displayBooks);
//read or not-read
document.querySelector('#book-list').addEventListener("click",(e)=>{
    UI.ReadStatus(e.target);    
    
});
