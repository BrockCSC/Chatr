import { renderComponent, assert } from '../test_helper';
import Index from '../../views/components/index.jsx';

describe('Index', function () {
  let component;

  beforeEach(() => { component = renderComponent(Index); });

  it('should render on page', function () {
    assert.isNotNull(component);
  });

});
