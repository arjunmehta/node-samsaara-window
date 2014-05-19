/*!
 * Samsaara Client Window Information Module
 * Copyright(c) 2014 Arjun Mehta <arjun@newlief.com>
 * MIT Licensed
 */

var debug = require('debug')('samsaara:windowInfo');

function windowInfo(options){

  var samsaara,
      config,
      connectionController, connections,
      communication,
      ipc;

  /**
   * Connection Initialization Methods
   * Called for every new connection
   *
   * @opts: {Object} contains the connection's options
   * @connection: {SamsaaraConnection} the connection that is initializing
   * @attributes: {Attributes} The attributes of the SamsaaraConnection and its methods
   */

  function connectionInitialzation(opts, connection, attributes){

    connection.updateDataAttribute("windowInfo", {});

    if(opts.windowInfo !== undefined){
      debug("Initializing Window Size...");
      if(opts.windowInfo === "force") attributes.force("windowInfo");
      connection.execute({internal: "getWindowInfo"}, windowResize);
    }
  }


  /**
   * Foundation Methods
   */

  function windowResize(width, height, windowOffsetX, windowOffsetY){
    var connection = this.connection;
    connection.updateDataAttribute("windowInfo", {windowWidth: width, windowHeight: height, offsetX: windowOffsetX, offsetY: windowOffsetY});
    samsaara.emit('windowInfo', connection, width, height, windowOffsetX, windowOffsetY);
  }

 

  /**
   * Module Return Function.
   * Within this function you should set up and return your samsaara middleWare exported
   * object. Your eported object can contain:
   * name, foundation, remoteMethods, connectionInitialization, connectionClose
   */

  return function windowInfo(samsaaraCore){

    samsaara = samsaaraCore;
    config = samsaaraCore.config;
    connectionController = samsaaraCore.connectionController;
    connections = connectionController.connections;
    communication = samsaaraCore.communication;
    ipc = samsaaraCore.ipc;

    samsaaraCore.addClientFileRoute("samsaara-window.js", __dirname + '/client/samsaara-window.js');

    var exported = {

      name: "windowInfo",

      clientScript: __dirname + '/client/samsaara-window.js',

      connectionInitialization:{
        windowInfo: connectionInitialzation
      },

      foundationMethods: {
        windowResize: windowResize
      }
    };

    return exported;

  };

}

module.exports = exports = windowInfo;