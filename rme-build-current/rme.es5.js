"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/** RME BUILD FILE **/
var App = function () {
  var App =
  /*#__PURE__*/
  function () {
    function App() {
      _classCallCheck(this, App);

      this.self;
      this.seq = 0;
      this.prefix = "app";
      this.name;
      this.root;
    }
    /**
     * Function will set a name for an application. If the name is not set then a default name is used.
     * @param {string} name 
     * @returns App.
     */


    _createClass(App, null, [{
      key: "name",
      value: function name(_name) {
        App.init().name = App.checkName(_name);
        return App;
      }
      /**
       * Function will set a root for an application. If the root is not set then body is used by default.
       * @param {string} root 
       * @returns App.
       */

    }, {
      key: "root",
      value: function root(_root) {
        if (!Util.isEmpty(_root) && Util.isString(_root)) App.init().root = _root;
        return App;
      }
      /**
       * Function will check if a given name is empty or not. If the name is empty then a next available default name is returned.
       * @param {string} name 
       * @returns Checked name.
       */

    }, {
      key: "checkName",
      value: function checkName(name) {
        if (!Util.isEmpty(name)) {
          return App.init().prefix + name;
        } else {
          while (Util.isEmpty(App.init().name)) {
            name = App.init().prefix + App.init().seq;
            name = AppManager.get(name);

            if (Util.isEmpty(name)) {
              App.init().name = App.init().prefix + App.init().seq;
              break;
            } else {
              App.init().seq++;
            }
          }

          return App.init().name;
        }
      }
      /**
       * Resets settings that are used to create an application.
       */

    }, {
      key: "reset",
      value: function reset() {
        App.init().name = undefined;
        App.init().root = undefined;
        App.init().seq = 0;
      }
      /**
       * Function creates an application. The given parameter can either be a Template object or an Elem object. 
       * @param {object} object 
       * @returns Created application instance.
       */

    }, {
      key: "create",
      value: function create(object) {
        var name = Util.notEmpty(App.init().name) ? App.init().name : App.checkName();
        var root = Util.notEmpty(App.init().root) ? App.init().root : undefined;
        var app = new AppInstance(name, root, object);
        AppManager.set(name, app);
        App.reset();
        return app;
      }
      /**
       * Gets Application instance by name. If the name is empty then default application instance is retrieved.
       * @param {string} name 
       * @returns Application instance.
       */

    }, {
      key: "get",
      value: function get(name) {
        if (Util.isEmpty(name)) return App.name(0).getInstance();else {
          var app = App.name(name).getInstance();
          if (Util.isEmpty(app)) throw "Could not find app with name: " + name;else return app;
        }
      }
      /**
       * Function takes three parameters that enable setting state for components.
       * If only one parameter is given then the parameter must be an object or a function. 
       * The object should define a component name and its values as follows. ({refName: {key: val, key: val}}) and
       * the function should return a object describing the component respectively.
       * If two parameters are given then the first parameter is a component name
       * and the value parameter should describe the component state object as follows. (refName, {key: val, key: val}).
       * The value parameter may also be a function that returns the component state object respectively.
       * The last parameter update is a boolean value that only if explicitly set to false then the app is not updated
       * after setting the state has occured.
       * This function will store the state into the default application state. 
       * @param {*} refName 
       * @param {*} value 
       * @param {boolean} update
       */

    }, {
      key: "setState",
      value: function setState(refName, value, update) {
        return App.get().setState(refName, value, update);
      }
      /**
       * Function takes one optional parameter. If refName is given then only a state of a component referred by the refName is given. 
       * Otherwise whole default application state is given.
       * @param {string} refName 
       */

    }, {
      key: "getState",
      value: function getState(refName) {
        return App.get().getState(refName);
      }
      /**
       * Function takes one optional parameter. If refName is given then only a state of a component referred by the refName is checked.
       * Otherwised default application state is checked.
       * @param {string} refName 
       * @returns True if state empty otherwise false.
       */

    }, {
      key: "isStateEmpty",
      value: function isStateEmpty(refName) {
        return App.get().isStateEmpty(refName);
      }
      /**
       * Function takes two optional parameters. If refName is given then only a state of the component with the refName is cleared otherwise 
       * whole default application state is cleared. If update is given then after clearing the state the application is refreshed.
       * @param {string} refName 
       * @param {boolean} update 
       */

    }, {
      key: "clearState",
      value: function clearState(refName, update) {
        return App.get().clearState(refName, update);
      }
      /**
       * Function takes three parameters. If the first parameter is string then the second parameter must be an object or a function.
       * The first parameter refName is a component name and the second parameter is the state of the component as follows: (compName, {key: val, key: val})
       * or if the second parameter is a function then the function should return the changed state of the component in an object respectively.
       * If the first parameter is an object or a function then the second parameter is omitted. 
       * In this case the object must contain a component name and the changed state of the component as follows: ({compName: {val: key, val: key}}).
       * If the first parameter is a function then the function should return the changed state of the component in an object respectively.
       * The state is stored into the default application state.
       * @param {string} refName 
       * @param {object} value 
       */

    }, {
      key: "mergeState",
      value: function mergeState(key, value, update) {
        return App.get().mergeState(key, value, update);
      }
    }, {
      key: "getInstance",
      value: function getInstance() {
        if (Util.isEmpty(App.init().name)) throw "No App instance selected, invoke a function name() first";
        var app = AppManager.get(App.init().name);
        App.reset();
        return app;
      }
      /**
       * Function creates a statefull component. The state of the component is stored in an application that this component is bound to.
       * @param {object} component 
       */

    }, {
      key: "component",
      value: function component(_component) {
        var bindState = function bindState(appName) {
          var updater = Util.isEmpty(appName) ? function () {
            return function (state) {
              return App.getState(state);
            };
          } : function () {
            return function (state) {
              return App.get(appName).getState(state);
            };
          };
          RMEComponentManager.addComponent(_component, updater);
        };

        return bindState;
      }
    }, {
      key: "init",
      value: function init() {
        if (Util.isEmpty(this.self)) this.self = new App();
        return this.self;
      }
    }]);

    return App;
  }();

  var AppInstance =
  /*#__PURE__*/
  function () {
    function AppInstance(name, root, object) {
      _classCallCheck(this, AppInstance);

      this.rawStage = object;
      this.name = name;
      this.root;
      this.state = {};
      this.renderer;
      this.oldStage = "";
      this.router;
      this.ready = false;
      this.setState = this.setState.bind(this);
      this.getState = this.getState.bind(this);
      this.refresh = this.refreshApp.bind(this);
      this.afterRefreshCallQueue = [];
      this.refreshQueue;
      this.bindReadyListener(root);
    }

    _createClass(AppInstance, [{
      key: "bindReadyListener",
      value: function bindReadyListener(root) {
        var _this = this;

        if (document.readyState === "loading" || document.readyState === "interactive") {
          // DOMContentLoaded
          document.addEventListener("readystatechange", function () {
            if (document.readyState === "complete") _this.init(root);
          });
        } else {
          this.init(root);
        }
      }
      /**
       * Initialize the Application
       * @param {string} root 
       */

    }, {
      key: "init",
      value: function init(root) {
        this.root = Util.isEmpty(root) ? Tree.getBody() : Tree.getFirst(root);
        this.renderer = new RMEElemRenderer(this.root);
        this.ready = true;
        this.refreshApp();
      }
    }, {
      key: "refreshApp",
      value: function refreshApp() {
        var _this2 = this;

        if (this.ready) {
          if (this.refreshQueue) Util.clearTimeout(this.refreshQueue);
          this.refreshQueue = Util.setTimeout(function () {
            var freshStage = Template.isTemplate(_this2.rawStage) ? Template.resolve(_this2.rawStage) : _this2.rawStage.duplicate();

            if (!Util.isEmpty(_this2.router)) {
              var state = _this2.router.getCurrentState();

              if (!Util.isEmpty(state.current)) {
                var selector = state.root;
                var element = state.current;

                if (Template.isFragment(element)) {
                  var fragment = {};
                  fragment[state.rootElem.toLiteralString()] = _objectSpread({}, element.fragment);
                  freshStage.getFirst(selector).replace(Template.resolve(fragment));
                } else {
                  freshStage.getFirst(selector).append(element);
                }

                if (!Util.isEmpty(state.onAfter)) _this2.afterRefreshCallQueue.push(state.onAfter);
              }
            }

            if (_this2.oldStage.toString() !== freshStage.toString()) {
              _this2.oldStage = _this2.renderer.merge(_this2.oldStage, freshStage);
            }

            _this2.refreshAppDone();

            Util.clearTimeout(_this2.refreshQueue);
          });
        }
      }
    }, {
      key: "refreshAppDone",
      value: function refreshAppDone() {
        this.afterRefreshCallQueue.forEach(function (callback) {
          return callback();
        });
        this.afterRefreshCallQueue = [];
      }
    }, {
      key: "addAfterRefreshCallback",
      value: function addAfterRefreshCallback(callback) {
        if (Util.isFunction(callback)) {
          this.afterRefreshCallQueue.push(callback);
        }
      }
      /**
       * Function takes three parameters that enable setting state for components.
       * If only one parameter is given then the parameter must be an object or a function. 
       * The object should define a component name and its values as follows. ({refName: {key: val, key: val}}) and
       * the function should return a object describing the component respectively.
       * 
       * If two parameters are given then the first parameter is a component name
       * and the value parameter should describe the component state object as follows. (refName, {key: val, key: val}).
       * The value parameter may also be a function that returns the component state object respectively.
       * 
       * The last parameter update is a boolean value that only if explicitly set to false then the app is not updated
       * after setting the state has occured.
       * 
       * This function will store the state into this application instance state. 
       * @param {*} refName stateRef.
       * @param {*} value new state to set.
       * @param {boolean} update if set to false rerender wont happen after set state.
       */

    }, {
      key: "setState",
      value: function setState(refName, value, update) {
        if (Util.isString(refName) && Util.isFunction(value)) {
          this.state[refName] = value(this.state[refName]);
        } else if (Util.isString(refName) && Util.isObject(value)) {
          this.state[refName] = value;
        } else {
          var state = {};
          if (Util.isFunction(refName)) state = refName(this.state);else if (Util.isObject(refName)) state = refName;

          for (var p in state) {
            if (state.hasOwnProperty(p)) this.state[p] = state[p];
          }
        }

        if (update !== false) this.refreshApp();
      }
      /**
       * Function takes one optional parameter. If refName is given then only a state of a component referred by the refName is given. 
       * Otherwise whole application state of this application instance is given.
       * @param {string} refName 
       */

    }, {
      key: "getState",
      value: function getState(refName) {
        if (Util.isString(refName)) {
          return !Util.isEmpty(this.state[refName]) ? this.state[refName] : {};
        } else if (Util.isEmpty(refName)) {
          return this.state;
        }
      }
      /**
       * Function takes one optional parameter. If refName is given then only a state of a component referred by the refName is checked.
       * Otherwise whole application state of this application instance is checked.
       * @param {*} refName String or props object
       * @returns True if state empty otherwise false.
       */

    }, {
      key: "isStateEmpty",
      value: function isStateEmpty(refName) {
        refName = Util.isString(refName) ? refName : refName.stateRef;
        return this.recursiveCheckMapIsEmpty(Util.isEmpty(refName) ? this.state : this.state[refName]);
      }
    }, {
      key: "recursiveCheckMapIsEmpty",
      value: function recursiveCheckMapIsEmpty(map) {
        for (var key in map) {
          if (map.hasOwnProperty(key)) {
            if (Util.notEmpty(map[key])) return false;
            if (Util.isObject(map[key])) this.recursiveCheckMapIsEmpty(map[key]);
          }
        }

        return true;
      }
      /**
       * Function takes two optional parameters. If refName is given then only a state of the component with the refName is cleared otherwise 
       * whole application state of this application instance is cleared. The application is updated unless the update parameter is 
       * explicitly set false.
       * @param {*} refName String or props object 
       * @param {boolean} update 
       */

    }, {
      key: "clearState",
      value: function clearState(refName, update) {
        refName = Util.isString(refName) ? refName : refName.stateRef;
        this.recursiveClearMap(this.state[refName] || this.state);

        if (update !== false) {
          this.refreshApp();
        }
      }
    }, {
      key: "recursiveClearMap",
      value: function recursiveClearMap(map) {
        var _this3 = this;

        Object.keys(map).forEach(function (key) {
          if (Util.isArray(map[key])) map[key] = [];else if (Util.isObject(map[key])) _this3.recursiveClearMap(map[key]);else map[key] = '';
        });
      }
      /**
       * Function takes three parameters. If the first parameter is string then the second parameter must be an object or a function.
       * The first parameter refName is a component name and the second parameter is the state of the component as follows: (compName, {key: val, key: val})
       * or if the second parameter is a function then the function should return the changed state of the component in an object respectively.
       * If the first parameter is an object or a function then the second parameter is omitted. 
       * In this case the object must contain a component name and the changed state of the component as follows: ({compName: {val: key, val: key}}).
       * If the first parameter is a function then the function should return the changed state of the component in an object respectively.
       * The state is stored into this application instance state.
       * @param {string} refName 
       * @param {object} value 
       * @param {boolean} update
       */

    }, {
      key: "mergeState",
      value: function mergeState(refName, value, update) {
        var newState = {};

        if (Util.isString(refName) && Util.isFunction(value)) {
          newState[refName] = value(this.state[refName]);
        } else if (Util.isString(refName) && Util.isObject(value)) {
          newState[refName] = value;
        } else {
          var state = {};
          if (Util.isFunction(refName)) state = refName(this.state);else if (Util.isObject(refName)) state = refName;

          for (var p in state) {
            if (state.hasOwnProperty(p)) newState[p] = state[p];
          }
        }

        this.recursiveMergeState(this.state, newState);
        if (update !== false) this.refreshApp();
      }
    }, {
      key: "recursiveMergeState",
      value: function recursiveMergeState(oldMap, newMap) {
        for (var key in newMap) {
          if (newMap.hasOwnProperty(key)) {
            if (Util.isArray(oldMap[key]) && !Util.isArray(newMap[key])) oldMap[key].push(newMap[key]);else if (Util.isArray(oldMap[key]) && Util.isArray(newMap[key])) oldMap[key] = oldMap[key].concat(newMap[key]);else if (Util.isObject(oldMap[key]) && Util.isObject(newMap[key])) this.recursiveMergeState(oldMap[key], newMap[key]);else oldMap[key] = newMap[key];
          }
        }
      }
    }, {
      key: "setRouter",
      value: function setRouter(router) {
        this.router = router;
      }
    }]);

    return AppInstance;
  }();

  return {
    name: App.name,
    root: App.root,
    create: App.create,
    get: App.get,
    component: App.component,
    setState: App.setState,
    getState: App.getState,
    clearState: App.clearState,
    isStateEmpty: App.isStateEmpty,
    mergeState: App.mergeState
  };
}();
/**
 * The createApp function is a shortcut function to create an RME application.
 * @param {string} selector
 * @param {function} component
 * @param {string} appName
 * @returns a created app instance.
 */


var createApp = function () {
  return function (selector, component, appName) {
    if (component.valueOf().name.length === 0) {
      throw new Error('The app function must be a named function.');
    }

    if (Util.isFunction(component) && !RMEComponentManager.hasComponent(component.valueOf().name)) Component(component);
    return App.name(appName).root(selector).create(_defineProperty({}, component.valueOf().name, {}));
  };
}();
/**
 * The useState function is a srhotcut function to set application component state.
 * @param {*} refName string, orbject or function. String is the stateRef. Object is the new state object.
 * Function receives a previous state as parameter and returns a new state object.
 * @param {*} value function or object. Object is the new state. Function receives a previous state as 
 * parameter and returns a new state object.
 * @param {*} update optional string or boolean. If string then works as appName otherwise works as normal.
 * @param {string} appName optional if not set default app is used .
 * @returns the new state
 */


var useState = function () {
  return function (refName, value, update, appName) {
    var name = Util.isString(update) ? update : appName;
    var stateRef = Util.isString(refName) ? refName : refName.stateRef;
    App.get(name).setState(stateRef, value, update);
    return App.get(name).getState(stateRef);
  };
}();
/**
 * The function will set the given value in the app value state. The value is accessible by
 * a returned getter and a setter function.
 * @param {*} value Value to set in the app state
 * @param {string} appName Optional app name
 * @returns An array containing the getter and the setter functions for the given value.
 */


var useValue = function () {
  return function (value, appName) {
    return ValueStore.useValue(value, appName);
  };
}();
/**
 * Keeps app instances in memory
 */


var AppManager = function () {
  var AppManager =
  /*#__PURE__*/
  function () {
    function AppManager() {
      _classCallCheck(this, AppManager);

      this.apps = {};
    }

    _createClass(AppManager, [{
      key: "set",
      value: function set(name, value) {
        this.apps[name] = value;
      }
    }, {
      key: "get",
      value: function get(name) {
        return this.apps[name];
      }
    }]);

    return AppManager;
  }();

  var manager = new AppManager();
  return manager;
}();

var RMEElemRenderer =
/*#__PURE__*/
function () {
  function RMEElemRenderer(root) {
    _classCallCheck(this, RMEElemRenderer);

    this.root = root;
    this.mergedStage;
    this.tobeRemoved = [];
  }
  /**
   * Function merges a newStage to a oldStage. Merge rules are following.
   * New stage has what old stage doesn't > add it.
   * New stage has what old stage has > has it changed ? yes > change|update it : no > do nothing.
   * New stage doesn't have what old stage has > remove it.
   * @param {object} oldStage
   * @param {object} newStage
   * @returns The merged stage.
   */


  _createClass(RMEElemRenderer, [{
    key: "merge",
    value: function merge(oldStage, newStage) {
      if (Util.isEmpty(this.root.getChildren())) {
        this.root.append(newStage);
        this.mergedStage = newStage;
      } else {
        this.render(this.root, oldStage, newStage, 0);
        this.mergedStage = oldStage;
        this.removeToBeRemoved();
      }

      return this.mergedStage;
    }
    /**
     * Function is called recusively and goes through a oldStage and a newStage simultaneosly in recursion and comparing them and updating changed content.
     * @param {object} parent 
     * @param {object} oldNode 
     * @param {object} newNode 
     * @param {number} index 
     */

  }, {
    key: "render",
    value: function render(parent, oldNode, newNode, index) {
      if (!oldNode && newNode) {
        parent.append(newNode.duplicate());
      } else if (oldNode && !newNode) {
        this.tobeRemoved.push({
          parent: parent,
          child: this.wrap(parent.dom().children[index])
        });
      } else if (this.hasNodeChanged(oldNode, newNode)) {
        if (oldNode.getTagName() !== newNode.getTagName() || oldNode.dom().children.length > 0 || newNode.dom().children.length > 0) {
          this.wrap(parent.dom().children[index]).replace(newNode.duplicate());
        } else {
          oldNode.setProps(newNode.getProps());
        }
      } else {
        var i = 0;
        var oldLength = oldNode ? oldNode.dom().children.length : 0;
        var newLength = newNode ? newNode.dom().children.length : 0;

        while (i < newLength || i < oldLength) {
          this.render(this.wrap(parent.dom().children[index]), oldNode ? this.wrap(oldNode.dom().children[i]) : null, newNode ? this.wrap(newNode.dom().children[i]) : null, i);
          i++;
        }
      }
    }
    /**
     * Function removes all the marked as to be removed elements which did not come in the new stage by starting from the last to the first.
     */

  }, {
    key: "removeToBeRemoved",
    value: function removeToBeRemoved() {
      if (this.tobeRemoved.length > 0) {
        var lastIdx = this.tobeRemoved.length - 1;

        while (lastIdx >= 0) {
          this.tobeRemoved[lastIdx].parent.remove(this.tobeRemoved[lastIdx].child);
          lastIdx--;
        }

        this.tobeRemoved = [];
      }
    }
    /**
     * Function takes two Elem objects as parameter and compares them if they are equal or have some properties changed.
     * @param {object} oldNode 
     * @param {object} newNode 
     * @returns True if the given Elem objects are the same and nothing is changed otherwise false is returned.
     */

  }, {
    key: "hasNodeChanged",
    value: function hasNodeChanged(oldNode, newNode) {
      return !Util.isEmpty(oldNode) && !Util.isEmpty(newNode) && oldNode.getProps(true) !== newNode.getProps(true);
    }
    /**
     * Function takes DOM node as a parameter and wraps it to Elem object.
     * @param {object} node 
     * @returns the Wrapped Elem object.
     */

  }, {
    key: "wrap",
    value: function wrap(node) {
      if (!Util.isEmpty(node)) return Elem.wrap(node);
    }
  }]);

  return RMEElemRenderer;
}();
/**
 * Manages between component shareable values.
 */


var ValueStore = function () {
  var ValueStore =
  /*#__PURE__*/
  function () {
    function ValueStore() {
      _classCallCheck(this, ValueStore);

      this.values = {};
      this.valueRefGenerator = new RefGenerator('val');
    }
    /**
     * The function will set the given value to the app instance and return a getter and a setter function
     * for the given value. Values can be shared and used in between any component.
     * @param {*} value 
     * @returns An array containing the getter and the setter functions for the given value.
     */


    _createClass(ValueStore, [{
      key: "useValue",
      value: function useValue(value, appName) {
        var _this4 = this;

        if (Util.isFunction(value)) {
          value = value(value);
        }

        var ref = this.valueRefGenerator.next();
        this.values[ref] = value;

        var getter = function getter() {
          return _this4.values[ref];
        };

        var setter = function setter(next, update) {
          if (Util.isFunction(next)) {
            next = next(getter());
          }

          _this4.values[ref] = next;

          if (update !== false) {
            App.get(appName).refresh();
          }
        };

        return [getter, setter];
      }
    }]);

    return ValueStore;
  }();

  var RefGenerator =
  /*#__PURE__*/
  function () {
    function RefGenerator(feed) {
      _classCallCheck(this, RefGenerator);

      this.feed = feed || "";
      this.seq = 0;
    }

    _createClass(RefGenerator, [{
      key: "next",
      value: function next() {
        var ref = this.feed + this.seq;
        this.seq++;
        return ref;
      }
    }]);

    return RefGenerator;
  }();

  var valueStore = new ValueStore();
  return valueStore;
}();
/**
 * Browser class contains all the rest utility functions which JavaScript has to offer from Window, Navigator, Screen, History, Location objects.
 */


