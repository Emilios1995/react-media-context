'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MediaContext = function (_React$Component) {
  _inherits(MediaContext, _React$Component);

  function MediaContext() {
    _classCallCheck(this, MediaContext);

    var _this = _possibleConstructorReturn(this, (MediaContext.__proto__ || Object.getPrototypeOf(MediaContext)).call(this));

    _this.state = {
      media: []
    };
    _this.match = _this.match.bind(_this);
    _this.handleResize = (0, _lodash.debounce)(_this.handleResize.bind(_this), 100);
    return _this;
  }

  _createClass(MediaContext, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return this.state;
    }
  }, {
    key: 'match',
    value: function match() {
      var queries = this.props.queries;

      var media = [];
      for (var key in queries) {
        var _window$matchMedia = window.matchMedia(queries[key]),
            matches = _window$matchMedia.matches;

        if (matches) {
          media.push(key);
        }
      }
      this.setState({ media: media });
    }
  }, {
    key: 'handleResize',
    value: function handleResize() {
      this.match();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.match();
      window.addEventListener('resize', this.handleResize);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        this.props.children
      );
    }
  }]);

  return MediaContext;
}(_react2.default.Component);

MediaContext.childContextTypes = {
  media: _propTypes2.default.array
};

MediaContext.propTypes = {
  queries: _propTypes2.default.object
};

MediaContext.defaultProps = {
  queries: {
    'xsmall': 'screen and (max-width: 40em)',
    'small': 'screen and (min-width: 40em)',
    'medium': 'screen and (min-width: 52em)',
    'large': 'screen and (min-width: 64em)'
  }
};

exports.default = MediaContext;