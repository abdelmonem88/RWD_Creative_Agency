//check if there is Local storage Color option
let mainColors = localStorage.getItem('color_option');
if (mainColors !== null) {
	document.documentElement.style.setProperty('--main-color', mainColors);
	//Remove active class from all li elements
	document.querySelectorAll('.colors-list li').forEach((element) => {
		element.classList.remove('active');
		//add active class on element with data-color === local storge item
		if (element.dataset.color === mainColors) {
			element.classList.add('active');
		}
	});
}

//Rnadom backgroun Option
let backgroundOption = true;
// Variable to control background interval
let backgroundInterval;
//check if local storage have random background item
let backgroundLocalItem = localStorage.getItem('background_option');
//check if random background option is not empty
if (backgroundLocalItem !== null) {
	if (backgroundLocalItem === 'true') {
		backgroundOption = true;
	} else {
		backgroundOption = false;
	}
	//remove active class from all spans
	document.querySelectorAll('.random-background-btns span').forEach((element) => {
		element.classList.remove('active');
	});
	if (backgroundLocalItem === 'true') {
		document.querySelector('.random-background-btns .yes').classList.add('active');
	} else {
		document.querySelector('.random-background-btns .no').classList.add('active');
	}
}

/* Add open class to setting box icon*/
let settingBox = document.querySelector('.setting-box');
let settingBoxIcon = document.querySelector('.toggle-setting i');
settingBoxIcon.addEventListener('click', function() {
	//Add rotation effect to setting box icon
	settingBoxIcon.classList.toggle('fa-spin');
	//Add class open to setting box
	settingBox.classList.toggle('open');
});
/* switch Colors */
const colorsLi = document.querySelectorAll('.colors-list li');
//loop on colors list
colorsLi.forEach((li) => {
	//Click on Every list item
	li.addEventListener('click', (e) => {
		//set color to root
		document.documentElement.style.setProperty('--main-color', e.target.dataset.color);

		//set color to local storage
		localStorage.setItem('color_option', e.target.dataset.color);

		//remove Active class from all children
		e.target.parentElement.querySelectorAll('.active').forEach((element) => {
			element.classList.remove('active');
			e.target.classList.add('active');
		});
	});
});

/* switch background */
const randomBackgroundBtn = document.querySelectorAll('.random-background-btns');
//loop on colors span
randomBackgroundBtn.forEach((span) => {
	//Click on Every list item
	span.addEventListener('click', (e) => {
		//remove Active class from all children
		e.target.parentElement.querySelectorAll('.active').forEach((element) => {
			//remove active class from all spans
			element.classList.remove('active');
			//add active class to clicked span
		});
		e.target.classList.add('active');

		if (e.target.dataset.background === 'yes') {
			backgroundOption = true;
			randomizeImgs();
			localStorage.setItem('background_option', 'true');
		} else {
			backgroundOption = false;
			clearInterval(backgroundInterval);
			localStorage.setItem('background_option', 'false');
		}
	});
});

/*Make random header background*/
//select landing page element
let landingPage = document.querySelector('.cover');
//get array of images
let imagesArray = [ '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg' ];
//change backgroud every 5 seconds

//function to randomize background
function randomizeImgs() {
	if (backgroundOption === true) {
		backgroundInterval = setInterval(() => {
			//create random number
			let randomNumber = Math.floor(Math.random() * imagesArray.length);
			//change background image
			landingPage.style.background = 'url("images/header/' + imagesArray[randomNumber] + '")';
			landingPage.style.backgroundSize = 'cover';
		}, 5000);
	}
}
randomizeImgs();

/*Make sticky navbar*/
let stickyNav = document.querySelector('.header-area');
let stickyNavbar = document.querySelectorAll('.stickyNavbar-option span');
let stickyNavbarItem = localStorage.getItem('stickyNavbar_option');

if (stickyNavbarItem !== null) {
	stickyNavbar.forEach((span) => {
		span.classList.remove('active');
	});
}

if (stickyNavbarItem === 'false') {
	window.addEventListener('scroll', function() {
		stickyNav.classList.remove('sticky');
	});
	document.querySelector('.stickyNavbar-option .no').classList.add('active');
} else {
	window.addEventListener('scroll', function() {
		stickyNav.classList.toggle('sticky', window.scrollY > 0);
	});
	document.querySelector('.stickyNavbar-option .yes').classList.add('active');
}

stickyNavbar.forEach((span) => {
	span.addEventListener('click', (e) => {
		handleActiveClass(e);

		if (e.target.dataset.stickynav === 'yes') {
			window.addEventListener('scroll', function() {
				stickyNav.classList.toggle('sticky', window.scrollY > 0);
			});
			localStorage.setItem('stickyNavbar_option', 'true');
		} else {
			window.addEventListener('scroll', function() {
				stickyNav.classList.remove('sticky');
			});
			localStorage.setItem('stickyNavbar_option', 'false');
		}
	});
});

//Select skills selector
let ourSkills = document.querySelector('.skills');