var Browser =
/*#__PURE__*/
function () {
  function Browser() {
    _classCallCheck(this, Browser);
  }

  _createClass(Browser, null, [{
    key: "scrollTo",

    /**
     * Scroll once to a given location (xPos, yPos)
     * @param {number} xPos
     * @param {number} yPos
     */
    value: function scrollTo(xPos, yPos) {
      window.scrollTo(xPos, yPos);
    }
    /**
     * Scroll multiple times by given pixel amount (xPx, yPx)
     * @param {number} xPx
     * @param {number} yPx
     */

  }, {
    key: "scrollBy",
    value: function scrollBy(xPx, yPx) {
      window.scrollBy(xPx, yPx);
    }
    /**
     * Opens a new browser window.
     * 
     * Name pamareter can have following values: name or target value (name|_blank|_parent|_self|_top)
     * 
     * Specs parameter is defined as comma,separated,list,without,whitespace and it can have following values:
     * channelmode=yes|no|1|0,
     * direcotries=yes|no|1|0,
     * fullscreen=yes|no|1|0,
     * height=pixels,
     * left=pixels,
     * location=yes|no|1|0,
     * menubar=yes|no|1|0,
     * resizable=yes|no|1|0,
     * scrollbars=yes|no|1|0,
     * status=yes|no|1|0,
     * titlebar=yes|no|1|0,
     * toolbar|yes|no|1|0,
     * top=pixels,
     * width=pixels min 100
     * 
     * Replace parameter defines is a new history entry created or is current replaced with the new one.
     * If true the current entry is replaced with the new one. If false a new history entry is created.
     * @param {string} url 
     * @param {string} name 
     * @param {string} specs 
     * @param {boolean} replace 
     * @returns Reference to the opened window or null if opening the window failes.
     */

  }, {
    key: "open",
    value: function open(url, name, specs, replace) {
      return window.open(url, name, specs, replace);
    }
    /**
     * Closes a given opened window. Same as calling openedWindow.close();
     * @param {*} openedWindow 
     */

  }, {
    key: "close",
    value: function close(openedWindow) {
      openedWindow.close();
    }
    /**
     * Opens a print webpage dialog.
     */

  }, {
    key: "print",
    value: function print() {
      window.print();
    }
    /**
     * Displays an alert dialog with a given message and an OK button.
     * @param {string} message
     */

  }, {
    key: "alert",
    value: function alert(message) {
      window.alert(message);
    }
    /**
     * Displays a confirm dialog with a given message, OK and Cancel button.
     * @param {string} message
     * @returns True if OK was pressed otherwise false.
     */

  }, {
    key: "confirm",
    value: function confirm(message) {
      return window.confirm(message);
    }
    /**
     * Displays a prompt dialog with a given message, a prefilled default text, OK and Cancel button.
     * @param {string} message
     * @param {string} defaultText
     * @returns If OK was pressed and an input field has text then the text is returned. 
     * If the input does not have text and OK was pressed then empty string is returned.
     * If Cancel was pressed then null is returned.
     */

  }, {
    key: "prompt",
    value: function prompt(message, defaultText) {
      return window.prompt(message, defaultText);
    }
    /**
     * Method is used to make a media query to the viewport/screen object. The media query is done according to a given mediaString.
     * Syntax of the media string would be (min-width: 300px) but using this method enables user to omit parentheses(). 
     * Which then leads to syntax min-width: 300px.
     * 
     * Method returns a MediaQueryList object which has few neat properties. Matches and media in addition it has 
     * two functions addListener and removeListener which can be used to query media in realtime. Usage could be something following:
     * 
     * var matcher = Browser.mediaMatcher("max-height: 300px");
     * 
     * matcher.addlistener(function(matcher) {
     *  if(matcher.matches)
     *      Tree.getBody().setStyles({backgroundColor: "red"});
     *  else
     *      Tree.getBody().setStyles({backgroundColor: "green"});
     * });
     * 
     * matcher.media returns the media query string.
     * 
     * matcher.matches returns the boolean indicating does it does the query string match or not. True if it matches, otherwise false.
     * 
     * mathcer.addListener(function(matcher)) is used to track changes on the viewport/screen.
     * 
     * matcher.removeListener(listenerFunction) is used to remove a created listener.
     * @param {string} mediaString 
     * @returns MediaQueryList object.
     */

  }, {
    key: "mediaMatcher",
    value: function mediaMatcher(mediaString) {
      if (mediaString.indexOf("(") !== 0) mediaString = "(" + mediaString;
      if (mediaString.indexOf(")") !== mediaString.length - 1) mediaString = mediaString + ")";
      return window.matchMedia(mediaString);
    }
    /**
     * Loads one page back in the browsers history list.
     */

  }, {
    key: "pageBack",
    value: function pageBack() {
      history.back();
    }
    /**
     * Loads one page forward in the browsers history list.
     */

  }, {
    key: "pageForward",
    value: function pageForward() {
      history.forward();
    }
    /**
     * Loads to specified page in the browsers history list. A parameter can either be a number or string.
     * If the parameter is number then positive and negative values are allowed as positive values will go forward
     * and negative values will go backward. 
     * If the parameter is string then it must be partial or full url of the page in the history list.
     * @param {string|number} numberOfPagesOrUrl
     */

  }, {
    key: "pageGo",
    value: function pageGo(numberOfPagesOrUrl) {
      history.go(numberOfPagesOrUrl);
    }
    /**
     * Create a new history entry with given parameters without reloading the page. State object will be the state
     * next history entry will be using. Title is ignored value by the history object at the time but it could be 
     * the same title what the HTML Document page has at the moment of create the new history entry. New url must 
     * be of the same origin (e.g. www.example.com) but the rest of url could be anything.
     * @param {object} stateObject 
     * @param {string} title 
     * @param {string} newURL 
     */

  }, {
    key: "pushState",
    value: function pushState(stateObject, title, newURL) {
      history.pushState(stateObject, title, newURL);
    }
    /**
     * Replace a history entry with given parameters without reloading the page. State object will be the state
     * next history entry will be using. Title is ignored value by the history object at the time but it could be 
     * the same title what the HTML Document page has at the moment of create the new history entry. New url must 
     * be of the same origin (e.g. www.example.com) but the rest of url could be anything.
     * @param {object} stateObject 
     * @param {string} title 
     * @param {string} newURL 
     */

  }, {
    key: "replaceState",
    value: function replaceState(stateObject, title, newURL) {
      history.replaceState(stateObject, title, newURL);
    }
    /**
     * Loads a new page.
     * @param {string} newURL
     */

  }, {
    key: "newPage",
    value: function newPage(newURL) {
      location.assign(newURL);
    }
    /**
     * Reloads a current page. If a parameter force is true then the page will be loaded from the server 
     * otherwise from the browsers cache.
     * @param {boolean} force
     */

  }, {
    key: "reloadPage",
    value: function reloadPage(force) {
      location.reload(force);
    }
    /**
     * Replaces a current page with a new one. If the page is replaced then it wont be possible to go back
     * to the previous page from the history list.
     * @param {string} newURL
     */

  }, {
    key: "replacePage",
    value: function replacePage(newURL) {
      location.replace(newURL);
    }
    /**
     * @returns Anchor part of the url e.g. #heading2.
     */

  }, {
    key: "getAnchorHash",
    value: function getAnchorHash() {
      return location.hash;
    }
    /**
     * Sets a new anhorpart of the url e.g. #heading3.
     * @param {string} hash
     */

  }, {
    key: "setAnchorHash",
    value: function setAnchorHash(hash) {
      location.hash = hash;
    }
    /**
     * @returns Hostname and port in host:port format.
     */

  }, {
    key: "getHostnamePort",
    value: function getHostnamePort() {
      return location.host;
    }
    /**
     * Set a hostname and port in format host:port.
     * @param {string} hostPort
     */

  }, {
    key: "setHostnamePort",
    value: function setHostnamePort(hostPort) {
      location.host = hostPort;
    }
    /**
     * @returns Hostname e.g. www.google.com.
     */

  }, {
    key: "getHostname",
    value: function getHostname() {
      return location.hostname;
    }
    /**
     * Set a hostname
     * @param {string} hostname
     */

  }, {
    key: "setHostname",
    value: function setHostname(hostname) {
      location.hostname = hostname;
    }
    /**
     * @returns Entire URL of the webpage.
     */

  }, {
    key: "getURL",
    value: function getURL() {
      return location.href;
    }
    /**
     * Set location of a current page to point to a new location e.g. http://some.url.test or #someAcnhor on the page.
     * @param {string} newURL
     */

  }, {
    key: "setURL",
    value: function setURL(newURL) {
      location.href = newURL;
    }
    /**
     * @returns protocol, hostname and port e.g. https://www.example.com:443
     */

  }, {
    key: "getOrigin",
    value: function getOrigin() {
      return location.origin;
    }
    /**
     * @returns Part of the URL after the slash(/) e.g. /photos/
     */

  }, {
    key: "getPathname",
    value: function getPathname() {
      return location.pathname;
    }
    /**
     * Sets a new pathname for this location.
     * @param {string} pathname 
     */

  }, {
    key: "setPathname",
    value: function setPathname(pathname) {
      location.pathname = pathname;
    }
    /**
     * @returns Port number of the connection between server and client.
     */

  }, {
    key: "getPort",
    value: function getPort() {
      return location.port;
    }
    /**
     * Sets a new port number for the connection between server and client.
     * @param {number} portNumber 
     */

  }, {
    key: "setPort",
    value: function setPort(portNumber) {
      location.port = portNumber;
    }
    /**
     * @returns Protocol part of the URL e.g. http: or https:.
     */

  }, {
    key: "getProtocol",
    value: function getProtocol() {
      return location.protocol;
    }
    /**
     * Set a new protocol for this location to use.
     * @param {string} protocol 
     */

  }, {
    key: "setProtocol",
    value: function setProtocol(protocol) {
      location.protocol = protocol;
    }
    /**
     * @returns Part of the URL after the question(?) mark. e.g. ?attr=value&abc=efg.
     */

  }, {
    key: "getSearchString",
    value: function getSearchString() {
      return location.search;
    }
    /**
     * Sets a new searchString into the URL
     * @param {string} searchString 
     */

  }, {
    key: "setSearchString",
    value: function setSearchString(searchString) {
      location.search = searchString;
    }
    /**
     * @returns Codename of the browser.
     */

  }, {
    key: "getCodename",
    value: function getCodename() {
      return navigator.appCodeName;
    }
    /**
     * @returns Name of the browser.
     */

  }, {
    key: "getName",
    value: function getName() {
      return navigator.appName;
    }
    /**
     * @returns Version of the browser.
     */

  }, {
    key: "getVersion",
    value: function getVersion() {
      return navigator.appVersion;
    }
    /**
     * @returns True if cookies are enabled otherwise false.
     */

  }, {
    key: "isCookiesEnabled",
    value: function isCookiesEnabled() {
      return navigator.cookieEnabled;
    }
    /**
     * @returns GeoLocation object.
     */

  }, {
    key: "getGeoLocation",
    value: function getGeoLocation() {
      return navigator.geolocation;
    }
    /**
     * @returns Language of the browser.
     */

  }, {
    key: "getLanguage",
    value: function getLanguage() {
      return navigator.language;
    }
    /**
     * @returns A platform name of which the browser is compiled on.
     */

  }, {
    key: "getPlatform",
    value: function getPlatform() {
      return navigator.platform;
    }
    /**
     * @returns A name of an engine of the browser.
     */

  }, {
    key: "getProduct",
    value: function getProduct() {
      return navigator.product;
    }
    /**
     * @returns A header string sent to a server by the browser.
     */

  }, {
    key: "getUserAgentHeader",
    value: function getUserAgentHeader() {
      return navigator.userAgent;
    }
    /**
     * @returns Color depth of the current screen.
     */

  }, {
    key: "getColorDepth",
    value: function getColorDepth() {
      return screen.colorDepth;
    }
    /**
     * @returns Total height of the current screen.
     */

  }, {
    key: "getFullScreenHeight",
    value: function getFullScreenHeight() {
      return screen.height;
    }
    /**
     * @returns Total width of the current screen.
     */

  }, {
    key: "getFullScreenWidth",
    value: function getFullScreenWidth() {
      return screen.width;
    }
    /**
     * @returns Height of the current screen excluding OS. taskbar.
     */

  }, {
    key: "getAvailableScreenHeight",
    value: function getAvailableScreenHeight() {
      return screen.availHeight;
    }
    /**
     * @returns Width of the current screen exluding OS. taskbar.
     */

  }, {
    key: "getAvailableScreenWidth",
    value: function getAvailableScreenWidth() {
      return screen.availWidth;
    }
  }]);

  return Browser;
}();
/**
 * AppSetInitialStateJob is used internally to set a state for components in a queue. An application
 * instance might have not been created at the time when components are created so the queue will wait 
 * until the application instance is created and then sets the state for the components in the queue.
 */


var AppSetInitialStateJob = function () {
  var InitStateJob =
  /*#__PURE__*/
  function () {
    function InitStateJob() {
      _classCallCheck(this, InitStateJob);

      this.updateJob;
      this.updateJobMap = {};
      this.appNameList = [];
    }

    _createClass(InitStateJob, [{
      key: "resolveUpdateJobs",
      value: function resolveUpdateJobs() {
        var _this5 = this;

        if (!this.updateJob) this.updateJob = Util.setInterval(function () {
          var appName = _this5.getAppNameIfPresent();

          if (!Util.isEmpty(appName)) {
            _this5.updateJobMap[appName].forEach(function (job) {
              return job();
            });

            _this5.updateJobMap[appName] = [];
            _this5.appNameList = _this5.appNameList.filter(function (app) {
              return app !== appName;
            });

            if (_this5.appNameList.length === 0) {
              Util.clearInterval(_this5.updateJob);
              _this5.updateJob = undefined;
            }
          }
        });
      }
    }, {
      key: "getAppNameIfPresent",
      value: function getAppNameIfPresent() {
        return this.appNameList.find(function (appName) {
          return App.get(appName === "undefined" ? undefined : appName);
        });
      }
    }, {
      key: "addToQueue",
      value: function addToQueue(appName, job) {
        var updateQueue = this.updateJobMap[appName] || [];
        updateQueue.push(job);
        this.updateJobMap[appName] = updateQueue;
        this.appNameList = Object.keys(this.updateJobMap);
        this.resolveUpdateJobs();
      }
    }]);

    return InitStateJob;
  }();

  var initStateJob = new InitStateJob();
  return {
    addToQueue: initStateJob.addToQueue.bind(initStateJob),
    resolveUpdateJobs: initStateJob.resolveUpdateJobs.bind(initStateJob)
  };
}();
/**
 * Component resolves comma separated list of components that may be function or class.
 * Function component example: const Comp = props => ({h1: 'Hello'});
 * Class component example: class Comp2 {.... render(props) { return {h1: 'Hello'}}};
 * Resolve components Component(Comp, Comp2);
 * @param {function} components commma separated list of components
 */


var Component = function () {
  var resolveInitialState = function resolveInitialState(initialState, stateRef, appName) {
    if (!Util.isEmpty(App.get(appName))) {
      App.get(appName).setState(stateRef, initialState, false);
    } else {
      AppSetInitialStateJob.addToQueue(appName, function () {
        return App.get(appName).setState(stateRef, initialState);
      });
    }
  };

  var resolveComponent = function resolveComponent(component) {
    if (Util.isObject(component)) {
      App.component(_defineProperty({}, component.name, component.comp))(component.appName);
      resolveInitialState(component.initialState, component.name + component.stateRef, component.appName);
    } else if (Util.isFunction(component) && Util.isEmpty(component.prototype) || Util.isEmpty(component.prototype.render)) {
      RMEComponentManager.addComponent(_defineProperty({}, component.valueOf().name, component));
    } else if (Util.isFunction(component) && !Util.isEmpty(component.prototype.render)) {
      var comp = new component();
      App.component(_defineProperty({}, component.valueOf().name, comp.render))(comp.appName);
      var state = {};
      if (!Util.isEmpty(comp.onBeforeCreate)) state.onBeforeCreate = comp.onBeforeCreate;
      if (!Util.isEmpty(comp.shouldComponentUpdate)) state.shouldComponentUpdate = comp.shouldComponentUpdate;
      if (!Util.isEmpty(comp.onAfterCreate)) state.onAfterCreate = comp.onAfterCreate;
      if (!Util.isEmpty(comp.onAfterRender)) state.onAfterRender = comp.onAfterRender;
      state = _objectSpread({}, state, {}, comp.initialState);
      var ref = comp.stateRef || state.stateRef || '';
      resolveInitialState(state, component.name + ref, comp.appName);
    }
  };

  return function () {
    for (var _len = arguments.length, components = new Array(_len), _key = 0; _key < _len; _key++) {
      components[_key] = arguments[_key];
    }

    components.forEach(function (component) {
      return !Util.isEmpty(component.valueOf().name) && resolveComponent(component);
    });
  };
}();
/**
 * A bindState function transfers a function component to a stateful component just like it was created 
 * using class or App class itself. The function receives three parameters. The function component,
 * an optional state object and an optinal appName.
 * Invoking examples:
 * Component(bindState(StatefulComponent));
 * Component(bindState(OtherComponent, { initialValue: 'initialText' }));
 * @param {function} component
 * @param {object} state
 * @param {string} appName
 */


var bindState = function () {
  var getStateRef = function getStateRef(state) {
    return state && state.stateRef ? state.stateRef : '';
  };

  var removeStateRef = function removeStateRef(state) {
    var obj = _objectSpread({}, state);

    delete obj.stateRef;
    return obj;
  };

  return function (component, state, appName) {
    return {
      comp: component,
      name: component.valueOf().name,
      appName: appName,
      stateRef: getStateRef(state),
      initialState: _objectSpread({}, removeStateRef(state))
    };
  };
}();
/**
 * The function will bind an array of getter functions for the component. The getters are invoked
 * when the component is invoked. The values returend by the getters are set in the component properties.
 * @param {*} component
 * @param {Array} mapper Value mapper
 */


var bindGetters = function () {
  return function (component, mapper) {
    var name;
    if (Util.isFunction(component)) name = component.valueOf().name;else if (Util.isObject(component)) {
      name = component.name;
    }
    RMEComponentManager.bindGetters(name, mapper);
    return component;
  };
}();
/**
 * Manages RME components
 */


var RMEComponentManager = function () {
  var RMEComponentManager =
  /*#__PURE__*/
  function () {
    function RMEComponentManager() {
      _classCallCheck(this, RMEComponentManager);

      this.components = {};
      this.componentGetters = {};
    }

    _createClass(RMEComponentManager, [{
      key: "addComponent",
      value: function addComponent(component, props) {
        var _this6 = this;

        if (Util.isFunction(component)) {
          component = component.call();
        }

        Object.keys(component).forEach(function (p) {
          _this6.components[p] = {
            component: component[p],
            update: Util.isFunction(props) ? props : undefined
          };
        });
      }
    }, {
      key: "getComponent",
      value: function getComponent(name, props) {
        var comp = this.components[name];

        if (!comp) {
          throw new Error("Cannot find a component: \"".concat(name, "\""));
        }

        if (Util.notEmpty(props) && Util.isFunction(comp.update)) {
          var stateRef = props.stateRef;
          if (Util.isEmpty(props.stateRef)) stateRef = name;else if (props.stateRef.search(name) === -1) stateRef = "".concat(name).concat(props.stateRef);
          props["stateRef"] = stateRef;
          var newProps = comp.update.call()(stateRef);

          var nextProps = _objectSpread({}, props, {}, newProps); // nextProps is created for the sake of shouldComponentUpdate


          if (!nextProps.shouldComponentUpdate || nextProps.shouldComponentUpdate(nextProps) !== false) {
            props = this.extendProps(props, newProps);
          }
        }

        if (Util.isEmpty(props)) props = {};
        this.inflateGetterValues(name, props);
        if (Util.notEmpty(props.onBeforeCreate) && Util.isFunction(props.onBeforeCreate)) props.onBeforeCreate.call(props, props);
        var ret = comp.component.call(props, props);
        if (Template.isTemplate(ret)) ret = Template.resolve(ret);
        if (Util.notEmpty(props.onAfterCreate) && Util.isFunction(props.onAfterCreate)) props.onAfterCreate.call(props, ret, props);
        if (Util.notEmpty(this.defaultApp) && Util.notEmpty(props.onAfterRender) && Util.isFunction(props.onAfterRender)) this.defaultApp.addAfterRefreshCallback(props.onAfterRender.bind(ret, ret, props));
        return ret;
      }
    }, {
      key: "inflateGetterValues",
      value: function inflateGetterValues(component, props) {
        var mapper = this.getGetters(component);

        if (Util.notEmpty(mapper)) {
          var p = Object.keys(mapper).reduce(function (prev, curr) {
            prev[curr] = Util.isFunction(mapper[curr]) ? mapper[curr]() : mapper[curr];
            return prev;
          }, {});
          this.extendProps(props, p);
        }
      }
    }, {
      key: "extendProps",
      value: function extendProps(props, newProps) {
        if (Util.notEmpty(newProps)) {
          Object.keys(newProps).forEach(function (key) {
            return props[key] = newProps[key];
          });
        }

        return props;
      }
      /**
       * Function checks if the given components exists or not
       * @param {string} name 
       * @returns True if the component exists.
       */

    }, {
      key: "hasComponent",
      value: function hasComponent(name) {
        return Util.notEmpty(this.components[name.replace('component:', '')]);
      }
    }, {
      key: "bindGetters",
      value: function bindGetters(component, getters) {
        this.componentGetters[component] = getters;
      }
    }, {
      key: "getGetters",
      value: function getGetters(component) {
        return this.componentGetters[component];
      }
    }]);

    return RMEComponentManager;
  }();

  var manager = new RMEComponentManager();
  return manager;
}();

var Cookie = function () {
  /**
   * Cookie interface offers an easy way to get, set or remove cookies in application logic.
   * The Cookie interface handles Cookie objects under the hood. The cookie object may hold following values:
   * 
   * {
   *    name: "name",
   *    value: "value",
   *    expiresDate: "expiresDate e.g. Date.toUTCString()",
   *    cookiePath: "cookiePath absolute dir",
   *    cookieDomain: "cookieDomain e.g example.com",
   *    setSecureBoolean: true|false
   * }
   * 
   * The cookie object also has methods toString() and setExpired(). Notice that setExpired() method wont delete the cookie but merely 
   * sets it expired. To remove a cookie you should invoke remove(name) method of the Cookie interface.
   */
  var Cookie =
  /*#__PURE__*/
  function () {
    function Cookie() {
      _classCallCheck(this, Cookie);
    }

    _createClass(Cookie, null, [{
      key: "get",

      /**
       * Get a cookie by name. If the cookie is found a cookie object is returned otherwise null.
       * 
       * @param {String} name 
       * @returns cookie object
       */
      value: function get(name) {
        if (navigator.cookieEnabled) {
          var retCookie = null;
          var cookies = document.cookie.split(";");
          var i = 0;

          while (i < cookies.length) {
            var cookie = cookies[i];
            var eq = cookie.search("=");
            var cn = cookie.substr(0, eq).trim();
            var cv = cookie.substr(eq + 1, cookie.length).trim();

            if (cn === name) {
              retCookie = new CookieInstance(cn, cv);
              break;
            }

            i++;
          }

          return retCookie;
        }
      }
      /**
       * Set a cookie. Name and value parameters are essential on saving the cookie and other parameters are optional.
       * 
       * @param {string} name
       * @param {string} value
       * @param {string} expiresDate
       * @param {string} cookiePath
       * @param {string} cookieDomain
       * @param {boolean} setSecureBoolean
       */

    }, {
      key: "set",
      value: function set(name, value, expiresDate, cookiePath, cookieDomain, setSecureBoolean) {
        if (navigator.cookieEnabled) {
          document.cookie = CookieInstance.create(name, value, expiresDate, cookiePath, cookieDomain, setSecureBoolean).toString();
        }
      }
      /**
       * Remove a cookie by name. Method will set the cookie expired and then remove it.
       * @param {string} name
       */

    }, {
      key: "remove",
      value: function remove(name) {
        var co = Cookie.get(name);

        if (!Util.isEmpty(co)) {
          co.setExpired();
          document.cookie = co.toString();
        }
      }
    }]);

    return Cookie;
  }();
  /**
   * Cookie object may hold following values:
   *
   * {
   *    name: "name",
   *    value: "value",
   *    expiresDate: "expiresDate e.g. Date.toUTCString()",
   *    cookiePath: "cookiePath absolute dir",
   *    cookieDomain: "cookieDomain e.g example.com",
   *    setSecureBoolean: true|false
   * }
   * 
   * The cookie object also has methods toString() and setExpired(). Notice that setExpired() method wont delete the cookie but merely 
   * sets it expired. To remove a cookie you should invoke remove(name) method of the Cookie interface.
   */


  var CookieInstance =
  /*#__PURE__*/
  function () {
    function CookieInstance(name, value, expiresDate, cookiePath, cookieDomain, setSecureBoolean) {
      _classCallCheck(this, CookieInstance);

      this.cookieName = !Util.isEmpty(name) && Util.isString(name) ? name.trim() : "";
      this.cookieValue = !Util.isEmpty(value) && Util.isString(value) ? value.trim() : "";
      this.cookieExpires = !Util.isEmpty(expiresDate) && Util.isString(expiresDate) ? expiresDate.trim() : "";
      this.cookiePath = !Util.isEmpty(cookiePath) && Util.isString(cookiePath) ? cookiePath.trim() : "";
      this.cookieDomain = !Util.isEmpty(cookieDomain) && Util.isString(cookieDomain) ? cookieDomain.trim() : "";
      this.cookieSecurity = !Util.isEmpty(setSecureBoolean) && Util.isBoolean(setSecureBoolean) ? "secure=secure" : "";
    }

    _createClass(CookieInstance, [{
      key: "setExpired",
      value: function setExpired() {
        this.cookieExpires = new Date(1970, 0, 1).toString();
      }
    }, {
      key: "toString",
      value: function toString() {
        return this.cookieName + "=" + this.cookieValue + "; expires=" + this.cookieExpires + "; path=" + this.cookiePath + "; domain=" + this.cookieDomain + "; " + this.cookieSecurity;
      }
    }], [{
      key: "create",
      value: function create(name, value, expires, cpath, cdomain, setSecure) {
        return new CookieInstance(name, value, expires, cpath, cdomain, setSecure);
      }
    }]);

    return CookieInstance;
  }();

  return Cookie;
}();
/**
 * A CSS function will either create a new style element containing given css and other parameters 
 * or it will append to a existing style element if the element is found by given parameters.
 * @param {string} css string
 * @param {object} config properties object of the style element
 */


