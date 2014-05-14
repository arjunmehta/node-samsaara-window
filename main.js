/*!
 * Samsaara Client Window Information Module
 * Copyright(c) 2014 Arjun Mehta <arjun@newlief.com>
 * MIT Licensed
 */


function windowInfo(options){

  var config,
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
      console.log("Initializing Window Size...");
      if(opts.windowInfo === "force") attributes.force("windowInfo");
      communication.sendToClient(connection.id, {internal: "getWindowInfo"}, windowResize);
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

    config = samsaaraCore.config;
    connectionController = samsaaraCore.connectionController;
    connections = connectionController.connections;
    communication = samsaaraCore.communication;
    ipc = samsaaraCore.ipcRedis;

    samsaaraCore.addClientFileRoute("samsaara-window.js", __dirname + '/client/samsaara-window.js');

    var exported = {

      name: "windowInfo",

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