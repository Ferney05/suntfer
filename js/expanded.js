function expandImage(img) {
    const overlay = document.getElementById('overlay');
    const expandedImg = document.getElementById('expandedImg');
    
    overlay.style.display = 'flex';
    expandedImg.src = img.src;
}

function closeImage() {
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'none';
}
