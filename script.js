// CAPTCHA Generation
function generateCaptcha() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
        captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return captcha;
}

let currentCaptcha = generateCaptcha();

// DOM Elements
const refreshCaptchaBtn = document.getElementById('refreshCaptcha');
const captchaDisplay = document.getElementById('captchaDisplay');
const captchaInput = document.getElementById('captcha');
const loginForm = document.getElementById('loginForm');
const applicationNumberInput = document.getElementById('applicationNumber');
const passwordInput = document.getElementById('password');
const forgotPasswordLink = document.getElementById('forgotPassword');
const successMessage = document.getElementById('successMessage');

function setCaptcha() {
    currentCaptcha = generateCaptcha();
    captchaDisplay.textContent = currentCaptcha;
    captchaInput.value = '';
    hideError('captchaError');
}

refreshCaptchaBtn.addEventListener('click', function(e) {
    e.preventDefault();
    setCaptcha();
});

// Show/Hide error messages
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (message) {
        errorElement.textContent = message;
    }
    errorElement.style.display = 'block';
}

function hideError(elementId) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.style.display = 'none';
    }
}

// Clear errors on input
applicationNumberInput.addEventListener('input', function() {
    hideError('appNumberError');
});

passwordInput.addEventListener('input', function() {
    hideError('passwordError');
});

captchaInput.addEventListener('input', function() {
    hideError('captchaError');
});

// Form submission
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const appNum = applicationNumberInput.value.trim();
    const pwd = passwordInput.value.trim();
    const captchaVal = captchaInput.value;
    // CAPTCHA check (case-sensitive)
    if (captchaVal !== currentCaptcha) {
        alert('Invalid CAPTCHA. Please try again.');
        setCaptcha();
        return;
    }
    // Application Number and Password check
    if (appNum === '231037474210' && pwd === '32179566746') {
        document.querySelector('.form-container').style.display = 'none';
        document.getElementById('resultImages').style.display = 'block';
    } else {
        alert('Wrong Application Number or Password');
    }
});

// Forgot password functionality
forgotPasswordLink.addEventListener('click', function(e) {
    e.preventDefault();
    alert('Please contact NTA support for password recovery.');
});

// Set initial captcha on load
setCaptcha();