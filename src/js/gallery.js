// lightbox overlay
function createLightbox() {
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-overlay">
            <div class="lightbox-content">
                <div class="lightbox-controls">
                    <button id="lightbox-download" class="lightbox-btn">Download Image</button>
                    <span class="lightbox-close">&times;</span>
                </div>
                <img id="lightbox-image" src="" alt="">
                <div class="lightbox-nav">
                    <button id="lightbox-prev">&lt;</button>
                    <button id="lightbox-next">&gt;</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(lightbox);
}

function downloadImage() {
    const lightboxImage = document.getElementById('lightbox-image');
    const downloadBtn = document.getElementById('lightbox-download');

    if (lightboxImage.src) {
        const link = document.createElement('a');
        link.href = lightboxImage.src;

        const filename = lightboxImage.src.split('/').pop() || 'tallinn-image.png';
        link.download = `tallinn-${filename}`;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        const originalText = downloadBtn.textContent;
        downloadBtn.textContent = 'Downloaded!';
        downloadBtn.style.background = '#27ae60';

        setTimeout(() => {
            downloadBtn.textContent = originalText;
            downloadBtn.style.background = 'transparent';
        }, 1500);
    }
}

function initializeLightbox() {
    createLightbox();

    const galleryImages = document.querySelectorAll('#gallery-images img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');
    const downloadBtn = document.getElementById('lightbox-download');

    let currentImageIndex = 0;

    // click events
    galleryImages.forEach((img, index) => {
        img.addEventListener('click', () => {
            currentImageIndex = index;
            openLightbox(img.src, img.alt);
        });

        img.style.cursor = 'pointer';
    });

    // open
    function openLightbox(src, alt) {
        lightboxImage.src = src;
        lightboxImage.alt = alt;
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    // close
    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // previous image nav thing
    function showPrevious() {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        const prevImg = galleryImages[currentImageIndex];
        lightboxImage.src = prevImg.src;
        lightboxImage.alt = prevImg.alt;
    }

    // next img nav thing
    function showNext() {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        const nextImg = galleryImages[currentImageIndex];
        lightboxImage.src = nextImg.src;
        lightboxImage.alt = nextImg.alt;
    }

    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', showPrevious);
    nextBtn.addEventListener('click', showNext);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.classList.contains('lightbox-overlay')) {
            closeLightbox();
        }
    });

    downloadBtn.addEventListener('click', downloadImage);
}

document.addEventListener('DOMContentLoaded', initializeLightbox);