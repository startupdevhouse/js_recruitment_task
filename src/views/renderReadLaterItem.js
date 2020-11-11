export default function renderReadLaterItem(props) {
  const { id, webTitle } = props;

  return `
    <li>
      <h4 class="readLaterItem-title">${webTitle}</h4>
      <section>
        <a href="https://theguardian.com" class="button button-clear">Read</a>
        <button class="button button-clear" data-role="read-later-remove" data-id="${id}">Remove</button>
      </section>
    </li>
  `;
}
