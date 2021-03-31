
const BASE_URL = 'https://pixabay.com'
// const API_KEY = '20930495-600a23973a3be0872b747cdc1'
// const options = {
//             headers: {
//                 Authorization: API_KEY
//             }
//         }

export default class ApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }
    fetchArticles() {
        
        const url = `${BASE_URL}/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=20930495-600a23973a3be0872b747cdc1`
        return fetch(url)
            .then((response) => response.json())
            .then(({hits}) => {
                this.incrementPage();
                return hits;
                
            })
        
    
    }
    incrementPage() {
        this.page += 1
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.query
    }

    set query(newQuery) {
       this.searchQuery = newQuery
    }


    
}