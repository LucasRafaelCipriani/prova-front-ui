const Main = {};

Main.ui = new UI();

Main.requests = new Requests();

Main.init = () => {
  Main.getPathValue();
  Main.binds();
};

Main.binds = () => {
  const searchBar = document.getElementById('searchUser');

  searchBar.addEventListener('keyup', event => {
    Main.ui.clearResults();
    if (event.target.value === '') {
      return;
    }
    Main.getUser(event.target.value);
  });
};

Main.getUser = query => {
  Main.ui.showLoader('resultsTable');
  Main.requests.getUsers(query).then(res => {
    if (res.message) {
      Main.ui.showErrorMessage(res);
    } else {
      Main.ui.generateResult(res);
      Main.getRepos(res);
    }
  });
};

Main.getRepos = res => {
  const reposBtn = document.querySelector('.btn-repos');
  const starredBtn = document.querySelector('.btn-starred');

  reposBtn.addEventListener('click', event => {
    Main.ui.showLoader('reposTable');
    Main.ui.showBtnLoader(event.target);
    Main.requests.getRepos(res.login).then(resp => {
      Main.ui.generateTable(resp, false);
      Main.ui.hideBtnLoader(event.target, 'Repos');
    });
  });
  starredBtn.addEventListener('click', event => {
    Main.ui.showLoader('reposTable');
    Main.ui.showBtnLoader(event.target);
    Main.requests.getStarred(res.login).then(resp => {
      Main.ui.generateTable(resp, true);
      Main.ui.hideBtnLoader(event.target, 'Starred');
    });
  });
};

Main.getPathValue = () => {
  const searchBar = document.getElementById('searchUser');
  const pathName = window.location.pathname.replace('/', '');
  if (pathName === '') {
    return;
  }
  searchBar.value = pathName;
  Main.getUser(pathName);
};

$(document).ready(() => {
  Main.init();
});
