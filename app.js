const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quoteid');
const loader = document.getElementById('loader');

//Getting Quotes form an API
let apiQuotes = [];

//Show Loading
function showLoading()
{
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Hide Loading
function complete()
{
    quoteContainer.hidden = false;
    loader.hidden = true;
}

//Show new Quote
function newQuote()
{
    showLoading();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    //check if the author field is empty
    if(!quote.author)
    {
        authorText.textContent = 'Anonymous';
    }
    else
    {
        authorText.textContent = quote.author;
    }

    //Check for Quote Length to determine styling
    if(quote.text.length > 100)
    {
        quoteText.classList.add('long-quote');
    }
    else
    {
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;

    complete();
}

async function getQuotes() {

    showLoading();
    const apiURL = 'https://type.fit/api/quotes';
    try
    {
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        newQuote();
    }

    catch (error)
    {
        //catch error here
    }
}

//Tweet a Quote
function tweetQuote()
{
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

//Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

//On load
getQuotes();
//showLoading();