var CSS = function () {
  var getStyles = function getStyles(config) {
    var styles = Tree.getHead().getByTag('style');

    if (Util.isEmpty(config) && !Util.isArray(styles)) {
      return styles;
    } else if (Util.isArray(styles)) {
      return styles.find(function (style) {
        return arePropertiesSame(style.getProps(), config);
      });
    } else if (!Util.isEmpty(styles) && arePropertiesSame(styles.getProps(), config)) {
      return styles;
    }
  };

  var propsWithoutContent = function propsWithoutContent(props) {
    var newProps = _objectSpread({}, props);

    delete newProps.text;
    return newProps;
  };

  var arePropertiesSame = function arePropertiesSame(oldProps, newProps) {
    return JSON.stringify(propsWithoutContent(oldProps)) === JSON.stringify(newProps || {});
  };

  var hasStyles = function hasStyles(config) {
    return !Util.isEmpty(getStyles(config));
  };

  var hasContent = function hasContent(content, config) {
    var styles = getStyles(config);

    if (!Util.isEmpty(styles)) {
      return styles.getContent().match(content) !== null;
    }
  };

  return function (content, config) {
    if (!hasStyles(config)) {
      Tree.getHead().append({
        style: _objectSpread({
          content: content
        }, config)
      });
    } else if (!hasContent(content, config)) {
      var style = getStyles(config);

      if (!Util.isEmpty(style)) {
        var prevContent = style.getContent();
        style.setContent(prevContent + content);
      }
    }
  };
}();

