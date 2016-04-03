import { renderComponent, assert } from '../test_helper';
import Index from '../../app/components/Index.jsx';
const request = require('supertest');
const app = require('../../server.js').app;

describe('Index', function () {
  let component;

  //Props for react component.
  const url = 'http://localhost:3000';

  //start the messages server
  request(app).get('/');

  beforeEach(function () {
    //renderComponent returns the actual dom node.
    component = renderComponent(Index, { url });
  });

  it('should render on the page', function () {
    assert.isNotNull(component);
  });

  describe('ChatTextBox', function () {

    beforeEach(function () {
      component.find('.textbox').simulate('change', 'some text');
    });

    it('should display text that we typed', function () {
      assert.equal(component.find('.textbox').val(), 'some text');
    });

    it('should clear textbox after hitting send', function () {
      component.find('.msgButton').simulate('click');
      assert.equal(component.find('.textbox').val(), '');
    });
  });

});
