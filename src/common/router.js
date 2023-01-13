import Dashboard from '@pages/Dashboard';
import Post from '@pages/Post';
import Write from '@pages/Write';

const routes = [
  { path: '/', page: Dashboard },
  { path: '/write', page: Write },
  { path: '/:id/edit', page: Write },
  { path: '/:id', page: Post },
];

const pathToRegex = (path) => {
  return new RegExp(
    '^' + path.replace(/\//g, '\\/').replace(/:\w+/g, '(.+)') + '$'
  );
};

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

export const router = (data) => {
  const pageMatches = routes.map((route) => {
    return {
      route,
      result: location.pathname.match(pathToRegex(route.path)),
    };
  });

  let match = pageMatches.find((pageMatch) => pageMatch.result !== null);

  console.log('🚀 ~ file: router.js:40 ~ router ~ pageMatches', match);
  if (!match) {
    match = {
      route: routes[0],
      isMatch: true,
    };
  }

  new match.route.page(document.querySelector('#root'), {
    params: getParmas(match),
    data,
  });
};

export const navigateTo = (url, data) => {
  history.pushState(null, null, url);
  router(data);
};
