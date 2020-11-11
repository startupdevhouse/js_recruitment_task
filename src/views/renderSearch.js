export default function renderSearch(searchContentValue) {
  return `
    <div class="column searchColumn">
      <label for="newsContentSearch">News content search</label>
      <input value="${searchContentValue}" type="search" placeholder="News content search" id="newsContentSearch" data-role="content-search" />
    </div>
  `;
}
