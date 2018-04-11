"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RME = function () {
    /**
     * RME stands for Rest Made Easy. This is a small easy to use library that enables you to create RESTfull webpages with ease and speed.
     * This library is free to use under the MIT License.
     */
    var RME = function () {
        function RME() {
            _classCallCheck(this, RME);

            this.instance = this;
            this.completeRun = function () {};
            this.runner = function () {};
            this.onrmestoragechange = function (state) {};
            this.components = {};
            this.rmeState = {};
        }

        _createClass(RME, [{
            key: "complete",
            value: function complete() {
                this.completeRun();
            }
        }, {
            key: "start",
            value: function start() {
                this.runner();
            }
        }, {
            key: "setComplete",
            value: function setComplete(runnable) {
                this.completeRun = runnable;
            }
        }, {
            key: "setRunner",
            value: function setRunner(runnable) {
                this.runner = runnable;
                return this.instance;
            }
        }, {
            key: "addComponent",
            value: function addComponent(runnable) {
                var comp = runnable();
                for (var p in comp) {
                    if (comp.hasOwnProperty(p)) {
                        this.components[p] = comp[p];
                    }
                }
            }
        }, {
            key: "getComponent",
            value: function getComponent(name, props) {
                return this.components[name].call(props);
            }
        }, {
            key: "setRmeState",
            value: function setRmeState(key, value) {
                this.rmeState[key] = value;
                this.onrmestoragechange(this.rmeState);
            }
        }, {
            key: "getRmeState",
            value: function getRmeState(key) {
                return this.rmeState[key];
            }

            /** 
             * Runs a runnable script immedeately.
             * Only one run method per RME application.
             */

        }], [{
            key: "run",
            value: function run(runnable) {
                if (runnable && Util.isFunction(runnable)) RME.getInstance().setRunner(runnable).start();
            }

            /**
             * Waits until body has been loaded and then runs a runnable script.
             * Only one ready method per RME application.
             */

        }, {
            key: "ready",
            value: function ready(runnable) {
                if (runnable && Util.isFunction(runnable)) RME.getInstance().setComplete(runnable);
            }

            /**
             * Creates or retrieves a RME component. 
             * If the first parameter is a function then this method will try to create a RME component and store it
             * in the RME instance.
             * If the first parameter is a string then this method will try to retrieve a RME component from the 
             * RME instance.
             * @param {*} runnable Type function or String.
             * @param {Object} props 
             */

        }, {
            key: "component",
            value: function component(runnable, props) {
                if (runnable && Util.isFunction(runnable)) RME.getInstance().addComponent(runnable);else if (runnable && Util.isString(runnable)) return RME.getInstance().getComponent(runnable, props);
            }

            /**
             * Saves data to or get data from the RME instance storage.
             * If key and value parameters are not empty then this method will try to save the give value by the given key
             * into to the RME instance storage.
             * If key is not empty and value is empty then this method will try to get data from the RME instance storage
             * by the given key.
             * @param {String} key 
             * @param {Object} value 
             */

        }, {
            key: "storage",
            value: function storage(key, value) {
                if (!Util.isEmpty(key) && !Util.isEmpty(value)) RME.getInstance().setRmeState(key, value);else if (!Util.isEmpty(key) && Util.isEmpty(value)) return RME.getInstance().getRmeState(key);
            }

            /**
             * Adds a script file on runtime into the head of the current html document where the method is called on.
             * Source is required other properties can be omitted.
             * @param {String} source URL or file name. *Requied
             * @param {String} id 
             * @param {String} type 
             * @param {String} text 
             * @param {boolean} defer 
             * @param {*} crossOrigin 
             * @param {String} charset 
             * @param {boolean} async 
             */

        }, {
            key: "script",
            value: function script(source, id, type, text, defer, crossOrigin, charset, async) {
                if (!Util.isEmpty(source)) {
                    var sc = new Elem("script").setSource(source);
                    if (!Util.isEmpty(id)) sc.setId(id);
                    if (!Util.isEmpty(type)) sc.setType(type);
                    if (!Util.isEmpty(text)) sc.setText(text);
                    if (!Util.isEmpty(defer)) sc.setAttribute("defer", defer);
                    if (!Util.isEmpty(crossOrigin)) sc.setAttribute("crossOrigin", crossOrigin);
                    if (!Util.isEmpty(charset)) sc.setAttribute("charset", charset);
                    if (!Util.isEmpty(async)) sc.setAttribute("async", async);
                    RME.config().addScript(sc);
                }
            }

            /**
             * This is called when ever a new data is saved into the RME instance storage.
             * Callback function has one paramater newState that is the latest snapshot of the 
             * current instance storage.
             * @param {function} listener 
             */

        }, {
            key: "onrmestoragechange",
            value: function onrmestoragechange(listener) {
                if (listener && Util.isFunction(listener)) RME.getInstance().onrmestoragechange = listener;
            }
        }, {
            key: "config",
            value: function config() {
                return {
                    addScript: function addScript(elem) {
                        var scripts = Tree.getScripts();
                        var lastScript = Elem.wrap(scripts[scripts.length - 1]);
                        lastScript.after(elem);
                    },
                    removeScript: function removeScript(sourceOrId) {
                        if (sourceOrId.indexOf("#") === 0) {
                            Tree.getHead().remove(Tree.get(sourceOrId));
                        } else {
                            var scripts = Tree.getScripts();
                            for (var s in scripts) {
                                if (scripts.hasOwnProperty(s)) {
                                    var src = scripts[s].src !== null ? scripts[s].src : "";
                                    if (src.search(sourceOrId) > -1 && src.search(sourceOrId) === src.length - sourceOrId.length) {
                                        Tree.getHead().remove(Elem.wrap(scripts[s]));
                                        break;
                                    }
                                }
                            }
                        }
                    }
                };
            }
        }, {
            key: "getInstance",
            value: function getInstance() {
                if (!this.instance) this.instance = new RME();
                return this.instance;
            }
        }]);

        return RME;
    }();

    document.onreadystatechange = function (event) {
        if (document.readyState === "complete") RME.getInstance().complete();
    };

    return {
        run: RME.run,
        ready: RME.ready,
        component: RME.component,
        storage: RME.storage,
        script: RME.script,
        onrmestoragechange: RME.onrmestoragechange
    };
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
    var Http = function () {
        function Http(config) {
            _classCallCheck(this, Http);

            config.contentType = config.contentType === undefined ? Http.JSON : config.contentType;
            if (config.useFetch) {
                this.self = new FetchRequest();
            } else if (window.Promise) {
                this.self = new PromiseAjax(config).instance();
            } else {
                this.self = new Ajax(config);
            }
        }

        _createClass(Http, [{
            key: "instance",
            value: function instance() {
                return this.self;
            }
        }], [{
            key: "get",
            value: function get(url, requestContentType) {
                return new Http({ method: "GET", url: url, data: undefined, contentType: requestContentType }).instance();
            }
        }, {
            key: "post",
            value: function post(url, data, requestContentType) {
                return new Http({ method: "POST", url: url, data: data, contentType: requestContentType }).instance();
            }
        }, {
            key: "put",
            value: function put(url, data, requestContentType) {
                return new Http({ method: "PUT", url: url, data: data, contentType: requestContentType }).instance();
            }
        }, {
            key: "delete",
            value: function _delete(url, requestContentType) {
                return new Http({ method: "DELETE", url: url, data: undefined, contentType: requestContentType }).instance();
            }
        }, {
            key: "do",
            value: function _do(config) {
                return new Http(config).instance();
            }
        }, {
            key: "fetch",
            value: function fetch() {
                return new Http({ useFetch: true }).instance();
            }
        }]);

        return Http;
    }();
    /**
     * Content-Type JSON
     */


    Http.JSON = "application/json;charset=UTF-8";

    /**
     * Old Fashion XMLHttpRequest made into the Promise pattern.
     */

    var Ajax = function () {
        function Ajax(config) {
            _classCallCheck(this, Ajax);

            this.progressHandler = config.onProgress ? config.onProgress : function (event) {};
            this.data = isContentTypeJson(config.contentType) ? JSON.stringify(config.data) : config.data;
            this.xhr = new XMLHttpRequest();
            this.xhr.open(config.method, config.url);
            if (config.contentType) this.xhr.setRequestHeader("Content-Type", config.contentType);
            if (config.headers) setXhrHeaders(this.xhr, config.headers);
        }

        _createClass(Ajax, [{
            key: "then",
            value: function then(successHandler, errorHandler) {
                var _this = this;

                this.xhr.onload = function () {
                    _this.xhr.responseJSON = tryParseJSON(_this.xhr.responseText);
                    isResponseOK(_this.xhr.status) ? successHandler(_this.xhr) : errorHandler(_this.xhr);
                };
                this.xhr.onprogress = function (event) {
                    if (_this.progressHandler) _this.progressHandler(event);
                };
                this.xhr.onerror = function () {
                    _this.xhr.responseJSON = tryParseJSON(_this.xhr.responseText);
                    if (errorHandler) errorHandler(_this.xhr);
                };
                this.data ? this.xhr.send(this.data) : this.xhr.send();
                return this;
            }
        }, {
            key: "catch",
            value: function _catch(errorHandler) {
                var _this2 = this;

                this.xhr.onerror = function () {
                    _this2.xhr.responseJSON = tryParseJSON(_this2.xhr.responseText);
                    if (errorHandler) errorHandler(_this2.xhr);
                };
            }
        }]);

        return Ajax;
    }();

    /**
     * XMLHttpRequest using the Promise.
     */


    var PromiseAjax = function () {
        function PromiseAjax(config) {
            var _this3 = this;

            _classCallCheck(this, PromiseAjax);

            this.data = isContentTypeJson(config.contentType) ? JSON.stringify(config.data) : config.data;
            this.promise = new Promise(function (resolve, reject) {
                var request = new XMLHttpRequest();
                request.open(config.method, config.url);
                if (config.contentType) request.setRequestHeader("Content-Type", config.contentType);
                if (config.headers) setXhrHeaders(request, config.headers);
                request.onload = function () {
                    request.responseJSON = tryParseJSON(request.responseText);
                    isResponseOK(request.status) ? resolve(request) : reject(request);
                };
                request.onprogress = function (event) {
                    if (config.onProgress) config.onProgress(event);
                };
                request.onerror = function () {
                    request.responseJSON = tryParseJSON(request.responseText);
                    reject(request);
                };
                _this3.data ? request.send(_this3.data) : request.send();
            });
        }

        _createClass(PromiseAjax, [{
            key: "instance",
            value: function instance() {
                return this.promise;
            }
        }]);

        return PromiseAjax;
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


    var FetchRequest = function () {
        function FetchRequest() {
            _classCallCheck(this, FetchRequest);
        }

        _createClass(FetchRequest, [{
            key: "get",
            value: function get(url, init) {
                if (!init) init = {};
                init.method = "GET";
                return this.do({ url: url, init: init, contentType: Http.JSON });
            }
        }, {
            key: "post",
            value: function post(url, body, init) {
                if (!init) init = {};
                init.method = "POST";
                init.body = body;
                return this.do({ url: url, init: init, contentType: Http.JSON });
            }
        }, {
            key: "put",
            value: function put(url, body, init) {
                if (!init) init = {};
                init.method = "PUT";
                init.body = body;
                return this.do({ url: url, init: init, contentType: Http.JSON });
            }
        }, {
            key: "delete",
            value: function _delete(url, init) {
                if (!init) init = {};
                init.method = "DELETE";
                return this.do({ url: url, init: init, contentType: Http.JSON });
            }
        }, {
            key: "do",
            value: function _do(config) {
                if (!config.init) config.init = {};
                if (config.contentType) {
                    if (!config.init.headers) config.init.headers = new Headers({});

                    config.init.headers.set("Content-Type", config.contentType);
                }
                if (config.method) {
                    config.init.method = config.method;
                }
                return fetch(config.url, config.init);
            }
        }]);

        return FetchRequest;
    }();

    function setXhrHeaders(xhr, headers) {
        for (var header in headers) {
            if (headers.hasOwnProperty(header)) xhr.setRequestHeader(header, headers[header]);
        }
    }

    function isResponseOK(status) {
        var okResponses = [200, 201, 202, 203, 204, 205, 206, 207, 208, 226];
        for (var i in okResponses) {
            if (okResponses.hasOwnProperty(i)) {
                var code = okResponses[i];
                if (code === status) return true;
            }
        }
        return false;
    }

    function isContentTypeJson(contentType) {
        return contentType === Http.JSON;
    }

    function tryParseJSON(text) {
        try {
            return JSON.parse(text);
        } catch (e) {}
    }

    return Http;
}();

