// Підключення функціоналу "Чертоги Фрілансера"
import { FLS } from "@js/common/functions.js";
// Підключення доповнення - НОВИЙ СИНТАКСИС
import { setOptions, importLibrary } from '@googlemaps/js-api-loader';
// Підключення налаштувань
import { MAP_STYLES, BREAKPOINTS, MAP_KEY, MAP_ID } from './_settings.js';

import './map.scss'

function mapInit() {
	const SELECTORS = {
		section: '[data-fls-map]',
		marker: '[data-fls-map-marker]',
		map: '[data-fls-map-body]',
	};

	const $sections = document.querySelectorAll(SELECTORS.section);
	if (!$sections.length) return;

	const loadMap = async (onLoad) => {
		// НОВИЙ СИНТАКСИС - встановлюємо опції
		setOptions({
			apiKey: MAP_KEY,
			version: 'weekly',
		});

		try {
			// НОВИЙ СИНТАКСИС - імпортуємо бібліотеки
			const { Map } = await importLibrary('maps');
			const { Marker } = await importLibrary('marker'); // Звичайні маркери
			const Core = await importLibrary('core');

			onLoad({ Map, Marker, Core });
		} catch (e) {
			FLS('_FLS_MAP_ERROR');
			console.log(e);
		}
	};

	const initMap = async ({ api, lng, lat, markersData, zoom, maxZoom, $map }) => {
		const mapOptions = {
			maxZoom,
			zoom,
			mapTypeControl: false,
			styles: MAP_STYLES, // Стилі працюють без mapId!
			center: {
				lat,
				lng,
			},
			disableDefaultUI: true,
			// mapId видалено - не потрібен для звичайних маркерів
		};

		const map = new api.Map($map, mapOptions);

		const markerDesktopSize = { width: 40, height: 57 };
		const markerMobileSize = { width: 30, height: 42 };

		// Розмір маркерів
		const markerSize = window.innerWidth < BREAKPOINTS.tablet ? markerMobileSize : markerDesktopSize;

		const markers = markersData.map(({ lat, lng, icon, title, markerZoom, markerPopup }) => {
			// Звичайний маркер (не AdvancedMarkerElement)
			const marker = new api.Marker({
				map,
				position: { lat, lng },
				title: title,
				icon: icon ? {
					url: icon,
					scaledSize: new google.maps.Size(markerSize.width, markerSize.height)
				} : undefined,
			});

			marker.addListener('click', () => {
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
						enable: $marker.hasAttribute('data-fls-map-marker-zoom'),
						value: $marker.dataset.flsMapMarkerZoom,
					},
					markerPopup: {
						enable: $marker.hasAttribute('data-fls-map-marker-popup'),
						value: $marker.dataset.flsMapMarkerPopup,
					}
				}));

				initMap({
					api,
					$map,
					lng: parseFloat($map.dataset.flsMapLng) || 0,
					lat: parseFloat($map.dataset.flsMapLat) || 0,
					zoom: parseFloat($map.dataset.flsMapZoom) || 6,
					maxZoom: parseFloat($map.dataset.flsMapMaxZoom) || 18,
					markersData,
				});
			});
		});
	});
}

document.querySelector('[data-fls-map]') ?
	window.addEventListener('load', mapInit) : null