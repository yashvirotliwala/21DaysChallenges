const input = document.getElementById("searchInput");
const results = document.getElementById("results");
const statusText = document.getElementById("status");

let timer;

// Debounce Function
function debounceSearch(value){
    clearTimeout(timer);

    timer = setTimeout(()=>{
        fetchWords(value);
    },600);
}

// API Search
async function fetchWords(query){
    if(query.trim() === ""){
        results.innerHTML = "";
        statusText.innerText = "Start typing...";
        return;
    }

    statusText.innerText = "Searching...";

    try{
        const res = await fetch(`https://api.datamuse.com/sug?s=${query}`);
        const data = await res.json();

        showResults(data);
    }catch(error){
        statusText.innerText = "Error fetching data.";
    }
}

// Show Results
function showResults(words){
    results.innerHTML = "";

    if(words.length === 0){
        statusText.innerText = "No results found.";
        return;
    }

    statusText.innerText = `${words.length} Predictions Found`;

    words.slice(0,10).forEach(word=>{
        const div = document.createElement("div");
        div.classList.add("item");
        div.innerHTML = `
            <strong>${word.word}</strong><br>
            AI Suggestion Based on Input
        `;
        results.appendChild(div);
    });
}

// Event
input.addEventListener("keyup",(e)=>{
    debounceSearch(e.target.value);
});