var Elem = function () {
    function Elem(type) {
        _classCallCheck(this, Elem);

        if (Util.isString(type)) {
            this.html = document.createElement(type);
        } else if (type.nodeType !== undefined && type.ownerDocument !== undefined && type.nodeType >= 1 && type.ownerDocument instanceof HTMLDocument) {
            this.html = type;
        } else {
            throw "type must be a string or a html dom object";
        }
    }

    /**
     * Set text of this element.
     * Returns Elem instance.
     * @param {String} text 
     */


    _createClass(Elem, [{
        key: "setText",
        value: function setText(text) {
            this.html.appendChild(document.createTextNode(text));
            return this;
        }

        /**
         * Get text/content of this element.
         */

    }, {
        key: "getContent",
        value: function getContent() {
            return this.html.innerHTML;
        }

        /**
         * Set content that can be text or html.
         * Returns Elem instance.
         * @param {String} html 
         */

    }, {
        key: "setContent",
        value: function setContent(html) {
            this.html.innerHTML = html;
            return this;
        }

        /**
         * Set value of this element.
         * Returns Elem instance.
         * @param {String} value 
         */

    }, {
        key: "setValue",
        value: function setValue(value) {
            this.html.value = value;
            return this;
        }

        /**
         * Get value of this element.
         */

    }, {
        key: "getValue",
        value: function getValue() {
            return this.html.value;
        }

        /**
         * Set id of this element.
         * Returns Elem instance.
         * @param {String} id 
         */

    }, {
        key: "setId",
        value: function setId(id) {
            this.html.id = id;
            return this;
        }

        /**
         * Get id of this element.
         */

    }, {
        key: "getId",
        value: function getId() {
            return this.html.id;
        }

        /**
         * Append an element inside this element.
         * Returns Elem instance.
         * @param {Elem} elem 
         */

    }, {
        key: "append",
        value: function append(elem) {
            this.html.appendChild(elem.dom());
            return this;
        }

        /**
         * Remove an element from this element.
         * Returns Elem isntance.
         * @param {Elem} elem 
         */

    }, {
        key: "remove",
        value: function remove(elem) {
            this.html.removeChild(elem.dom());
            return this;
        }

        /**
         * Replace this element with a new element.
         * Returns Elem instance.
         * @param {Elem} newElem 
         */

    }, {
        key: "replace",
        value: function replace(newElem) {
            this.html.parentElement.replaceChild(newElem.dom(), this.html);
            return this;
        }

        /**
         * Insert a new element before this element.
         * Returns Elem instance.
         * @param {Elem} newElem 
         */

    }, {
        key: "before",
        value: function before(newElem) {
            this.html.parentElement.insertBefore(newElem.dom(), this.html);
            return this;
        }

        /**
         * Insert a new elem after this element.
         * Returns Elem isntance.
         * @param {Elem} newElem 
         */

    }, {
        key: "after",
        value: function after(newElem) {
            if (this.html.nextElementSibling !== null) this.html.parentElement.insertBefore(newElem.dom(), this.html.nextElementSibling);else this.html.parentElement.appendChild(newElem.dom());
            return this;
        }

        /**
         * Renders an Array of Elements or a comma separated list of element arrays or a comma separated list of elements.
         * If given an empty array or not a parameter at all then this element will be rendered as empty.
         * Returns Elem instance.
         * @param {Elem} elems 
         */

    }, {
        key: "render",
        value: function render() {
            var newState = [];

            for (var _len = arguments.length, elems = Array(_len), _key = 0; _key < _len; _key++) {
                elems[_key] = arguments[_key];
            }

            for (var e in elems) {
                if (elems.hasOwnProperty(e)) {
                    if (Util.isArray(elems[e])) newState = newState.concat(elems[e]);else newState.push(elems[e]);
                }
            }
            while (this.html.firstChild) {
                this.html.removeChild(this.html.firstChild);
            }
            for (var e in newState) {
                if (newState.hasOwnProperty(e) && !Util.isEmpty(newState[e])) this.append(newState[e]);
            }
            return this;
        }

        /**
         * Get an array of children of this element.
         */

    }, {
        key: "getChildren",
        value: function getChildren() {
            return this.html.children;
        }

        /**
         * Set a title of this element.
         * Returns Elem instance.
         * @param {String} text 
         */

    }, {
        key: "setTitle",
        value: function setTitle(text) {
            this.html.title = text;
            return this;
        }

        /**
         * Get a title of this element.
         */

    }, {
        key: "getTitle",
        value: function getTitle() {
            return this.html.title;
        }

        /**
         * Set a tab index of this element.
         * Returns Elem instance.
         * @param {Number} idx 
         */

    }, {
        key: "setTabIndex",
        value: function setTabIndex(idx) {
            this.html.tabIndex = idx;
            return this;
        }

        /**
         * Get a tab index of this element.
         */

    }, {
        key: "getTabIndex",
        value: function getTabIndex() {
            return this.html.tabIndex;
        }

        /**
         * Get a tag name of this element.
         */

    }, {
        key: "getTagName",
        value: function getTagName() {
            return this.html.tagName;
        }

        /**
         * Set an attribute of this element.
         * Returns Elem isntance.
         * @param {String} attr Attribute
         * @param {String} value Value
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
         * Returns an attribute object with name and value properties.
         * @param {String} attr 
         */

    }, {
        key: "getAttribute",
        value: function getAttribute(attr) {
            return this.html.getAttributeNode(attr);
        }

        /**
         * Removes an attribute of this element.
         * Returns the removed attribute object with value and name parameters.
         * @param {String} attr 
         */

    }, {
        key: "removeAttribute",
        value: function removeAttribute(attr) {
            return this.html.removeAttributeNode(this.getAttribute(attr));
        }

        /**
         * Set a name of this element.
         * Returns Elem instance.
         * @param {String} name 
         */

    }, {
        key: "setName",
        value: function setName(name) {
            this.setAttribute("name", name);
            return this;
        }

        /**
         * Get a name of this element.
         * Returns name string.
         */

    }, {
        key: "getName",
        value: function getName() {
            return this.getAttribute("name").value;
        }

        /**
         * Set a type of this element.
         * Returns Elem instance.
         * @param {String} type 
         */

    }, {
        key: "setType",
        value: function setType(type) {
            this.setAttribute("type", type);
            return this;
        }

        /**
         * Get a type of this element.
         * Returns type string.
         */

    }, {
        key: "getType",
        value: function getType() {
            return this.getAttribute("type").value;
        }

        /**
         * Set a source of this element.
         * Returns Elem instance.
         * @param {String} source 
         */

    }, {
        key: "setSource",
        value: function setSource(source) {
            this.setAttribute("src", source);
            return this;
        }

        /**
         * Get a source of this element.
         * Returns source string.
         */

    }, {
        key: "getSource",
        value: function getSource() {
            return this.getAttribute("src").value;
        }

        /**
         * Set a href of this element.
         * Returns Elem instance.
         * @param {String} href 
         */

    }, {
        key: "setHref",
        value: function setHref(href) {
            this.setAttribute("href", href);
            return this;
        }

        /**
         * Get a href of this element.
         */

    }, {
        key: "getHref",
        value: function getHref() {
            return this.getAttribute("href").value;
        }

        /**
         * Set a placeholder of this element.
         * Returns Elem instance.
         * @param {String} placeholder 
         */

    }, {
        key: "setPlaceholder",
        value: function setPlaceholder(placeholder) {
            this.setAttribute("placeholder", placeholder);
            return this;
        }

        /**
         * Get a placeholder of this element.
         */

    }, {
        key: "getPlaceholder",
        value: function getPlaceholder() {
            return this.getAttribute("placeholder").value;
        }

        /**
         * Sets size of this element.
         * Return Elem instance.
         * @param {*} size 
         */

    }, {
        key: "setSize",
        value: function setSize(size) {
            this.setAttribute("size", size);
            return this;
        }

        /**
         * Get size of this element.
         */

    }, {
        key: "getSize",
        value: function getSize() {
            return this.getAttribute("size").value;
        }

        /**
         * Set this element content editable.
         * Return Elem instance.
         * @param {boolean} boolean 
         */

    }, {
        key: "setEditable",
        value: function setEditable(boolean) {
            this.setAttribute("contenteditable", boolean);
            return this;
        }

        /**
         * Get this element content editable.
         */

    }, {
        key: "getEditable",
        value: function getEditable() {
            return this.getAttribute("contenteditable").value;
        }

        /**
         * Set this element disabled.
         * Return Elem instance.
         * @param {boolean} boolean 
         */

    }, {
        key: "setDisabled",
        value: function setDisabled(boolean) {
            this.html.disabled = boolean;
            return this;
        }

        /**
         * Get this element disabled state.
         */

    }, {
        key: "getDisabled",
        value: function getDisabled() {
            return this.html.disabled;
        }

        /**
         * Set this element checked.
         * Return Elem instance.
         * @param {boolean} boolean 
         */

    }, {
        key: "setChecked",
        value: function setChecked(boolean) {
            this.html.checked = boolean;
            return this;
        }

        /**
         * Get this element checked state.
         */

    }, {
        key: "getChecked",
        value: function getChecked() {
            return this.html.checked;
        }

        /**
         * Add classes to this element.
         * Returns Elem instance.
         * @param {String} classes 
         */

    }, {
        key: "addClasses",
        value: function addClasses(classes) {
            var toAdd = classes.trim().split(" ");
            var origClass = this.getClasses();
            for (var i = 0; i < toAdd.length; i++) {
                var clazz = toAdd[i];
                if (origClass.search(clazz) === -1) origClass += " " + clazz;
            }
            this.html.className = origClass.trim();
            return this;
        }

        /**
         * Remove classes from this element.
         * Returns Elem instance.
         * @param {String} classes 
         */

    }, {
        key: "removeClasses",
        value: function removeClasses(classes) {
            var toRm = classes.trim().split(" ");
            var origClass = this.getClasses();
            for (var i = 0; i < toRm.length; i++) {
                var clazz = toRm[i];
                if (origClass.search(clazz) > -1) origClass = origClass.replace(clazz, "").trim();
            }
            this.html.className = origClass.trim();
            return this;
        }

        /**
         * Toggle classes of this element.
         * Returns Elem instance.
         */

    }, {
        key: "toggleClasses",
        value: function toggleClasses(classes) {
            var cArr = classes.split(" ");
            var origClass = this.getClasses();
            var toAdd = "";
            var toRm = "";
            for (var i = 0; i < cArr.length; i++) {
                if (origClass.search(cArr[i]) > -1) toRm += " " + cArr[i];else toAdd += " " + cArr[i];
            }
            this.addClasses(toAdd.trim());
            this.removeClasses(toRm.trim());
            return this;
        }

        /**
         * Get classes string of this element.
         */

    }, {
        key: "getClasses",
        value: function getClasses() {
            return this.html.className;
        }

        /**
         * Set styles of this element in the map e.g. {height: "10px",...}
         * Returns Elem instance.
         * @param {Object} styleMap 
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
         * @param {String} styleName Style name in camelCase e.g. maxHeight
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
         */

    }, {
        key: "setVisible",
        value: function setVisible(boolean) {
            this.html.style.visibility = boolean ? "visibile" : "hidden";
            return this;
        }

        /**
         * Set display state of this element initial or none.
         * true = initial, false = none
         * @param {boolean} boolean 
         */

    }, {
        key: "display",
        value: function display(boolean) {
            this.html.style.display = boolean ? "initial" : "none";
            return this;
        }

        /**
         * Set this element draggable.
         * @param {boolean} boolean 
         */

    }, {
        key: "setDraggable",
        value: function setDraggable(boolean) {
            this.setAttribute("draggable", boolean);
            return this;
        }

        /**
         * Do click on this element.
         * Returns Elem instance.
         */

    }, {
        key: "click",
        value: function click() {
            this.html.click();
            return this;
        }

        /**
         * Do focus on this element.
         * Returns Elem instance.
         */

    }, {
        key: "focus",
        value: function focus() {
            this.html.focus();
            return this;
        }

        /**
         * Do blur on this element.
         * Returns Elem instance.
         */

    }, {
        key: "blur",
        value: function blur() {
            this.html.blur();
            return this;
        }

        /**
         * Returns a clone of this element. If deep is true children will be cloned also.
         * @param {boolean} deep 
         */

    }, {
        key: "clone",
        value: function clone(deep) {
            return Elem.wrap(this.html.cloneNode(deep));
        }

        /**
         * Returns HTML Document Element that this element contains.
         */

    }, {
        key: "dom",
        value: function dom() {
            return this.html;
        }

        /**
         * Returns height of this element.
         */

    }, {
        key: "height",
        value: function height() {
            return this.html.clientHeight;
        }

        /**
         * Returns width of this element.
         */

    }, {
        key: "width",
        value: function width() {
            return this.html.clientWidth;
        }

        /**
         * Returns a parent of this element wrapped in Elem instance or null if no parent.
         */

    }, {
        key: "parent",
        value: function parent() {
            return this.html.parentElement !== null ? Elem.wrap(this.html.parentElement) : null;
        }

        /**
         * Returns a next element of this element wrapped in Elem instance or null if no next.
         */

    }, {
        key: "next",
        value: function next() {
            return this.html.nextElementSibling !== null ? Elem.wrap(this.html.nextElementSibling) : null;
        }

        /**
         * Returns a previous element of this element wrapped in Elem instance or null if no previous.
         */

    }, {
        key: "previous",
        value: function previous() {
            return this.html.previousElementSibling !== null ? Elem.wrap(this.html.previousElementSibling) : null;
        }

        /**
         * Returns a first child element of this element wrapped in Elem instance or null if no children.
         */

    }, {
        key: "getFirstChild",
        value: function getFirstChild() {
            return this.html.firstElementChild !== null ? Elem.wrap(this.html.firstElementChild) : null;
        }

        /**
         * Returns a last child element of this element wrapped in Elem instance or null if no children.
         */

    }, {
        key: "getLastChild",
        value: function getLastChild() {
            return this.html.lastElementChild !== null ? Elem.wrap(this.html.lastElementChild) : null;
        }

        //EVENTS BELOW

        //Animation events

    }, {
        key: "onAnimationStart",
        value: function onAnimationStart(handler) {
            this.html.onanimationstart = handler;
            // this.html.addEventListener("webkitAnimationStart", handler);
            // this.html.addEventListener("mozAnimationStart", handler);
            return this;
        }
    }, {
        key: "onAnimationIteration",
        value: function onAnimationIteration(handler) {
            this.html.onanimationiteration = handler;
            // this.html.addEventListener("webkitAnimationIteration", handler);
            // this.html.addEventListener("mozAnimationIteration", handler);
            return this;
        }
    }, {
        key: "onAnimationEnd",
        value: function onAnimationEnd(handler) {
            this.html.onanimationend = handler;
            // this.html.addEventListener("webkitAnimationEnd", handler);
            // this.html.addEventListener("mozAnimationEnd", handler);
            return this;
        }
    }, {
        key: "onTransitionEnd",
        value: function onTransitionEnd(handler) {
            this.html.ontransitionend = handler;
            // this.html.addEventListener("webkitTransitionEnd", handler);
            // this.html.addEventListener("mozTransitionEnd", handler);
            // this.html.addEventListener("oTransitionEnd", handler);
            return this;
        }

        //Drag events

    }, {
        key: "onDrag",
        value: function onDrag(handler) {
            this.html.ondrag = handler;
            return this;
        }
    }, {
        key: "onDragEnd",
        value: function onDragEnd(handler) {
            this.html.ondragend = handler;
            return this;
        }
    }, {
        key: "onDragEnter",
        value: function onDragEnter(handler) {
            this.html.ondragenter = handler;
            return this;
        }
    }, {
        key: "onDragOver",
        value: function onDragOver(handler) {
            this.html.ondragover = handler;
            return this;
        }
    }, {
        key: "onDragStart",
        value: function onDragStart(handler) {
            this.html.ondragstart = handler;
            return this;
        }
    }, {
        key: "onDrop",
        value: function onDrop(handler) {
            this.html.ondrop = handler;
            return this;
        }

        //Mouse events

    }, {
        key: "onClick",
        value: function onClick(handler) {
            this.html.onclick = handler;
            return this;
        }
    }, {
        key: "onDoubleClick",
        value: function onDoubleClick(handler) {
            this.html.ondblclick = handler;
            return this;
        }
    }, {
        key: "onContextMenu",
        value: function onContextMenu(handler) {
            this.html.oncontextmenu = handler;
            return this;
        }
    }, {
        key: "onMouseDown",
        value: function onMouseDown(handler) {
            this.html.onmousedown = handler;
            return this;
        }
    }, {
        key: "onMouseEnter",
        value: function onMouseEnter(handler) {
            this.html.onmouseenter = handler;
            return this;
        }
    }, {
        key: "onMmouseLeave",
        value: function onMmouseLeave(handler) {
            this.html.onmouseleave = handler;
            return this;
        }
    }, {
        key: "onMouseMove",
        value: function onMouseMove(handler) {
            this.html.onmousemove = handler;
            return this;
        }
    }, {
        key: "onMouseOver",
        value: function onMouseOver(handler) {
            this.html.onmouseover = handler;
            return this;
        }
    }, {
        key: "onMouseOut",
        value: function onMouseOut(handler) {
            this.html.onmouseout = handler;
            return this;
        }
    }, {
        key: "onMouseUp",
        value: function onMouseUp(handler) {
            this.html.onmouseup = handler;
            return this;
        }
    }, {
        key: "onWheel",
        value: function onWheel(handler) {
            this.html.onwheel = handler;
            return this;
        }

        //UI events

    }, {
        key: "onScroll",
        value: function onScroll(handler) {
            this.html.onscroll = handler;
            return this;
        }
    }, {
        key: "onResize",
        value: function onResize(handler) {
            this.html.onresize = handler;
            return this;
        }
    }, {
        key: "onAbort",
        value: function onAbort(handler) {
            this.html.onabort = handler;
            return this;
        }
    }, {
        key: "onError",
        value: function onError(handler) {
            this.html.onerror = handler;
            return this;
        }
    }, {
        key: "onLoad",
        value: function onLoad(handler) {
            this.html.onload = handler;
            return this;
        }
    }, {
        key: "onUnload",
        value: function onUnload(handler) {
            this.html.onunload = handler;
            return this;
        }
    }, {
        key: "onBeforeUnload",
        value: function onBeforeUnload(handler) {
            this.html.onbeforeunload = handler;
            return this;
        }

        //Key events

    }, {
        key: "onKeyUp",
        value: function onKeyUp(handler) {
            this.html.onkeyup = handler;
            return this;
        }
    }, {
        key: "onKeyDown",
        value: function onKeyDown(handler) {
            this.html.onkeydown = handler;
            return this;
        }
    }, {
        key: "onKeyPress",
        value: function onKeyPress(handler) {
            this.html.onkeypress = handler;
            return this;
        }
    }, {
        key: "onInput",
        value: function onInput(handler) {
            this.html.oninput = handler;
            return this;
        }

        //Events (changing state)

    }, {
        key: "onChange",
        value: function onChange(handler) {
            this.html.onchange = handler;
            return this;
        }
    }, {
        key: "onSubmit",
        value: function onSubmit(handler) {
            this.html.onsubmit = handler;
            return this;
        }
    }, {
        key: "onSelect",
        value: function onSelect(handler) {
            this.html.onselect = handler;
            return this;
        }
    }, {
        key: "onReset",
        value: function onReset(handler) {
            this.html.onreset = handler;
            return this;
        }
    }, {
        key: "onFocus",
        value: function onFocus(handler) {
            this.html.onfocus = handler;
            return this;
        }
    }, {
        key: "onFocusIn",
        value: function onFocusIn(handler) {
            this.html.onfocusin = handler;
            return this;
        }
    }, {
        key: "onFocusOut",
        value: function onFocusOut(handler) {
            this.html.onfocusout = handler;
            return this;
        }
    }, {
        key: "onBlur",
        value: function onBlur(handler) {
            this.html.onblur = handler;
            return this;
        }

        //Clipboard events

    }, {
        key: "onCopy",
        value: function onCopy(handler) {
            this.html.oncopy = handler;
            return this;
        }
    }, {
        key: "onCut",
        value: function onCut(handler) {
            this.html.oncut = handler;
            return this;
        }
    }, {
        key: "onPaste",
        value: function onPaste(handler) {
            this.html.onpaste = handler;
            return this;
        }

        //Media events

    }, {
        key: "onWaiting",
        value: function onWaiting(handler) {
            this.html.onwaiting = handler;
            return this;
        }
    }, {
        key: "onVolumeChange",
        value: function onVolumeChange(handler) {
            this.html.onvolumechange = handler;
            return this;
        }
    }, {
        key: "onTimeUpdate",
        value: function onTimeUpdate(handler) {
            this.html.ontimeupdate = handler;
            return this;
        }
    }, {
        key: "onSeeking",
        value: function onSeeking(handler) {
            this.html.onseeking = handler;
            return this;
        }
    }, {
        key: "onSeekEnd",
        value: function onSeekEnd(handler) {
            this.html.onseekend = handler;
            return this;
        }
    }, {
        key: "onRateChange",
        value: function onRateChange(handler) {
            this.html.onratechange = handler;
            return this;
        }
    }, {
        key: "onProgress",
        value: function onProgress(handler) {
            this.html.onprogress = handler;
            return this;
        }
    }, {
        key: "onLoadMetadata",
        value: function onLoadMetadata(handler) {
            this.html.onloadmetadata = handler;
            return this;
        }
    }, {
        key: "onLoadedData",
        value: function onLoadedData(handler) {
            this.html.onloadeddata = handler;
            return this;
        }
    }, {
        key: "onLoadStart",
        value: function onLoadStart(handler) {
            this.html.onloadstart = handler;
            return this;
        }
    }, {
        key: "onPlaying",
        value: function onPlaying(handler) {
            this.html.onplaying = handler;
            return this;
        }
    }, {
        key: "onPlay",
        value: function onPlay(handler) {
            this.html.onplay = handler;
            return this;
        }
    }, {
        key: "onPause",
        value: function onPause(handler) {
            this.html.onpause = handler;
            return this;
        }
    }, {
        key: "onEnded",
        value: function onEnded(handler) {
            this.html.onended = handler;
            return this;
        }
    }, {
        key: "onDurationChange",
        value: function onDurationChange(handler) {
            this.html.ondurationchange = handler;
            return this;
        }
    }, {
        key: "onCanPlay",
        value: function onCanPlay(handler) {
            this.html.oncanplay = handler;
            return this;
        }
    }, {
        key: "onCanPlayThrough",
        value: function onCanPlayThrough(handler) {
            this.html.oncanplaythrough = handler;
            return this;
        }
    }, {
        key: "onStalled",
        value: function onStalled(handler) {
            this.html.onstalled = handler;
            return this;
        }
    }, {
        key: "onSuspend",
        value: function onSuspend(handler) {
            this.html.onsuspend = handler;
            return this;
        }

        //Browser events

    }, {
        key: "onPopState",
        value: function onPopState(handler) {
            this.html.onpopstate = handler;
            return this;
        }
    }, {
        key: "onStorage",
        value: function onStorage(handler) {
            this.html.onstorage = handler;
            return this;
        }
    }, {
        key: "onHashChange",
        value: function onHashChange(handler) {
            this.html.onhashchange = handler;
            return this;
        }
    }, {
        key: "onAfterPrint",
        value: function onAfterPrint(handler) {
            this.html.onafterprint = handler;
            return this;
        }
    }, {
        key: "onBeforePrint",
        value: function onBeforePrint(handler) {
            this.html.onbeforeprint = handler;
            return this;
        }
    }, {
        key: "onPageHide",
        value: function onPageHide(handler) {
            this.html.onpagehide = handler;
            return this;
        }
    }, {
        key: "onPageShow",
        value: function onPageShow(handler) {
            this.html.onpageshow = handler;
            return this;
        }

        /**
         * Creates a new HTML element and wraps it into this Elem instance.
         * @param type
         * @returns {Elem}
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
         * @returns {Elem}
         */

    }, {
        key: "wrap",
        value: function wrap(html) {
            if (!Util.isEmpty(html)) return new Elem(html);else throw "Could not wrap a html element - html: " + html;
        }

        /**
         * Takes an array of HTMLDocument elements and wraps them inside an Elem instance.
         * Returns an array of the Elem objects if the given array contains more than one htmlDoc element otherwise a single Elem instance is returned.
         * @param {Array} htmlDoc 
         */

    }, {
        key: "wrapElems",
        value: function wrapElems(htmlDoc) {
            var eArr = [];
            for (var i in htmlDoc) {
                if (htmlDoc.hasOwnProperty(i)) {
                    eArr.push(Elem.wrap(htmlDoc[i]));
                }
            }
            return eArr.length === 1 ? eArr[0] : eArr;
        }
    }]);

    return Elem;
}();

