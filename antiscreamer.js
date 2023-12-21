// ==UserScript==
// @name         AntiScreamer
// @namespace    https://vk.com/xtcorp
// @version      1.0
// @description  Mute volume and prevent fullscreen mode
// @author       xtcorp
// @grant        none
// @match      *://*/*
// @match      *
// @match      http://*/*
// @exclude    https://www.youtube.com/watch*
// ==/UserScript==
(function () {
	'use strict';

	let videos = Array.from(document.querySelectorAll('video'));
	let audios = Array.from(document.querySelectorAll('audio'));

	function exitFullScreen() {
		try {
			if (document.exitFullscreen) {
				document.exitFullscreen();
			} else if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			} else if (document.webkitExitFullscreen) {
				document.webkitExitFullscreen();
			} else if (document.msExitFullscreen) {
				document.msExitFullscreen();
			}
		} catch (error) {
			console.error('Exit fullscreen error:', error);
		}
	}

	function setDefaultVolume() {
		for (let video of videos) {
			if (video.volume !== 0.01) {
				video.volume = 0.01;
			}
		}

		for (let audio of audios) {
			if (audio.volume !== 0.01) {
				audio.volume = 0.01;
			}
		}
	}
	document.addEventListener('fullscreenchange', exitFullScreen);
	document.addEventListener('mozfullscreenchange', exitFullScreen);
	document.addEventListener('webkitfullscreenchange', exitFullScreen);
	document.addEventListener('msfullscreenchange', exitFullScreen);

	const observer = new MutationObserver(function () {
		videos = Array.from(document.querySelectorAll('video'));
		audios = Array.from(document.querySelectorAll('audio'));
		setDefaultVolume();
	});

	observer.observe(document.documentElement, {
		childList: true,
		subtree: true,
	});

	exitFullScreen();
})();
