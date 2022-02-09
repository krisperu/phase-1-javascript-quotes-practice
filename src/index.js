const url = "http://localhost:3000/quotes"


// DOM selectors && Created elements
const  list = document.querySelector('#quote-list')
const newForm = document.querySelector("#new-quote-form")

// Register Listeners
newForm.addEventListener('submit', handleNewQuote)

// Fetches
function fetchAllQuotes(){
    return fetch(url)
    .then(res => res.json())
}

// Rendering Functions
function renderAllQuotes(quotesArr){
    quotesArr.forEach(renderOneQuote)
}

function renderOneQuote(quoteObj){
    const li = document.createElement('li')
     li.innerHTML = `
     <blockquote class="blockquote">
        <p class="mb-0">${quoteObj.quote}</p>
        <footer class="blockquote-footer">${quoteObj.author}</footer>
        <br>
        <button class='btn-success'>Likes: <span>${quoteObj.likes}</span></button>
        <button class='btn-danger'>Delete</button>
      </blockquote>
     `
     li.classList.add("quoute-card")
     const deleteBtn = li.querySelector('.btn-danger')
     const likeBtn = li.querySelector('.btn-success')

     deleteBtn.addEventListener('click', () => li.remove())
     likeBtn.addEventListener('click', () => handleAddLike(li))

     list.appendChild(li)
}

// Event Handlers
function handleNewQuote(e){
    e.preventDefault()
    const quote = e.target.quote.value
    const author = e.target.author.value
    console.log('quote', quote);
    // const newQuote = {
    //     quote: quote,
    //     author: author,
    //     likes: 0

    const newQuote = {
        quote,
        author,
        likes: 0
    }
    renderOneQuote(newQuote)
    e.target.reset()
}

function handleAddLike(li){
    const likeSpan = li.querySelector('span')
    const likes = parseInt(likeSpan.textContent)
    likeSpan.textContent = likes + 1
}

// Initializer(s)

fetchAllQuotes().then(renderAllQuotes)