var Elem = function () {
  /**
   * Elem class is a wrapper class for HTMLDocument element JavaScript object. This object constructor 
   * takes one parameter that can be either type of a string or a HTMLDocument. If the parameter is type of the string
   * then a new HTMLDocument of that type will be created otherwise if the type is the HTMLDocument then 
   * that HTMLDocument will be wrapped with this Elem instance and new element wont be created. All setter methods and event listener
   * methods will return an instance of this class which enables chaining of methods that makes code even more compact. This class also
   * has many shortcut helper methods defined. 
   * 
   * The most notabled method of this class is probably render method. This method is very special method that renders other Elem objects. 
   * The main principle is that only an Elem object may render other child Elem objects. The render method renders objects dynamically.
   */
  var Elem =
  /*#__PURE__*/
  function () {
    function Elem(type) {
      _classCallCheck(this, Elem);

      if (Util.isString(type)) {
        this.html = document.createElement(type);
      } else if (type.nodeType !== undefined && type.ownerDocument !== undefined && type.nodeType >= 1 && type.ownerDocument instanceof HTMLDocument) {
        this.html = type;
      } else {
        throw "type must be a string or a HTMLDocument";
      }
    }
    /**
     * Set text of this element.
     * 
     * @param {String} text 
     * @returns Elem instance.
     */


    _createClass(Elem, [{
      key: "setText",
      value: function setText(text) {
        if (this.html.hasChildNodes()) {
          this.html.replaceChild(document.createTextNode(text), this.html.childNodes[0]);
        } else {
          this.html.appendChild(document.createTextNode(text));
        }

        return this;
      }
      /**
       * Get text of this element.
       * @returns text of this element.
       */

    }, {
      key: "getText",
      value: function getText() {
        var text = "";
        this.html.childNodes.forEach(function (node) {
          if (node.nodeType === 3) {
            text = node.nodeValue;
          }
        });
        return text;
      }
      /**
       * Get text/content of this element.
       * 
       * @returns text or content of this element.
       */

    }, {
      key: "getContent",
      value: function getContent() {
        return this.html.innerHTML;
      }
      /**
       * Set content that can be text or html.
       * 
       * @param {String} html 
       * @returns Elem instance.
       */

    }, {
      key: "setContent",
      value: function setContent(html) {
        this.html.innerHTML = html;
        return this;
      }
      /**
       * Set value of this element.
       * 
       * @param {String} value 
       * @returns Elem instance.
       */

    }, {
      key: "setValue",
      value: function setValue(value) {
        this.html.value = value;
        return this;
      }
      /**
       * Get value of this element.
       * 
       * @returns value of this element.
       */

    }, {
      key: "getValue",
      value: function getValue() {
        return this.html.value;
      }
      /**
       * Set id of this element.
       * 
       * @param {String} id 
       * @returns Elem instance.
       */

    }, {
      key: "setId",
      value: function setId(id) {
        this.html.id = id;
        return this;
      }
      /**
       * Get id of this element.
       * 
       * @returns id of this element.
       */

    }, {
      key: "getId",
      value: function getId() {
        return this.html.id;
      }
      /**
       * Append an element inside this element.
       * 
       * @param {Elem} elem 
       * @returns Elem instance.
       */

    }, {
      key: "append",
      value: function append(elem) {
        if (!Util.isEmpty(elem)) this.html.appendChild(Template.isTemplate(elem) ? Template.resolve(elem).dom() : elem.dom());
        return this;
      }
      /**
       * Remove an element from this element.
       * 
       * @param {Elem} elem 
       * @returns Elem isntance.
       */

    }, {
      key: "remove",
      value: function remove(elem) {
        this.html.removeChild(elem.dom());
        return this;
      }
      /**
       * Replace this element with a new element.
       * 
       * @param {Elem} newElem 
       * @returns Elem instance.
       */

    }, {
      key: "replace",
      value: function replace(newElem) {
        this.html.parentElement.replaceChild(newElem.dom(), this.html);
        return this;
      }
      /**
       * Insert a new element before this element.
       * 
       * @param {Elem} newElem 
       * @returns Elem instance.
       */

    }, {
      key: "before",
      value: function before(newElem) {
        this.html.parentElement.insertBefore(newElem.dom(), this.html);
        return this;
      }
      /**
       * Insert a new elem after this element.
       * 
       * @param {Elem} newElem 
       * @returns Elem isntance.
       */

    }, {
      key: "after",
      value: function after(newElem) {
        if (this.html.nextElementSibling !== null) this.html.parentElement.insertBefore(newElem.dom(), this.html.nextElementSibling);else this.html.parentElement.appendChild(newElem.dom());
        return this;
      }
      /**
       * @returns String presentation of this component.
       */

    }, {
      key: "toString",
      value: function toString() {
        return "<" + this.getTagName().toLowerCase() + ">" + this.getContent() + "</" + this.getTagName().toLowerCase() + ">";
      }
    }, {
      key: "toLiteralString",
      value: function toLiteralString() {
        return RMEElemTemplater.toLiteralString(this);
      }
      /**
       * Converts this Elem object to JSON template object.
       * @param {boolean} deep default true if true children will also be templated.
       * @returns Template representation of the element tree.
       */

    }, {
      key: "toTemplate",
      value: function toTemplate(deep) {
        return RMEElemTemplater.toTemplate(this, deep);
      }
      /**
       * Returns properties of an Elem in an object. If a boolean json is true
       * then the returned object is returned as JSON string.
       * @param {boolean} json 
       * @returns Properties of the elem in the properties object.
       */

    }, {
      key: "getProps",
      value: function getProps(json) {
        if (Util.isBoolean(json) && json === true) return JSON.stringify(RMEElemTemplater.getElementProps(this));else return RMEElemTemplater.getElementProps(this);
      }
      /**
       * Method will override old properties with the given properties.
       * @param {object} props 
       * @returns Elem instance.
       */

    }, {
      key: "setProps",
      value: function setProps(props) {
        Template.updateElemProps(this, props, this.getProps());
        return this;
      }
      /**
       * Method is able to render child elements dynamically as illustrated below:
       * Renders: [Elem, Elem, Elem.....] | Elem, Elem, Elem | [Elem, Elem], Elem.
       * 
       * Empty arrays, null, or undefined values will not be rendered.
       * If this method is invoked empty (without parameters), with empty array, undefined or null value
       * then this element will render itself empty. As this method renders given elements dynamically and
       * renderable content may change by user written application logic.
       * 
       * @param {Elem} elems 
       * @returns Elem instance.
       */

    }, {
      key: "render",
      value: function render() {
        var newState = [];
        var i = 0;

        for (var _len2 = arguments.length, elems = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          elems[_key2] = arguments[_key2];
        }

        var max = elems.length;

        while (i < max) {
          if (Util.isArray(elems[i])) newState = newState.concat(elems[i]);else newState.push(elems[i]);
          i++;
        }

        if (!RenderHelper.isNewStateEqualToPrevState(newState)) {
          RenderHelper.setPrevState(null);

          while (this.html.firstChild) {
            this.html.removeChild(this.html.firstChild);
          }

          i = 0;
          max = newState.length;

          while (i < max) {
            if (!Util.isEmpty(newState[i])) this.append(newState[i]);
            i++;
          }
        }

        RenderHelper.setPrevState(newState);
        return this;
      }
      /**
       * Get an array of children of this element. Returns the array of child elements wrapped in Elem instance.
       * 
       * @returns An array of child elements wrapped in Elem instance.
       */

    }, {
      key: "getChildren",
      value: function getChildren() {
        return Elem.wrapElems(this.html.children);
      }
      /**
       * Uses CSS selector to find all matching child elements in this Element. Found elements will be wrapped in an Elem instance.
       * @param {string} selector 
       * @returns An array of Elem instances or a single Elem instance.
       */

    }, {
      key: "get",
      value: function get(selector) {
        return Elem.wrapElems(this.html.querySelectorAll(selector));
      }
      /**
       * Uses CSS selector to find the first match child element in this Element.
       * Found element will be wrapped in an Elem instance.
       * @param {string} selector 
       * @returns An Elem instance.
       */

    }, {
      key: "getFirst",
      value: function getFirst(selector) {
        try {
          return Elem.wrap(this.html.querySelector(selector));
        } catch (e) {}
      }
      /**
       * Uses a HTML Document tag name to find matching elements in this Element e.g. div, span, p.
       * Found elements will be wrapped in an Elem instance.
       * If found many then an array of Elem instanes are returned otherwise a single Elem instance.
       * @param {string} tag 
       * @returns An array of Elem instances or a single Elem instance.
       */

    }, {
      key: "getByTag",
      value: function getByTag(tag) {
        return Elem.wrapElems(this.html.getElementsByTagName(tag));
      }
      /**
       * Uses a HTML Document element class string to find matching elements in this Element e.g. "main emphasize-green".
       * Method will try to find elements having any of the given classes. Found elements will be wrapped in an Elem instance.
       * If found many then an array of Elem instances are returned otherwise a single Elem instance.
       * @param {string} classname 
       * @returns An array of Elem instances or a single Elem instance.
       */

    }, {
      key: "getByClass",
      value: function getByClass(classname) {
        return Elem.wrapElems(this.html.getElementsByClassName(classname));
      }
      /**
       * Set a title of this element.
       * 
       * @param {String} text 
       * @returns Elem instance.
       */

    }, {
      key: "setTitle",
      value: function setTitle(text) {
        this.html.title = text;
        return this;
      }
      /**
       * Get a title of this element.
       * 
       * @returns The title of this element.
       */

    }, {
      key: "getTitle",
      value: function getTitle() {
        return this.html.title;
      }
      /**
       * Set a tab index of this element.
       * 
       * @param {Number} idx 
       * @returns Elem instance.
       */

    }, {
      key: "setTabIndex",
      value: function setTabIndex(idx) {
        this.setAttribute('tabindex', idx);
        return this;
      }
      /**
       * Get a tab index of this element.
       * 
       * @returns A tab index value of this element.
       */

    }, {
      key: "getTabIndex",
      value: function getTabIndex() {
        return this.getAttribute('tabindex');
      }
      /**
       * Get a tag name of this element.
       * 
       * @returns A tag name of this element.
       */

    }, {
      key: "getTagName",
      value: function getTagName() {
        return this.html.tagName;
      }
      /**
       * Set an attribute of this element.
       * 
       * @param {String} attr Attribute
       * @param {String} value Value
       * @returns Elem isntance.
       */

    }, {
      key: "setAttribute",
      value: function setAttribute(attr, value) {
        var attribute = document.createAttribute(attr);
        attribute.value = value;
        this.html.setAttributeNode(attribute);
        return this;
      }
      /**
       * Get an attribute of this element.
       * 
       * @param {String} attr 
       * @returns a value of the attribute.
       */

    }, {
      key: "getAttribute",
      value: function getAttribute(attr) {
        return this.html.getAttribute(attr);
      }
      /**
       * Removes an attribute of this element.
       * 
       * @param {String} attr 
       * @returns Elem instance.
       */

    }, {
      key: "removeAttribute",
      value: function removeAttribute(attr) {
        var attrNode = this.html.getAttributeNode(attr);
        if (attrNode) this.html.removeAttributeNode(attrNode);
        return this;
      }
      /**
       * Set a name of this element.
       * 
       * @param {String} name 
       * @returns Elem instance.
       */

    }, {
      key: "setName",
      value: function setName(name) {
        this.setAttribute('name', name);
        return this;
      }
      /**
       * Get a name of this element.
       * 
       * @returns name string of this element.
       */

    }, {
      key: "getName",
      value: function getName() {
        return this.getAttribute('name');
      }
      /**
       * Set a type of this element.
       * 
       * @param {String} type 
       * @returns Elem instance.
       */

    }, {
      key: "setType",
      value: function setType(type) {
        this.setAttribute('type', type);
        return this;
      }
      /**
       * Get a type of this element.
       * 
       * @returns type string of this element.
       */

    }, {
      key: "getType",
      value: function getType() {
        return this.getAttribute('type');
      }
      /**
       * Set a source of this element.
       * 
       * @param {String} source 
       * @returns Elem instance.
       */

    }, {
      key: "setSource",
      value: function setSource(source) {
        this.setAttribute('src', source);
        return this;
      }
      /**
       * Get a source of this element.
       * 
       * @returns source string of this element.
       */

    }, {
      key: "getSource",
      value: function getSource() {
        return this.getAttribute('src');
      }
      /**
       * Set a href of this element.
       * 
       * @param {String} href 
       * @returns Elem instance.
       */

    }, {
      key: "setHref",
      value: function setHref(href) {
        this.setAttribute('href', href);
        return this;
      }
      /**
       * Get a href of this element.
       * 
       * @returns href of this element.
       */

    }, {
      key: "getHref",
      value: function getHref() {
        return this.getAttribute('href');
      }
      /**
       * Set a placeholder of this element.
       * 
       * @param {String} placeholder 
       * @returns Elem instance.
       */

    }, {
      key: "setPlaceholder",
      value: function setPlaceholder(placeholder) {
        this.setAttribute('placeholder', placeholder);
        return this;
      }
      /**
       * Get a placeholder of this element.
       * 
       * @returns placeholder of this element.
       */

    }, {
      key: "getPlaceholder",
      value: function getPlaceholder() {
        return this.getAttribute('placeholder');
      }
      /**
       * Sets size of this element.
       * 
       * @param {*} size 
       * @returns Elem instance.
       */

    }, {
      key: "setSize",
      value: function setSize(size) {
        this.setAttribute('size', size);
        return this;
      }
      /**
       * Get size of this element.
       * 
       * @returns size of this element.
       */

    }, {
      key: "getSize",
      value: function getSize() {
        return this.getAttribute('size');
      }
      /**
       * Set maximum length of an input field.
       * @param {number} length 
       * @returns Elem instance.
       */

    }, {
      key: "setMaxLength",
      value: function setMaxLength(length) {
        this.setAttribute('maxlength', length);
        return this;
      }
      /**
       * @returns Max length of this element.
       */

    }, {
      key: "getMaxLength",
      value: function getMaxLength() {
        return this.getAttribute('maxlength');
      }
      /**
       * Set minimum length of an input field.
       * @param {number} length 
       * @returns Elem instance.
       */

    }, {
      key: "setMinLength",
      value: function setMinLength(length) {
        this.setAttribute('minlength', length);
        return this;
      }
      /**
       * @returns Min lenght of this element.
       */

    }, {
      key: "getMinLength",
      value: function getMinLength() {
        return this.getAttribute('minlength');
      }
      /**
       * Set data to be stored into this dom element by a given key.
       * @param {string} key 
       * @param {*} value 
       * @returns Elem instance.
       */

    }, {
      key: "setData",
      value: function setData(key, value) {
        this.html.dataset[key] = value;
        return this;
      }
      /**
       * Get data by a given key from this dom element.
       * @param {string} key 
       * @returns Retrieved data.
       */

    }, {
      key: "getData",
      value: function getData(key) {
        return this.html.dataset[key];
      }
      /**
       * Set this element content editable.
       * 
       * @param {boolean} boolean 
       * @returns Elem instance.
       */

    }, {
      key: "setEditable",
      value: function setEditable(_boolean) {
        this.setAttribute('contenteditable', _boolean);
        return this;
      }
      /**
       * Get this element content editable.
       * 
       * @returns content editable state of this element.
       */

    }, {
      key: "getEditable",
      value: function getEditable() {
        return this.getAttribute('contenteditable');
      }
      /**
       * Set this element disabled.
       * 
       * @param {boolean} boolean 
       * @returns Elem instance.
       */

    }, {
      key: "setDisabled",
      value: function setDisabled(_boolean2) {
        if (Util.isBoolean(_boolean2) && _boolean2 === true || Util.isString(_boolean2) && _boolean2 === 'disabled') {
          this.setAttribute('disabled', 'disabled');
        } else {
          this.removeAttribute('disabled');
        }

        return this;
      }
      /**
       * Get this element disabled state.
       * 
       * @returns disabled state of this element.
       */

    }, {
      key: "getDisabled",
      value: function getDisabled() {
        return this.getAttribute('disabled');
      }
      /**
       * Set this element checked.
       * 
       * @param {boolean} boolean 
       * @returns Elem instance.
       */

    }, {
      key: "setChecked",
      value: function setChecked(_boolean3) {
        if (Util.isBoolean(_boolean3) && _boolean3 === true || Util.isString(_boolean3) && _boolean3 === 'checked') {
          this.setAttribute('checked', 'checked');
          this.html.checked = true;
        } else {
          this.removeAttribute('checked');
          this.html.checked = false;
        }

        return this;
      }
      /**
       * Get this element checked state.
       * 
       * @returns checked state of this element.
       */

    }, {
      key: "getChecked",
      value: function getChecked() {
        return this.getAttribute('checked');
      }
      /**
       * Set this element selected.
       * 
       * @param {boolean} boolean 
       * @returns Elem instance.
       */

    }, {
      key: "setSelected",
      value: function setSelected(_boolean4) {
        if (Util.isBoolean(_boolean4) && _boolean4 === true || Util.isString(_boolean4) && _boolean4 === 'selected') {
          this.setAttribute('selected', 'selected');
        } else {
          this.removeAttribute('selected');
        }

        return this;
      }
      /**
       * Get this element selected selected attribute value.
       * 
       * @returns selected attribute value.
       */

    }, {
      key: "getSelected",
      value: function getSelected() {
        return this.getAttribute('selected');
      }
      /**
       * Add classes to this element.
       * 
       * @param {String} classes 
       * @returns Elem instance.
       */

    }, {
      key: "addClasses",
      value: function addClasses(classes) {
        var addClassesArray = classes.trim().split(' ');
        var origClassName = this.getClasses();
        var origClassesArray = origClassName.split(' ');
        addClassesArray = addClassesArray.filter(function (clazz) {
          return origClassName.match(clazz) === null;
        });
        this.html.className = origClassesArray.concat(addClassesArray).join(' ').trim();
        return this;
      }
      /**
       * Update classes on this element. Previous classes are overridden.
       * 
       * @param {String} classes 
       */

    }, {
      key: "updateClasses",
      value: function updateClasses(classes) {
        this.addClasses(classes);
        var origClassName = this.getClasses();
        var origClassesArray = origClassName.split(' ');
        var updateClassesArray = [];
        classes.trim().split(' ').forEach(function (clazz) {
          if (origClassesArray.filter(function (cl) {
            return cl === clazz;
          }).length > 0) updateClassesArray.push(clazz);
        });
        this.html.className = updateClassesArray.join(' ').trim();
        return this;
      }
      /**
       * Remove classes from this element.
       * 
       * @param {String} classes 
       * @returns Elem instance.
       */

    }, {
      key: "removeClasses",
      value: function removeClasses(classes) {
        var toRm = classes.trim().split(" ");
        var origClass = "".concat(this.getClasses());
        var i = 0;

        while (i < toRm.length) {
          var clazz = toRm[i];
          if (origClass.match("".concat(clazz)) !== null) origClass = origClass.replace(clazz, "").trim();
          i++;
        }

        this.html.className = origClass.trim();
        return this;
      }
      /**
       * Toggle classes of this element. This method removes existing and adds non existing classes accordingly. 
       * If given classes exist then they will be removed. If given classes does not exist then they will be added.
       * 
       * @returns Elem instance.
       */

    }, {
      key: "toggleClasses",
      value: function toggleClasses(classes) {
        var cArr = classes.split(" ");
        var origClass = "".concat(this.getClasses());
        var toAdd = "";
        var toRm = "";
        var i = 0;

        while (i < cArr.length) {
          if (origClass.match("".concat(cArr[i])) !== null) toRm += " " + cArr[i];else toAdd += " " + cArr[i];
          i++;
        }

        this.addClasses(toAdd.trim());
        this.removeClasses(toRm.trim());
        return this;
      }
      /**
       * Get classes string of this element.
       * 
       * @returns class string of this element.
       */

    }, {
      key: "getClasses",
      value: function getClasses() {
        return this.html.className;
      }
      /**
       * Set styles of this element in camelCase in the JSON notation e.g. {height: "10px", maxHeight: "30px",...}
       * 
       * @param {Object} styleMap 
       * @returns Elem instance.
       */

    }, {
      key: "setStyles",
      value: function setStyles(styleMap) {
        for (var style in styleMap) {
          if (styleMap.hasOwnProperty(style)) this.html.style[style] = styleMap[style];
        }

        return this;
      }
      /**
       * Get style of this element. 
       * 
       * @param {String} styleName Style name in camelCase if necessary e.g. maxHeight
       * @returns value of the given style of this element.
       */

    }, {
      key: "getStyle",
      value: function getStyle(styleName) {
        return this.html.style[styleName];
      }
      /**
       * Set visibility of this element hidden or visible.
       * true = visible, false = hidden
       * @param {boolean} boolean 
       * @returns Elem instance.
       */

    }, {
      key: "setVisible",
      value: function setVisible(_boolean5) {
        this.html.style.visibility = _boolean5 ? "" : "hidden";
        return this;
      }
      /**
       * Set display state of this element initial or none.
       * true = initial, false = none
       * @param {boolean} boolean 
       * @returns Elem instance.
       */

    }, {
      key: "display",
      value: function display(_boolean6) {
        this.html.style.display = _boolean6 ? "" : "none";
        return this;
      }
      /**
       * Set this element draggable.
       * @param {boolean} boolean 
       * @returns Elem instance.
       */

    }, {
      key: "setDraggable",
      value: function setDraggable(_boolean7) {
        this.setAttribute("draggable", _boolean7);
        return this;
      }
      /**
       * Set translated text of this element.
       * @param {string} message 
       * @param {*} params 
       */

    }, {
      key: "message",
      value: function message(_message) {
        var i = 0;
        var paramArray = [];

        for (var _len3 = arguments.length, params = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
          params[_key3 - 1] = arguments[_key3];
        }

        while (i < params.length) {
          if (Util.isArray(params[i])) paramArray = paramArray.concat(params[i]);else paramArray.push(params[i]);
          i++;
        }

        paramArray.push(this);
        this.setText(Messages.message(_message, paramArray));
        return this;
      }
      /**
       * Do click on this element.
       * @returns Elem instance.
       */

    }, {
      key: "click",
      value: function click() {
        var _this7 = this;

        Util.setTimeout(function () {
          return _this7.html.click();
        });
        return this;
      }
      /**
       * Do focus on this element.
       * @returns Elem instance.
       */

    }, {
      key: "focus",
      value: function focus() {
        var _this8 = this;

        Util.setTimeout(function () {
          return _this8.html.focus();
        });
        return this;
      }
      /**
       * Do blur on this element.
       * @returns Elem instance.
       */

    }, {
      key: "blur",
      value: function blur() {
        var _this9 = this;

        Util.setTimeout(function () {
          return _this9.html.blur();
        });
        return this;
      }
      /**
       * Clones this element and child elements if deep true. Returned clone will be wrapped in Elem instance.
       * 
       * @param {boolean} deep if true children will be cloned too.
       * @returns a clone of this element wrapped in Elem instance. If deep is true children will be cloned also.
       */

    }, {
      key: "clone",
      value: function clone(deep) {
        return Elem.wrap(this.html.cloneNode(deep));
      }
      /**
       * @returns HTML Document Element that this element contains.
       */

    }, {
      key: "dom",
      value: function dom() {
        return this.html;
      }
      /**
       * @returns A duplicated Elem object
       */

    }, {
      key: "duplicate",
      value: function duplicate() {
        return Template.resolve(this.toTemplate());
      }
      /**
       * @returns height of this element.
       */

    }, {
      key: "height",
      value: function height() {
        return this.html.height;
      }
      /**
       * @returns width of this element.
       */

    }, {
      key: "width",
      value: function width() {
        return this.html.width;
      }
      /**
       * @returns position from top relative to offsetParent.
       */

    }, {
      key: "top",
      value: function top() {
        return this.html.offsetTop;
      }
      /**
       * @returns position from left relative to offsetParent.
       */

    }, {
      key: "left",
      value: function left() {
        return this.html.offsetLeft;
      }
      /**
       * @returns a parent of this element wrapped in Elem instance or null if no parent.
       */

    }, {
      key: "parent",
      value: function parent() {
        return this.html.parentElement !== null ? Elem.wrap(this.html.parentElement) : null;
      }
      /**
       * @returns a next element of this element wrapped in Elem instance or null if no next.
       */

    }, {
      key: "next",
      value: function next() {
        return this.html.nextElementSibling !== null ? Elem.wrap(this.html.nextElementSibling) : null;
      }
      /**
       * @returns a previous element of this element wrapped in Elem instance or null if no previous.
       */

    }, {
      key: "previous",
      value: function previous() {
        return this.html.previousElementSibling !== null ? Elem.wrap(this.html.previousElementSibling) : null;
      }
      /**
       * @returns a first child element of this element wrapped in Elem instance or null if no children.
       */

    }, {
      key: "getFirstChild",
      value: function getFirstChild() {
        return this.html.firstElementChild !== null ? Elem.wrap(this.html.firstElementChild) : null;
      }
      /**
       * @returns a last child element of this element wrapped in Elem instance or null if no children.
       */

    }, {
      key: "getLastChild",
      value: function getLastChild() {
        return this.html.lastElementChild !== null ? Elem.wrap(this.html.lastElementChild) : null;
      }
      /**
       * Method does es5 standard extension to an element. This method can be used to add additional functionality
       * to this element. Method returns the given child reference.
       * @param {object} child 
       * @returns child instance.
       */

    }, {
      key: "extend",
      value: function extend(child) {
        child.prototype = this;
        child.prototype.constructor = child;
        return child;
      } //EVENTS BELOW
      //Animation events

    }, {
      key: "onAnimationStart",
      value: function onAnimationStart(handler) {
        this.html.onanimationstart = handler;
        return this;
      }
    }, {
      key: "onAnimationIteration",
      value: function onAnimationIteration(handler) {
        this.html.onanimationiteration = handler;
        return this;
      }
    }, {
      key: "onAnimationEnd",
      value: function onAnimationEnd(handler) {
        this.html.onanimationend = handler;
        return this;
      }
    }, {
      key: "onTransitionEnd",
      value: function onTransitionEnd(handler) {
        this.html.ontransitionend = handler;
        return this;
      } //Drag events

      /**
       * Adds onDrag listener to this element.
       * @param {function} handler 
       * @returns Elem instance.
       */

    }, {
      key: "onDrag",
      value: function onDrag(handler) {
        this.html.ondrag = handler;
        return this;
      }
      /**
       * Adds onDragEnd listener to this element.
       * @param {function} handler 
       * @return Elem instance.
       */

    }, {
      key: "onDragEnd",
      value: function onDragEnd(handler) {
        this.html.ondragend = handler;
        return this;
      }
      /**
       * Adds onDragEnter listener to this element.
       * @param {function} handler 
       * @returns Elem instance.
       */

    }, {
      key: "onDragEnter",
      value: function onDragEnter(handler) {
        this.html.ondragenter = handler;
        return this;
      }
      /**
       * Adds onDragOver listener to this element.
       * @param {function} handler 
       * @returns Elem instance.
       */

    }, {
      key: "onDragOver",
      value: function onDragOver(handler) {
        this.html.ondragover = handler;
        return this;
      }
      /**
       * Adds onDragStart listener to this element.
       * @param {function} handler 
       * @returns Elem instance.
       */

    }, {
      key: "onDragStart",
      value: function onDragStart(handler) {
        this.html.ondragstart = handler;
        return this;
      }
      /**
       * Adds onDrop listener to this element.
       * @param {function} handler 
       * @returns Elem instance.
       */

    }, {
      key: "onDrop",
      value: function onDrop(handler) {
        this.html.ondrop = handler;
        return this;
      } //Mouse events

      /**
       * Adds onClick listener to this element.
       * @param {function} handler 
       * @returns Elem instance.
       */

    }, {
      key: "onClick",
      value: function onClick(handler) {
        this.html.onclick = handler;
        return this;
      }
      /**
       * Adds onDoubleClick listener to this element.
       * @param {function} handler 
       * @returns Elem instance.
       */

    }, {
      key: "onDoubleClick",
      value: function onDoubleClick(handler) {
        this.html.ondblclick = handler;
        return this;
      }
      /**
       * Adds onContextMenu listener to this element. Usually fired by mouse right click.
       * @param {function} handler 
       * @returns Elem instance.
       */

    }, {
      key: "onContextMenu",
      value: function onContextMenu(handler) {
        this.html.oncontextmenu = handler;
        return this;
      }
      /**
       * Adds onMouseDown listener to this element.
       * @param {function} handler 
       * @returns Elem instance.
       */

    }, {
      key: "onMouseDown",
      value: function onMouseDown(handler) {
        this.html.onmousedown = handler;
        return this;
      }
      /**
       * Adds onMouseEnter listener to this element.
       * @param {function} handler 
       * @returns Elem instance.
       */

    }, {
      key: "onMouseEnter",
      value: function onMouseEnter(handler) {
        this.html.onmouseenter = handler;
        return this;
      }
      /**
       * Adds onMouseLeave listener to this element.
       * @param {function} handler 
       * @returns Elem instance.
       */

    }, {
      key: "onMouseLeave",
      value: function onMouseLeave(handler) {
        this.html.onmouseleave = handler;
        return this;
      }
      /**
       * Adds onMouseMove listener to this element.
       * @param {function} handler 
       * @returns Elem instance.
       */

    }, {
      key: "onMouseMove",
      value: function onMouseMove(handler) {
        this.html.onmousemove = handler;
        return this;
      }
      /**
       * Adds onMouseOver listener to this element.
       * @param {function} handler 
       * @returns Elem instance.
       */

    }, {
      key: "onMouseOver",
      value: function onMouseOver(handler) {
        this.html.onmouseover = handler;
        return this;
      }
      /**
       * Adds onMouseOut listener to this element.
       * @param {function} handler 
       * @returns Elem instance.
       */

    }, {
      key: "onMouseOut",
      value: function onMouseOut(handler) {
        this.html.onmouseout = handler;
        return this;
      }
      /**
       * Adds onMouseUp listener to this element.
       * @param {function} handler 
       * @returns Elem instance.
       */

    }, {
      key: "onMouseUp",
      value: function onMouseUp(handler) {
        this.html.onmouseup = handler;
        return this;
      }
      /**
       * Adds onWheel listener to this element.
       * @param {function} handler 
       * @returns Elem instance.
       */

    }, {
      key: "onWheel",
      value: function onWheel(handler) {
        this.html.onwheel = handler;
        return this;
      } //UI events

      /**
       * Adds onScroll listener to this element.
       * @param {function} handler 
       * @returns Elem instance.
       */

    }, {
      key: "onScroll",
      value: function onScroll(handler) {
        this.html.onscroll = handler;
        return this;
      }
      /**
       * Adds onResize listener to this element (supported: body).
       * @param {function} handler 
       */

    }, {
      key: "onResize",
      value: function onResize(handler) {
        this.html.onresize = handler;
        return this;
      }
      /**
       * Adds onError listener to this element (supported: img, input[type=img], object, link, script).
       * Is fired when an error occurs while downloading an external file.
       * @param {function} handler 
       * @returns Elem instance.
       */

    }, {
      key: "onError",
      value: function onError(handler) {
        this.html.onerror = handler;
        return this;
      }
      /**
       * Adds onLoad listener to this element (supported: body, img, input[type=img], script, link, style, frame, iframe).
       * @param {function} handler 
       * @returns Elem instance.
       */

    }, {
      key: "onLoad",
      value: function onLoad(handler) {
        this.html.onload = handler;
        return this;
      }
      /**
       * Adds onUnload listener to this element. Is fired when the page is unloaded or browser window is closed (supported: body).
       * @param {function} handler 
       * @returns Elem instance.
       */

    }, {
      key: "onUnload",
      value: function onUnload(handler) {
        this.html.onunload = handler;
        return this;
      }
      /**
       * Adds onBeforeUnload listener to this element. Is fired before unload (supported: body).
       * @param {function} handler 
       * @returns Elem instance.
       */

    }, {
      key: "onBeforeUnload",
      value: function onBeforeUnload(handler) {
        this.html.onbeforeunload = handler;
        return this;
      } //Key events

      /**
       * Adds onKeyUp listener to this element.
       * @param {function} handler 
       * @returns Elem instance.
       */

    }, {
      key: "onKeyUp",
      value: function onKeyUp(handler) {
        this.html.onkeyup = handler;
        return this;
      }
      /**
       * Adds onKeyDown listener to this element.
       * @param {function} handler 
       * @returns Elem instance.
       */

    }, {
      key: "onKeyDown",
      value: function onKeyDown(handler) {
        this.html.onkeydown = handler;
        return this;
      }
      /**
       * Adds onKeyPress listener to this element.
       * @param {function} handler 
       * @returns Elem instance.
       */

    }, {
      key: "onKeyPress",
      value: function onKeyPress(handler) {
        this.html.onkeypress = handler;
        return this;
      }
      /**
       * Adds onInput listener to this element (supported: input, textarea).
       * @param {function} handler 
       * @returns Elem instance.
       */

    }, {
      key: "onInput",
      value: function onInput(handler) {
        this.html.oninput = handler;
        return this;
      } //Events (changing state)

      /**
       * Adds onChange listener to this element (supported: input, select, textarea).
       * @param {function} handler 
       * @returns Elem instance.
       */

    }, {
      key: "onChange",
      value: function onChange(handler) {
        this.html.onchange = handler;
        return this;
      }
      /**
       * Adds onSubmit listener to this element (supported: form).
       * @param {function} handler 
       * @returns Elem instance.
       */

    }, {
      key: "onSubmit",
      value: function onSubmit(handler) {
        this.html.onsubmit = handler;
        return this;
      }
      /**
       * Adds onSelect listener to this element. Is fired when a text is selected inside an input field (supported: input[type=text|password|file], textarea). 
       * @param {function} handler 
       * @returns Elem isntance.
       */

    }, {
      key: "onSelect",
      value: function onSelect(handler) {
        this.html.onselect = handler;
        return this;
      }
      /**
       * Adds onReset listener to this element (supported: form).
       * @param {function} handler 
       * @returns Elem instance.
       */

    }, {
      key: "onReset",
      value: function onReset(handler) {
        this.html.onreset = handler;
        return this;
      }
      /**
       * Adds onFocus listener to this element.
       * @param {function} handler 
       * @returns Elem instance.
       */

    }, {
      key: "onFocus",
      value: function onFocus(handler) {
        this.html.onfocus = handler;
        return this;
      }
      /**
       * Adds onFocusIn listener to this element.
       * @param {function} handler 
       * @returns Elem instance.
       */

    }, {
      key: "onFocusIn",
      value: function onFocusIn(handler) {
        this.html.onfocusin = handler;
        return this;
      }
      /**
       * Adds onFocusOut listener to this element.
       * @param {function} handler 
       * @returns Elem instance.
       */

    }, {
      key: "onFocusOut",
      value: function onFocusOut(handler) {
        this.html.onfocusout = handler;
        return this;
      }
      /**
       * Adds onBlur listener to this element.
       * @param {function} handler 
       * @returns Elem instance.
       */

    }, {
      key: "onBlur",
      value: function onBlur(handler) {
        this.html.onblur = handler;
        return this;
      } //Clipboard events

      /**
       * Adds onCopy listener to this element.
       * @param {function} handler 
       * @returns Elem instance.
       */

    }, {
      key: "onCopy",
      value: function onCopy(handler) {
        this.html.oncopy = handler;
        return this;
      }
      /**
       * Adds onCut listener to this element.
       * @param {function} handler 
       * @returns Elem instance.
       */

    }, {
      key: "onCut",
      value: function onCut(handler) {
        this.html.oncut = handler;
        return this;
      }
      /**
       * Adds onPaste listener to this element.
       * @param {function} handler 
       * @returns Elem instance.
       */

    }, {
      key: "onPaste",
      value: function onPaste(handler) {
        this.html.onpaste = handler;
        return this;
      } //Media events

      /**
       * Adds onAbort listener to this element. Is fired when media data download is aborted (supported: audio, video).
       * @param {function} handler 
       * @returns Elem instance.
       */

    }, {
      key: "onAbort",
      value: function onAbort(handler) {
        this.html.onabort = handler;
        return this;
      }
      /**
       * Adds onWaiting listener to this element. Is fired when video stops and waits to buffer next frame (supported: audio, video).
       * @param {function} handler 
       * @returns Elem instance.
       */

    }, {
      key: "onWaiting",
      value: function onWaiting(handler) {
        this.html.onwaiting = handler;
        return this;
      }
      /**
       * Adds onVolumeChange listener to this element. Is fired when the volume is changed (supported: audio, video).
       * @param {function} handler 
       * @returns Elem instance.
       */

    }, {
      key: "onVolumeChange",
      value: function onVolumeChange(handler) {
        this.html.onvolumechange = handler;
        return this;
      }
      /**
       * Adds onTimeTupdate listener to this element. Is fired when playing or a new position is selected on a seekbar (supported: audio, video).
       * @param {function} handler 
       * @returns Elem instance.
       */

    }, {
      key: "onTimeUpdate",
      value: function onTimeUpdate(handler) {
        this.html.ontimeupdate = handler;
        return this;
      }
      /**
       * Adds onSeeking listener to this element. Is fired when a new position was selected on a seekbar (supported: audio, video).
       * @param {function} handler 
       * @returns Elem instance.
       */

    }, {
      key: "onSeeking",
      value: function onSeeking(handler) {
        this.html.onseeking = handler;
        return this;
      }
      /**
       * Adds onSeekEnd listener to this element. Is fired after a new position was selected on a seekbar (supported: audio, video).
       * @param {*} handler 
       * @returns Elem instance.
       */

    }, {
      key: "onSeekEnd",
      value: function onSeekEnd(handler) {
        this.html.onseekend = handler;
        return this;
      }
      /**
       * Adds onRateChange listener to this element. Is fired when playback rate (speed slow motion, fast forward) changes (supported: audio, video).
       * @param {function} handler 
       * @returns Elem instance.
       */

    }, {
      key: "onRateChange",
      value: function onRateChange(handler) {
        this.html.onratechange = handler;
        return this;
      }
      /**
       * Adds onProgress listener on an element. Is fired when browser is downloading media (supported: audio, video).
       * @param {function} handler 
       * @returns Elem instance.
       */

    }, {
      key: "onProgress",
      value: function onProgress(handler) {
        this.html.onprogress = handler;
        return this;
      }
      /**
       * Adds onLoadMetadata listener to this element. Is fired when media metadata was downloaded (supported: audio, video).
       * @param {function} handler 
       * @returns Elem instance.
       */

    }, {
      key: "onLoadMetadata",
      value: function onLoadMetadata(handler) {
        this.html.onloadmetadata = handler;
        return this;
      }
      /**
       * Adds onLoadedData listener on an element. Is fired when media frame data was loaded, but not enough data to play next frame (supported: audio, video).
       * @param {function} handler 
       * @returns Elem instance.
       */

    }, {
      key: "onLoadedData",
      value: function onLoadedData(handler) {
        this.html.onloadeddata = handler;
        return this;
      }
      /**
       * Adds onLoadStart listener on an element. Is fired when browser starts looking for media (supported: audio, video).
       * @param {function} handler 
       * @returns Elem instance.
       */

    }, {
      key: "onLoadStart",
      value: function onLoadStart(handler) {
        this.html.onloadstart = handler;
        return this;
      }
      /**
       * Adds onPlaying listener to this element. Is fired when the media is playing after paused by user or stopped for buffering (supported: audio, video).
       * @param {function} handler 
       * @returns Elem instance.
       */

    }, {
      key: "onPlaying",
      value: function onPlaying(handler) {
        this.html.onplaying = handler;
        return this;
      }
      /**
       * Adds onPlay listener to this element. Is fired when the media starts to play e.g. play button is pressed. (supported: audio, video).
       * @param {function} handler 
       * @returns Elem instance.
       */

    }, {
      key: "onPlay",
      value: function onPlay(handler) {
        this.html.onplay = handler;
        return this;
      }
      /**
       * Adds onPause listener to this element. Is fired when the media is paused. (supported: audio, video).
       * @param {function} handler 
       * @returns Elem instance.
       */

    }, {
      key: "onPause",
      value: function onPause(handler) {
        this.html.onpause = handler;
        return this;
      }
      /**
       * Adds onEnded listener to this element. Is fired when the end of media file has been reached (supported: audio, video).
       * @param {function} handler 
       * @returns Elem instance.
       */

    }, {
      key: "onEnded",
      value: function onEnded(handler) {
        this.html.onended = handler;
        return this;
      }
      /**
       * Adds onDurationChange listener to this element. Is fired when media duration changes (supported: audio, video).
       * @param {function} handler 
       * @returns Elem instance.
       */

    }, {
      key: "onDurationChange",
      value: function onDurationChange(handler) {
        this.html.ondurationchange = handler;
        return this;
      }
      /**
       * Adds onCanPlay listener to this element. Is fired when enough data to play (supported: audio, video).
       * @param {function} handler 
       * @returns Elem instance.
       */

    }, {
      key: "onCanPlay",
      value: function onCanPlay(handler) {
        this.html.oncanplay = handler;
        return this;
      }
      /**
       * Adds canPlayThrough listener to this element. Is fired when can play through without buffering (supported: audio, video).
       * @param {function} handler 
       * @returns Elem instance.
       */

    }, {
      key: "onCanPlayThrough",
      value: function onCanPlayThrough(handler) {
        this.html.oncanplaythrough = handler;
        return this;
      }
      /**
       * Adds onStalled listener to this element. Is fired when browser is trying to get data but data not available (supported: audio, video).
       * @param {function} handler 
       * @returns Elem instance.
       */

    }, {
      key: "onStalled",
      value: function onStalled(handler) {
        this.html.onstalled = handler;
        return this;
      }
      /**
       * Adds onSuspend listener to this element. Is fired when browser intentionally does not retrive media data (supported: audio, video).
       * @param {function} handler 
       * @returns Elem instance.
       */

    }, {
      key: "onSuspend",
      value: function onSuspend(handler) {
        this.html.onsuspend = handler;
        return this;
      } //Browser events

      /**
       * Adds onPopState listener to this element. Is fired when window history changes.
       * @param {function} handler 
       * @returns Elem instance.
       */

    }, {
      key: "onPopState",
      value: function onPopState(handler) {
        this.html.onpopstate = handler;
        return this;
      }
      /**
       * Adds onStorage listener to this element. Is fired when WebStorage changes.
       * @param {function} handler 
       * @returns Elem instance.
       */

    }, {
      key: "onStorage",
      value: function onStorage(handler) {
        this.html.onstorage = handler;
        return this;
      }
      /**
       * Add onHashChange listener to this element. Is fired when hash part of the url changes (supported: body).
       * @param {function} handler 
       * @returns Elem instance.
       */

    }, {
      key: "onHashChange",
      value: function onHashChange(handler) {
        this.html.onhashchange = handler;
        return this;
      }
      /**
       * Adds onAfterPrint listener to this element. Is fired when a print dialogue is closed (Safari, Opera not supported).
       * @param {function} handler 
       * @returns Elem instance.
       */

    }, {
      key: "onAfterPrint",
      value: function onAfterPrint(handler) {
        this.html.onafterprint = handler;
        return this;
      }
      /**
       * Adds onBeforePrint listener to this element. Is fired when a print dialogue is opened (Safari, Opera not supported).
       * @param {function} handler 
       */

    }, {
      key: "onBeforePrint",
      value: function onBeforePrint(handler) {
        this.html.onbeforeprint = handler;
        return this;
      }
      /**
       * Adds onPageHide listener to this element. Is fired when user navigates away from webpage (supported: body).
       * @param {function} handler 
       */

    }, {
      key: "onPageHide",
      value: function onPageHide(handler) {
        this.html.onpagehide = handler;
        return this;
      }
      /**
       * Adds onPageShow listener to this element. Is fired when user navigates to webpage (supported: body).
       * @param {function} handler 
       */

    }, {
      key: "onPageShow",
      value: function onPageShow(handler) {
        this.html.onpageshow = handler;
        return this;
      }
      /**
       * Creates a new HTML element and wraps it into this Elem instance.
       * @param type
       * @returns Elem instance.
       */

    }], [{
      key: "create",
      value: function create(type) {
        return new Elem(type);
      }
      /**
       * Does not create a new HTML element, but merely wraps an existing instance of the HTML element into
       * this Elem instance.
       * @param html
       * @returns Elem instance.
       */

    }, {
      key: "wrap",
      value: function wrap(html) {
        if (!Util.isEmpty(html)) return new Elem(html);else throw "Could not wrap a html element - html: " + html;
      }
      /**
       * Takes an array of HTMLDocument elements and wraps them inside an Elem instance.
       * If the given array contains more than one htmlDoc element otherwise then this method will
       * return an array of Elem instances, otherwise single Elem instance is returned.
       * 
       * @param {Array} htmlDoc 
       * @returns An array of the Elem objects or a single Elem object. 
       */

    }, {
      key: "wrapElems",
      value: function wrapElems(htmlDoc) {
        var eArr = [];
        var i = 0;

        while (i < htmlDoc.length) {
          eArr.push(Elem.wrap(htmlDoc[i]));
          i++;
        }

        return eArr.length === 1 ? eArr[0] : eArr;
      }
    }]);

    return Elem;
  }();
  /**
   * RenderHelper class is a helper class of the Elem class. The RenderHelper class chiefly
   * stores previous state of the Elem in an array and in a string.
   */


  var RenderHelper =
  /*#__PURE__*/
  function () {
    function RenderHelper() {
      _classCallCheck(this, RenderHelper);

      this.instance;
      this.prevState = [];
      this.prevStateString = "";
    }
    /**
     * Set previous state.
     * @param {array} state 
     */


    _createClass(RenderHelper, null, [{
      key: "setPrevState",
      value: function setPrevState(state) {
        RenderHelper.getInstance().prevState = state;
        RenderHelper.getInstance().prevStateString = Util.isEmpty(state) ? "" : state.toString();
      }
      /**
       * @returns A previous state array.
       */

    }, {
      key: "getPrevState",
      value: function getPrevState() {
        return RenderHelper.getInstance().prevState;
      }
      /**
       * Compares new state previous state.
       * @param {array} newState 
       * @returns True if the new state and the previous state are equal otherwise false.
       */

    }, {
      key: "isNewStateEqualToPrevState",
      value: function isNewStateEqualToPrevState(newState) {
        return RenderHelper.getInstance().prevStateString === newState.toString();
      }
    }, {
      key: "getInstance",
      value: function getInstance() {
        if (!this.instance) this.instance = new RenderHelper();
        return this.instance;
      }
    }]);

    return RenderHelper;
  }();

  return Elem;
}();
/**
 * RMEElemTemplater class is able to create a Template out of an Elem object.
 */


