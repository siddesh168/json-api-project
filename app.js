const apiEndpoint = 'https://jsonplaceholder.typicode.com/posts';
const cardContainer = document.getElementById('cardContainer');
const searchInput = document.getElementById('searchInput');
const languageFilter = document.getElementById('languageFilter');
const imageModal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const otherImages = document.querySelectorAll('.other-image');
const closeModal = document.querySelector('.close');
const backToHome = document.getElementById('backToHome');

const languages = ["English", "Kannada", "Hindi", "Telugu", "Tamil", "Malayalam"];

async function fetchData() {
    const response = await fetch(apiEndpoint);
    const data = await response.json();
    data.forEach(item => {
        displayCard(item);
    });
}

function displayCard(data) {
    const card = document.createElement('div');
    card.className = 'card';

    const posterImage = document.createElement('img');
    posterImage.src = `https://picsum.photos/300/200?random=${data.id}`;
    posterImage.alt = 'Poster image';

    posterImage.onclick = () => {
        openModal(posterImage.src);
    };

    const title = document.createElement('h3');
    title.textContent = `${data.title}`;

    const likes = document.createElement('p');
    let likeCount = Math.floor(Math.random() * 1000) + 1;
    likes.innerHTML = `<span class="like-btn"></span> Likes: <span class="like-count">${likeCount}</span>`;

    const thumbsUpBtn = document.createElement('button');
    thumbsUpBtn.className = 'thumbs-up-btn';
    thumbsUpBtn.innerHTML = '👍'; 
    thumbsUpBtn.onclick = () => {
        likeCount++;
        likes.querySelector('.like-count').textContent = likeCount;
    };

    const views = document.createElement('p');
    let viewCount = Math.floor(Math.random() * 500) + 1;
    views.className = 'views';
    views.innerHTML = `Views: <span class="view-count">${viewCount}</span> `;

    const languageText = languages[Math.floor(Math.random() * languages.length)];
    const language = document.createElement('p');
    language.textContent = `Language: ${languageText}`;
    card.setAttribute('data-language', languageText);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => card.remove();

    viewCount++;
    views.querySelector('.view-count').textContent = viewCount;

    card.appendChild(posterImage);
    card.appendChild(title);
    card.appendChild(likes);
    card.appendChild(thumbsUpBtn);
    card.appendChild(views);
    card.appendChild(language);
    card.appendChild(deleteBtn);

    cardContainer.appendChild(card);
}

// Open Modal to View Images
function openModal(imageSrc) {
    modalImage.src = imageSrc;

    // Set other images in the modal
    for (let i = 0; i < otherImages.length; i++) {
        otherImages[i].src = `https://picsum.photos/300/200?random=${Math.floor(Math.random() * 1000)}`;
        otherImages[i].onclick = () => {
            modalImage.src = otherImages[i].src; // Change the main image when other images are clicked
        };
    }

    imageModal.style.display = 'block'; // Show the modal
}

// Close the modal when the user clicks on <span> (x)
closeModal.onclick = () => {
    imageModal.style.display = 'none'; // Hide the modal
}

// Close the modal when the user clicks anywhere outside of the modal
window.onclick = (event) => {
    if (event.target === imageModal) {
        imageModal.style.display = 'none'; // Hide the modal
    }
}

// Go back to card view
backToHome.onclick = () => {
    imageModal.style.display = 'none'; // Hide the modal
}

searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        card.style.display = title.includes(query) ? 'block' : 'none';
    });
});

languageFilter.addEventListener('change', (e) => {
    const selectedLanguage = e.target.value;
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const language = card.getAttribute('data-language');
        card.style.display = (selectedLanguage === '' || language === selectedLanguage) ? 'block' : 'none';
    });
});

const loginButton = document.getElementById("loginButton");
const signInButton = document.getElementById("signInButton");
const authModal = document.getElementById("authModal");
const closeAuthModal = authModal.querySelector(".close");
const authForm = document.getElementById("authForm");

loginButton.onclick = () => {
    authModal.style.display = "block";
};
signInButton.onclick = () => {
    authModal.style.display = "block";
};

closeAuthModal.onclick = () => {
    authModal.style.display = "none";
};

window.onclick = (event) => {
    if (event.target === authModal) {
        authModal.style.display = "none";
    }
};

authForm.onsubmit = (event) => {
    event.preventDefault();
    alert(`Username: ${authForm.username.value}\nPassword: ${authForm.password.value}`);
    authModal.style.display = "none";
};

fetchData();
