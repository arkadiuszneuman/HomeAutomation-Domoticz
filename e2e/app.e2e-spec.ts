import { HomeAutomationSystem2Page } from './app.po';

describe('home-automation-system2 App', () => {
  let page: HomeAutomationSystem2Page;

  beforeEach(() => {
    page = new HomeAutomationSystem2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
