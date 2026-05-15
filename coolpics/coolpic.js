const gallery = document.querySelector('.gallery');
const modal = document.querySelector('dialog');
const modalImage = modal.querySelector('img');
const closeButton = modal.querySelector('.close-viewer');

const menuButton = document.querySelector('.menubtn');
const nav = document.querySelector('nav');
// Event listener for opening the modal
gallery.addEventListener('click', openModal);

function openModal(e) {
    
// Code to show modal  - Use event parameter 'e'
    console.log(e);
    console.log(e.target);
    modalImage.src = e.target.src.replace('n','n-full');
    modalImage.alt = e.target.alt;
    modal.showModal();
    
}
// Close modal on button click
closeButton.addEventListener('click', () => {
    modal.close();
});

// Close modal if clicking outside the image
modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.close();
    }
});
          
menuButton.addEventListener('click', () => {
    nav.classList.toggle('open');
});