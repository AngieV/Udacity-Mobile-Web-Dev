import idb from 'idb';

function openDatabase() {
  // If the browser doesn't support service worker,
  // we don't care about having a database
  if (!navigator.serviceWorker) {
    return Promise.resolve();
  }

  return idb.open('restaurant_reviews', 1, function(upgradeDb) {
    var store = upgradeDb.createObjectStore('restaurant_reviews-posted', {
      keyPath: 'id'
    });
    store.createIndex('by-date');
  });
}

export default function IndexController(container) {
  this._container = container;
  this._dbPromise = openDatabase();
  this._registerServiceWorker();
  this._cleanImageCache();

  var indexController = this;
  
  setInterval(function() {
    indexController._cleanImageCache();
  }, 1000 * 60 * 5);

  this._showCachedMessages().then(function() {
    indexController._openSocket();
  });
}

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
