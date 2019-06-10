    let player;
    let panStarted = false;

    function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
            videoId: localStorage.getItem("videoID"),
            events: {
                'onStateChange': onPlayerStateChange
            }
        });
    }

    // Start animation when video starts playing.
    function onPlayerStateChange(event) {
        if (event.data == 1 && !panStarted) {
            requestAnimationFrame(panVideo);
            panStarted = true;
        }
    }

    function panVideo() {
        // 20 seconds per rotation.
        const yaw = (performance.now() / 1000 / 20 * 360) % 360;
        // 2 up-down cycle per rotation.
        const pitch = 20 * Math.sin(2 * yaw / 360 * 2 * Math.PI);
        player.setSphericalProperties({
            yaw: yaw,
            pitch: pitch
        });
        requestAnimationFrame(panVideo);
    }