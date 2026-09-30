const fallbackData = [
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

let travelData = [...fallbackData];

const resultsContainer = document.getElementById('results');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const clearButton = document.getElementById('clear-search');

function normalizeText(value) {
    return String(value || '').trim().toLowerCase();
}

function matchesKeyword(item, query) {
    const text = `${item.name} ${item.category} ${item.description}`.toLowerCase();
    const normalizedQuery = normalizeText(query);

    if (!normalizedQuery) return true;

    const categoryAliases = {
        beach: ['beach', 'beaches'],
        temple: ['temple', 'temples'],
        country: ['country', 'countries']
    };

    const categoryMatches = categoryAliases[item.category]
        ? categoryAliases[item.category].some((keyword) => normalizedQuery.includes(keyword))
        : false;

    return text.includes(normalizedQuery) || categoryMatches;
}

function flattenTravelData(data) {
    const flattened = [];

    if (!data) return flattened;

    const sections = [
        { key: 'countries', category: 'country' },
        { key: 'temples', category: 'temple' },
        { key: 'beaches', category: 'beach' }
    ];

    sections.forEach(({ key, category }) => {
        const items = data[key] || [];

        items.forEach((entry) => {
            if (Array.isArray(entry.cities)) {
                entry.cities.forEach((city) => {
                    flattened.push({
                        name: city.name,
                        category,
                        description: city.description,
                        imageUrl: city.imageUrl
                    });
                });
                return;
            }

            flattened.push({
                name: entry.name,
                category,
                description: entry.description,
                imageUrl: entry.imageUrl
            });
        });
    });

    return flattened;
}

function clearResults() {
    if (searchInput) {
        searchInput.value = '';
    }

    if (resultsContainer) {
        resultsContainer.innerHTML = '';
    }
}

function renderResults(keyword = '') {
    if (!resultsContainer) return;

    const query = normalizeText(keyword);
    const filteredResults = query
        ? travelData.filter((item) => matchesKeyword(item, query))
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

if (searchForm && searchInput) {
    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        renderResults(searchInput.value);
    });
}

if (clearButton && searchInput) {
    clearButton.addEventListener('click', () => {
        clearResults();
    });
}

fetch('travel_recommendation_api.json')
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
        console.log('Fetched travel data:', data);
        const normalizedData = flattenTravelData(data);
        if (normalizedData.length) {
            travelData = normalizedData;
        }
        if (resultsContainer) {
            resultsContainer.innerHTML = '';
        }
    })
    .catch((error) => {
        console.error('Failed to load travel data:', error);
        if (resultsContainer) {
            resultsContainer.innerHTML = '<div class="no-results">Unable to load travel recommendations.</div>';
        }
    });
