document.addEventListener('DOMContentLoaded', function () {
    const overlay = document.getElementById('overlay');
    if (overlay) {
        overlay.addEventListener('click', function (event) {
            if (event.target === overlay) {
                closeOverlay();
            }
        });
    }
});

document.addEventListener('keydown', function (event) {
    if (event.key === "Escape") {
        closeOverlay();
    }
});