window.addEventListener('scroll', skillsAnimation);
function skillsAnimation() {
	//skills offset top
	let skillsOffsetTop = ourSkills.offsetTop;
	//skills outer height
	let skilldOuterHeight = ourSkills.offsetHeight;
	//window height
	let windowHeight = this.innerHeight;
	//window ScrollTop
	let windowScrollTop = this.pageYOffset;

	if (windowScrollTop > skillsOffsetTop + skilldOuterHeight - windowHeight) {
		// this.console.log('skill section reached');
		let allSkills = document.querySelectorAll('.skills .skill-prgress span');
		allSkills.forEach((skill) => {
			skill.style.width = skill.dataset.progress;
		});
	}
}
//Creat pop with images
let ourGallery = document.querySelectorAll('.gallery img');

ourGallery.forEach((img) => {
	img.addEventListener('click', (e) => {
		//create overlay element
		let overlay = document.createElement('div');
		//add class to over
		overlay.className = 'popup-overlay';
		//add overlay to body
		document.body.appendChild(overlay);
		//create popup box
		let popupBox = document.createElement('div');
		//add class to popup
		popupBox.className = 'popup-box';
		//check if alt is not empty
		if (img.alt !== null) {
			//create heading
			let imgHeading = document.createElement('h3');
			// create text for heading
			let imgtext = document.createTextNode(img.alt);
			// append text to heading
			imgHeading.appendChild(imgtext);
			//append heading to popup
			popupBox.appendChild(imgHeading);
		}
		//create the image
		let popupimage = document.createElement('img');
		//set img source
		popupimage.src = img.src;
		//add image to popup box
		popupBox.appendChild(popupimage);
		//add popup box to body
		overlay.appendChild(popupBox);
		//create close span
		let closeButton = document.createElement('span');
		//creat close button text
		let closeButtonText = document.createTextNode('X');
		//append text to close button
		closeButton.appendChild(closeButtonText);
		//add class to close button
		closeButton.className = 'close-button';
		//add close button to overlay
		popupBox.appendChild(closeButton);
		closeButton.addEventListener('click', function() {
			popupBox.remove();
			overlay.remove();
		});
	});
});

/* control navigation bullets */
let navBullets = document.querySelector('.nav-bullets');
let navBulletsBtns = document.querySelectorAll('.bullets-option span');
let bulletsLocalItem = localStorage.getItem('bullets_option');

if (bulletsLocalItem !== null) {
	navBulletsBtns.forEach((span) => {
		span.classList.remove('active');
	});
}

if (bulletsLocalItem === 'block') {
	navBullets.style.display = 'block';
	document.querySelector('.bullets-option .yes').classList.add('active');
} else {
	navBullets.style.display = 'none';
	document.querySelector('.bullets-option .no').classList.add('active');
}
navBulletsBtns.forEach((span) => {
	span.addEventListener('click', (e) => {
		handleActiveClass(e);

		if (e.target.dataset.bullets === 'yes') {
			navBullets.style.display = 'block';
			localStorage.setItem('bullets_option', 'block');
		} else {
			navBullets.style.display = 'none';
			localStorage.setItem('bullets_option', 'none');
		}
	});
});

/* Move to selected section function*/
//select all bullets
const allBullets = document.querySelectorAll('.nav-bullets .bullet');
//select all links
const allLinks = document.querySelectorAll('.links a');

function scrollToSection(elements) {
	elements.forEach((element) => {
		//add click event
		element.addEventListener('click', (e) => {
			e.preventDefault();
			//use scroll to view web API
			document.querySelector(e.target.dataset.section).scrollIntoView({
				behavior: 'smooth'
			});
		});
	});
}
scrollToSection(allBullets);
scrollToSection(allLinks);

//handle active calss function
function handleActiveClass(ev) {
	//remove Active class from all children
	ev.target.parentElement.querySelectorAll('.active').forEach((element) => {
		//remove active class from all spans
		element.classList.remove('active');
		//add active class to clicked span
		ev.target.classList.add('active');
	});
}

/* Reset button*/
let resetBtn = document.querySelector('.reset-options');
resetBtn.addEventListener('click', resetOtions);
function resetOtions() {
	localStorage.removeItem('background_option');
	localStorage.removeItem('color_option');
	localStorage.removeItem('bullets_option');
	localStorage.removeItem('stickyNavbar_option');

	//reloud window
	window.location.reload();
}
//totop button
var toTop = document.querySelector('.toTop');

window.addEventListener('scroll', function() {
	toTop.classList.toggle('show', window.scrollY > 500);
});

toTop.addEventListener('click', (e) => {
	e.preventDefault();
	//use scroll to view web API
	document.querySelector('.cover').scrollIntoView({
		behavior: 'smooth'
	});
});

//toggle menu
let toggleBtn = document.querySelector('.toggle-menu');
let links = document.querySelector('.links');

toggleBtn.addEventListener('click', function(e) {
	//stop propagation
	e.stopPropagation();
	// add class menu-active to button
	this.classList.toggle('menu-active');
	// add class open to links
	links.classList.toggle('open');
});

//click anywhere outside menu and toggle button
document.addEventListener('click', (e) => {
	if (e.target !== toggleBtn && e.target !== links) {
		//check if menu is opened
		if (links.classList.contains('open')) {
			// add class menu-active to button
			toggleBtn.classList.toggle('menu-active');
			// add class open to links
			links.classList.toggle('open');
		}
	}
});
//stop propagation
links.onclick = function(e) {
	e.stopPropagation();
};