var Tree = function () {
    function Tree() {
        _classCallCheck(this, Tree);
    }

    _createClass(Tree, null, [{
        key: "get",
        value: function get(selector) {
            return Elem.wrapElems(document.querySelectorAll(selector));
        }
    }, {
        key: "getFirst",
        value: function getFirst(selector) {
            return Elem.wrap(document.querySelector(selector));
        }
    }, {
        key: "getByTag",
        value: function getByTag(tag) {
            return Elem.wrapElems(document.getElementsByTagName(tag));
        }
    }, {
        key: "getByName",
        value: function getByName(name) {
            return Elem.wrapElems(document.getElementsByName(name));
        }
    }, {
        key: "getById",
        value: function getById(id) {
            return Elem.wrap(document.getElementById(id));
        }
    }, {
        key: "getByClass",
        value: function getByClass(classname) {
            return Elem.wrapElems(document.getElementsByClassName(classname));
        }
    }, {
        key: "getBody",
        value: function getBody() {
            return Elem.wrap(document.body);
        }
    }, {
        key: "getHead",
        value: function getHead() {
            return Elem.wrap(document.head);
        }
    }, {
        key: "getTitle",
        value: function getTitle() {
            return document.title;
        }
    }, {
        key: "setTitle",
        value: function setTitle(title) {
            document.title = title;
        }
    }, {
        key: "getActiveElement",
        value: function getActiveElement() {
            return Elem.wrap(document.activeElement);
        }
    }, {
        key: "getAnchors",
        value: function getAnchors() {
            return document.anchors;
        }
    }, {
        key: "getHtmlElement",
        value: function getHtmlElement() {
            return document.documentElement;
        }
    }, {
        key: "getDoctype",
        value: function getDoctype() {
            return document.doctype;
        }
    }, {
        key: "getEmbeds",
        value: function getEmbeds() {
            return document.embeds;
        }
    }, {
        key: "getImages",
        value: function getImages() {
            return document.images;
        }
    }, {
        key: "getLinks",
        value: function getLinks() {
            return document.links;
        }
    }, {
        key: "getScripts",
        value: function getScripts() {
            return document.scripts;
        }
    }, {
        key: "getForms",
        value: function getForms() {
            return document.forms;
        }
    }]);

    return Tree;
}();

