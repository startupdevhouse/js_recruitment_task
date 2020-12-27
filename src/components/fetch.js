const defaultParams = {
    'api-key': '20485166-8be3-4fb6-8c11-cb623dffc9d7',
    'format': 'json',
    'page-size': 10,
    'from-date': dateString()//function input -30 day from today
};
//API CONNECTION/FETCH FUNCTION  
/**
 * @param getFetch: (customParams?: { q: string, section: string, page: number, "order-by": string}) => Promise
 */
const getFetch = (customParams = { q: null, section: "all", page: 1, "order-by": "newest" }) => {
    //create url based on default constant parameters
    let url = `https://content.guardianapis.com/search?`
        + `api-key=${defaultParams["api-key"]}&`
        + `format=${defaultParams["format"]}&`
        + `page-size=${defaultParams["page-size"]}&`
        + `from-date=${defaultParams["from-date"]}`;

    //loop supplements the url with custom parameters
    for (const [key, value] of Object.entries(customParams)) {
        if (value && value != "all") {
            url = url.concat('&', `${key}=${value}`);
        }
    }

    return fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            else {
                throw `error with status ${response.status}`;
            }
        })
        .catch((exception) => {
            console.log(exception);
        });
};

/**
 * @param dateString => string(Date(DD.MM.YYYY))
 */
function dateString() {
    var date = new Date();
    date.setDate(date.getDate() - 30);
    return date.toISOString().split('T')[0];
}

export default getFetch;