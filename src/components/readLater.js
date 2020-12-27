//create custom Array prototype 
Array.prototype.inArray = function (comparer) {
    for (var i = 0; i < this.length; i++) {
        if (comparer(this[i])) return true;
    }
    return false;
};
Array.prototype.pushIfNotExist = function (element, comparer) {
    if (!this.inArray(comparer)) {
        this.push(element);
    }
};

//DOM ELEMENTS TO PLACE DEPLOYMENT
const readLaterList = document.querySelector("ul.readLaterList");

//FUNTION ADD ARTICLE DATA TO LOCAL STORAGE ON WITCH IT IS BASED FUNCTIONALITY READLATER
/**
 * @param addReadLater: (data: {
    webTitle: string;
    sectionName: string;
    webPublicationDate: string;
    webUrl: string;
}) => void
 */
export const addReadLater = (data) => {
    //save and prase local storage object JSON to variable
    const savedNews = JSON.parse(localStorage.getItem("savedNews") || "[]");
    //function check if array exist element with the same webTitle
    //if no push element to array
    savedNews.pushIfNotExist(data, function (e) {
        return e.webTitle === data.webTitle;
    });
    //change array object to JSON in Local Storage
    localStorage.setItem("savedNews", JSON.stringify(savedNews));
    showReadLater(); //function show saved ReadLater news articles
};

//FUNTION REMOVE ARTICLE DATA FROM LOCAL STORAGE 
/**
 * @param removeReadLater: (localId:number) => void
 */
const removeReadLater = (localId) => {
    //save and prase local storage object JSON to variable
    let savedNews = JSON.parse(localStorage.getItem("savedNews") || "[]");
    //remove object from array based on id
    savedNews.splice(localId, 1);
    //change array object to JSON in Local Storage
    localStorage.setItem("savedNews", JSON.stringify(savedNews));
    showReadLater(); //function show saved ReadLater news articles
};
//FUNTION CREATE ARTICLE READLATER
/**
 * @param createReadLater: (props: {
    webTitle: string;
    sectionName: string;
    webPublicationDate: string;
    webUrl: string;
}, place: DOMObject) => void
 */
const createReadLater = (props = { webTitle: "Sample news title", sectionName: "Sample Section", webPublicationDate: "2020-12-27T18:42:45Z", webUrl: "https://theguardian.com", localId }, place) => {

    let li = document.createElement("li");
    li.setAttribute('read-later', props.localId);

    let article = document.createElement("article");
    article.className = "news-readLater";

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
    articleSectionActionsReadLater.className = "button button-outline remove-read-later";
    //CREATE READ LATER DELETE EVENT
    articleSectionActionsReadLater.onclick = () => removeReadLater(props.localId);
    articleSectionActionsReadLater.innerHTML = "Remove";
    articleSectionActions.appendChild(articleSectionActionsReadLater);

    article.appendChild(articleSectionActions);
    //SECTION ACTIONS END }


    li.appendChild(article);
    place.appendChild(li);
}
//FUNTION SHOW ARTICLE DATA FROM LOCAL STORAGE 
/**
 * @param removeReadLater: () => void
 */
export const showReadLater = () => {
    //save and prase local storage object JSON to variable
    const savedNews = JSON.parse(localStorage.getItem("savedNews") || "[]");
    readLaterList.innerHTML = null; //clear articles  
    // iteration local storage // with destructuring fetch data
    savedNews.map(({ webTitle, sectionName, webPublicationDate, webUrl }, localId) => {
        // create articles with passed param and place
        createReadLater({ webTitle, sectionName, webPublicationDate, webUrl, localId }, readLaterList);
    });
};
