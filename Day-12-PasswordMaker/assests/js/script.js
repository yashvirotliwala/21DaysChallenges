const password = document.getElementById("password");
const lengthInput = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");
const copyBtn = document.getElementById("copyBtn");
const strengthBar = document.getElementById("strengthBar");

// Show live length value
lengthInput.addEventListener("input", () => {
    lengthValue.innerText = lengthInput.value;
});

// Generate Password
function generatePassword() {

    let uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let lowercase = "abcdefghijklmnopqrstuvwxyz";
    let numbers   = "0123456789";
    let symbols   = "!@#$%^&*()_+{}[]<>?/";

    let finalChars = "";

    // Only selected options add chars
    if (document.getElementById("uppercase").checked) {
        finalChars += uppercase;
    }

    if (document.getElementById("lowercase").checked) {
        finalChars += lowercase;
    }

    if (document.getElementById("numbers").checked) {
        finalChars += numbers;
    }

    if (document.getElementById("symbols").checked) {
        finalChars += symbols;
    }

    // If nothing selected
    if (finalChars === "") {
        alert("Please select at least one option.");
        return;
    }

    let pass = "";
    let passLength = Number(lengthInput.value);

    // Exact selected length password
    for (let i = 0; i < passLength; i++) {
        let randomIndex = Math.floor(Math.random() * finalChars.length);
        pass += finalChars[randomIndex];
    }

    password.value = pass;

    checkStrength(pass);
}

// Strength Check
function checkStrength(pass) {

    let score = 0;

    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[a-z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    let width = (score / 5) * 100;
    strengthBar.style.width = width + "%";

    if (score <= 2) {
        strengthBar.style.background = "red";
    } else if (score <= 4) {
        strengthBar.style.background = "orange";
    } else {
        strengthBar.style.background = "green";
    }
}

copyBtn.addEventListener("click", () => {

    if (password.value === "") return;

    navigator.clipboard.writeText(password.value);

    copyBtn.innerText = "Copied!";

    setTimeout(() => {
        copyBtn.innerText = "Copy";
    }, 1500);
});

// Auto First Password
generatePassword();