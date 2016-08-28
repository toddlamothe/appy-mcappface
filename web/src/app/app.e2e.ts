describe('Main Page', () => {

  beforeEach(() => {
    browser.get('/');
  });


  it('should have a title', () => {
    let subject = browser.getTitle();
    let result  = 'Appy McAppface - an app for beer lovers';
    expect(subject).toEqual(result);
  });

  it('should display at least one logbutton', () => {
    expect(element(by.tagName('logbutton')).isPresent()).toBe(true);
  });

});

describe('Submit Page', () => {
  beforeEach(() => {
    browser.get('/#/logevent?eventtype=FFD');






    
  });

  it('should display a submit and cancel button', () => {
    expect(element(by.buttonText('Submit')).isPresent()).toBe(true);
    expect(element(by.buttonText('Cancel')).isPresent()).toBe(true);

    // expect(element.all(by.tagName('button')).count()).toEqual(2);
    // element.all(by.tagName('button')).then(elements => {
    //   expect(elements.length).toEqual(2);
    //   console.log('elements[0] = ', elements[0]);
    // });
  });

  it('should redirect to home page on cancel', () => {
    let cancelButton = element(by.buttonText('Cancel'));
    cancelButton.click().then( () => {
      console.log('button clicked!');
      expect(browser.getCurrentUrl()).toContain('/#/home');
    });
  });

  it('should submit a new entry', () => {
    // let submitButton = element(by.buttonText('Submit'));
    // submitButton.click().then( () => {
    //   console.log('button clicked!');
    //   expect(browser.getCurrentUrl()).toContain('/#/home');
    // });
  });
});
