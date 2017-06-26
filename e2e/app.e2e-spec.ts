import { AthenianTraderPage } from './app.po';

describe('athenian-trader App', () => {
  let page: AthenianTraderPage;

  beforeEach(() => {
    page = new AthenianTraderPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
