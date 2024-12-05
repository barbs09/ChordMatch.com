const searchBtn = document.getElementById('search-btn');
const chordInput = document.getElementById('chord-input');
const resultsList = document.getElementById('results-list');

// Sua chave de API e ID do mecanismo de pesquisa
const apiKey = 'SUA_CHAVE_API_AQUI';
const searchEngineId = '547baec8756a84ae4'; // ID do mecanismo fornecido

// Função para realizar a busca
async function searchChords() {
    const chords = chordInput.value.trim();
    if (!chords) {
        alert('Please enter a chord progression!');
        return;
    }

    const query = encodeURIComponent(chords);
    const url = `https://www.googleapis.com/customsearch/v1?q=${query}&key=${apiKey}&cx=${searchEngineId}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Processa e exibe os resultados
        displayResults(data);
    } catch (error) {
        console.error('Error fetching search results:', error);
        alert('Something went wrong while searching. Please try again later.');
    }
}

// Função para exibir resultados
function displayResults(data) {
    resultsList.innerHTML = ''; // Limpa resultados anteriores
    if (!data.items || data.items.length === 0) {
        resultsList.innerHTML = '<li>No results found.</li>';
        return;
    }

    data.items.forEach((item) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <strong>${item.title}</strong><br>
            <a href="${item.link}" target="_blank">${item.link}</a>
        `;
        resultsList.appendChild(listItem);
    });
}

// Função para integrar gcse-search com o botão de busca
function triggerGCSESearch(chords) {
    const searchBox = document.querySelector('.gcse-searchbox input');
    if (searchBox) {
        searchBox.value = chords;
        const searchButton = document.querySelector('.gcse-searchbox button');
        searchButton?.click(); // Dispara a busca integrada do Google
    }
}

// Gerenciar clique do botão
searchBtn.addEventListener('click', () => {
    const chords = chordInput.value.trim();
    if (!chords) {
        alert('Please enter a chord progression!');
    } else {
        // Aciona tanto a busca personalizada quanto a do gcse
        searchChords();
        triggerGCSESearch(chords);
    }
});
