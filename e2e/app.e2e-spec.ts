import { KelnerWebappPage } from './app.po';

describe('kelner-webapp App', () => {
  let page: KelnerWebappPage;

  beforeEach(() => {
    page = new KelnerWebappPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
