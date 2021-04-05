import API from '../constants/api.json';
import logger from './logger.service';
import { getStringDate30DaysAgo } from './utils.service';

const logError = logger('API');

export default {
    getLatestNews: async (page = 1) => {
        try {
            const fromDate = getStringDate30DaysAgo();
            const response = await fetch(
                `${API.BASE_URL}?from-date=${fromDate}&page=${page}&api-key=${API.API_KEY}`
            );
            return await response.json();
        } catch (e) {
            logError(e);
        }
    },
};
