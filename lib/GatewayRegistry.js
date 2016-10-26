'use strict';

exports.__esModule = true;

var _lodash = require('lodash');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GatewayRegistry = function () {
  function GatewayRegistry() {
    _classCallCheck(this, GatewayRegistry);

    this._containers = {};
    this._children = {};
  }

  GatewayRegistry.prototype._renderContainer = function _renderContainer(name) {
    if (!this._containers[name]) {
      return;
    }

    this._containers[name].setState({
      children: (0, _lodash.toArray)(this._children[name])
    });
  };

  GatewayRegistry.prototype.addContainer = function addContainer(name, container) {
    this._containers[name] = container;
    this._renderContainer(name);
  };

  GatewayRegistry.prototype.removeContainer = function removeContainer(name) {
    this._containers[name] = null;
  };

  GatewayRegistry.prototype.addChild = function addChild(name, child, gatewayId) {
    if (!this._children[name]) {
      this._children[name] = {};
    }
    this._children[name][gatewayId] = child;
    this._renderContainer(name);
  };

  GatewayRegistry.prototype.clearChild = function clearChild(name, gatewayId) {
    delete this._children[name][gatewayId];
  };

  GatewayRegistry.prototype.removeChild = function removeChild(name, gatewayId) {
    this.clearChild(name, gatewayId);
    this._renderContainer(name);
  };

  return GatewayRegistry;
}();

exports.default = GatewayRegistry;