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

    const videos = document.querySelectorAll('video');
    const audios = document.querySelectorAll('audio');

    function exitFullScreen() {
        document.exitFullscreen();
        document.mozCancelFullScreen();
        document.webkitExitFullscreen();
        document.msExitFullscreen();
    }

    function setDefaultVolume() {
        videos.forEach((video) => {
            if (video.volume !== 0.01) {
                video.volume = 0.01;
            }
        });

        audios.forEach((audio) => {
            if (audio.volume !== 0.01) {
                audio.volume = 0.01;
            }
        });
    }

    videos.forEach((video) => {
        video.addEventListener('volumechange', () => {
            video.volume = 0.01;
        });
    });

    audios.forEach((audio) => {
        audio.addEventListener('volumechange', () => {
            audio.volume = 0.01;
        });
    });

    document.addEventListener('fullscreenchange', () => {
        exitFullScreen();
    });
    document.addEventListener('mozfullscreenchange', () => {
        exitFullScreen();
    });
    document.addEventListener('webkitfullscreenchange', () => {
        exitFullScreen();
    });
    document.addEventListener('msfullscreenchange', () => {
        exitFullScreen();
    });

    exitFullScreen();
    setDefaultVolume();
})();
