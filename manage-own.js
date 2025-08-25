

const close = document.querySelector('.bi-x-lg');
const hamburger = document.querySelector('.bi-list');
const navul = document.querySelector('nav ul');
const form = document.getElementById('email-form');
const email = document.getElementById('email');
const small = form.querySelector('small');


// the // hamburger menu

hamburger.addEventListener('click', () => {
  navul.style.display = 'flex';
  hamburger.style.display = 'none';
  close.style.display = 'block';
})

// the close button
close.addEventListener('click', () => {
  navul.style.display = 'none';
  hamburger.style.display = 'flex';
  close.style.display = 'none';
})





// email validation 

function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess()
    } else {
        showError('Please insert a valid email')
    }
};

// show Error Message
function showError(message) {
    form.classList.add('error')
    small.innerText = message
};

// show success
function showSuccess() {
    form.className = 'email-form'
    small.innerText = ''
    email.value = ''
};


// email submit

form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (email.value != '') {
        checkEmail(email)
    } else {
        showError('Email field is empty')
    }

});



// slider show



let cardIndex = 1; 
showCards(cardIndex);

// When user clicks a dot
function currentCard(n) {
  showCards(cardIndex = n);
}

function showCards(n) {
  const cards = document.querySelectorAll(".reviews-div > div"); 
  const dots = document.querySelectorAll(".dots span"); 

  // Reset if user clicks beyond range
  if (n > cards.length) { cardIndex = 1; }
  if (n < 1) { cardIndex = cards.length; }

  // Hide all cards
  for (let i = 0; i < cards.length; i++) {
    cards[i].style.display = "none";
  }

  // Remove active class from all dots
  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.remove("active");
  }

  // Show the current card
  cards[cardIndex - 1].style.display = "flex";

  // Highlight the active dot
  dots[cardIndex - 1].classList.add("active");
}







