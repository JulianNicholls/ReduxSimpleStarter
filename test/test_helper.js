import React              from 'react';
import ReactDOM           from 'react-dom';
import { createStore }    from 'redux';
import { Provider }       from 'react-redux';

import TestUtils          from 'react-addons-test-utils';

import jsdom              from 'jsdom';
import jquery             from 'jquery';
import chai, { expect }   from 'chai';
import chaiJquery         from 'chai-jquery';

import reducers           from '../src/reducers';

// Set up testing environment to run like a browser from the command line.
// global stands in for the browser and holds the global document and window.

global.document = jsdom.jsdom('<!DOCTYPE html><html><body></body></html>');
global.window   = global.document.defaultView;

const $         = jquery(global.window);  // Connect our jQuery to our 'window'

// Render a React component for testing and return it wrapped in jQuery.

function renderComponent(ComponentClass, props = {}, state = {}) {
  const instance = TestUtils.renderIntoDocument(
    <Provider store={createStore(reducers, state)}>
      <ComponentClass {...props} />
    </Provider>
  );

  // Return a jQuery wrapped set of HTML.
  return $(ReactDOM.findDOMNode(instance));
}

// Simulate an event on a jQuery element

$.fn.simulate = function(eventName, value) {
  if (value) {
    this.val(value);
  }

  TestUtils.Simulate[eventName](this[0]);
}

// Set up Chai jQuery

chaiJquery(chai, chai.util, $);

// Exports

export { renderComponent, expect };
