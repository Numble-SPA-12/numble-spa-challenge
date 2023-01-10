import { navigateTo, router } from '@common/router';

class App {
  constructor() {
    window.addEventListener('popstate', () => {
      router();
    });

    document.addEventListener('DOMContentLoaded', () => {
      document.body.addEventListener('click', (e) => {
        if (e.target.matches('[data-link]')) {
          e.preventDefault();
          navigateTo(e.target.href);
        }
      });

      router();
    });
  }
}

new App();
