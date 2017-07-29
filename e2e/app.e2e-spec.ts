import { HASPage } from './app.po';

describe('has App', () => {
  let page: HASPage;

  beforeEach(() => {
    page = new HASPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
