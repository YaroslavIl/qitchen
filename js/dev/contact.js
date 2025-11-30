import "./main.min.js";
/* empty css               */
import "./common.min.js";
function setScriptSrc(script, src) {
  script.src = src;
}
const bootstrap = (bootstrapParams) => {
  var bootstrapPromise;
  var script;
  var bootstrapParamsKey;
  var PRODUCT_NAME = "The Google Maps JavaScript API";
  var GOOGLE = "google";
  var IMPORT_API_NAME = "importLibrary";
  var PENDING_BOOTSTRAP_KEY = "__ib__";
  var doc = document;
  var global_ = window;
  var google_ = global_[GOOGLE] || (global_[GOOGLE] = {});
  var namespace = google_.maps || (google_.maps = {});
  var libraries = /* @__PURE__ */ new Set();
  var searchParams = new URLSearchParams();
  var triggerBootstrap = () => bootstrapPromise || (bootstrapPromise = new Promise(async (resolve, reject) => {
    await (script = doc.createElement("script"));
    searchParams.set("libraries", [...libraries] + "");
    for (bootstrapParamsKey in bootstrapParams) {
      searchParams.set(bootstrapParamsKey.replace(/[A-Z]/g, (g) => "_" + g[0].toLowerCase()), bootstrapParams[bootstrapParamsKey]);
    }
    searchParams.set("callback", GOOGLE + ".maps." + PENDING_BOOTSTRAP_KEY);
    setScriptSrc(script, "https://maps.googleapis.com/maps/api/js?" + searchParams);
    namespace[PENDING_BOOTSTRAP_KEY] = resolve;
    script.onerror = () => bootstrapPromise = reject(Error(PRODUCT_NAME + " could not load."));
    script.nonce = doc.querySelector("script[nonce]")?.nonce || "";
    doc.head.append(script);
  }));
  namespace[IMPORT_API_NAME] ? console.warn(PRODUCT_NAME + " only loads once. Ignoring:", bootstrapParams) : namespace[IMPORT_API_NAME] = (libraryName, ...args) => libraries.add(libraryName) && triggerBootstrap().then(() => namespace[IMPORT_API_NAME](libraryName, ...args));
};
const MSG_REPEATED_SET_OPTIONS = (options) => `The setOptions() function should only be called once. The options passed to the additional call (${JSON.stringify(options)}) will be ignored.`;
const MSG_IMPORT_LIBRARY_EXISTS = (options) => `The google.maps.importLibrary() function is already defined, and @googlemaps/js-api-loader will use the existing function instead of overwriting it. The options passed to setOptions (${JSON.stringify(options)}) will be ignored.`;
const logDevWarning = () => {
};
const logDevNotice = () => {
};
let setOptionsWasCalled_ = false;
function setOptions(options) {
  if (setOptionsWasCalled_) {
    logDevWarning(MSG_REPEATED_SET_OPTIONS(options));
    return;
  }
  installImportLibrary_(options);
  setOptionsWasCalled_ = true;
}
async function importLibrary(libraryName) {
  if (!window?.google?.maps?.importLibrary) {
    throw new Error("google.maps.importLibrary is not installed.");
  }
  return await google.maps.importLibrary(libraryName);
}
function installImportLibrary_(options) {
  const importLibraryExists = Boolean(window.google?.maps?.importLibrary);
  if (importLibraryExists) {
    logDevNotice(MSG_IMPORT_LIBRARY_EXISTS(options));
  }
  if (!importLibraryExists) {
    bootstrap(options);
  }
}
const MAP_KEY = `AIzaSyBUgKKfl-E3Ply5c8PI5IUEww2GKMYXO60`;
const BREAKPOINTS = {
  tablet: 991.98
};
const MAP_STYLES = [
  {
    "featureType": "all",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "all",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "saturation": 36
      },
      {
        "color": "#000000"
      },
      {
        "lightness": 40
      }
    ]
  },
  {
    "featureType": "all",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "visibility": "on"
      },
      {
        "color": "#000000"
      },
      {
        "lightness": 16
      }
    ]
  },
  {
    "featureType": "all",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#000000"
      },
      {
        "lightness": 20
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#000000"
      },
      {
        "lightness": 17
      },
      {
        "weight": 1.2
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#e5c163"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#c4c4c4"
      }
    ]
  },
  {
    "featureType": "administrative.neighborhood",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#e5c163"
      }
    ]
  },
  {
    "featureType": "landscape",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#000000"
      },
      {
        "lightness": 20
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#000000"
      },
      {
        "lightness": 21
      },
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "poi.business",
    "elementType": "geometry",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#e5c163"
      },
      {
        "lightness": "0"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#e5c163"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#000000"
      },
      {
        "lightness": 18
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#575757"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#2c2c2c"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#000000"
      },
      {
        "lightness": 16
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#999999"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#000000"
      },
      {
        "lightness": 19
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#000000"
      },
      {
        "lightness": 17
      }
    ]
  }
];
function mapInit() {
  const SELECTORS = {
    section: "[data-fls-map]",
    marker: "[data-fls-map-marker]",
    map: "[data-fls-map-body]"
  };
  const $sections = document.querySelectorAll(SELECTORS.section);
  if (!$sections.length) return;
  const loadMap = async (onLoad) => {
    setOptions({
      apiKey: MAP_KEY,
      version: "weekly"
    });
    try {
      const { Map } = await importLibrary("maps");
      const { Marker } = await importLibrary("marker");
      const Core = await importLibrary("core");
      onLoad({ Map, Marker, Core });
    } catch (e) {
      console.log(e);
    }
  };
  const initMap = async ({ api, lng, lat, markersData, zoom, maxZoom, $map }) => {
    const mapOptions = {
      maxZoom,
      zoom,
      mapTypeControl: false,
      styles: MAP_STYLES,
      // Стилі працюють без mapId!
      center: {
        lat,
        lng
      },
      disableDefaultUI: true
      // mapId видалено - не потрібен для звичайних маркерів
    };
    const map = new api.Map($map, mapOptions);
    const markerDesktopSize = { width: 40, height: 57 };
    const markerMobileSize = { width: 30, height: 42 };
    const markerSize = window.innerWidth < BREAKPOINTS.tablet ? markerMobileSize : markerDesktopSize;
    markersData.map(({ lat: lat2, lng: lng2, icon, title, markerZoom, markerPopup }) => {
      const marker = new api.Marker({
        map,
        position: { lat: lat2, lng: lng2 },
        title,
        icon: icon ? {
          url: icon,
          scaledSize: new google.maps.Size(markerSize.width, markerSize.height)
        } : void 0
      });
      marker.addListener("click", () => {
        if (markerZoom.enable) {
          map.setZoom(+markerZoom.value || 10);
        }
        if (markerPopup.enable && window.flsPopup) {
          window.flsPopup.open(markerPopup.value);
        }
        map.panTo(marker.position);
      });
      return marker;
    });
    return map;
  };
  loadMap((api) => {
    $sections.forEach(($section) => {
      const $maps = $section.querySelectorAll(SELECTORS.map);
      if (!$maps.length) return;
      $maps.forEach(($map) => {
        const $markers = $map.parentElement.querySelectorAll(SELECTORS.marker);
        const markersData = Array.from($markers).map(($marker) => ({
          lng: parseFloat($marker.dataset.flsMapLng) || 0,
          lat: parseFloat($marker.dataset.flsMapLat) || 0,
          icon: $marker.dataset.flsMapIcon,
          title: $marker.dataset.flsMapTitle,
          markerZoom: {
            enable: $marker.hasAttribute("data-fls-map-marker-zoom"),
            value: $marker.dataset.flsMapMarkerZoom
          },
          markerPopup: {
            enable: $marker.hasAttribute("data-fls-map-marker-popup"),
            value: $marker.dataset.flsMapMarkerPopup
          }
        }));
        initMap({
          api,
          $map,
          lng: parseFloat($map.dataset.flsMapLng) || 0,
          lat: parseFloat($map.dataset.flsMapLat) || 0,
          zoom: parseFloat($map.dataset.flsMapZoom) || 6,
          maxZoom: parseFloat($map.dataset.flsMapMaxZoom) || 18,
          markersData
        });
      });
    });
  });
}
document.querySelector("[data-fls-map]") ? window.addEventListener("load", mapInit) : null;
