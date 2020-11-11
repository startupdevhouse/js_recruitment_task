import logoImage from 'url:~/src/assets/logo.png';

export default function renderHeader() {
  return `
    <header class="appHeader">
      <div class="container appHeader-inner">
        <img src="${logoImage}" alt="company logo" class="companyLogo" />
        <h1 class="appTitle">Recruitment task</h1>
      </div>
    </header>
  `;
}
