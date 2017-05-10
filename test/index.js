import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import jsdom from 'jsdom'

chai.use(chaiImmutable);




/* SETUP FOR JSDOM */
const { JSDOM } = jsdom;
const { window } = new JSDOM('<!doctype html><html><body></body></html>');
const { document } = window;


Object.keys(window).forEach((key) => {
  if(!(key in global))
    global[key] = window[key]
});
