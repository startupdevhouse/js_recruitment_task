//CREATE PAGE SELECT OPTIONS BASED ON THE NUMBERS OF PAGES
/**
 * @param createOptions: (count: number, place: DOMObject, currentPage: number) => void
 */
const createOptions = (count, place, currentPage) => {
    place.innerHTML = null;  //clear actual options

    //loop for create select options 
    for (let i = 1; i <= count; i++) {
        let option = document.createElement("option");

        //option value same as text
        option.value = i;
        option.innerHTML = i;

        //placement based on DOMObject param
        place.appendChild(option);
    }
    //update curent page based on selected option
    place.value = currentPage;
};

export default createOptions;