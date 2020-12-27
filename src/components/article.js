import getFetch from './fetch';
import createOptions from './activePageSelect';
import { addReadLater } from './readLater';

//DOM ELEMENTS TO PLACE DEPLOYMENT
const newsList = document.querySelector("ul.newsList");
const activePageSelect = document.querySelector("select#activePageSelect");

//FUNTION CREATE ARTICLE NEWS
/**
 * @param createArticle: (props: {
    webTitle: string;
    sectionName: string;
    webPublicationDate: string;
    webUrl: string;
}, place: DOMObject) => void
 */
const createArticle = (props = { webTitle: "Sample news title", sectionName: "Sample Section", webPublicationDate: "2020-12-27T18:42:45Z", webUrl: "https://theguardian.com" }, place) => {
    //FORMAT DATE
    props.webPublicationDate = new Date(props.webPublicationDate).toLocaleDateString();

    let li = document.createElement("li");

    let article = document.createElement("article");
    article.className = "news";

    //HEADER {
    let articleHeader = document.createElement("header");
    let articleHeaderH3 = document.createElement("h3");
    articleHeaderH3.innerHTML = props.webTitle;
    articleHeader.appendChild(articleHeaderH3);
    article.appendChild(articleHeader);
    //HEADER END }

    //SECTION DETALIS {
    let articleSectionDetalis = document.createElement("section");
    articleSectionDetalis.className = "newsDetails";
    let articleSectionDetalisUl = document.createElement("ul");

    //SECTION NAME {
    let articleSectionDetalisSectionName = document.createElement("li");
    let articleSectionDetalisSectionNameStrong = document.createElement("strong");
    articleSectionDetalisSectionNameStrong.innerHTML = "Section Name: ";
    articleSectionDetalisSectionName.appendChild(articleSectionDetalisSectionNameStrong);
    articleSectionDetalisSectionName.innerHTML += props.sectionName;

    articleSectionDetalisUl.appendChild(articleSectionDetalisSectionName);
    //SECTION NAME END }

    //PUBLICATION NAME {
    let articleSectionDetalisPublicationDate = document.createElement("li");
    let articleSectionDetalisPublicationDateStrong = document.createElement("strong");
    articleSectionDetalisPublicationDateStrong.innerHTML = "Publication Date: ";
    articleSectionDetalisPublicationDate.appendChild(articleSectionDetalisPublicationDateStrong);
    articleSectionDetalisPublicationDate.innerHTML += props.webPublicationDate;
    articleSectionDetalisUl.appendChild(articleSectionDetalisPublicationDate);
    //PUBLICATION NAME END }

    articleSectionDetalis.appendChild(articleSectionDetalisUl);
    article.appendChild(articleSectionDetalis);
    //SECTION DETALIS END }

    //SECTION ACTIONS {
    let articleSectionActions = document.createElement("section");
    articleSectionActions.className = "newsActions";

    let articleSectionActionsLink = document.createElement("a");
    articleSectionActionsLink.className = "button";
    //OPEN NEW WINDOW WITH FULL ARTICULE EVENT
    articleSectionActionsLink.onclick = () => { window.open(props.webUrl, '_blank', 'toolbar=0,location=0,menubar=0') };
    articleSectionActionsLink.target = "_blank";
    articleSectionActionsLink.innerHTML = "Full article";
    articleSectionActions.appendChild(articleSectionActionsLink);

    let articleSectionActionsReadLater = document.createElement("button");
    articleSectionActionsReadLater.className = "button button-outline create-read-later";
    //CREATE READ LATER EVENT
    articleSectionActionsReadLater.onclick = () => addReadLater(props);
    articleSectionActionsReadLater.innerHTML = "Read Later";
    articleSectionActions.appendChild(articleSectionActionsReadLater);

    article.appendChild(articleSectionActions);
    //SECTION ACTIONS END }


    li.appendChild(article);
    place.appendChild(li);
}

const showArticles = (props) => {
    getFetch(props).then(({ response }) => {
        newsList.innerHTML = null; //clear actual articules

        //check if result exist
        if (response.results.length > 0) {
            // iteration data // with destructuring fetch data
            response.results.map(({ webTitle, sectionName, webPublicationDate, webUrl }) => {
                // create articles with passed param and place
                createArticle({ webTitle, sectionName, webPublicationDate, webUrl }, newsList);
            });
            //active page select if was disabled
            activePageSelect.disabled = false;
            //create page select options based on fetch data and place
            createOptions(response.pages, activePageSelect, response.currentPage);
        }
        else {
            //no result output
            activePageSelect.disabled = true;
            newsList.innerHTML = "No news found.";
        }

    }).catch((exception) => {
        //error handle
        console.log(exception);
        activePageSelect.disabled = true;
        newsList.innerHTML = "No news found.";
    });
};

export default showArticles;