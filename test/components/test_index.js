import { renderComponent, assert } from '../test_helper';
import Index from '../../views/index.jsx';


describe('Index', function() {
  let component;

  //Before each test, we want to render a component.
  beforeEach(function() {
    component = renderComponent(Index);
  });

  it('should render on page', function() {
    //component is a string of the dom node. The same result you would get from
    //jquery $('some_element')

    //In other words if it DIDNT render, component would be null or something
    //weird
    assert.isNotNull(component);
  });

});
