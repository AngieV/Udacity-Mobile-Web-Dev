
//use indexController or other???

IndexController.prototype.registerServiceWorker = function () {
  //If the browser supports serviceWorkers
  if (navigator.ServiceWorker){
    //register the Service Worker
    navigator.serviceWorker.register("/sw.js").then(function(reg) {
      console.log("serviceWorker succussfully registered");
    })catch(function(err){
      console.log("error registering serviceWorker");
    });
  }
};
