const API_KEY = "3aa8dadceddc4e349f2b50bffac511eb";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apikey=${API_KEY}`); // ` is imp here 
    const data = await res.json();
    bindData(data.articles);
    // console.log(data);
}

function bindData(articles) {
    const cardsContainer = document.getElementById('cards-container');
    const newsCardtemplate = document.getElementById('template-news-card');
    cardsContainer.innerHTML = '';

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardsClone = newsCardtemplate.content.cloneNode(true); //all div were clone
        fillDataInCard(cardsClone, article);
        cardsContainer.appendChild(cardsClone);
    });
}

function fillDataInCard(cardsClone, article) {
    const newsimg = cardsClone.querySelector("#news-img");
    const newstitle = cardsClone.querySelector("#news-title");
    const newssource = cardsClone.querySelector("#news-source");
    const newsdesc = cardsClone.querySelector("#news-desc");

    newsimg.src = article.urlToImage;
    newstitle.innerHTML = article.title;
    newsdesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/jakarta"
    });

    newssource.innerHTML = `${article.source.name} · ${date}`;

    cardsClone.firstElementChild.addEventListener('click', () => {
        window.open(article.url, "_blank"); //blank means on new page
    })

}

let curSelNav = null;

function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    if (curSelNav !== null) {
        curSelNav.classList.remove('active');
    }
    curSelNav = navItem;
    curSelNav.classList.add('active');
}

const searchButton = document.getElementById('search-button');
const searchtext = document.getElementById('search-text');

searchButton.addEventListener('click', () => {
    const query = searchtext.value;
    if (!query)
        return;
    fetchNews(query);
    if (curSelNav !== null) {
        curSelNav.classList.remove('active');
    }
    curSelNav = null;
})