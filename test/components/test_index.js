import { renderComponent, assert } from '../test_helper';
import Index from '../../app/components/Index.jsx';
const request = require('supertest');
var io = require('socket.io-client');
const app = require('../../server.js').app;

const url = 'http://0.0.0.0:3000';

const options = {
  transports: ['websocket'],
  'force new connection': true,
};

describe('Index', function () {
  let component;

  const client1 = io.connect(url, options);
  const client2 = io.connect(url, options);

  beforeEach(function () {
    component = renderComponent(Index, { url });
  });

  it('should render on the page', () => {
    assert.isNotNull(component);
  });

  describe('ChatTextBox', () => {

    beforeEach(() => {
      component.find('.textbox').simulate('change', 'some text');
    });

    it('should display text that we typed', () => {
      assert.equal(component.find('.textbox').val(), 'some text');
    });

    it('should clear textbox after hitting send', () => {
      component.find('.msgButton').simulate('click');
      assert.equal(component.find('.textbox').val(), '');
    });

  });
});

describe('WebSockets', function () {
  const client1 = io.connect(url);
  const client2 = io.connect(url);

  it('should display the correct online count', () => {
    client1.on('user:online', (num) => {
      assert.equal(num, 2);
    });
  });

  it('should be able to send and recieve messages', () => {
    client2.emit('message:sent', 'hello world');
    client1.on('message:get', (message) => {
      assert.equal(message, 'hello world');
    });
  });
});
