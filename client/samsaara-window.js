/*!
 * Samsaara Client Window Information Module
 * Copyright(c) 2014 Arjun Mehta <arjun@newlief.com>
 * MIT Licensed
 */

var windowSize = (function(module){

  window.onresize = function(e){
    samsaara.nsFunc("internal", "windowResize", window.innerWidth, window.innerHeight);
  };


  function getScreenInfo(){

    var displayObject = {};

    displayObject.screenX = window.screenX;
    displayObject.screenY = window.screenY;

    displayObject.displayWidth = window.screen.width;
    displayObject.displayHeight = window.screen.height;

    displayObject.displayAvailWidth = window.screen.availWidth;
    displayObject.displayAvailHeight = window.screen.availHeight;

    displayObject.displayAvailLeft = window.screen.availLeft;
    displayObject.displayAvailTop = window.screen.availTop;

    displayObject.innerWidth = window.innerWidth;
    displayObject.innerHeight = window.innerHeight;

    displayObject.outerWidth = window.outerWidth;
    displayObject.outerHeight = window.outerHeight;

    return displayObject;
  }


  module.internalMethods = {
    getWindowInfo: function(callBack){
      if(typeof callBack === "function") callBack(window.innerWidth, window.innerHeight);
    },
    getScreenInfo: getScreenInfo
  };

  module.initializationMethods = {};
  module.closeMethods = {};

  return module;

}(this.windowSize = this.windowSize || {}));

samsaara.use(windowSize);