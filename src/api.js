export const getData = () => {
    const API_KEY = '7eb760ef-b13f-409e-a7d0-0a7226c8356c';
    const URL = 'https://content.guardianapis.com';
    const section = 'search';

    const result = fetch(`${URL}/${section}?api-key=${API_KEY}`)
        .then((res) => res.json())
        .then((data) => console.log(data.response))
        .catch((err) => console.log('error', err));

    return result;
};
