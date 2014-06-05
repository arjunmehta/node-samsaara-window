/*!
 * Samsaara Client Window Information Module
 * Copyright(c) 2014 Arjun Mehta <arjun@newlief.com>
 * MIT Licensed
 */

var debug = require('debug')('samsaara:windowInfo');


var windowInfo = {

  name: "windowInfo",

  clientScript: __dirname + '/client/samsaara-window.js',

  connectionInitialization:{
    windowInfo: connectionInitialzation
  },

  remoteMethods: {
    windowResize: windowResize
  }
};


var samsaara,
    config,
    connectionController, connections,
    communication,
    ipc;


// the root interface loaded by require. Options are pass in options here.

function main(opts){
  return initialize;
}


// samsaara will call this method when it's ready to load it into its middleware stack
// return your main 

function initialize(samsaaraCore){
  samsaara = samsaaraCore.samsaara;
  config = samsaaraCore.config;
  connectionController = samsaaraCore.connectionController;
  connections = connectionController.connections;
  communication = samsaaraCore.communication;
  ipc = samsaaraCore.ipc;

  samsaaraCore.addClientFileRoute("samsaara-window.js", __dirname + '/client/samsaara-window.js');

  return windowInfo;
}



function connectionInitialzation(opts, connection, attributes){

  connection.updateDataAttribute("windowInfo", {});

  if(opts.windowInfo !== undefined){
    debug("Initializing Window Size...");
    if(opts.windowInfo === "force") attributes.force("windowInfo");
    connection.executeRaw({ns:"internal", func: "getWindowInfo"}, windowResize);
  }
}


/**
 * Foundation Methods
 */

function windowResize(width, height, windowOffsetX, windowOffsetY){
  var connection = this;
  connection.updateDataAttribute("windowInfo", {windowWidth: width, windowHeight: height, offsetX: windowOffsetX, offsetY: windowOffsetY});
  samsaara.emit('windowInfo', connection, width, height, windowOffsetX, windowOffsetY);
}



module.exports = exports = main;