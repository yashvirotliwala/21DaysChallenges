const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const title = document.getElementById("title");
const subtitle = document.getElementById("subtitle");
const nameField = document.getElementById("name");
const authForm = document.getElementById("authForm");
const switchText = document.getElementById("switchText");
const submitBtn = document.querySelector(".submit-btn");
const password = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

let isLogin = true;

/* Mode Switch */
function loginMode(){
  isLogin = true;
  loginBtn.classList.add("active");
  signupBtn.classList.remove("active");

  title.innerText = "Welcome Back";
  subtitle.innerText = "Login to continue";
  submitBtn.innerText = "Login";

  nameField.style.display = "none";

  switchText.innerHTML =
  `Don't have account? <span onclick="signupMode()">Signup</span>`;
}

function signupMode(){
  isLogin = false;
  signupBtn.classList.add("active");
  loginBtn.classList.remove("active");

  title.innerText = "Create Account";
  subtitle.innerText = "Signup to get started";
  submitBtn.innerText = "Signup";

  nameField.style.display = "block";

  switchText.innerHTML =
  `Already have account? <span onclick="loginMode()">Login</span>`;
}

loginBtn.onclick = loginMode;
signupBtn.onclick = signupMode;

/* Password Show Hide */
togglePassword.onclick = () => {
  password.type =
  password.type === "password" ? "text" : "password";
};

/* Form Submit */
authForm.addEventListener("submit", function(e){
  e.preventDefault();

  const name = nameField.value.trim();
  const email = document.getElementById("email").value.trim();
  const pass = password.value.trim();

  if(email === "" || pass === ""){
    alert("Please fill all fields");
    return;
  }

  /* Signup */
  if(!isLogin){

    if(name === ""){
      alert("Enter full name");
      return;
    }

    const userData = {
      name:name,
      email:email,
      password:pass
    };

    localStorage.setItem("user", JSON.stringify(userData));

    alert("Signup Successful ✅");

    authForm.reset();
    loginMode();
  }

  /* Login */
  else{

    const savedUser =
    JSON.parse(localStorage.getItem("user"));

    if(savedUser === null){
      alert("Please Signup First");
      return;
    }

    if(
      savedUser.email === email &&
      savedUser.password === pass
    ){
      alert("Login Successful ✅ Welcome " + savedUser.name);
      authForm.reset();
    }
    else{
      alert("Invalid Credentials ❌");
    }
  }
});