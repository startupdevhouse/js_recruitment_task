import './styles/main.css';
import showArticles from './components/article';
import { showReadLater } from './components/readLater';

//DOM ELEMENTS TO CONTROL EVENTS
const newsContentSearch = document.querySelector("input#newsContentSearch");
const sectionSelect = document.querySelector("select#sectionSelect");
const activePageSelect = document.querySelector("select#activePageSelect");

//STARTUP CUSTOM PARAMETERS 
let params = { q: null, section: "all", page: 1, "order-by": "newest" };

//ON LOAD FUNCTIONS SHOWING RECENT AND 
//REMEMBERED ARTICLES
document.addEventListener('DOMContentLoaded', () => {
    showArticles();
    showReadLater();
});

//SEARCH EVENT
newsContentSearch.addEventListener('change', (e) => {
    params.q = e.target.value; //updating parameters with entered value
    params.page = 1; //reset page to 1 // prevents api error
    showArticles(params);
});

//CHANGE SECTION EVENT
sectionSelect.addEventListener('change', (e) => {
    params.section = e.target.value; //updating parameters with selected value
    params.page = 1; //reset page to 1 // prevents api error
    showArticles(params);
});

//CHANGE PAGE EVENT
activePageSelect.addEventListener('change', (e) => {
    params.page = e.target.value; //updating parameters with selected value
    showArticles(params);
    newsContentSearch.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" }); //scroll to search after select page
});