/**
 * No methods, only Key mappings for keyevent.
 */


var Key = function Key() {
    _classCallCheck(this, Key);
};

Key.ENTER = "Enter";
Key.ESC = "Escape";
Key.TAB = "Tab";
Key.F1 = "F1";
Key.F2 = "F2";
Key.F3 = "F3";
Key.F4 = "F4";
Key.F5 = "F5";
Key.F6 = "F6";
Key.F7 = "F7";
Key.F8 = "F8";
Key.F9 = "F9";
Key.F10 = "F10";
Key.F11 = "F11";
Key.F12 = "F12";
Key.A = "a";
Key.B = "b";
Key.C = "c";
Key.D = "d";
Key.E = "e";
Key.F = "f";
Key.G = "g";
Key.H = "h";
Key.I = "i";
Key.J = "j";
Key.L = "l";
Key.M = "m";
Key.N = "n";
Key.O = "o";
Key.P = "p";
Key.Q = "q";
Key.R = "r";
Key.S = "s";
Key.T = "t";
Key.U = "u";
Key.V = "v";
Key.W = "w";
Key.X = "x";
Key.Y = "y";
Key.Z = "z";
// Key.SWEDISH_O = "å";
// Key.A_WITH_2_DOTS = "ä";
// Key.O_WITH_2_DOTS = "ö";
Key.CAPS_LOCK = "CapsLock";
Key.NUM_LOCK = "NumLock";
Key.SCROLL_LOCK = "ScrollLock";
Key.PAUSE = "Pause";
Key.PRINT_SCREEN = "PrintScreen";
Key.PAGE_UP = "PageUp";
Key.PAGE_DOWN = "PageDown";
Key.END = "End";
Key.HOME = "Home";
Key.DELETE = "Delete";
Key.INSERT = "Insert";
Key.ALT = "Alt";
Key.CTRL = "Control";
Key.CONTEXT_MENU = "ContextMenu";
Key.OS = "OS"; // META
Key.ALTGR = "AltGraph";
Key.SHIFT = "Shift";
Key.BACKSPACE = "Backspace";
// Key.HALF = "½";
Key.SECTION = "§";
Key.ONE = "1";
Key.TWO = "2";
Key.THREE = "3";
Key.FOUR = "4";
Key.FIVE = "5";
Key.SIX = "6";
Key.SEVEN = "7";
Key.EIGHT = "8";
Key.NINE = "9";
Key.ZERO = "0";
Key.PLUS = "+";
Key.MINUS = "-";
Key.STAR = "*";
Key.SLASH = "/";
Key.ARROW_UP = "ArrowUp";
Key.ARROW_RIGHT = "ArrowRight";
Key.ARROW_DOWN = "ArrowDown";
Key.ARROW_LEFT = "ArrowLeft";
Key.COMMA = ",";
Key.DOT = ".";

