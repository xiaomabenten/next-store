;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.Next-store = factory();
  }
}(this, function() {
(function () {
  'use strict'

  var Store = nx.declare('nx.Store', {
    statics: {
      engine: 'localStorage',
      config: function (inOptions) {
        nx.mix(Store, inOptions);
      },
      set: function (inKey, inValue) {
        global[Store.engine].setItem(inKey, nx.stringify(inValue));
      },
      get: function (inKey) {
        var value = global[Store.engine].getItem(inKey);
        return nx.parse(value);
      },
      sets: function (inObject) {
        nx.each(inObject, function (key, value) {
          Store.set(key, value);
        });
      },
      clear: function (inKey) {
        global[Store.engine].removeItem(inKey);
      },
      clearAll: function () {
        global[Store.engine].clear();
      }
    }
  });


  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Store;
  }

}());

return nx.Store;
}));
