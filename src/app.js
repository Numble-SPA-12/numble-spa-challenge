import Dashboard from '@pages/Dashboard';
import Post from '@pages/Post';
import Write from '@pages/Write';

const pathToRegex = (path) =>
  new RegExp('^' + path.replace(/\//g, '\\/').replace(/:\w+/g, '(.+)') + '$');

const getParmas = (match) => {
  const values = match.result.slice(1);
  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(
    (result) => result[1]
  );

  return Object.fromEntries(
    keys.map((key, i) => {
      return [key, values[i]];
    })
  );
};

const naviagteTo = (url) => {
  history.pushState(null, null, url);
  router();
};

const router = async () => {
  const routes = [
    { path: '/', view: Dashboard },
    { path: '/write', view: Write },
    { path: '/:id', view: Post },
  ];

  const pageMatches = routes.map((route) => {
    return {
      route,
      result: location.pathname.match(pathToRegex(route.path)),
    };
  });

  let match = pageMatches.find((pageMatch) => pageMatch.result !== null);

  if (!match) {
    match = {
      route: routes[0],
      isMatch: true,
    };
  }

  const view = new match.route.view(getParmas(match));

  document.querySelector('#root').innerHTML = await view.render();
};

window.addEventListener('popstate', () => {
  router();
});

document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', (e) => {
    if (e.target.matches('[data-link]')) {
      e.preventDefault();
      naviagteTo(e.target.href);
    }
  });

  router();
});
