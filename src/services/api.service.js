import API from '../constants/api.json';
import logger from './logger.service';
import { getStringDate30DaysAgo } from './utils.service';

const logError = logger('API');

export default {
    getLatestNews: async (page, section, phase) => {
        try {
            const fromDate = getStringDate30DaysAgo();
            let url = `${API.BASE_URL}?from-date=${fromDate}&api-key=${API.API_KEY}`;
            if (page) {
                url += `&page=${page}`;
            }
            if (section) {
                url += `&section=${section}`;
            }
            if (phase) {
                url += `&q="${phase}"`;
            }
            const response = await fetch(url);
            return await response.json();
        } catch (e) {
            logError(e);
        }
    },
};
