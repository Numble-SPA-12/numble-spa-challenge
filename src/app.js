import { router } from '@common/router';

class App {
  constructor() {
    window.addEventListener('popstate', () => {
      router();
    });

    document.addEventListener('DOMContentLoaded', () => {
      router();
    });
  }
}

new App();
