import jquery from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import jsdom from 'jsdom';
import chai, { expect, assert } from 'chai';
import chaiJquery from 'chai-jquery';

//global.document is the node.js equivalent of window.document
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = global.document.defaultView;

//Our instance of jquery needs to be on dom we generated in JS.
const $ = jquery(window);

chaiJquery(chai, chai.util, $);

function renderComponent(ComponentClass, props = {}) {
  const componentInstance = TestUtils.renderIntoDocument(
    <ComponentClass {...props} />
  );

  return $(ReactDOM.findDOMNode(componentInstance));
};

$.fn.simulate = function(eventName, value) {
  if (value) { this.val(value) }
  TestUtils.Simulate[eventName](this[0]);
};

export { renderComponent, expect, assert };
