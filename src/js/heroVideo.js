const videos = [
    '/assets/videos/vid1.mp4',
    '/assets/videos/vid2.mp4',
    '/assets/videos/vid3.mp4',
    '/assets/videos/vid4.mp4',
];

let currentVideoIndex = 0;
const heroVideo = document.getElementById('hero-video');

function playNextVideo() {
    heroVideo.innerHTML = '';

    const source = document.createElement('source');
    source.src = videos[currentVideoIndex];
    source.type = 'video/mp4';

    heroVideo.appendChild(source);

    heroVideo.load();
    heroVideo.play();

    currentVideoIndex = (currentVideoIndex + 1) % videos.length;
}

heroVideo.addEventListener('loadeddata', () => {
    heroVideo.play();
});

heroVideo.addEventListener('ended', playNextVideo);

playNextVideo()