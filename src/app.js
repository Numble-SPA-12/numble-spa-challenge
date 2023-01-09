import { router } from '@common/router.js';

const naviagteTo = (url) => {
  history.pushState(null, null, url);
  router();
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