var Cookie = function () {
    /**
     * Cookies
     */
    var Cookies = function () {
        function Cookies() {
            _classCallCheck(this, Cookies);
        }

        _createClass(Cookies, null, [{
            key: "get",

            /**
             * Get a cookie by name.
             * Returns the cookie object 
             * {
             *  name: "name",
             *  value: "value",
             *  expiresDate: "expiresDate e.g. Date.toUTCString()",
             *  cookiePath: "cookiePath absolute dir",
             *  cookieDomain: "cookieDomain e.g example.com",
             *  setSecureBoolean: true|false
             * }
             * @param {String} name 
             */
            value: function get(name) {
                if (navigator.cookieEnabled) {
                    var retCookie = null;
                    var cookies = document.cookie.split(";");
                    for (var i in cookies) {
                        if (cookies.hasOwnProperty(i)) {
                            var cookie = cookies[i];
                            var eq = cookie.search("=");
                            var cn = cookie.substr(0, eq).trim();
                            var cv = cookie.substr(eq + 1, cookie.length).trim();
                            if (cn === name) {
                                retCookie = new Cookie(cn, cv);
                                break;
                            }
                        }
                    }
                    return retCookie;
                }
            }
            /**
             * Receives cookie parameters.
             * {
             *  name: "name",
             *  value: "value",
             *  expiresDate: "expiresDate e.g. Date.toUTCString()",
             *  cookiePath: "cookiePath absolute dir",
             *  cookieDomain: "cookieDomain e.g example.com",
             *  setSecureBoolean: true|false
             * }
             */

        }, {
            key: "set",
            value: function set(name, value, expiresDate, cookiePath, cookieDomain, setSecureBoolean) {
                if (navigator.cookieEnabled) {
                    document.cookie = Cookie.create(name, value, expiresDate, cookiePath, cookieDomain, setSecureBoolean).toString();
                }
            }
            /**
             * Remove a cookie by name.
             */

        }, {
            key: "remove",
            value: function remove(name) {
                var co = Cookies.get(name);
                if (!Util.isEmpty(co)) {
                    co.setExpired();
                    document.cookie = co.toString();
                }
            }
        }]);

        return Cookies;
    }();

    /**
    * Cookie object:
    * {
    *  name: "name",
    *  value: "value",
    *  expiresDate: "expiresDate e.g. Date.toUTCString()",
    *  cookiePath: "cookiePath absolute dir",
    *  cookieDomain: "cookieDomain e.g example.com",
    *  setSecureBoolean: true|false
    * }
    */


    var Cookie = function () {
        function Cookie(name, value, expiresDate, cookiePath, cookieDomain, setSecureBoolean) {
            _classCallCheck(this, Cookie);

            this.cookieName = !Util.isEmpty(name) && Util.isString(name) ? name.trim() : "";
            this.cookieValue = !Util.isEmpty(value) && Util.isString(value) ? value.trim() : "";
            this.cookieExpires = !Util.isEmpty(expiresDate) && Util.isString(expiresDate) ? expiresDate.trim() : "";
            this.cookiePath = !Util.isEmpty(cookiePath) && Util.isString(cookiePath) ? cookiePath.trim() : "";
            this.cookieDomain = !Util.isEmpty(cookieDomain) && Util.isString(cookieDomain) ? cookieDomain.trim() : "";
            this.cookieSecurity = !Util.isEmpty(setSecureBoolean) && Util.isBoolean(setSecureBoolean) ? "secure=secure" : "";
        }

        _createClass(Cookie, [{
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
                return new Cookie(name, value, expires, cpath, cdomain, setSecure);
            }
        }]);

        return Cookie;
    }();

    return Cookies;
}();

