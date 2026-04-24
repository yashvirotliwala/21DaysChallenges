const form = document.getElementById("myForm");
const popup = document.getElementById("popup");
const msg = document.getElementById("msg");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    let fname = getValue("fname");
    let lname = getValue("lname");
    let email = getValue("email");
    let phone = getValue("phone");
    let pass = getValue("password");
    let cpass = getValue("cpassword");

    if (fname == "" || lname == "" || email == "" || phone == "" || pass == "" || cpass == "") {
        showPopup("Please fill all details!", "error");
        return;
    }

    let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/i;

    if (!email.match(emailPattern)) {
        showPopup("Please enter valid email!", "error");
        return;
    }

    let phonePattern = /^[0-9]{10}$/;

    if (!phone.match(phonePattern)) {
        showPopup("Enter valid 10 digit number!", "error");
        return;
    }

    if (pass.length < 6) {
        showPopup("Password minimum 6 characters!", "error");
        return;
    }

    if (pass !== cpass) {
        showPopup("Passwords do not match!", "error");
        return;
    }

    showPopup("Registration Successful!", "success");
    form.reset();
});


function getValue(id) {
    return document.getElementById(id).value.trim();
}

function showPopup(text, type) {

    let icon = document.querySelector(".icon");

    msg.innerText = text;
    popup.style.display = "flex";

    if (type === "success") {
        icon.innerHTML = "✔";
        icon.style.color = "#22c55e";
    } else {
        icon.innerHTML = "✖";
        icon.style.color = "#ff4d6d";
    }
}

function closePopup() {
    popup.style.display = "none";
}

function focusName() {
    document.getElementById("fname").focus();
}