// ==UserScript==
// @name         AntiScreamer
// @namespace    https://github.com/xtcorp
// @version      1.1
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

    function setDefaultVolume(videos, audios, volumeperc) {
        for (let video of videos) {
            if (video.volume !== volumeperc) {
                video.volume = volumeperc;
            }
        }

        for (let audio of audios) {
            if (audio.volume !== volumeperc) {
                audio.volume = volumeperc;
            }
        }
    }

    const bodyElement = document.querySelector('body');

    const scareElement = bodyElement.querySelector('div.scare');

    //if prntscr screamer, if not then only lower volume to 0.01
    if(scareElement != null) {
        const videoElements = scareElement.querySelectorAll('video');
        videoElements.forEach(videoElement => {
            videoElement.style.width = '0px';
            videoElement.style.height = '0px';
            videoElement.volume = 0.0;
        });

        let videos = Array.from(document.querySelectorAll('video'));
        let audios = Array.from(document.querySelectorAll('audio'));

        const observer = new MutationObserver(function () {
            videos = Array.from(document.querySelectorAll('video'));
            audios = Array.from(document.querySelectorAll('audio'));
            setDefaultVolume(videos, audios, 0.0);
            videos.forEach(video => {
                video.style.width = '0px';
                video.style.height = '0px';
                video.volume = 0.0;
            });
        });

        observer.observe(document.documentElement, {
            childList: true,
            subtree: true,
        });
    } else {
        let videos = Array.from(document.querySelectorAll('video'));
        let audios = Array.from(document.querySelectorAll('audio'));

        const observer = new MutationObserver(function () {
            videos = Array.from(document.querySelectorAll('video'));
            audios = Array.from(document.querySelectorAll('audio'));
            setDefaultVolume(videos, audios, 0.01);
        });

        observer.observe(document.documentElement, {
            childList: true,
            subtree: true,
        });
    }

    document.addEventListener('fullscreenchange', exitFullScreen);
    document.addEventListener('mozfullscreenchange', exitFullScreen);
    document.addEventListener('webkitfullscreenchange', exitFullScreen);
    document.addEventListener('msfullscreenchange', exitFullScreen);

    exitFullScreen();

})();