/**
 * Session interface.
 */

var Session = function () {
    function Session() {
        _classCallCheck(this, Session);
    }

    _createClass(Session, null, [{
        key: "set",
        value: function set(key, value) {
            sessionStorage.setItem(key, value);
        }
    }, {
        key: "get",
        value: function get(key) {
            return sessionStorage.getItem(key);
        }
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
 * HTML local storage interface.
 */


var Storage = function () {
    function Storage() {
        _classCallCheck(this, Storage);
    }

    _createClass(Storage, null, [{
        key: "set",
        value: function set(key, value) {
            localStorage.setItem(key, value);
        }
    }, {
        key: "get",
        value: function get(key) {
            return localStorage.getItem(key);
        }
    }, {
        key: "remove",
        value: function remove(key) {
            localStorage.removeItem(key);
        }
        /**
         * Clears the storage.
         */

    }, {
        key: "clear",
        value: function clear() {
            localStorage.clear();
        }
    }]);

    return Storage;
}();

/**
 * General Utils.
 */


var Util = function () {
    function Util() {
        _classCallCheck(this, Util);
    }

    /**
     * Returns true if the give value is null, undefined or an empty string. 
     */


    _createClass(Util, null, [{
        key: "isEmpty",
        value: function isEmpty(value) {
            return value === null || value === undefined || value === "";
        }
    }, {
        key: "getType",
        value: function getType(value) {
            return typeof value === "undefined" ? "undefined" : _typeof(value);
        }
    }, {
        key: "isType",
        value: function isType(value, type) {
            return Util.getType(value) === type;
        }
    }, {
        key: "isFunction",
        value: function isFunction(func) {
            return Util.isType(func, "function");
        }
    }, {
        key: "isBoolean",
        value: function isBoolean(boolean) {
            return Util.isType(boolean, "boolean");
        }
    }, {
        key: "isString",
        value: function isString(string) {
            return Util.isType(string, "string");
        }
    }, {
        key: "isNumber",
        value: function isNumber(number) {
            return Util.isType(number, "number");
        }
    }, {
        key: "isSymbol",
        value: function isSymbol(symbol) {
            return Util.isType(symbol, "symbol");
        }
    }, {
        key: "isObject",
        value: function isObject(object) {
            return Util.isType(object, "object");
        }
    }, {
        key: "isArray",
        value: function isArray(array) {
            return Array.isArray(array);
        }
    }, {
        key: "setTimeout",
        value: function setTimeout(callback, milliseconds) {
            if (!Util.isFunction(callback)) {
                throw "callback not fuction";
            }
            if (!Util.isNumber(milliseconds)) {
                throw "milliseconds not a number";
            }
            return window.setTimeout(callback, milliseconds);
        }
    }, {
        key: "clearTimeout",
        value: function clearTimeout(timeoutObject) {
            window.clearTimeout(timeoutObject);
        }
    }, {
        key: "setInterval",
        value: function setInterval(callback, milliseconds) {
            if (!Util.isFunction(callback)) {
                throw "callback not fuction";
            }
            if (!Util.isNumber(milliseconds)) {
                throw "milliseconds not a number";
            }
            return window.setInterval(callback, milliseconds);
        }
    }, {
        key: "clearInterval",
        value: function clearInterval(intervalObject) {
            window.clearInterval(intervalObject);
        }
    }, {
        key: "encodeBase64String",
        value: function encodeBase64String(string) {
            if (!Util.isString(string)) {
                throw "the given parameter is not a string: " + string;
            }
            return window.btoa(string);
        }
    }, {
        key: "decodeBase64String",
        value: function decodeBase64String(string) {
            if (!Util.isString(string)) {
                throw "the given parameter is not a string: " + string;
            }
            return window.atob(string);
        }
    }, {
        key: "eval",
        value: function _eval(string) {
            return eval(string);
        }
    }]);

    return Util;
}();

var Browser = function () {
    function Browser() {
        _classCallCheck(this, Browser);
    }

    /**
     * Scroll once to a given location (xPos, yPos)
     */


    _createClass(Browser, null, [{
        key: "scrollTo",
        value: function scrollTo(xPos, yPos) {
            window.scrollTo(xPos, yPos);
        }

        /**
         * Scroll multiple times by given pixel amount (xPx, yPx)
         */

    }, {
        key: "scrollBy",
        value: function scrollBy(xPx, yPx) {
            window.scrollBy(xPx, yPx);
        }
    }, {
        key: "open",
        value: function open(url, name, specs, replace) {
            return window.open(url, name, specs, replace);
        }
    }, {
        key: "close",
        value: function close(openedWindow) {
            openedWindow.close();
        }
    }, {
        key: "print",
        value: function print() {
            window.print();
        }
    }, {
        key: "alert",
        value: function alert(message) {
            window.alert(message);
        }
    }, {
        key: "confirm",
        value: function confirm(message) {
            return window.confirm(message);
        }
    }, {
        key: "prompt",
        value: function prompt(message, defaultText) {
            return window.prompt(message, defaultText);
        }
    }, {
        key: "mediaMatcher",
        value: function mediaMatcher(mediaString) {
            if (mediaString.indexOf("(") !== 0) mediaString = "(" + mediaString;
            if (mediaString.indexOf(")") !== mediaString.length - 1) mediaString = mediaString + ")";
            return window.matchMedia(mediaString);
        }
    }, {
        key: "pageBack",
        value: function pageBack() {
            history.back();
        }
    }, {
        key: "pageForward",
        value: function pageForward() {
            history.forward();
        }
    }, {
        key: "pageGo",
        value: function pageGo(numberOfPagesOrUrl) {
            history.go(numberOfPagesOrUrl);
        }
    }, {
        key: "pushState",
        value: function pushState(stateObject, title, newURL) {
            history.pushState(stateObject, title, newURL);
        }
    }, {
        key: "replaceState",
        value: function replaceState(stateObject, title, newURL) {
            history.replaceState(stateObject, title, newURL);
        }
    }, {
        key: "newPage",
        value: function newPage(newURL) {
            location.assign(newURL);
        }
    }, {
        key: "reloadPage",
        value: function reloadPage(force) {
            location.reload(force);
        }
    }, {
        key: "replacePage",
        value: function replacePage(newURL) {
            location.replace(newURL);
        }
    }, {
        key: "getAnchorHash",
        value: function getAnchorHash() {
            return location.hash;
        }
    }, {
        key: "setAnchorHash",
        value: function setAnchorHash(hash) {
            location.hash = hash;
        }
    }, {
        key: "getHostnamePort",
        value: function getHostnamePort() {
            return location.host;
        }

        /**
         * host = host:port
         */

    }, {
        key: "setHostnamePort",
        value: function setHostnamePort(hostPort) {
            location.host = hostPort;
        }
    }, {
        key: "getHostname",
        value: function getHostname() {
            return location.hostname;
        }
    }, {
        key: "setHostname",
        value: function setHostname(hostname) {
            location.hostname = hostname;
        }
    }, {
        key: "getURL",
        value: function getURL() {
            return location.href;
        }
    }, {
        key: "setURL",
        value: function setURL(newURL) {
            location.href;
        }

        /**
         * Returns protocol, hostname and port e.g. https://www.example.com:443
         */

    }, {
        key: "getOrigin",
        value: function getOrigin() {
            return location.origin;
        }
    }, {
        key: "getPathname",
        value: function getPathname() {
            return location.pathname;
        }
    }, {
        key: "setPathname",
        value: function setPathname(pathname) {
            location.pathname;
        }
    }, {
        key: "getPort",
        value: function getPort() {
            return location.port;
        }
    }, {
        key: "setPort",
        value: function setPort(portNumber) {
            location.port = portNumber;
        }
    }, {
        key: "getProtocol",
        value: function getProtocol() {
            return location.protocol;
        }
    }, {
        key: "setProtocol",
        value: function setProtocol(protocol) {
            location.protocol = protocol;
        }

        /**
         * For example: ?attr=value&abc=efg
         */

    }, {
        key: "getSearchString",
        value: function getSearchString() {
            return location.search;
        }
    }, {
        key: "setSearchString",
        value: function setSearchString(searchString) {
            location.search = searchString;
        }
    }, {
        key: "getCodename",
        value: function getCodename() {
            return navigator.appCodeName;
        }
    }, {
        key: "getName",
        value: function getName() {
            return navigator.appName;
        }
    }, {
        key: "getVersion",
        value: function getVersion() {
            return navigator.appVersion;
        }
    }, {
        key: "isCookiesEnabled",
        value: function isCookiesEnabled() {
            return navigator.cookieEnabled;
        }
    }, {
        key: "getGeoLocation",
        value: function getGeoLocation() {
            return navigator.geolocation;
        }
    }, {
        key: "getLanguage",
        value: function getLanguage() {
            return navigator.language;
        }
    }, {
        key: "isOnline",
        value: function isOnline() {
            return navigator.isOnline;
        }
    }, {
        key: "getPlatform",
        value: function getPlatform() {
            return navigator.platform;
        }
    }, {
        key: "getProduct",
        value: function getProduct() {
            return navigator.product;
        }
    }, {
        key: "getUserAgentHeader",
        value: function getUserAgentHeader() {
            return navigator.userAgent;
        }
    }, {
        key: "isJavaEnabled",
        value: function isJavaEnabled() {
            return navigator.isJavaEnabled();
        }
    }, {
        key: "getColorDepth",
        value: function getColorDepth() {
            return screen.colorDepth;
        }
    }, {
        key: "getFullScreenHeight",
        value: function getFullScreenHeight() {
            return screen.height;
        }
    }, {
        key: "getFullScreenWidth",
        value: function getFullScreenWidth() {
            return screen.width;
        }
    }, {
        key: "getAvailableScreenHeight",
        value: function getAvailableScreenHeight() {
            return screen.availHeight;
        }
    }, {
        key: "getAvailableScreenWidth",
        value: function getAvailableScreenWidth() {
            return screen.availWidth;
        }
    }]);

    return Browser;
}();
