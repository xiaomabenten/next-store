(function () {

  var global = global || window || this;
  var nx = global.nx || require('next-js-core2');
  var NxLocalStorage = nx.LocalStorage || require('next-local-storage');
  var NxSessionStorage = nx.SessionStorage || require('next-session-storage');

  //engie list:
  var ENGIE_LOCAL = 'localStorage';
  var ENGIE_SESSION = 'sessionStorage';

  var NxStore = nx.declare('nx.Store', {
    properties:{
      local:{
        get:function(){
          return this._localStorage.gets();
        },
        set: function(inValue){
          this._localStorage.sets(inValue);
        }
      },
      session:{
        get:function(){
          this._sessionStorage.gets();
        },
        set: function(inValue){
          this._sessionStorage.sets(inValue);
        }
      }
    },
    statics:{
      engine: ENGIE_LOCAL,
      init: function(){
        this._localStorage = new NxLocalStorage();
        this._sessionStorage = new NxSessionStorage();

        //delegates methods:
        nx.each([
          'set',
          'sets',
          'get',
          'gets',
          'clear',
          'clears'
        ],function(_,name){
          var self = this;
          this[name] = function(inValue){
            return self['_' + this.engine][name](inValue);
          };
        },this);
      },
      /**
       * @depreate use 'clears' instead
       */
      clearAll: function(inValue){
        console.warn('Depreated! Please use `clears` methods instead ASAP.');
        this.clears(inValue);
      }
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxStore;
  }

}());
