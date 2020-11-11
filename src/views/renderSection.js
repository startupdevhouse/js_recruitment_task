export default function renderSection(sections) {
  return `
    <div class="column">
      <label for="sectionSelect">Section</label>
      <select id="sectionSelect">
        ${sections.map(
          (section) =>
            `<option value="${section.id}">${section.webTitle}</option>`
        )}
      </select>
    </div>
  `;
}