var RMEElemTemplater =
/*#__PURE__*/
function () {
  function RMEElemTemplater() {
    _classCallCheck(this, RMEElemTemplater);

    this.instance;
    this.template = {};
    this.deep = true;
  }

  _createClass(RMEElemTemplater, [{
    key: "toTemplate",
    value: function toTemplate(elem, deep) {
      if (!Util.isEmpty(deep)) this.deep = deep;
      this.resolve(elem, this.template);
      return this.template;
    }
    /**
     * Function is called recursively and resolves an Elem object and its children in recursion
     * @param {object} elem 
     * @param {object} parent 
     */

  }, {
    key: "resolve",
    value: function resolve(elem, parent) {
      var resolved = this.resolveElem(elem, this.resolveProps(elem));

      for (var p in parent) {
        if (parent.hasOwnProperty(p)) {
          if (Util.isArray(parent[p]._rme_type_)) parent[p]._rme_type_.push(resolved);else this.extendMap(parent[p], resolved);
        }
      }

      var i = 0;
      var children = Util.isArray(elem.getChildren()) ? elem.getChildren() : [elem.getChildren()];

      if (children && this.deep) {
        while (i < children.length) {
          this.resolve(children[i], resolved);
          i++;
        }
      }

      this.template = resolved;
    }
  }, {
    key: "extendMap",
    value: function extendMap(map, next) {
      for (var v in next) {
        if (next.hasOwnProperty(v)) {
          map[v] = next[v];
        }
      }
    }
    /**
     * Function will attach given properties into a given Elem and returns the resolved Elem.
     * @param {object} elem 
     * @param {object} props 
     * @returns The resolved elem with attached properties.
     */

  }, {
    key: "resolveElem",
    value: function resolveElem(elem, props) {
      var el = {};
      var children = elem.getChildren();

      if (Util.isArray(children) && children.length > 1) {
        var elTag = elem.getTagName().toLowerCase();
        var elName = this.resolveId(elTag, props);
        elName = this.resolveClass(elName, props);
        elName = this.resolveAttrs(elName, props);
        el[elName] = {
          _rme_type_: [],
          _rme_props_: props
        };
      } else {
        el[elem.getTagName().toLowerCase()] = props;
      }

      return el;
    }
    /**
     * Function will place an ID attribute into an element tag if the ID attribute is found.
     * @param {string} tag 
     * @param {object} props 
     * @returns The element tag with the ID or without.
     */

  }, {
    key: "resolveId",
    value: function resolveId(tag, props) {
      if (props.id) return tag + "#" + props.id;else return tag;
    }
    /**
     * Function will place a class attribute into an element tag if the class attribute is found.
     * @param {string} tag 
     * @param {object} props 
     * @returns The element tag with the classes or without.
     */

  }, {
    key: "resolveClass",
    value: function resolveClass(tag, props) {
      if (props["class"]) return tag + "." + props["class"].replace(/ /g, ".");else return tag;
    }
    /**
     * Function will resolve all other attributes and place them into an element tag if other attributes are found.
     * @param {string} tag 
     * @param {object} props 
     * @returns The element tag with other attributes or without.
     */

  }, {
    key: "resolveAttrs",
    value: function resolveAttrs(tag, props) {
      var tagName = tag;

      for (var p in props) {
        if (props.hasOwnProperty(p) && p !== 'id' && p !== 'class' && p.indexOf('on') !== 0) {
          tagName += "[".concat(p, "=").concat(props[p], "]");
        }
      }

      return tagName;
    }
    /**
     * Resolves a given Elem object and returns its properties in an object.
     * @param {object} elem 
     * @returns The properties object of the given element.
     */

  }, {
    key: "resolveProps",
    value: function resolveProps(elem) {
      var props = {};
      var attributes = elem.dom().attributes;
      var a = 0;

      if (attributes) {
        while (a < attributes.length) {
          props[this.resolveAttributeNames(attributes[a].name)] = attributes[a].value;
          a++;
        }
      }

      if (elem.dom().hasChildNodes() && elem.dom().childNodes[0].nodeType === 3) {
        props["text"] = elem.getText();
      }

      for (var p in elem.dom()) {
        if (p.indexOf("on") !== 0 || Util.isEmpty(elem.dom()[p])) continue;else props[this.resolveListeners(p)] = elem.dom()[p];
      }

      return props;
    }
    /**
     * Resolves html data-* attributes by removing '-' and setting the next character to uppercase. If the attribute is not 
     * data-* attribute then it is directly returned.
     * @param {string} attrName 
     * @returns Resolved attribute name.
     */

  }, {
    key: "resolveAttributeNames",
    value: function resolveAttributeNames(attrName) {
      if (attrName.indexOf("data" === 0 && attrName.length > "data".length)) {
        while (attrName.search("-") > -1) {
          attrName = attrName.replace(/-\w/, attrName.charAt(attrName.search("-") + 1).toUpperCase());
        }

        return attrName;
      } else {
        return attrName;
      }
    }
  }, {
    key: "resolveListeners",
    value: function resolveListeners(name) {
      switch (name) {
        case "onanimationstart":
          return "onAnimationStart";

        case "onanimationiteration":
          return "onAnimationIteration";

        case "onanimationend":
          return "onAnimationEnd";

        case "ontransitionend":
          return "onTransitionEnd";

        case "ondrag":
          return "onDrag";

        case "ondragend":
          return "onDragEnd";

        case "ondragenter":
          return "onDragEnter";

        case "ondragover":
          return "onDragOver";

        case "ondragstart":
          return "onDragStart";

        case "ondrop":
          return "onDrop";

        case "onclick":
          return "onClick";

        case "ondblclick":
          return "onDoubleClick";

        case "oncontextmenu":
          return "onContextMenu";

        case "onmousedown":
          return "onMouseDown";

        case "onmouseenter":
          return "onMouseEnter";

        case "onmouseleave":
          return "onMouseLeave";

        case "onmousemove":
          return "onMouseMove";

        case "onmouseover":
          return "onMouseOver";

        case "onmouseout":
          return "onMouseOut";

        case "onmouseup":
          return "onMouseUp";

        case "onwheel":
          return "onWheel";

        case "onscroll":
          return "onScroll";

        case "onresize":
          return "onResize";

        case "onerror":
          return "onError";

        case "onload":
          return "onLoad";

        case "onunload":
          return "onUnload";

        case "onbeforeunload":
          return "onBeforeUnload";

        case "onkeyup":
          return "onKeyUp";

        case "onkeydown":
          return "onKeyDown";

        case "onkeypress":
          return "onKeyPress";

        case "oninput":
          return "onInput";

        case "onchange":
          return "onChange";

        case "onsubmit":
          return "onSubmit";

        case "onselect":
          return "onSelect";

        case "onreset":
          return "onReset";

        case "onfocus":
          return "onFocus";

        case "onfocusin":
          return "onFocusIn";

        case "onfocusout":
          return "onFocusOut";

        case "onblur":
          return "onBlur";

        case "oncopy":
          return "onCopy";

        case "oncut":
          return "onCut";

        case "onpaste":
          return "onPaste";

        case "onabort":
          return "onAbort";

        case "onwaiting":
          return "onWaiting";

        case "onvolumechange":
          return "onVolumeChange";

        case "ontimeupdate":
          return "onTimeUpdate";

        case "onseeking":
          return "onSeeking";

        case "onseekend":
          return "onSeekEnd";

        case "onratechange":
          return "onRateChange";

        case "onprogress":
          return "onProgress";

        case "onloadmetadata":
          return "onLoadMetadata";

        case "onloadeddata":
          return "onLoadedData";

        case "onloadstart":
          return "onLoadStart";

        case "onplaying":
          return "onPlaying";

        case "onplay":
          return "onPlay";

        case "onpause":
          return "onPause";

        case "onended":
          return "onEnded";

        case "ondurationchange":
          return "onDurationChange";

        case "oncanplay":
          return "onCanPlay";

        case "oncanplaythrough":
          return "onCanPlayThrough";

        case "onstalled":
          return "onStalled";

        case "onsuspend":
          return "onSuspend";

        case "onpopstate":
          return "onPopState";

        case "onstorage":
          return "onStorage";

        case "onhashchange":
          return "onHashChange";

        case "onafterprint":
          return "onAfterPrint";

        case "onbeforeprint":
          return "onBeforePrint";

        case "onpagehide":
          return "onPageHide";

        case "onpageshow":
          return "onPageShow";
      }
    }
  }, {
    key: "toLiteralString",
    value: function toLiteralString(elem) {
      var props = this.resolveProps(elem);
      var string = this.resolveId(elem.getTagName().toLowerCase(), props);
      string = this.resolveClass(string, props);
      string = this.resolveAttrs(string, props);
      return string;
    }
    /**
     * Function by default resolves a given element and its' children and returns template representation of the element.
     * @param {object} elem 
     * @param {boolean} deep 
     * @returns Template object representation of the Elem
     */

  }], [{
    key: "toTemplate",
    value: function toTemplate(elem, deep) {
      return RMEElemTemplater.getInstance().toTemplate(elem, deep);
    }
    /**
     * Function resolves and returns properties of a given Elem object.
     * @param {object} elem 
     * @returns The properties object of the given Elem.
     */

  }, {
    key: "getElementProps",
    value: function getElementProps(elem) {
      return RMEElemTemplater.getInstance().resolveProps(elem);
    }
  }, {
    key: "toLiteralString",
    value: function toLiteralString(elem) {
      return RMEElemTemplater.getInstance().toLiteralString(elem);
    }
  }, {
    key: "getInstance",
    value: function getInstance() {
      if (!this.instance) this.instance = new RMEElemTemplater();
      return this.instance;
    }
  }]);

  return RMEElemTemplater;
}();

var EventPipe = function () {
  /**
   * EventPipe class can be used to multicast and send custom events to registered listeners.
   * Each event in an event queue will be sent to each registerd listener.
   */
  var EventPipe =
  /*#__PURE__*/
  function () {
    function EventPipe() {
      _classCallCheck(this, EventPipe);

      this.eventsQueue = [];
      this.callQueue = [];
      this.loopTimeout;
    }

    _createClass(EventPipe, [{
      key: "containsEvent",
      value: function containsEvent() {
        return this.eventsQueue.find(function (ev) {
          return ev.type === event.type;
        });
      }
      /**
       * Function sends an event object though the EventPipe. The event must have a type attribute
       * defined otherwise an error is thrown. 
       * Example defintion of the event object. 
       * { 
       *   type: 'some event',
       *   ...payload
       * }
       * If an event listener is defined the sent event will be received on the event listener.
       * @param {object} event 
       */

    }, {
      key: "send",
      value: function send(event) {
        if (Util.isEmpty(event.type)) throw new Error('Event must have type attribute.');
        if (!this.containsEvent()) this.eventsQueue.push(event);
        this.loopEvents();
      }
    }, {
      key: "loopEvents",
      value: function loopEvents() {
        var _this10 = this;

        if (this.loopTimeout) Util.clearTimeout(this.loopTimeout);
        this.loopTimeout = Util.setTimeout(function () {
          _this10.callQueue.forEach(function (eventCallback) {
            return _this10.eventsQueue.forEach(function (ev) {
              return eventCallback(ev);
            });
          });

          _this10.eventsQueue = [];
          _this10.callQueue = [];
        });
      }
      /**
       * Function registers an event listener function that receives an event sent through the
       * EventPipe. Each listener will receive each event that are in an event queue. The listener
       * function receives the event as a parameter.
       * @param {function} eventCallback 
       */

    }, {
      key: "receive",
      value: function receive(eventCallback) {
        this.callQueue.push(eventCallback);
      }
    }]);

    return EventPipe;
  }();

  var eventPipe = new EventPipe();
  return {
    send: eventPipe.send.bind(eventPipe),
    receive: eventPipe.receive.bind(eventPipe)
  };
}();
/**
 * Before using this class you should also be familiar on how to use fetch since usage of this class
 * will be quite similar to fetch except predefined candy that is added on a class.
 *
 * The class is added some predefined candy over the JavaScript Fetch interface.
 * get|post|put|delete methods will automatically use JSON as a Content-Type
 * and request methods will be predefined also.
 *
 * FOR Fetch
 * A Config object supports following:
 *  {
 *      url: url,
 *      method: method,
 *      contentType: contentType,
 *      init: init
 *  }
 *
 *  All methods also take init object as an alternative parameter. Init object is the same object that fetch uses.
 *  For more information about init Google JavaScript Fetch or go to https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
 *
 *  If a total custom request is desired you should use a method do({}) e.g.
 *  do({url: url, init: init}).then((resp) => resp.json()).then((resp) => console.log(resp)).catch((error) => console.log(error));
 */


var HttpFetchRequest =
/*#__PURE__*/
function () {
  function HttpFetchRequest() {
    _classCallCheck(this, HttpFetchRequest);
  }
  /**
   * Does Fetch GET request. Content-Type JSON is used by default.
   * @param {stirng} url *Required
   * @param {*} init 
   */


  _createClass(HttpFetchRequest, [{
    key: "get",
    value: function get(url, init) {
      if (!init) init = {};
      init.method = "GET";
      return this["do"]({
        url: url,
        init: init,
        contentType: Http.JSON
      });
    }
    /**
     * Does Fetch POST request. Content-Type JSON is used by default.
     * @param {string} url *Required
     * @param {*} body 
     * @param {*} init 
     */

  }, {
    key: "post",
    value: function post(url, body, init) {
      if (!init) init = {};
      init.method = "POST";
      init.body = body;
      return this["do"]({
        url: url,
        init: init,
        contentType: Http.JSON
      });
    }
    /**
     * Does Fetch PUT request. Content-Type JSON is used by default.
     * @param {string} url *Required
     * @param {*} body 
     * @param {*} init 
     */

  }, {
    key: "put",
    value: function put(url, body, init) {
      if (!init) init = {};
      init.method = "PUT";
      init.body = body;
      return this["do"]({
        url: url,
        init: init,
        contentType: Http.JSON
      });
    }
    /**
     * Does Fetch DELETE request. Content-Type JSON is used by default.
     * @param {string} url 
     * @param {*} init 
     */

  }, {
    key: "delete",
    value: function _delete(url, init) {
      if (!init) init = {};
      init.method = "DELETE";
      return this["do"]({
        url: url,
        init: init,
        contentType: Http.JSON
      });
    }
    /**
     * Does any Fetch request a given config object defines.
     * 
     * Config object can contain parameters:
     * {
     *      url: url,
     *      method: method,
     *      contentType: contentType,
     *      init: init
     *  }
     * @param {object} config 
     */

  }, {
    key: "do",
    value: function _do(config) {
      if (!config.init) config.init = {};

      if (config.contentType) {
        if (!config.init.headers) config.init.headers = new Headers({});
        if (!config.init.headers.has("Content-Type")) config.init.headers.set("Content-Type", config.contentType);
      }

      if (config.method) {
        config.init.method = config.method;
      }

      return fetch(config.url, config.init);
    }
  }]);

  return HttpFetchRequest;
}();

var Http = function () {
  /**
   * FOR XmlHttpRequest
   * A config object supports following. More features could be added.
   *  {
   *    method: method,
   *    url: url,
   *    data: data,
   *    contentType: contentType,
   *    onProgress: function(event),
   *    onTimeout: function(event),
   *    headers: headersObject{"header": "value"},
   *    useFetch: true|false **determines that is fetch used or not.
   *  }
   * 
   * If contentType is not defined, application/json is used, if set to null, default is used, otherwise used defined is used.
   * If contentType is application/json, data is automatically stringified with JSON.stringify()
   * 
   * Http class automatically tries to parse reuqest.responseText to JSON using JSON.parse().
   * If parsing succeeds, parsed JSON will be set on request.responseJSON attribute.
   */
  var Http =
  /*#__PURE__*/
  function () {
    function Http(config) {
      _classCallCheck(this, Http);

      config.contentType = config.contentType === undefined ? Http.JSON : config.contentType;

      if (config.useFetch) {
        this.self = new HttpFetchRequest();
      } else if (window.Promise) {
        this.self = new HttpPromiseAjax(config).instance();
      } else {
        this.self = new HttpAjax(config);
      }
    }

    _createClass(Http, [{
      key: "instance",
      value: function instance() {
        return this.self;
      }
      /**
       * Do GET XMLHttpRequest. If a content type is not specified JSON will be default. Promise will be used if available.
       * @param {string} url *Required
       * @param {string} requestContentType 
       */

    }], [{
      key: "get",
      value: function get(url, requestContentType) {
        return new Http({
          method: "GET",
          url: url,
          data: undefined,
          contentType: requestContentType
        }).instance();
      }
      /**
       * Do POST XMLHttpRequest. If a content type is not specified JSON will be default. Promise will be used if available.
       * @param {string} url *Required
       * @param {*} data 
       * @param {string} requestContentType 
       */

    }, {
      key: "post",
      value: function post(url, data, requestContentType) {
        return new Http({
          method: "POST",
          url: url,
          data: data,
          contentType: requestContentType
        }).instance();
      }
      /**
       * Do PUT XMLHttpRequest. If a content type is not specified JSON will be default. Promise will be used if available.
       * @param {string} url *Required
       * @param {*} data 
       * @param {string} requestContentType 
       */

    }, {
      key: "put",
      value: function put(url, data, requestContentType) {
        return new Http({
          method: "PUT",
          url: url,
          data: data,
          contentType: requestContentType
        }).instance();
      }
      /**
       * Do DELETE XMLHttpRequest. If a content type is not specified JSON will be default. Promise will be used if available.
       * @param {string} url *Required
       * @param {*} requestContentType 
       */

    }, {
      key: "delete",
      value: function _delete(url, requestContentType) {
        return new Http({
          method: "DELETE",
          url: url,
          data: undefined,
          contentType: requestContentType
        }).instance();
      }
      /**
       * Does any XMLHttpRequest that is defined by a given config object. Promise will be used if available.
       * 
       * Config object can contain parameters:
       * {
       *    method: method,
       *    url: url,
       *    data: data,
       *    contentType: contentType,
       *    onProgress: function(event),
       *    onTimeout: function(event),
       *    headers: headersObject{"header": "value"},
       *    useFetch: true|false **determines that is fetch used or not.
       *  }
       * @param {object} config 
       */

    }, {
      key: "do",
      value: function _do(config) {
        return new Http(config).instance();
      }
      /**
       * Uses Fetch interface to make a request to server.
       * 
       * Before using fetch you should also be familiar on how to use fetch since usage of this function
       * will be quite similar to fetch except predefined candy that is added.
       *
       * The fetch interface adds some predefined candy over the JavaScript Fetch interface.
       * get|post|put|delete methods will automatically use JSON as a Content-Type
       * and request methods will be predefined also.
       *
       * FOR Fetch
       * A Config object supports following:
       *  {
       *      url: url,
       *      method: method,
       *      contentType: contentType,
       *      init: init
       *  }
       *
       *  All methods also take init object as an alternative parameter. Init object is the same object that fetch uses.
       *  For more information about init Google JavaScript Fetch or go to https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
       *
       *  If a total custom request is desired you should use a method do({}) e.g.
       *  do({url: url, init: init}).then((resp) => resp.json()).then((resp) => console.log(resp)).catch((error) => console.log(error));
       */

    }, {
      key: "fetch",
      value: function fetch() {
        return new Http({
          useFetch: true
        }).instance();
      }
    }]);

    return Http;
  }();
  /**
   * Content-Type application/json;charset=UTF-8
   */


  Http.JSON = "application/json;charset=UTF-8";
  /**
   * Content-Type multipart/form-data
   */

  Http.FORM_DATA = "multipart/form-data";
  /**
   * Content-Type text/plain
   */

  Http.TEXT_PLAIN = "text/plain";
  /**
   * Old Fashion XMLHttpRequest made into the Promise pattern.
   */

  var HttpAjax =
  /*#__PURE__*/
  function () {
    function HttpAjax(config) {
      _classCallCheck(this, HttpAjax);

      this.progressHandler = config.onProgress ? config.onProgress : function (event) {};
      this.data = isContentTypeJson(config.contentType) ? JSON.stringify(config.data) : config.data;
      this.xhr = new XMLHttpRequest();
      this.xhr.open(config.method, config.url);
      if (config.contentType) this.xhr.setRequestHeader("Content-Type", config.contentType);
      if (config.headers) setXhrHeaders(this.xhr, config.headers);
    }

    _createClass(HttpAjax, [{
      key: "then",
      value: function then(successHandler, errorHandler) {
        var _this11 = this;

        this.xhr.onload = function () {
          _this11.xhr.responseJSON = tryParseJSON(_this11.xhr.responseText);
          isResponseOK(_this11.xhr.status) ? successHandler(resolveResponse(_this11.xhr.response), _this11.xhr) : errorHandler(_this11.xhr);
        };

        this.xhr.onprogress = function (event) {
          if (_this11.progressHandler) _this11.progressHandler(event);
        };

        if (this.xhr.ontimeout && config.onTimeout) {
          this.xhr.ontimeout = function (event) {
            config.onTimeout(event);
          };
        }

        this.xhr.onerror = function () {
          _this11.xhr.responseJSON = tryParseJSON(_this11.xhr.responseText);
          if (errorHandler) errorHandler(_this11.xhr);
        };

        this.data ? this.xhr.send(this.data) : this.xhr.send();
        return this;
      }
    }, {
      key: "catch",
      value: function _catch(errorHandler) {
        var _this12 = this;

        this.xhr.onerror = function () {
          _this12.xhr.responseJSON = tryParseJSON(_this12.xhr.responrenderseText);
          if (errorHandler) errorHandler(_this12.xhr);
        };
      }
    }]);

    return HttpAjax;
  }();
  /**
   * XMLHttpRequest using the Promise.
   */


  var HttpPromiseAjax =
  /*#__PURE__*/
  function () {
    function HttpPromiseAjax(config) {
      var _this13 = this;

      _classCallCheck(this, HttpPromiseAjax);

      this.data = isContentTypeJson(config.contentType) ? JSON.stringify(config.data) : config.data;
      this.promise = new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();
        request.open(config.method, config.url);
        if (config.contentType) request.setRequestHeader("Content-Type", config.contentType);
        if (config.headers) setXhrHeaders(request, config.headers);

        request.onload = function () {
          request.responseJSON = tryParseJSON(request.responseText);
          isResponseOK(request.status) ? resolve(resolveResponse(request.response)) : reject(request);
        };

        if (request.ontimeout && config.onTimeout) {
          request.ontimeout = function (event) {
            config.onTimeout(event);
          };
        }

        request.onprogress = function (event) {
          if (config.onProgress) config.onProgress(event);
        };

        request.onerror = function () {
          request.responseJSON = tryParseJSON(request.responseText);
          reject(request);
        };

        _this13.data ? request.send(_this13.data) : request.send();
      });
    }

    _createClass(HttpPromiseAjax, [{
      key: "instance",
      value: function instance() {
        return this.promise;
      }
    }]);

    return HttpPromiseAjax;
  }();

  var resolveResponse = function resolveResponse(response) {
    var resp = tryParseJSON(response);
    if (Util.isEmpty(resp)) resp = response;
    return resp;
  };

  var setXhrHeaders = function setXhrHeaders(xhr, headers) {
    for (var header in headers) {
      if (headers.hasOwnProperty(header)) xhr.setRequestHeader(header, headers[header]);
    }
  };

  var isResponseOK = function isResponseOK(status) {
    var okResponses = [200, 201, 202, 203, 204, 205, 206, 207, 208, 226];
    var i = 0;

    while (i < okResponses.length) {
      if (okResponses[i] === status) return true;
      i++;
    }

    return false;
  };

  var isContentTypeJson = function isContentTypeJson(contentType) {
    return contentType === Http.JSON;
  };

  var tryParseJSON = function tryParseJSON(text) {
    try {
      return JSON.parse(text);
    } catch (e) {}
  };

  return Http;
}();
/**
 * Key class does not have any methods as it only contains key mappings for keyevent. For example:
 * 
 * onKeyDown(function(event) {
 *  if(event.key === Key.ENTER)
 *    //do something.
 * });
 */


