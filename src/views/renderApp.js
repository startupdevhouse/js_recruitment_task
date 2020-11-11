import renderSearch from './renderSearch';
import renderHeader from './renderHeader';
import renderSection from './renderSection';
import renderActivePage from './renderActivePage';
import renderNewsItem from './renderNewsItem';
import renderReadLaterItem from './renderReadLaterItem';

const staticHeaderContent = renderHeader();

export default function renderApp(props) {
  const { newsList, readLaterList, sectionsList, searchContentValue } = props;

  return `
    ${staticHeaderContent}
    <section class="container filtersContainer">
      <div class="row">
        ${renderSearch(searchContentValue)}
        ${renderSection(sectionsList)}
      </div>
      <div class="row">
        ${renderActivePage()}
      </div>
    </section>
    <section class="container newsContainer">
      <div class="row">
        <div class="column column-65">
          <h2 class="newsColumnTitle">News List</h2>
          <ul class="newsList">
            ${newsList.map((news) => renderNewsItem(news)).join('')}
          </ul>
        </div>
        <div class="column column-55">
          <h2 class="newsColumnTitle">Read Later</h2>

          <ul class="readLaterList">
            ${readLaterList
              .map((readLater) => renderReadLaterItem(readLater))
              .join('')}
          </ul>
        </div>
      </div>
    </section>
  `;
}
