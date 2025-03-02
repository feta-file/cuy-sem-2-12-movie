const API_KEY = "47fa2e0e3c30418eab947203e9871c0c";

let page = 1;

const API_URL = () => `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${page}`;
const API_IMAGE_URL = "https://image.tmdb.org/t/p/w1280"
const API_SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`

async function getMovies(url) {
    const res = await fetch(url);
    const data = await res.json()
    showMovies(data.results)
}

// Pagination

function updatePage() {
    //function ini buat update page, ngambil api lalu show current page

    getMovies(API_URL())
    // pemanggilan getMovies ini hanya ketika web dibuka, sedangkan pada pagination, akan dipanggil ulang sesuai dengan page yang ditambahkan 

    currentPage.innerHTML = page
    //sama, hanya tertampil ketika web dibuka, kalau mau pindah sesuai dengan page, harus masuk function next atau prev
}

function nextPage() {
    if (page >= 1) {
        page += 1; //artinya variabel yang bernama page dijumlah 1
        updatePage()
    }
}

function prevPage() {
    if (page > 1) {
        page -= 1; //artinya variabel yang bernama page dikurangi 1
        updatePage()
    } else {
        alert("you have reached the minimum page!")
    }
}

next.addEventListener("click", () => {
    //next dipanggil tanpa document get element karena langsung id, jd bisa dipanggil langsung. Lalu () => sama seperti function
    nextPage()
})

prev.addEventListener("click", () => {
    prevPage()
})

// Fetching API external

function showMovies(movies) {
    moviesElement.innerHTML = '' //gaperlu document get element, krn id nya udah unique
    movies.forEach(movie => { //forEach buat ngemapping data array
        const { title, poster_path, overview, popularity, vote_average } = movie
        console.log({ popularity, vote_average })

        const movieCard = document.createElement("div")
        movieCard.classList.add("movie") //karena div e nambahin e manual, maka harus nambahin class dengan cara berikut

        movieCard.innerHTML = `
       <img src="${API_IMAGE_URL + poster_path}" alt="html the movie images">
       <div class="detail">
        <h3>${title}</h3>
        <p>${overview.substring(0, 200)}...</p>
       </div>
        `
        //substring untuk membatasi maks character
        moviesElement.appendChild(movieCard)
    })
}

//search engine

searchForm.addEventListener("submit", (event) => {
    event.preventDefault() 
    const searchQuery = search.value //mengekstrak value dari yang diketikkan di form search 

    if(searchQuery !== '') {
        getMovies(API_SEARCH_URL + searchQuery)
        search.value = ''
        //karena api search url udah di belakangnya ada query=, ditambahkan denga value dari search, maka nanti akan muncul query berdasarkan yang diketikkan di kolom search
    }
})

//title to home

title.addEventListener("click", () => {
    location.reload()
})

updatePage()