var Key = function Key() {
  _classCallCheck(this, Key);
};
/** Enter */


Key.ENTER = "Enter";
/** Escape */

Key.ESC = "Escape";
/** Tab */

Key.TAB = "Tab";
/** F1 */

Key.F1 = "F1";
/** F2 */

Key.F2 = "F2";
/** F3 */

Key.F3 = "F3";
/** F4 */

Key.F4 = "F4";
/** F5 */

Key.F5 = "F5";
/** F6 */

Key.F6 = "F6";
/** F7 */

Key.F7 = "F7";
/** F8 */

Key.F8 = "F8";
/** F9 */

Key.F9 = "F9";
/** F10 */

Key.F10 = "F10";
/** F11 */

Key.F11 = "F11";
/** F12 */

Key.F12 = "F12";
/** a */

Key.A = "a";
/** b */

Key.B = "b";
/** c */

Key.C = "c";
/** d */

Key.D = "d";
/** e */

Key.E = "e";
/** f */

Key.F = "f";
/** g */

Key.G = "g";
/** h */

Key.H = "h";
/** i */

Key.I = "i";
/** j */

Key.J = "j";
/** l */

Key.L = "l";
/** m */

Key.M = "m";
/** n */

Key.N = "n";
/** o */

Key.O = "o";
/** p */

Key.P = "p";
/** q */

Key.Q = "q";
/** r */

Key.R = "r";
/**s */

Key.S = "s";
/** t */

Key.T = "t";
/** u */

Key.U = "u";
/** v */

Key.V = "v";
/** w */

Key.W = "w";
/** x */

Key.X = "x";
/** y */

Key.Y = "y";
/** z */

Key.Z = "z";
/** CapsLock */

Key.CAPS_LOCK = "CapsLock";
/** NumLock */

Key.NUM_LOCK = "NumLock";
/** ScrollLock */

Key.SCROLL_LOCK = "ScrollLock";
/** Pause */

Key.PAUSE = "Pause";
/** PrintScreen */

Key.PRINT_SCREEN = "PrintScreen";
/** PageUp */

Key.PAGE_UP = "PageUp";
/** PageDown */

Key.PAGE_DOWN = "PageDown";
/** End */

Key.END = "End";
/** Home */

Key.HOME = "Home";
/** Delete */

Key.DELETE = "Delete";
/** Insert */

Key.INSERT = "Insert";
/** Alt */

Key.ALT = "Alt";
/** Control */

Key.CTRL = "Control";
/** ContextMenu */

Key.CONTEXT_MENU = "ContextMenu";
/** OS or Metakey */

Key.OS = "OS"; // META

/** AltGraph */

Key.ALTGR = "AltGraph";
/** Shift */

Key.SHIFT = "Shift";
/** Backspace */

Key.BACKSPACE = "Backspace";
/** § */

Key.SECTION = "§";
/** 1 */

Key.ONE = "1";
/** 2 */

Key.TWO = "2";
/** 3 */

Key.THREE = "3";
/** 4 */

Key.FOUR = "4";
/** 5 */

Key.FIVE = "5";
/** 6 */

Key.SIX = "6";
/** 7 */

Key.SEVEN = "7";
/** 8 */

Key.EIGHT = "8";
/** 9 */

Key.NINE = "9";
/** 0 */

Key.ZERO = "0";
/** + */

Key.PLUS = "+";
/** + */

Key.MINUS = "-";
/** * */

Key.STAR = "*";
/** / */

Key.SLASH = "/";
/** ArrowUp */

Key.ARROW_UP = "ArrowUp";
/** ArrowRight */

Key.ARROW_RIGHT = "ArrowRight";
/** ArrowDown */

Key.ARROW_DOWN = "ArrowDown";
/** ArrowLeft */

Key.ARROW_LEFT = "ArrowLeft";
/** , */

Key.COMMA = ",";
/** . */

Key.DOT = ".";

var Messages = function () {
  /**
   * Messages class handles internationalization. The class offers public methods that enable easy 
   * using of translated content.
   */
  var Messages =
  /*#__PURE__*/
  function () {
    function Messages() {
      _classCallCheck(this, Messages);

      this.instance = this;
      this.messages = [];
      this.locale = "";
      this.translated = [];

      this.load = function () {};

      this.messagesType;
      this.app;
      this.ready = false;
      this.registerMessages();
    }
    /**
     * Initializes the Messages
     */


    _createClass(Messages, [{
      key: "registerMessages",
      value: function registerMessages() {
        var _this14 = this;

        document.addEventListener("readystatechange", function () {
          if (document.readyState === "complete") {
            _this14.ready = true;

            _this14.runTranslated.call(_this14);
          }
        });
      }
    }, {
      key: "setLoad",
      value: function setLoad(loader) {
        this.load = loader;
      }
    }, {
      key: "setAppInstance",
      value: function setAppInstance(appInstance) {
        this.app = appInstance;
      }
    }, {
      key: "setLocale",
      value: function setLocale(locale) {
        this.locale = locale;
        return this;
      }
    }, {
      key: "setMessages",
      value: function setMessages(messages) {
        if (Util.isArray(messages)) this.messagesType = "array";else if (Util.isObject(messages)) this.messagesType = "map";else throw "messages must be type array or object";
        this.messages = messages;
        this.runTranslated.call(this);
      }
    }, {
      key: "getMessage",
      value: function getMessage(text) {
        for (var _len4 = arguments.length, params = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
          params[_key4 - 1] = arguments[_key4];
        }

        if (Util.isEmpty(params[0][0])) {
          return this.resolveMessage(text);
        } else {
          this.getTranslatedElemIfExist(text, params[0][0]);
          var msg = this.resolveMessage(text);
          return this.resolveParams(msg, params[0][0]);
        }
      }
      /**
       * Resolves translated message key and returns a resolved message if exist
       * otherwise returns the given key.
       * @param {string} text 
       * @returns A resolved message if exist otherwise the given key.
       */

    }, {
      key: "resolveMessage",
      value: function resolveMessage(text) {
        if (this.messagesType === "array") {
          return this.resolveMessagesArray(text);
        } else if (this.messagesType === "map") {
          return this.resolveMessagesMap(text);
        }
      }
      /**
       * Resolves a translated message key from the map. Returns a resolved message 
       * if found otherwise returns the key.
       * @param {string} text 
       * @returns A resolved message
       */

    }, {
      key: "resolveMessagesMap",
      value: function resolveMessagesMap(text) {
        var msg = text;

        for (var i in this.messages) {
          if (i === text) {
            msg = this.messages[i];
            break;
          }
        }

        return msg;
      }
      /**
       * Resolves a translated message key from the array. Returns a resolved message
       * if found otherwise returns the key.
       * @param {string} text 
       * @returns A resolved message
       */

    }, {
      key: "resolveMessagesArray",
      value: function resolveMessagesArray(text) {
        var i = 0;
        var msg = text;

        while (i < this.messages.length) {
          if (!Util.isEmpty(this.messages[i][text])) {
            msg = this.messages[i][text];
            break;
          }

          i++;
        }

        return msg;
      }
      /**
       * Resolves the message parameters if exist otherwise does nothing.
       * @param {string} msg 
       * @param {*} params 
       * @returns The message with resolved message parameteres if parameters exist.
       */

    }, {
      key: "resolveParams",
      value: function resolveParams(msg, params) {
        if (!Util.isEmpty(msg)) {
          var i = 0;

          while (i < params.length) {
            msg = msg.replace("{" + i + "}", params[i]);
            i++;
          }

          return msg;
        }
      }
      /**
       * Function gets a Elem object and inserts it into a translated object array if it exists.
       * @param {string} key 
       * @param {*} params 
       */

    }, {
      key: "getTranslatedElemIfExist",
      value: function getTranslatedElemIfExist(key, params) {
        var last = params[params.length - 1];

        if (Util.isObject(last) && last instanceof Elem) {
          last = params.pop();

          if (Util.isEmpty(this.app)) {
            this.translated.push({
              key: key,
              params: params,
              obj: last
            });
          }
        }
      }
      /**
       * Function goes through the translated objects array and sets a translated message to the translated elements.
       */

    }, {
      key: "runTranslated",
      value: function runTranslated() {
        var _this15 = this;

        if (Util.isEmpty(this.app) && this.ready) {
          Util.setTimeout(function () {
            var i = 0;

            while (i < _this15.translated.length) {
              _this15.translated[i].obj.setText.call(_this15.translated[i].obj, Messages.message(_this15.translated[i].key, _this15.translated[i].params));

              i++;
            }
          });
        } else if (this.ready) {
          this.app.refresh();
        }
      }
      /**
       * Function returns current locale of the Messages
       * @returns Current locale
       */

    }], [{
      key: "locale",
      value: function locale() {
        return Messages.getInstance().locale;
      }
      /**
       * Lang function is used to change or set the current locale to be the given locale. After calling this method
       * the Messages.load function will be automatically invoked.
       * @param {string} locale String
       * @param {object} locale Event
       */

    }, {
      key: "lang",
      value: function lang(locale) {
        var loc;

        if (Util.isObject(locale) && locale instanceof Event) {
          locale.preventDefault();
          var el = Elem.wrap(locale.target);
          loc = el.getHref();
          if (Util.isEmpty(loc)) loc = el.getValue();
          if (Util.isEmpty(loc)) loc = el.getText();
        } else if (Util.isString(locale)) loc = locale;else throw "Given parameter must be type string or instance of Event, given value: " + locale;

        if (!Util.isEmpty(loc)) Messages.getInstance().setLocale(loc).load.call(null, Messages.getInstance().locale, Messages.getInstance().setMessages.bind(Messages.getInstance()));
      }
      /**
       * Message function is used to retrieve translated messages. The function also supports message parameters
       * that can be given as a comma separeted list. 
       * @param {string} text 
       * @param {*} params 
       * @returns A resolved message or the given key if the message is not found.
       */

    }, {
      key: "message",
      value: function message(text) {
        for (var _len5 = arguments.length, params = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
          params[_key5 - 1] = arguments[_key5];
        }

        return Messages.getInstance().getMessage(text, params);
      }
      /**
       * Load function is used to load new messages or change already loaded messages.
       * Implementation of the function receives two parameters. The one of the parameters is the changed locale and 
       * the other is setMessages(messagesArrayOrObject) function that is used to change the translated messages.
       * This function is called automatically when language is changed by calling the Messages.lang() function.
       * @param {function} loader 
       */

    }, {
      key: "load",
      value: function load(loader) {
        if (!Util.isFunction(loader)) throw "loader must be type function " + Util.getType(loader);
        Messages.getInstance().setLoad(loader);
      }
      /**
       * Set the app instance to be invoked on the Messages update.
       * @param {object} appInstance 
       */

    }, {
      key: "setApp",
      value: function setApp(appInstance) {
        Messages.getInstance().setAppInstance(appInstance);
        return Messages;
      }
    }, {
      key: "getInstance",
      value: function getInstance() {
        if (!this.instance) this.instance = new Messages();
        return this.instance;
      }
    }]);

    return Messages;
  }();

  return {
    lang: Messages.lang,
    message: Messages.message,
    load: Messages.load,
    locale: Messages.locale,
    setApp: Messages.setApp
  };
}();
/**
 * The configure function will configure given Components. Advantage of this function is that the Compoments can be given in 
 * any order and they will be recognized automatically.
 * 
 * Example use case would be to invoke configure(App.get(), Router, Messages);
 * 
 * This function can be conbined with a createApp('#app', AppComponent) function as follows:
 * configure(createApp('#app', AppComponent), Router, Messages); This is probably the shortest way to 
 * create the RME application.
 * @param {*} params comma separated list of components
 */


var configure = function () {
  return function () {
    var config = {};

    for (var _len6 = arguments.length, params = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
      params[_key6] = arguments[_key6];
    }

    params.forEach(function (param) {
      if (param.routes) {
        config = _objectSpread({}, config, {
          router: param
        });
      } else if (param.load) {
        config = _objectSpread({}, config, {
          messages: param
        });
      } else if (param.name) {
        config = _objectSpread({}, config, {
          app: param
        });
      }
    });
    if (Util.notEmpty(config.router)) config.router.setApp(config.app);
    if (Util.notEmpty(config.messages)) config.messages.setApp(config.app);
    if (Util.notEmpty(config.app)) config.app.setRouter(config.router);
  };
}();
/**
 * Adds a script file on runtime into the head of the current html document where the method is called on.
 * Source is required options can be omitted.
 * @param {String} source URL or file name. *Requied
 * @param {object} options Optional settings object.
 * 
 * Option settings:
 * -------
 *  @param {String} id 
 *  @param {String} type 
 *  @param {String} text Content of the script element if any.
 *  @param {boolean} defer If true script is executed when page has finished parsing.
 *  @param {*} crossOrigin 
 *  @param {String} charset 
 *  @param {boolean} async If true script is executed asynchronously when available.
 */


var script = function () {
  var addScript = function addScript(elem) {
    var scripts = Tree.getHead().getByTag('script');

    if (scripts.length > 0) {
      var lastScript = scripts[scripts.length - 1];
      lastScript.after(elem);
    } else {
      Tree.getHead().append(elem);
    }
  };

  return function (source, options) {
    if (Util.notEmpty(source)) {
      addScript(Template.resolve({
        script: _objectSpread({
          src: source
        }, options)
      }));
    }
  };
}();
/**
 * The function adds a callback function into the callback queue. The queue is invoked in the
 * function definition order. The queue will be run when the DOM tree is ready and
 * then the it is cleared.
 */


var ready = function () {
  var callbacks = [];
  document.addEventListener("readystatechange", function () {
    if (document.readyState === "complete") {
      callbacks.forEach(function (callback) {
        return callback();
      });
      callbacks.length = 0;
    }
  });
  return function (callback) {
    callbacks.push(callback);
  };
}();
/**
 * RME stands for Rest Made Easy. This is a small easy to use library that enables you to create
 * RESTfull webpages with ease and speed.
 * 
 * This library is free to use under the MIT License.
 */


var RME = function () {
  var RMEStorage =
  /*#__PURE__*/
  function () {
    function RMEStorage() {
      _classCallCheck(this, RMEStorage);

      this.rmeState = {};
    }

    _createClass(RMEStorage, [{
      key: "setRmeStateProp",
      value: function setRmeStateProp(key, value) {
        this.rmeState[key] = value;
      }
    }, {
      key: "getRmeStateProp",
      value: function getRmeStateProp(key) {
        return this.rmeState[key];
      }
    }]);

    return RMEStorage;
  }();

  var rmeStorage = new RMEStorage();
  /**
   * This function is not the recommended way to use components and is for legacy support
   * and will be removed in later releases. The recommended way to use components is the 
   * Component function.
   * 
   * The function creates or retrieves a component. 
   * If the first parameter is a string the function will try to get the component from the 
   * component storage. Otherwise the function will set the component in the component storage.
   * @param {*} component function, object or string.
   * @param {Object} props 
   */

  var component = function component(_component2, props) {
    if (_component2 && (Util.isFunction(_component2) || Util.isObject(_component2))) RMEComponentManager.addComponent(_component2, props);else if (_component2 && Util.isString(_component2)) return RMEComponentManager.getComponent(_component2, props);
  };
  /**
   * Saves data to or get data from the RME instance storage.
   * If key and value parameters are not empty then this method will try to save the give value by the given key
   * into to the RME instance storage.
   * If key is not empty and value is empty then this method will try to get data from the RME instance storage
   * by the given key.
   * @param {String} key 
   * @param {Object} value 
   */


  var storage = function storage(key, value) {
    if (Util.notEmpty(key) && Util.notEmpty(value)) rmeStorage.setRmeStateProp(key, value);else if (Util.notEmpty(key) && Util.isEmpty(value)) return rmeStorage.getRmeStateProp(key);
  };

  return {
    component: component,
    storage: storage
  };
}();

