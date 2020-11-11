import { getFormattedDate } from '../utils/date';

export default function renderNewsItem(props) {
  const {
    webTitle,
    webUrl,
    sectionName,
    webPublicationDate,
    id,
    disabled = false,
  } = props;

  return `
    <li >
      <article class="news">
        <header>
          <h3>${webTitle}</h3>
        </header>
        <section class="newsDetails">
          <ul>
            <li><strong>Section Name:</strong> ${sectionName}</li>
            <li><strong>Publication Date:</strong> ${getFormattedDate(
              webPublicationDate,
              { separator: '.', inverted: true }
            )}</li>
          </ul>
        </section>
        <section class="newsActions">
          <a href="${webUrl}" class="button">Full article</a>
          ${
            disabled
              ? ''
              : `<button class="button button-outline" data-role="read-later-add" data-id="${id}">Read Later</button>`
          }
        </section>
      </article>
    </li>
  `;
}
