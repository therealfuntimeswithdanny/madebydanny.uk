        // Get references to video and control elements
        const videoPlayerWrapper = document.getElementById('videoPlayerWrapper');
        const video = document.getElementById('myVideo');
        const videoControls = document.getElementById('videoControls');
        const playPauseBtn = document.getElementById('playPauseBtn');
        const playPauseIcon = document.getElementById('playPauseIcon');
        const rewindBtn = document.getElementById('rewindBtn');
        const fastForwardBtn = document.getElementById('fastForwardBtn');
        const muteBtn = document.getElementById('muteBtn');
        const muteIcon = document.getElementById('muteIcon');
        const fullscreenBtn = document.getElementById('fullscreenBtn');
        const fullscreenIcon = document.getElementById('fullscreenIcon');

        // Function to show controls
        function showControls() {
            videoControls.classList.add('show-controls');
        }

        // Function to hide controls
        function hideControls() {
            // Only hide if video is playing
            if (!video.paused && !video.ended) {
                videoControls.classList.remove('show-controls');
            }
        }

        // Function to toggle play/pause state
        function togglePlayPause() {
            if (video.paused || video.ended) {
                video.play();
                playPauseIcon.classList.remove('fa-play');
                playPauseIcon.classList.add('fa-pause');
                // Controls will hide after a brief moment if mouse leaves, handled by hideControls
            } else {
                video.pause();
                playPauseIcon.classList.remove('fa-pause');
                playPauseIcon.classList.add('fa-play');
                showControls(); // Always show controls when paused
            }
        }

        // Function to rewind video by 5 seconds
        function rewindVideo() {
            video.currentTime = Math.max(0, video.currentTime - 5);
        }

        // Function to fast forward video by 5 seconds
        function fastForwardVideo() {
            video.currentTime = Math.min(video.duration, video.currentTime + 5);
        }

        // Function to toggle mute state
        function toggleMute() {
            video.muted = !video.muted;
            if (video.muted) {
                muteIcon.classList.remove('fa-volume-up');
                muteIcon.classList.add('fa-volume-off');
            } else {
                muteIcon.classList.remove('fa-volume-off');
                muteIcon.classList.add('fa-volume-up');
            }
        }

        // Function to toggle fullscreen mode
        function toggleFullscreen() {
            if (document.fullscreenElement) {
                // Currently in fullscreen, exit fullscreen
                document.exitFullscreen();
            } else {
                // Not in fullscreen, request fullscreen for the video player wrapper
                if (videoPlayerWrapper.requestFullscreen) {
                    videoPlayerWrapper.requestFullscreen();
                } else if (videoPlayerWrapper.mozRequestFullScreen) { /* Firefox */
                    videoPlayerWrapper.mozRequestFullScreen();
                } else if (videoPlayerWrapper.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
                    videoPlayerWrapper.webkitRequestFullscreen();
                } else if (videoPlayerWrapper.msRequestFullscreen) { /* IE/Edge */
                    videoPlayerWrapper.msRequestFullscreen();
                }
            }
        }

        // Event listener for fullscreen change (e.g., when exiting with Esc key)
        document.addEventListener('fullscreenchange', () => {
            if (document.fullscreenElement) {
                fullscreenIcon.classList.remove('fa-expand');
                fullscreenIcon.classList.add('fa-compress');
            } else {
                fullscreenIcon.classList.remove('fa-compress');
                fullscreenIcon.classList.add('fa-expand');
            }
        });

        // Event listeners for control buttons
        playPauseBtn.addEventListener('click', togglePlayPause);
        rewindBtn.addEventListener('click', rewindVideo);
        fastForwardBtn.addEventListener('click', fastForwardVideo);
        muteBtn.addEventListener('click', toggleMute);
        fullscreenBtn.addEventListener('click', toggleFullscreen);


        // Event listeners for showing/hiding controls on hover
        videoPlayerWrapper.addEventListener('mouseenter', showControls);
        videoPlayerWrapper.addEventListener('mouseleave', hideControls);

        // Event listener to update play/pause icon and control visibility
        video.addEventListener('play', () => {
            playPauseIcon.classList.remove('fa-play');
            playPauseIcon.classList.add('fa-pause');
            // If the video is playing and mouse is not over, hide controls
            if (!videoPlayerWrapper.matches(':hover')) {
                hideControls();
            }
        });

        video.addEventListener('pause', () => {
            playPauseIcon.classList.remove('fa-pause');
            playPauseIcon.classList.add('fa-play');
            showControls(); // Always show controls when paused
        });

        video.addEventListener('ended', () => {
            playPauseIcon.classList.remove('fa-pause');
            playPauseIcon.classList.add('fa-play');
            showControls(); // Always show controls when ended
        });

        // Event listener to update mute icon if video mute state changes programmatically
        video.addEventListener('volumechange', () => {
            if (video.muted) {
                muteIcon.classList.remove('fa-volume-up');
                muteIcon.classList.add('fa-volume-off');
            } else {
                muteIcon.classList.remove('fa-volume-off');
                muteIcon.classList.add('fa-volume-up');
            }
        });

        // Initially show controls if video is paused (e.g., on page load)
        if (video.paused || video.ended) {
            showControls();
        }
