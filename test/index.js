import {expect} from 'chai';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {
  Gateway,
  GatewayDest,
  GatewayProvider
} from '../src/index.js';

// React v15 uses commment nodes for empty components instead of `<noscript />`
// so in those cases we can skip rendering children
const emptyComponent = (function emptyComponent() {
  const [major, minor, patch] = React.version.split('.').map(Number);

  if (major >= 15) {
    return null;
  }

  return <noscript />;
})();

function render(jsx) {
  return ReactDOMServer.renderToStaticMarkup(jsx);
}

function assertEqual(actual, expected) {
  expect(render(actual)).to.equal(render(expected));
}

describe('Gateway', function() {
  it('should render Gateway in GatewayDest', function() {
    assertEqual(
      <GatewayProvider>
        <div>
          <section>
            <Gateway into="foo">
              Hello World
            </Gateway>
          </section>
          <GatewayDest name="foo"/>
        </div>
      </GatewayProvider>,
      // should equal
      <div>
<<<<<<< HEAD
        <section>
          {emptyComponent}
        </section>
=======
        <section/>
>>>>>>> 53edab19f44f8dba01b923ab7d55f4e80b62f763
        <div>Hello World</div>
      </div>
    );
  });

  it('should be able to customize the GatewayDest element', function() {
    assertEqual(
      <GatewayProvider>
        <GatewayDest component="section" className="elf" id="striped" name="foo"/>
      </GatewayProvider>,
      // should equal
      <section className="elf" id="striped"/>
    );
  });

  it('should be able to customize the GatewayDest with custom components', function() {
    function Child(props) {
      return <h1 id={props.id}>{props.children}</h1>;
    }

    assertEqual(
      <GatewayProvider>
        <GatewayDest component={Child} id="test" name="foo"/>
      </GatewayProvider>,
      // should equal
      <Child id="test"/>
    );
  });

  it('should render into the correct GatewayDest', function() {
    assertEqual(
      <GatewayProvider>
        <div>
          <Gateway into="foo">One</Gateway>
          <Gateway into="bar">Two</Gateway>
          <GatewayDest name="bar"/>
          <GatewayDest name="foo"/>
        </div>
      </GatewayProvider>,
      // should equal
      <div>
<<<<<<< HEAD
        {emptyComponent}
        {emptyComponent}
=======
>>>>>>> 53edab19f44f8dba01b923ab7d55f4e80b62f763
        <div>Two</div>
        <div>One</div>
      </div>
    );
  });

  it('should pass context', function() {
    class Child extends React.Component {
      static contextTypes = {
        textContent: React.PropTypes.string.isRequired
      };

      constructor(props, context) {
        super(props, context);
        this.textContent = context.textContent;
      }

      render() {
        return (
          <Gateway into="dest">
            <span>{this.textContent}</span>
          </Gateway>
        );
      }
    }

    class Parent extends React.Component {
      static childContextTypes = {
        textContent: React.PropTypes.string.isRequired
      };

      getChildContext() {
        return {
          textContent: 'Hello from context'
        };
      }

      render() {
        return <Child/>;
      }
    }

    class Application extends React.Component {
      render() {
        return (
          <GatewayProvider>
            <div>
              <Parent/>
              <GatewayDest name="dest"/>
            </div>
          </GatewayProvider>
        );
      }
    }

    assertEqual(
      <Application/>,
      // should equal
      <div>
<<<<<<< HEAD
        {emptyComponent}
=======
>>>>>>> 53edab19f44f8dba01b923ab7d55f4e80b62f763
        <div>
          <span>Hello from context</span>
        </div>
      </div>
    );
  });
});
