const travelData = [
    {
        name: 'Sydney, Australia',
        category: 'country',
        description: 'A vibrant city known for its iconic harbour, landmarks, and lively coastal lifestyle.',
        imageUrl: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=900&q=80'
    },
    {
        name: 'Tokyo, Japan',
        category: 'country',
        description: 'A luminous metropolis blending futuristic energy with historic elegance and culture.',
        imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=900&q=80'
    },
    {
        name: 'Bora Bora, French Polynesia',
        category: 'beach',
        description: 'An island paradise famed for turquoise lagoons, luxury resorts, and calm turquoise waters.',
        imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80'
    },
    {
        name: 'Rio de Janeiro, Brazil',
        category: 'beach',
        description: 'A lively coastal destination with golden beaches, mountain views, and festive energy.',
        imageUrl: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=900&q=80'
    },
    {
        name: 'Taj Mahal, India',
        category: 'temple',
        description: 'An iconic architectural marvel and a lasting symbol of love, symmetry, and artistry.',
        imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=900&q=80'
    },
    {
        name: 'Angkor Wat, Cambodia',
        category: 'temple',
        description: 'A breathtaking UNESCO landmark that captures the grandeur of ancient Khmer civilization.',
        imageUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=900&q=80'
    },
    {
        name: 'Paris, France',
        category: 'country',
        description: 'The city of light and romance, known for historic landmarks, art, and café culture.',
        imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=80'
    },
    {
        name: 'Kyoto, Japan',
        category: 'country',
        description: 'A timeless city celebrated for temples, gardens, traditional tea houses, and culture.',
        imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=80'
    }
];

const resultsContainer = document.getElementById('results');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const clearButton = document.getElementById('clear-search');

function normalizeText(value) {
    return value.trim().toLowerCase();
}

function renderResults(keyword = '') {
    const query = normalizeText(keyword);
    const filteredResults = query
        ? travelData.filter((item) => {
            const entryText = `${item.name} ${item.category} ${item.description}`.toLowerCase();
            return entryText.includes(query);
        })
        : travelData;

    if (!filteredResults.length) {
        resultsContainer.innerHTML = '<div class="no-results">No destinations match your search. Try another keyword.</div>';
        return;
    }

    resultsContainer.innerHTML = filteredResults
        .map(
            (item) => `
                <article class="result-card">
                    <img src="${item.imageUrl}" alt="${item.name}">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                </article>
            `
        )
        .join('');
}

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    renderResults(searchInput.value);
});

clearButton.addEventListener('click', () => {
    searchInput.value = '';
    renderResults('');
});

renderResults();