var Router = function () {
  /**
   * Router class handles and renders route elements that are given by Router.routes() method.
   * The method takes an array of route objects that are defined as follows: {route: "url", elem: elemObject, hide: true|false|undefined}.
   * The first element the array of route objects is by default the root route object in which all other route objects 
   * are rendered into.
   */
  var Router =
  /*#__PURE__*/
  function () {
    function Router() {
      var _this16 = this;

      _classCallCheck(this, Router);

      this.instance = null;
      this.root = null;
      this.origRoot = null;
      this.routes = [];
      this.origRoutes = [];
      this.currentRoute = {};
      this.prevUrl = location.pathname;

      this.loadCall = function () {
        return _this16.navigateUrl(location.pathname);
      };

      this.hashCall = function () {
        return _this16.navigateUrl(location.hash);
      };

      this.useHistory = true;
      this.autoListen = true;
      this.useHash = false;
      this.scrolltop = true;
      this.app;
      this.registerRouter();
    }
    /**
     * Initializes the Router.
     */


    _createClass(Router, [{
      key: "registerRouter",
      value: function registerRouter() {
        var _this17 = this;

        document.addEventListener("readystatechange", function () {
          if (document.readyState === "complete") {
            var check = Util.setInterval(function () {
              var hasRoot = !Util.isEmpty(_this17.root.elem) ? document.querySelector(_this17.root.elem) : false;

              if (hasRoot) {
                Util.clearInterval(check);

                _this17.resolveRoutes();
              }
            }, 50);
          }
        });
      }
      /**
       * Register listeners according to the useHistory and the autoListen state.
       */

    }, {
      key: "registerListeners",
      value: function registerListeners() {
        if (this.useHistory && this.autoListen) window.addEventListener("load", this.loadCall);else if (!this.useHistory && this.autoListen) window.addEventListener("hashchange", this.hashCall);
        if (!this.autoListen) window.addEventListener("popstate", this.onPopState.bind(this));
      }
      /**
       * Clear the registered listeners.
       */

    }, {
      key: "clearListeners",
      value: function clearListeners() {
        window.removeEventListener("load", this.loadCall);
        window.removeEventListener("hashchange", this.hashCall);
        if (!this.autoListen) window.removeEventListener("popstate", this.onPopState);
      }
      /**
       * On popstate call is registered if the auto listen is false. It listens the browsers history change and renders accordingly.
       */

    }, {
      key: "onPopState",
      value: function onPopState() {
        if (this.useHistory) this.renderRoute(location.pathname);else this.renderRoute(location.hash);
      }
      /**
       * Set the router to use a history implementation or an anchor hash implementation.
       * If true then the history implementation is used. Default is true.
       * @param {boolean} use
       */

    }, {
      key: "setUseHistory",
      value: function setUseHistory(use) {
        this.useHistory = use;
      }
      /**
       * Set the Router to auto listen url change to true or false.
       * @param {boolean} listen
       */

    }, {
      key: "setAutoListen",
      value: function setAutoListen(listen) {
        this.autoListen = listen;
      }
      /**
       * Set auto scroll up true or false.
       * @param {boolean} auto 
       */

    }, {
      key: "setAutoScrollUp",
      value: function setAutoScrollUp(auto) {
        this.scrolltop = auto;
      }
      /**
       * Set the app instance that the Router invokes on update.
       * @param {object} appInstance 
       */

    }, {
      key: "setApp",
      value: function setApp(appInstance) {
        this.app = appInstance;
      }
      /**
       * Resolves the root and the first page.
       */

    }, {
      key: "resolveRoutes",
      value: function resolveRoutes() {
        if (Util.isString(this.root.elem)) {
          this.root.elem = this.resolveElem(this.root.elem);
        } else if (Util.isEmpty(this.root)) {
          this.root = this.routes.shift();
          this.root.elem = this.resolveElem(this.root.elem);
          this.origRoot = this.root.elem;
        }

        if (this.useHash) {
          this.renderRoute(location.hash);
        } else {
          this.renderRoute(location.pathname);
        }
      }
      /**
       * Set the routes and if a root is not set then the first element will be the root route element.
       * @param {array} routes
       */

    }, {
      key: "setRoutes",
      value: function setRoutes(routes) {
        this.routes = routes;
      }
      /**
       * Add a route into the Router. {route: "url", elem: elemObject}
       * @param {object} route
       */

    }, {
      key: "addRoute",
      value: function addRoute(route) {
        this.routes.push(route);
      }
      /**
       * Set a root route object into the Router. {route: "url", elem: elemObject}
       * @param {object} route
       */

    }, {
      key: "setRoot",
      value: function setRoot(route) {
        this.root = route;
        this.origRoot = route.elem;
      }
      /**
       * @deprecated
       * Resolve route elements.
       * @param {array} routes 
       */

    }, {
      key: "resolveRouteElems",
      value: function resolveRouteElems(routes) {
        var i = 0;

        while (i < routes.length) {
          routes[i].elem = this.resolveElem(routes[i].elem);
          i++;
        }

        return routes;
      }
      /**
       * Method resolves element. If elem is string gets a component of the name if exist otherwise creates a new elemen of the name.
       * If both does not apply then method assumes the elem to be an element and returns it.
       * @param {*} elem 
       */

    }, {
      key: "resolveElem",
      value: function resolveElem(elem, props) {
        if (Util.isFunction(elem) && RMEComponentManager.hasComponent(elem.valueOf().name)) {
          return RMEComponentManager.getComponent(elem.valueOf().name, props);
        } else if (Util.isString(elem) && RMEComponentManager.hasComponent(elem)) {
          return RMEComponentManager.getComponent(elem, props);
        } else if (Util.isString(elem) && this.isSelector(elem)) {
          return Tree.getFirst(elem);
        } else if (elem instanceof Elem) {
          return elem;
        } else if (Util.isEmpty(elem)) {
          return elem;
        }

        throw new Error("Could not resolve a route elem: ".concat(elem));
      }
      /**
       * Function checks if a tag starts with a dot or hashtag or is a HTML tag.
       * If described conditions are met then the tag is supposed to be a selector.
       * @param {string} tag 
       * @returns True if the tag is a selector otherwise false.
       */

    }, {
      key: "isSelector",
      value: function isSelector(tag) {
        return tag.charAt(0) === '.' || tag.charAt(0) === '#' || Template.isTag(tag);
      }
      /**
       * Method navigates to the url and renders a route element inside the root route element if found.
       * @param {string} url
       */

    }, {
      key: "navigateUrl",
      value: function navigateUrl(url) {
        var route = this.findRoute(url);

        if (!Util.isEmpty(route) && this.useHistory && !route.hide) {
          history.pushState(null, null, url);
        } else if (!Util.isEmpty(route) && !route.hide) {
          location.href = url;
        }

        if (!Util.isEmpty(this.root) && !Util.isEmpty(route)) {
          if (route.scrolltop === true || route.scrolltop === undefined && this.scrolltop) Util.setTimeout(function () {
            return Browser.scrollTo(0, 0);
          });
          this.prevUrl = this.getUrlPath(url);
          this.currentRoute = route;

          if (Util.isEmpty(this.app)) {
            if (!Util.isEmpty(route.onBefore)) route.onBefore();
            this.root.elem.render(this.resolveElem(route.elem, route.compProps));
            if (!Util.isEmpty(route.onAfter)) route.onAfter();
          } else {
            if (!Util.isEmpty(route.onBefore)) route.onBefore();
            this.app.refresh();
          }
        }
      }
      /**
       * Method looks for a route by the url. If the router is found then it will be returned otherwise returns null
       * @param {string} url
       * @param {boolean} force
       * @returns The found router or null if not found.
       */

    }, {
      key: "findRoute",
      value: function findRoute(url, force) {
        var i = 0;

        if (!Util.isEmpty(url) && (this.prevUrl !== this.getUrlPath(url) || force)) {
          while (i < this.routes.length) {
            if (this.matches(this.routes[i].route, url)) return this.routes[i];
            i++;
          }
        }

        return null;
      }
      /**
       * Method will look for a route by the url and if the route is found then it will be rendered 
       * inside the root route element.
       * @param {string} url
       */

    }, {
      key: "renderRoute",
      value: function renderRoute(url) {
        var route = this.findRoute(url, true);

        if (!Util.isEmpty(route) && Util.isEmpty(this.app)) {
          if (!Util.isEmpty(route.onBefore)) route.onBefore();
          this.root.elem.render(this.resolveElem(route.elem, route.compProps));
          this.currentRoute = route;
          if (!Util.isEmpty(route.onAfter)) route.onAfter();
        } else if (Util.isEmpty(this.app)) {
          this.root.elem.render();
        } else if (!Util.isEmpty(route) && !Util.isEmpty(this.app)) {
          if (!Util.isEmpty(route.onBefore)) route.onBefore();
          this.app.refresh();
          this.currentRoute = route;
        }

        this.prevUrl = location.pathname;
      }
      /**
       * Method matches a given url parameters and returns true if the urls matches.
       * @param {string} url
       * @param {string} newUrl
       * @returns True if the given urls matches otherwise false.
       */

    }, {
      key: "matches",
      value: function matches(url, newUrl) {
        if (this.useHistory) {
          url = Util.isString(url) ? url.replace(/\*/g, '.*').replace(/\/{2,}/g, '/') : url;
          var path = this.getUrlPath(newUrl);
          var found = path.match(url);
          if (!Util.isEmpty(found)) found = found.join();
          return found === path && new RegExp(url).test(newUrl);
        } else {
          if (Util.isString(url)) {
            url = url.replace(/\*/g, '.*');
            if (url.charAt(0) !== '#') url = "#".concat(url);
          }

          var hash = newUrl.match(/\#{1}.*/).join();

          var _found = hash.match(url);

          if (!Util.isEmpty(_found)) _found = _found.join();
          return _found === hash && new RegExp(url).test(newUrl);
        }
      }
      /**
       * Cut the protocol and domain of the url off if exist.
       * For example https://www.example.com/example -> /example
       * @param {string} url 
       * @returns The path of the url.
       */

    }, {
      key: "getUrlPath",
      value: function getUrlPath(url) {
        return this.useHash ? url : url.replace(/\:{1}\/{2}/, '').match(/\/{1}.*/).join();
      }
      /**
       * @returns The current status of the Router in an object.
       */

    }, {
      key: "getCurrentState",
      value: function getCurrentState() {
        return {
          root: this.origRoot,
          rootElem: this.root.elem,
          current: this.resolveElem(this.currentRoute.elem, this.currentRoute.compProps),
          onAfter: this.currentRoute.onAfter
        };
      }
      /**
       * Method will try to find a route according to the given parameter. The supported parameter combinations are url, event or elem & event. 
       * The first paramter can either be an URL or an Event or an Elem. The second parameter is an Event if the first parameter is an Elem.
       * If the route is found, then the Router will update a new url to the browser and render the found route element.
       * @param {string} url
       * @param {object} url type event
       * @param {object} url type Elem
       * @param {object} event
       */

    }], [{
      key: "navigate",
      value: function navigate(url, event) {
        if (Util.isString(url)) Router.getInstance().navigateUrl(url);else if (Util.isObject(url) && url instanceof Event) {
          if (!Router.getInstance().autoListen || Router.getInstance().useHash) url.preventDefault();
          Router.getInstance().navigateUrl(url.target.href);
        } else if (Util.isObject(url) && url instanceof Elem && !Util.isEmpty(event) && Util.isObject(event) && event instanceof Event) {
          if (!Router.getInstance().autoListen || Router.getInstance().useHash) event.preventDefault();
          Router.getInstance().navigateUrl(url.getHref());
        }
      }
      /**
       * Set a root element into the Router. Elem parameter must be an Elem object in order to the Router is able to render it.
       * @param {object} elem
       * @returns Router
       */

    }, {
      key: "root",
      value: function root(elem) {
        Router.getInstance().setRoot({
          elem: elem
        });
        return Router;
      }
      /**
       * Add a new route element into the Router. Elem parameter must be an Elem object in order to the Router is able to render it.
       * @param {string} url
       * @param {object} elem
       * @param {boolean} hide
       */

    }, {
      key: "add",
      value: function add(url, elem, hide) {
        Router.getInstance().addRoute({
          route: url,
          elem: elem,
          hide: hide
        });
        return Router;
      }
      /**
       * Set an array of routes that the Router uses. If a root is not set then the first item in the given routes array will be the root route element.
       * @param {array} routes
       */

    }, {
      key: "routes",
      value: function routes(_routes) {
        if (!Util.isArray(_routes)) throw "Could not set routes. Given parameter: \"" + _routes + "\" is not an array.";
        Router.getInstance().setRoutes(_routes);
        return Router;
      }
      /**
       * Method sets the Router to use an url implementation. The url implementation defaults to HTML standard that pressing a link
       * will cause the browser reload a new page. After reload the new page is rendered. If you wish to skip reload then you should 
       * set the parameter manual to true.
       * @param {boolean} manual
       * @returns Router
       */

    }, {
      key: "url",
      value: function url(manual) {
        Router.getInstance().setUseHistory(true);
        Router.getInstance().registerListeners();

        if (Util.isBoolean(manual) && manual) {
          Router.manual();
        }

        return Router;
      }
      /**
       * Method sets the Router not to automatically follow url changes. If this method is invoked 
       * the user must explicitly define a method that calls Router.navigate in order to have navigation working
       * properly when going forward and backward in the history. The method will not 
       * do anything if the url implementation is not used.
       * @returns Router
       */

    }, {
      key: "manual",
      value: function manual() {
        if (Router.getInstance().useHistory) {
          Router.getInstance().clearListeners();
          Router.getInstance().setAutoListen(false);
          Router.getInstance().registerListeners();
        }

        return Router;
      }
      /**
       * Method sets the Router to use a hash implementation. When this implementation is used 
       * there is no need to manually use Router.navigate function because change
       * of the hash is automatically followed.
       * @returns Router
       */

    }, {
      key: "hash",
      value: function hash() {
        Router.getInstance().setUseHistory(false);
        Router.getInstance().setAutoListen(true);
        Router.getInstance().registerListeners();
        Router.getInstance().useHash = true;
        return Router;
      }
      /**
       * Method sets default level behavior for route naviagation. If the given value is true then the Browser auto-scrolls up 
       * when navigating to a new resource. If set false then the Browser does not auto-scroll up. Default value is true.
       * @param {boolean} auto 
       * @returns Router
       */

    }, {
      key: "scroll",
      value: function scroll(auto) {
        if (Util.isBoolean(auto)) {
          Router.getInstance().setAutoScrollUp(auto);
        }

        return Router;
      }
      /**
       * Set the app instance to be invoked on the Router update.
       * @param {object} appInstance 
       * @returns Router
       */

    }, {
      key: "setApp",
      value: function setApp(appInstance) {
        if (!Util.isEmpty(appInstance)) Router.getInstance().setApp(appInstance);
        return Router;
      }
      /**
       * @returns The current status of the router.
       */

    }, {
      key: "getCurrentState",
      value: function getCurrentState() {
        return Router.getInstance().getCurrentState();
      }
    }, {
      key: "getInstance",
      value: function getInstance() {
        if (Util.isEmpty(this.instance)) this.instance = new Router();
        return this.instance;
      }
    }]);

    return Router;
  }();

  return {
    navigate: Router.navigate,
    root: Router.root,
    add: Router.add,
    routes: Router.routes,
    url: Router.url,
    hash: Router.hash,
    scroll: Router.scroll,
    getCurrentState: Router.getCurrentState,
    setApp: Router.setApp
  };
}();
/**
 * Session class is a wrapper interface for the SessionStorage and thus provides get, set, remove and clear methods of the SessionStorage.
 */


var Session =
/*#__PURE__*/
function () {
  function Session() {
    _classCallCheck(this, Session);
  }

  _createClass(Session, null, [{
    key: "set",

    /**
     * Save data into the Session.
     * @param {string} key
     * @param {*} value
     */
    value: function set(key, value) {
      sessionStorage.setItem(key, value);
    }
    /**
     * Get the saved data from the Session.
     * @param {string} key
     */

  }, {
    key: "get",
    value: function get(key) {
      return sessionStorage.getItem(key);
    }
    /**
     * Remove data from the Session.
     * @param {string} key
     */

  }, {
    key: "remove",
    value: function remove(key) {
      sessionStorage.removeItem(key);
    }
    /**
     * Clears the Session.
     */

  }, {
    key: "clear",
    value: function clear() {
      sessionStorage.clear();
    }
  }]);

  return Session;
}();
/**
 * Storage class is a wrapper interface for the LocalStorage and thus provides get, set, remove and clear methods of the LocalStorage.
 */


var Storage =
/*#__PURE__*/
function () {
  function Storage() {
    _classCallCheck(this, Storage);
  }

  _createClass(Storage, null, [{
    key: "set",

    /**
     * Save data into the local storage. 
     * @param {string} key
     * @param {*} value
     */
    value: function set(key, value) {
      localStorage.setItem(key, value);
    }
    /**
     * Get the saved data from the local storage.
     * @param {string} key
     */

  }, {
    key: "get",
    value: function get(key) {
      return localStorage.getItem(key);
    }
    /**
     * Remove data from the local storage.
     * @param {string} key
     */

  }, {
    key: "remove",
    value: function remove(key) {
      localStorage.removeItem(key);
    }
    /**
     * Clears the local storage.
     */

  }, {
    key: "clear",
    value: function clear() {
      localStorage.clear();
    }
  }]);

  return Storage;
}();

var Template = function () {
  /**
   * Template class reads a JSON format notation and creates an element tree from it.
   * The Template class has only one public method resolve that takes the template as parameter and returns 
   * the created element tree.
   */
  var Template =
  /*#__PURE__*/
  function () {
    function Template() {
      _classCallCheck(this, Template);

      this.template = {};
      this.root = null;
    }
    /**
     * Method takes a template as parameter, starts resolving it and returns 
     * a created element tree. 
     * @param {object} template
     * @returns Elem instance element tree.
     */


    _createClass(Template, [{
      key: "setTemplateAndResolve",
      value: function setTemplateAndResolve(template, parent) {
        this.template = template;

        if (parent) {
          this.root = parent;
          this.resolve(this.template, this.root, 1);
        } else {
          this.resolve(this.template, this.root, 0);
        }

        return this.root;
      }
      /**
       * Method resolves a given template recusively. The method and
       * parameters are used internally.
       * @param {object} template
       * @param {object} parent
       * @param {number} round
       */

    }, {
      key: "resolve",
      value: function resolve(template, parent, round) {
        for (var obj in template) {
          if (template.hasOwnProperty(obj)) {
            if (round === 0) {
              this.root = this.resolveElement(obj, template[obj]);

              if (this.isArray(template[obj])) {
                ++round;
                this.resolveArray(template[obj], this.root, round);
              } else if (!this.isComponent(obj) && Util.isObject(template[obj])) {
                ++round;
                this.resolve(template[obj], this.root, round);
              } else if (Util.isString(template[obj]) || Util.isNumber(template[obj])) {
                ++round;
                this.resolveStringNumber(this.root, template[obj]);
              } else if (Util.isFunction(template[obj])) {
                ++round;
                this.resolveFunction(this.root, template[obj], round);
              } else if (Template.isAttr(obj, this.root)) {
                this.resolveAttributes(this.root, obj, this.resolveFunctionBasedAttribute(template[obj]));
              } else if (this.isEventKeyVal(obj, template[obj])) {
                this.bindEventToElement(this.root, template[obj], this.root[obj]);
              }
            } else {
              if (Template.isAttr(obj, parent)) {
                this.resolveAttributes(parent, obj, this.resolveFunctionBasedAttribute(template[obj]));
              } else if (this.isEventKeyVal(obj, template[obj])) {
                this.bindEventToElement(parent, template[obj], parent[obj]);
              } else {
                ++round;
                var child = this.resolveElement(obj, template[obj]);

                if (Template.isFragment(child)) {
                  this.resolveFragment(child.fragment || template[obj], parent, round);
                } else {
                  parent.append(child);

                  if (this.isArray(template[obj])) {
                    this.resolveArray(template[obj], child, round);
                  } else if (!this.isComponent(obj) && Util.isObject(template[obj])) {
                    this.resolve(template[obj], child, round);
                  } else if (Util.isString(template[obj]) || Util.isNumber(template[obj])) {
                    this.resolveStringNumber(child, template[obj]);
                  } else if (Util.isFunction(template[obj])) {
                    this.resolveFunction(child, template[obj], round);
                  }
                }
              }
            }
          }
        }
      }
    }, {
      key: "bindEventToElement",
      value: function bindEventToElement(elemInstance, sourceFunction, targetFunction) {
        targetFunction.call(elemInstance, sourceFunction);
      }
      /**
       * Method receives three parameters that represent pieces of the HTML tree. Method resolves
       * given parameters accordingly and eventually HTML nodes are appended into the HTML tree.
       * @param {*} fragment 
       * @param {*} parent 
       * @param {*} round 
       */

    }, {
      key: "resolveFragment",
      value: function resolveFragment(fragment, parent, round) {
        if (this.isArray(fragment)) {
          this.resolveArray(fragment, parent, round);
        } else if (Util.isFunction(fragment)) {
          var ret = fragment.call(parent, parent);
          if (this.isArray(ret)) this.resolveArray(ret, parent, round);else Template.resolveToParent(ret, parent);
        } else {
          this.resolve(fragment, parent, round);
        }
      }
      /**
       * Method resolves function based attribute values. If the given attribute value
       * is type function then the function is invoked and its return value will be returned otherwise
       * the given attribute value is returned.
       * @param {*} attr 
       * @returns Resolved attribute value.
       */

    }, {
      key: "resolveFunctionBasedAttribute",
      value: function resolveFunctionBasedAttribute(attrValue) {
        return Util.isFunction(attrValue) ? attrValue.call() : attrValue;
      }
      /**
       * Checks if the given parameter is an Array.
       * 
       * @param {*} nextValue 
       * @returns True if the given value is an Array.
       */

    }, {
      key: "isArray",
      value: function isArray(nextValue) {
        return Util.isArray(nextValue) || !Util.isEmpty(nextValue) && Util.isArray(nextValue._rme_type_);
      }
      /**
       * Method resolves a given array template elements.
       * @param {array} array
       * @param {parent} parent
       * @param {round}
       */

    }, {
      key: "resolveArray",
      value: function resolveArray(nextValue, parent, round) {
        var array = nextValue._rme_type_ || nextValue;

        if (nextValue._rme_props_) {
          this.resolve(nextValue._rme_props_, parent, round);
        }

        var i = 0;

        while (i < array.length) {
          var o = array[i];

          for (var key in o) {
            if (o.hasOwnProperty(key)) {
              if (Util.isObject(o[key])) {
                this.resolve(o, parent, round);
              } else if (Util.isString(o[key]) || Util.isNumber(o[key])) {
                var el = this.resolveElement(key);
                this.resolveStringNumber(el, o[key]);
                parent.append(el);
              } else if (Util.isFunction(o[key])) {
                var _el = this.resolveElement(key);

                this.resolveFunction(_el, o[key]);
                parent.append(_el);
              }
            }
          }

          i++;
        }
      }
      /**
       * Function will set String or Number values for the given element.
       * @param {object} elem 
       * @param {*} value 
       */

    }, {
      key: "resolveStringNumber",
      value: function resolveStringNumber(elem, value) {
        if (Util.isString(value) && this.isMessage(value)) this.resolveMessage(elem, value);else elem.setText(value);
      }
      /**
       * Resolves function based tempalte implementation.
       * @param {object} elem
       * @param {func} func
       */

    }, {
      key: "resolveFunction",
      value: function resolveFunction(elem, func, round) {
        var ret = func.call(elem, elem);

        if (!Util.isEmpty(ret)) {
          if (Util.isString(ret) && this.isMessage(ret)) {
            this.resolveMessage(elem, ret);
          } else if (Util.isString(ret) || Util.isNumber(ret)) {
            elem.setText(ret);
          } else if (this.isArray(ret)) {
            this.resolveArray(ret, elem, round);
          } else if (Util.isObject(ret)) {
            this.resolve(ret, elem, round);
          }
        }
      }
      /**
       * Function will check if the given message is actually a message or not. The function
       * will return true if it is a message otherwise false is returned.
       * @param {string} message 
       * @returns True if the given message is actually a message otherwise returns false.
       */

    }, {
      key: "isMessage",
      value: function isMessage(message) {
        message = this.normalizeMessageString(message);
        return Util.notEmpty(Messages.message(message)) && Messages.message(message) != message;
      }
      /**
       * Resolves an element and some basic attributes from a give tag. Method throws an exception if 
       * the element could not be resolved.
       * @param {string} tag
       * @param {object} obj
       * @returns Null or resolved Elem instance elemenet.
       */

    }, {
      key: "resolveElement",
      value: function resolveElement(tag, obj) {
        var resolved = null;
        var match = [];
        var el = this.getElementName(tag);

        if (RMEComponentManager.hasComponent(el)) {
          el = el.replace(/component:/, "");
          resolved = RMEComponentManager.getComponent(el, obj);
          if (Util.isEmpty(resolved)) return resolved;
        } else if (Util.isEmpty(el)) {
          throw "Template resolver could not find element: ".concat(el, " from the given tag: ").concat(tag);
        } else if (el.indexOf('fragment') === 0) {
          return el.match(/fragment/).join();
        } else {
          resolved = new Elem(el);
        }

        match = tag.match(/[a-z0-9]+\#[a-zA-Z0-9\-]+/); //find id

        if (!Util.isEmpty(match)) resolved.setId(match.join().replace(/[a-z0-9]+\#/g, ""));
        match = this.cutAttributesIfFound(tag).match(/\.[a-zA-Z-0-9\-]+/g); //find classes

        if (!Util.isEmpty(match)) resolved.addClasses(match.join(" ").replace(/\./g, ""));
        match = tag.match(/\[[a-zA-Z0-9\= \:\(\)\#\-\_\/\.&%@!?£$+¤|;\\<\\>\\{}"]+\]/g); //find attributes

        if (!Util.isEmpty(match)) resolved = this.addAttributes(resolved, match);
        return resolved;
      }
      /**
       * Function will cut off the element tag attributes if found.
       * @param {string} tag 
       * @returns Element tag without attributes.
       */

    }, {
      key: "cutAttributesIfFound",
      value: function cutAttributesIfFound(tag) {
        var idx = tag.indexOf('[');
        return tag.substring(0, idx > 0 ? idx : tag.length);
      }
      /**
       * Function will try to parse an element name from the given string. If the given string
       * is no empty a matched string is returned. If the given string is empty nothing is returned
       * @param {string} str 
       * @returns The matched string.
       */

    }, {
      key: "getElementName",
      value: function getElementName(str) {
        if (!Util.isEmpty(str)) return str.match(/component:?[a-zA-Z0-9]+|[a-zA-Z0-9]+/).join();
      }
      /**
       * Adds resolved attributes to an element.
       * @param {object} elem
       * @param {array} elem
       * @returns The given elem instance.
       */

    }, {
      key: "addAttributes",
      value: function addAttributes(elem, attrArray) {
        var i = 0;
        var start = "[";
        var eq = "=";
        var end = "]";

        while (i < attrArray.length) {
          var attr = attrArray[i];
          var key = attr.substring(attr.indexOf(start) + 1, attr.indexOf(eq));
          var val = attr.substring(attr.indexOf(eq) + 1, attr.indexOf(end));
          this.resolveAttributes(elem, key, val);
          i++;
        }

        return elem;
      }
      /**
       * Method adds an attribute to an element.
       * @param {object} elem
       * @param {string} key
       * @param {string} val
       */

    }, {
      key: "resolveAttributes",
      value: function resolveAttributes(elem, key, val) {
        switch (key) {
          case 'id':
            elem.setId(val);
            break;

          case 'class':
            elem.addClasses(val || '');
            break;

          case 'text':
            elem.setText(val || '');
            break;

          case 'message':
            this.resolveMessage(elem, val);
            break;

          case 'placeholder':
            this.resolvePlaceholder(elem, key, val);
            break;

          case 'content':
            this.resolveContent(elem, key, val);
            break;

          case 'tabIndex':
            elem.setTabIndex(val);
            break;

          case 'editable':
            elem.setEditable(val);
            break;

          case 'checked':
            elem.setChecked(val);
            break;

          case 'disabled':
            elem.setDisabled(val);
            break;

          case 'selected':
            elem.setSelected(val);
            break;

          case 'visible':
            elem.setVisible(val);
            break;

          case 'display':
            elem.display(val);
            break;

          case 'styles':
            elem.setStyles(val);
            break;

          case 'click':
            elem.click();
            break;

          case 'focus':
            elem.focus();
            break;

          case 'blur':
            elem.blur();
            break;

          case 'maxLength':
            elem.setMaxLength(val);
            break;

          case 'minLength':
            elem.setMinLength(val);
            break;

          default:
            this.resolveDefault(elem, key, val);
        }
      }
      /**
       * Resolves the placeholder. The method will first check if the value is a message.
       * @param {object} elem 
       * @param {string} key 
       * @param {*} val 
       */

    }, {
      key: "resolvePlaceholder",
      value: function resolvePlaceholder(elem, key, val) {
        var params = this.getMessageParams(val);
        var message = this.normalizeMessageString(val);
        elem.setAttribute(key, this.isMessage(val) ? Messages.message(message, params) : val);
      }
      /**
       * Resolves the attribute that did not match on cases. Usually nothing needs to be done except when handling html dom data-* attributes. In such case
       * this function will auto format the data-* attribute to a correct format.
       * @param {object} elem 
       * @param {string} key 
       * @param {*} val 
       */

    }, {
      key: "resolveDefault",
      value: function resolveDefault(elem, key, val) {
        if (key.indexOf("data") === 0 && key.length > "data".length) elem.setData(key.replace(/[A-Z]/, key.charAt(4).toLowerCase()).replace("data", ""), val);else elem.setAttribute(key, val);
      }
      /**
       * Function sets the content of the element according to the element.
       * @param {object} elem 
       * @param {string} key 
       * @param {string} val 
       */

    }, {
      key: "resolveContent",
      value: function resolveContent(elem, key, val) {
        if (elem.getTagName().toLowerCase() === "meta") elem.setAttribute(key, val);else elem.setContent(val);
      }
      /**
       * Function sets a translated message to the element. If the message contains message parameters then the paramters
       * are resolved first.
       * @param {object} elem 
       * @param {string} message 
       */

    }, {
      key: "resolveMessage",
      value: function resolveMessage(elem, message) {
        if (Util.isEmpty(message)) throw "message must not be empty";
        elem.message(this.normalizeMessageString(message), this.getMessageParams(message));
      }
      /**
       * Function will return message parameters in an array if found.
       * @param {string} message 
       * @returns Message params in the array or null if no params found.
       */

    }, {
      key: "getMessageParams",
      value: function getMessageParams(message) {
        var match = this.getMessageParameterString(message);
        match = match && match.join().replace(/({|}|:|;)/g, match.join()).split(match.join());
        return match && match.filter(Util.notEmpty);
      }
      /**
       * Get the parameter match array from the message string if found.
       * @param {string} message 
       * @returns The match array or null.
       */

    }, {
      key: "getMessageParameterString",
      value: function getMessageParameterString(message) {
        return message.match(/\:?(\{.*\}\;?)/g);
      }
      /**
       * Removes parameter string from the message string if present.
       * @param {string} message 
       * @returns The normalized message string.
       */

    }, {
      key: "normalizeMessageString",
      value: function normalizeMessageString(message) {
        var params = this.getMessageParameterString(message);
        return Util.notEmpty(params) ? message.replace(params.join(), '') : message;
      }
      /**
       * Checks is a given key val an event listener key val.
       * @param {string} key
       * @param {function} val
       * @returns True if the given key val is event listener key val.
       */

    }, {
      key: "isEventKeyVal",
      value: function isEventKeyVal(key, val) {
        return key.indexOf("on") === 0 && Util.isFunction(val);
      }
      /**
       * Checks that the given component exist with the given key or the key starts with component keyword and the component exist. 
       * @param {string} key
       * @returns True if the component exist or the key contains component keyword and exist, otherwise false.
       */

    }, {
      key: "isComponent",
      value: function isComponent(key) {
        return RMEComponentManager.hasComponent(this.getElementName(key));
      }
      /**
       * Method takes a template as parameter, starts resolving it and 
       * returns a created element tree.
       * @param {object} template
       * @returns Elem instance element tree.
       */

    }], [{
      key: "resolveTemplate",
      value: function resolveTemplate(template) {
        return Template.create().setTemplateAndResolve(template);
      }
      /**
       * Method takes a template and a parent element as parameter and it resolves the given template
       * into the given parent.
       * @param {*} template
       * @param {*} parent
       * @returns Elem instance element tree.
       */

    }, {
      key: "resolveToParent",
      value: function resolveToParent(template, parent) {
        return Template.create().setTemplateAndResolve(template, parent);
      }
      /**
       * Method takes a parameter and checks if the parameter is type fragment. 
       * If the parameter is type fragment the method will return true
       * otherwise false is returned.
       * @param {*} child 
       * @returns True if the parameter is type fragment otherwise false is returned.
       */

    }, {
      key: "isFragment",
      value: function isFragment(child) {
        return !Util.isEmpty(child) && (child === 'fragment' || !Util.isEmpty(child.fragment));
      }
      /**
       * Method will apply the properties given to the element. Old properties are overridden.
       * @param {object} elem 
       * @param {object} props 
       * @param {object} oldProps
       */

    }, {
      key: "updateElemProps",
      value: function updateElemProps(elem, props, oldProps) {
        var mashed = Template.mashElemProps(props, oldProps);
        var templater = Template.create();

        for (var p in mashed) {
          if (mashed.hasOwnProperty(p)) {
            if (templater.isEventKeyVal(p, mashed[p])) {
              elem[p].call(elem, mashed[p]); //element event attribute -> elem, event function
            } else if (p === 'class') {
              elem.updateClasses(mashed[p] || '');
            } else if (p === 'value') {
              elem.setAttribute(p, mashed[p]);
              elem.setValue(mashed[p]);
            } else {
              templater.resolveAttributes(elem, p, mashed[p]);
            }
          }
        }
      }
    }, {
      key: "mashElemProps",
      value: function mashElemProps(newProps, oldProps) {
        var props = {};

        for (var p in oldProps) {
          if (oldProps.hasOwnProperty(p)) {
            if (!newProps[p] && oldProps[p]) {
              props[p] = p === 'style' ? '' : undefined;
            }
          }
        }

        props = _objectSpread({}, props, {}, newProps);
        return props;
      }
    }, {
      key: "create",
      value: function create() {
        return new Template();
      }
      /**
       * Method checks if the given object is an unresolved JSON template.
       * @param {object} object 
       * @returns True if the given object is an unresolved JSON template, otherwise false.
       */

    }, {
      key: "isTemplate",
      value: function isTemplate(object) {
        var isTemplate = false;

        if (Util.isObject(object) && !Util.isArray(object) && !(object instanceof Elem)) {
          for (var p in object) {
            isTemplate = object.hasOwnProperty(p) && Template.isTagOrComponent(p);
            if (isTemplate) break;
          }
        }

        return isTemplate;
      }
      /**
       * Method takes a string and returns true if the given string is a html tag or a component, otherwise returns false.
       * @param {string} tag 
       * @returns True if the given tag is a HTML tag otherwise false.
       */

    }, {
      key: "isTagOrComponent",
      value: function isTagOrComponent(tag) {
        tag = tag.match(/component:?[a-zA-Z0-9]+|[a-zA-Z0-9]+/).join().replace("component:", "");
        if (RMEComponentManager.hasComponent(tag)) return true;
        return Template.isTag(tag);
      }
      /**
       * Method takes a string and returns true if the given string is a html tag, otherwise returns false.
       * @param {string} tag 
       * @returns True if the given tag is a HTML tag otherwise false.
       */

    }, {
      key: "isTag",
      value: function isTag(tag) {
        var tags = {
          a: ["a", "abbr", "acronym", "address", "applet", "area", "article", "aside", "audio"],
          b: ["button", "br", "b", "base", "basefont", "bdi", "bdo", "big", "blockquote", "body"],
          c: ["canvas", "caption", "center", "cite", "code", "col", "colgroup"],
          d: ["div", "dd", "dl", "dt", "data", "datalist", "del", "details", "dfn", "dialog"],
          e: ["em", "embed"],
          f: ["form", "fieldset", "figcaption", "figure", "font", "footer", "frame", "frameset"],
          h: ["h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hr", "html"],
          i: ["i", "input", "img", "iframe", "ins"],
          k: ["kbd"],
          l: ["label", "li", "legend", "link"],
          m: ["main", "meta", "map", "mark", "meter"],
          n: ["nav", "noframes", "noscript"],
          o: ["option", "object", "ol", "optgroup", "output"],
          p: ["p", "pre", "param", "picture", "progress"],
          q: ["q"],
          r: ["rp", "rt", "ruby"],
          s: ["span", "select", "s", "samp", "script", "section", "small", "source", "strike", "strong", "style", "sub", "summary", "sup", "svg"],
          t: ["table", "textarea", "td", "tr", "tt", "th", "thead", "tbody", "tfoot", "template", "time", "title", "track"],
          u: ["u", "ul"],
          v: ["var", "video"],
          w: ["wbr"]
        };
        var i = 0;
        var tagArray = tags[tag.charAt(0)];

        if (tagArray) {
          while (i < tagArray.length) {
            if (tagArray[i] === tag) return true;
            i++;
          }
        }

        return false;
      }
      /**
       * Function checks if the given key is an attribute and returns true if it is otherwise false.
       * @param {string} key 
       * @param {object} elem 
       * @returns True if the given key as an attribute otherwise false.
       */

    }, {
      key: "isAttr",
      value: function isAttr(key, elem) {
        /**
         * special cases below.
         */
        if (key === "span" && Template.isElem(elem.getTagName(), ["col", "colgroup"])) //special case, span might be an attribute also for these two elements.
          return true;else if (key === "label" && Template.isElem(elem.getTagName(), ["track", "option", "optgroup"])) return true;else if (key === "title" && (elem.parent() === null || elem.parent().getTagName().toLowerCase() !== "head")) return true;else if (key === "cite" && Template.isElem(elem.getTagName(), ["blockquote", "del", "ins", "q"])) return true;else if (key === "form" && Template.isElem(elem.getTagName(), ["button", "fieldset", "input", "label", "meter", "object", "output", "select", "textarea"])) return true;else if (key.indexOf("data") === 0 && (!RMEComponentManager.hasComponent(key) && !Template.isElem(elem.getTagName(), ["data"]) || Template.isElem(elem.getTagName(), ["object"]))) return true;
        var attrs = {
          a: ["alt", "async", "autocomplete", "autofocus", "autoplay", "accept", "accept-charset", "accpetCharset", "accesskey", "action"],
          b: ["blur"],
          c: ["class", "checked", "content", "contenteditable", "crossorigin", "crossOrigin", "click", "charset", "cols", "colspan", "controls", "coords"],
          d: ["disabled", "display", "draggable", "dropzone", "datetime", "default", "defer", "dir", "dirname", "download"],
          e: ["editable", "enctype"],
          f: ["for", "focus", "formaction"],
          h: ["href", "height", "hidden", "high", "hreflang", "headers", "http-equiv", "httpEquiv"],
          i: ["id", "ismap"],
          k: ["kind"],
          l: ["lang", "list", "loop", "low"],
          m: ["message", "max", "maxlength", "maxLength", "min", "minlength", "minLength", "multiple", "media", "method", "muted"],
          n: ["name", "novalidate"],
          o: ["open", "optimum"],
          p: ["placeholder", "pattern", "poster", "preload"],
          r: ["rel", "readonly", "required", "reversed", "rows", "rowspan"],
          s: ["src", "size", "selected", "step", "style", "styles", "shape", "sandbox", "scope", "sizes", "spellcheck", "srcdoc", "srclang", "srcset", "start"],
          t: ["text", "type", "target", "tabindex", "tabIndex", "translate"],
          u: ["usemap"],
          v: ["value", "visible"],
          w: ["width", "wrap"]
        };
        var i = 0;
        var keys = attrs[key.substring(0, 1)];

        if (keys) {
          while (i < keys.length) {
            if (keys[i] === key) return true;
            i++;
          }
        }

        return false;
      }
      /**
       * Internal use.
       * Function checks if a given element tag is in a given array of tag names.
       * @param {string} elemTag 
       * @param {array} array 
       * @returns True if the tag is in the given array otherwise false.
       */

    }, {
      key: "isElem",
      value: function isElem(elemTag, array) {
        var i = 0;

        while (i < array.length) {
          if (array[i] === elemTag.toLowerCase()) return true;
          i++;
        }

        return false;
      }
    }]);

    return Template;
  }();

  return {
    resolve: Template.resolveTemplate,
    isTemplate: Template.isTemplate,
    isTag: Template.isTag,
    updateElemProps: Template.updateElemProps,
    isFragment: Template.isFragment,
    resolveToParent: Template.resolveToParent
  };
}();
/**
 * Tree class reads the HTML Document Tree and returns elements found from there. The Tree class does not have 
 * HTML Document Tree editing functionality except setTitle(title) method that will set the title of the HTML Document.
 * 
 * Majority of the methods in the Tree class will return found elements wrapped in an Elem instance as it offers easier
 * operation functionalities.
 */


var Tree =
/*#__PURE__*/
function () {
  function Tree() {
    _classCallCheck(this, Tree);
  }

  _createClass(Tree, null, [{
    key: "get",

    /**
     * Uses CSS selector to find elements on the HTML Document Tree. 
     * Found elements will be wrapped in an Elem instance.
     * If found many then an array of Elem instances are returned otherwise a single Elem instance.
     * @param {string} selector 
     * @returns An array of Elem instances or a single Elem instance.
     */
    value: function get(selector) {
      return Elem.wrapElems(document.querySelectorAll(selector));
    }
    /**
     * Uses CSS selector to find the first match element on the HTML Document Tree.
     * Found element will be wrapped in an Elem instance.
     * @param {string} selector 
     * @returns An Elem instance.
     */

  }, {
    key: "getFirst",
    value: function getFirst(selector) {
      try {
        return Elem.wrap(document.querySelector(selector));
      } catch (e) {}
    }
    /**
     * Uses a HTML Document tag name to find matched elements on the HTML Document Tree e.g. div, span, p.
     * Found elements will be wrapped in an Elem instance.
     * If found many then an array of Elem instanes are returned otherwise a single Elem instance.
     * @param {string} tag 
     * @returns An array of Elem instances or a single Elem instance.
     */

  }, {
    key: "getByTag",
    value: function getByTag(tag) {
      return Elem.wrapElems(document.getElementsByTagName(tag));
    }
    /**
     * Uses a HTML Document element name attribute to find matching elements on the HTML Document Tree.
     * Found elements will be wrappedn in an Elem instance.
     * If found many then an array of Elem instances are returned otherwise a single Elem instance.
     * @param {string} name 
     * @returns An array of Elem instances or a single Elem instance.
     */

  }, {
    key: "getByName",
    value: function getByName(name) {
      return Elem.wrapElems(document.getElementsByName(name));
    }
    /**
     * Uses a HTML Document element id to find a matching element on the HTML Document Tree.
     * Found element will be wrapped in an Elem instance.
     * @param {string} id 
     * @returns Elem instance.
     */

  }, {
    key: "getById",
    value: function getById(id) {
      try {
        return Elem.wrap(document.getElementById(id));
      } catch (e) {}
    }
    /**
     * Uses a HTML Document element class string to find matching elements on the HTML Document Tree e.g. "main emphasize-green".
     * Method will try to find elements having any of the given classes. Found elements will be wrapped in an Elem instance.
     * If found many then an array of Elem instances are returned otherwise a single Elem instance.
     * @param {string} classname 
     * @returns An array of Elem instances or a single Elem instance.
     */

  }, {
    key: "getByClass",
    value: function getByClass(classname) {
      return Elem.wrapElems(document.getElementsByClassName(classname));
    }
    /**
     * @returns body wrapped in an Elem instance.
     */

  }, {
    key: "getBody",
    value: function getBody() {
      try {
        return Elem.wrap(document.body);
      } catch (e) {}
    }
    /**
     * @returns head wrapped in an Elem instance.
     */

  }, {
    key: "getHead",
    value: function getHead() {
      try {
        return Elem.wrap(document.head);
      } catch (e) {}
    }
    /**
     * @returns title of the html document page.
     */

  }, {
    key: "getTitle",
    value: function getTitle() {
      return document.title;
    }
    /**
     * Set an new title for html document page.
     * @param {string} title 
     */

  }, {
    key: "setTitle",
    value: function setTitle(title) {
      document.title = title;
    }
    /**
     * @returns active element wrapped in an Elem instance.
     */

  }, {
    key: "getActiveElement",
    value: function getActiveElement() {
      try {
        return Elem.wrap(document.activeElement);
      } catch (e) {}
    }
    /**
     * @returns array of anchors (<a> with name attribute) wrapped in Elem an instance.
     */

  }, {
    key: "getAnchors",
    value: function getAnchors() {
      return Elem.wrapElems(document.anchors);
    }
    /**
     * @returns <html> element.
     */

  }, {
    key: "getHtmlElement",
    value: function getHtmlElement() {
      return document.documentElement;
    }
    /**
     * @returns <!DOCTYPE> element.
     */

  }, {
    key: "getDoctype",
    value: function getDoctype() {
      return document.doctype;
    }
    /**
     * @returns an arry of embedded (<embed>) elements wrapped in Elem an instance.
     */

  }, {
    key: "getEmbeds",
    value: function getEmbeds() {
      return Elem.wrapElems(document.embeds);
    }
    /**
     * @returns an array of image elements (<img>) wrapped in an Elem instance.
     */

  }, {
    key: "getImages",
    value: function getImages() {
      return Elem.wrapElems(document.images);
    }
    /**
     * @returns an array of <a> and <area> elements that have href attribute wrapped in an Elem instance.
     */

  }, {
    key: "getLinks",
    value: function getLinks() {
      return Elem.wrapElems(document.links);
    }
    /**
     * @returns an array of scripts wrapped in an Elem instance.
     */

  }, {
    key: "getScripts",
    value: function getScripts() {
      return Elem.wrapElems(document.scripts);
    }
    /**
     * @returns an array of form elements wrapped in an Elem instance.
     */

  }, {
    key: "getForms",
    value: function getForms() {
      return Elem.wrapElems(document.forms);
    }
  }]);

  return Tree;
}();
/**
 * General Utility methods.
 */


var Util =
/*#__PURE__*/
function () {
  function Util() {
    _classCallCheck(this, Util);
  }

  _createClass(Util, null, [{
    key: "isEmpty",

    /**
     * Checks is a given value empty.
     * @param {*} value
     * @returns True if the give value is null, undefined, an empty string or an array and lenght of the array is 0.
     */
    value: function isEmpty(value) {
      return value === null || value === undefined || value === "" || Util.isArray(value) && value.length === 0;
    }
    /**
     * Checks is the given value not empty. This function is a negation to the Util.isEmpty function.
     * @param {*} value 
     * @returns True if the value is not empty otherwise false.
     */

  }, {
    key: "notEmpty",
    value: function notEmpty(value) {
      return !Util.isEmpty(value);
    }
    /**
     * Get the type of the given value.
     * @param {*} value
     * @returns The type of the given value.
     */

  }, {
    key: "getType",
    value: function getType(value) {
      return _typeof(value);
    }
    /**
     * Checks is a given value is a given type.
     * @param {*} value
     * @param {string} type
     * @returns True if the given value is the given type otherwise false.
     */

  }, {
    key: "isType",
    value: function isType(value, type) {
      return Util.getType(value) === type;
    }
    /**
     * Checks is a given parameter a function.
     * @param {*} func 
     * @returns True if the given parameter is fuction otherwise false.
     */

  }, {
    key: "isFunction",
    value: function isFunction(func) {
      return Util.isType(func, "function");
    }
    /**
     * Checks is a given parameter a boolean.
     * @param {*} boolean
     * @returns True if the given parameter is boolean otherwise false.
     */

  }, {
    key: "isBoolean",
    value: function isBoolean(_boolean8) {
      return Util.isType(_boolean8, "boolean");
    }
    /**
     * Checks is a given parameter a string.
     * @param {*} string
     * @returns True if the given parameter is string otherwise false.
     */

  }, {
    key: "isString",
    value: function isString(string) {
      return Util.isType(string, "string");
    }
    /**
     * Checks is a given parameter a number.
     * @param {*} number
     * @returns True if the given parameter is number otherwise false.
     */

  }, {
    key: "isNumber",
    value: function isNumber(number) {
      return Util.isType(number, "number");
    }
    /**
     * Checks is a given parameter a symbol.
     * @param {*} symbol
     * @returns True if the given parameter is symbol otherwise false.
     */

  }, {
    key: "isSymbol",
    value: function isSymbol(symbol) {
      return Util.isType(symbol, "symbol");
    }
    /**
     * Checks is a given parameter a object.
     * @param {*} object
     * @returns True if the given parameter is object otherwise false.
     */

  }, {
    key: "isObject",
    value: function isObject(object) {
      return Util.isType(object, "object");
    }
    /**
     * Checks is a given parameter an array.
     * @param {*} array
     * @returns True if the given parameter is array otherwise false.
     */

  }, {
    key: "isArray",
    value: function isArray(array) {
      return Array.isArray(array);
    }
    /**
     * Sets a timeout where the given callback function will be called once after the given milliseconds of time. Params are passed to callback function.
     * @param {function} callback
     * @param {number} milliseconds
     * @param {*} params
     * @returns The timeout object.
     */

  }, {
    key: "setTimeout",
    value: function setTimeout(callback, milliseconds) {
      if (!Util.isFunction(callback)) {
        throw "callback not fuction";
      }

      for (var _len7 = arguments.length, params = new Array(_len7 > 2 ? _len7 - 2 : 0), _key7 = 2; _key7 < _len7; _key7++) {
        params[_key7 - 2] = arguments[_key7];
      }

      return window.setTimeout(callback, milliseconds, params);
    }
    /**
     * Removes a timeout that was created by setTimeout method.
     * @param {object} timeoutObject
     */

  }, {
    key: "clearTimeout",
    value: function clearTimeout(timeoutObject) {
      window.clearTimeout(timeoutObject);
    }
    /**
     * Sets an interval where the given callback function will be called in intervals after milliseconds of time has passed. Params are passed to callback function.
     * @param {function} callback
     * @param {number} milliseconds
     * @param {*} params
     * @returns The interval object.
     */

  }, {
    key: "setInterval",
    value: function setInterval(callback, milliseconds) {
      if (!Util.isFunction(callback)) {
        throw "callback not fuction";
      }

      for (var _len8 = arguments.length, params = new Array(_len8 > 2 ? _len8 - 2 : 0), _key8 = 2; _key8 < _len8; _key8++) {
        params[_key8 - 2] = arguments[_key8];
      }

      return window.setInterval(callback, milliseconds, params);
    }
    /**
     * Removes an interval that was created by setInterval method.
     */

  }, {
    key: "clearInterval",
    value: function clearInterval(intervalObject) {
      window.clearInterval(intervalObject);
    }
    /**
     * Encodes a string to Base64.
     * @param {string} string
     * @returns The base64 encoded string.
     */

  }, {
    key: "encodeBase64String",
    value: function encodeBase64String(string) {
      if (!Util.isString(string)) {
        throw "the given parameter is not a string: " + string;
      }

      return window.btoa(string);
    }
    /**
     * Decodes a base 64 encoded string.
     * @param {string} string
     * @returns The base64 decoded string.
     */

  }, {
    key: "decodeBase64String",
    value: function decodeBase64String(string) {
      if (!Util.isString(string)) {
        throw "the given parameter is not a string: " + string;
      }

      return window.atob(string);
    }
  }]);

  return Util;
}();
