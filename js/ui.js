class UI {
  constructor() {
    this.resultsTable = document.getElementById('resultsTable');
    this.reposTable = document.getElementById('reposTable');
  }

  generateResult(user) {
    const template = `
      <div class="row">
        <div class="col-md-4 col-12">
            <div class="profile-img">
            <img src="${user.avatar_url}" alt="User avatar" class="img-thumbnail w-100"/>
            </div>
        </div>
        <div class="col-md-8 col-12">
            <div class="user-info">
                <div class="profile-name">
                    <p>User name: ${user.login}</p>
                </div>
                <div class="public">
                    <span class="badge badge-pill badge-primary">${user.public_repos} repos</span>
                    <span class="badge badge-pill badge-primary">${user.public_gists} gists</span>
                </div>
                <div class="followers">
                    <span class="badge badge-pill badge-success">${user.followers} followers</span>
                    <span class="badge badge-pill badge-success">${user.following} following</span>
                </div>
            </div>
            <div class="user-btns">
                <button class="btn btn-primary btn-repos">
                    Repos
                </button>
                <button class="btn btn-primary btn-starred">
                    Starred
                </button>
            </div>
        </div>
       </div>
      `;
    this.resultsTable.innerHTML = template;
  }

  generateTable(repos, isStarred) {
    if (repos.length === 0) {
      this.reposTable.innerHTML = `
            <div class="alert alert-danger" role="alert">
                <h4 class="alert-heading">Error!</h4>
                <p>This users has no repos ${isStarred ? 'starred' : ''}</p>
            </div>`;
      return;
    }
    const reposRow = repos.reduce((acc, next) => {
      return (acc += `
            <tr>
                <td>${next.name}</td>
                <td>${next.description || 'No description'}</td>
                <td>${next.private ? 'Yes' : 'No'}</td>
                <td>${next.forks}</td>
                <td>${next.watchers}</td>
                <td><a href="${next.html_url}" target="_blank">Github</a></td>
            </tr>
        `);
    }, '');
    this.reposTable.innerHTML = `
        <h3 class="text-center">List of Repos ${isStarred ? 'starred' : ''}</h3>
        <table class="table table-bordered">
            <caption>List of Repos ${isStarred ? 'starred' : ''}</caption>
            <thead>
                <th>Name</th>
                <th>Description</th>
                <th>Private?</th>
                <th>Forks</th>
                <th>Watchers</th>
                <th>Github</th>
            </thead>
            <tbody>
                ${reposRow}
            </tbody>
        </table>
    `;
  }

  clearResults() {
    this.resultsTable.innerHTML = '';
    this.reposTable.innerHTML = '';
  }

  showLoader(id) {
    document.getElementById(id).innerHTML = `
        <div class="d-flex align-items-center">
            <strong>Loading...</strong>
            <div class="spinner-border ml-auto" role="status" aria-hidden="true"></div>
        </div>
    `;
  }

  showBtnLoader(btn) {
    btn.innerHTML = `
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        Loading...
      `;
  }

  showErrorMessage(err) {
    this.resultsTable.innerHTML = `
        <div class="alert alert-danger" role="alert">
            <h4 class="alert-heading">Error!</h4>
            <p>${err.message}</p>
        </div>
      `;
  }

  hideBtnLoader(btn, text) {
    btn.innerHTML = text;
  }
}
