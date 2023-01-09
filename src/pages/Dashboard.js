import AbstractView from '@common/AbstractView';

class Dashboard extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('Dashboard');
  }

  async render() {
    return '<h1>This is Home Page</h1>';
  }
}

export default Dashboard;
