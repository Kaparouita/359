

document.addEventListener("DOMContentLoaded", function() {

  const submitButton = document.getElementById("submit-button");
  const username = document.getElementById("username");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");
  const firstname = document.getElementById("firstname");
  const lastname = document.getElementById("lastname");
  const birthdate = document.getElementById("birthdate");
  const gender = document.getElementById("gender");
  const type = document.getElementById("type"); // keeper or owner
  const personalpage = document.getElementById("personalpage");
  const job = document.getElementById("job");
  const toggleButton = document.getElementById("togglePassword");
  const toggleConfirmButton = document.getElementById("toggleConfirmPassword");

  const passwordIcon = document.getElementById("passwordIcon");
  const confirmPasswordIcon = document.getElementById("confirmPasswordIcon");

  const passwordValidationMessage = document.getElementById("passwordValidationMessage");
  const confirmPasswordValidationMessage = document.getElementById("confirmPasswordValidationMessage");

  const checkPassword = document.getElementById("toggleCheckPassword");
  const checkConfirmPassword = document.getElementById("toggleCheckConfirmPassword");
  
  //----------------------VALIDATION----------------------//

  checkPassword.addEventListener("click", function() {
    const {message,valid} = validatePassword(password, confirmPassword)
    passwordValidationMessage.className = "text-" + valid;
    passwordValidationMessage.textContent = message;
    console.log(message);
  });

  checkConfirmPassword.addEventListener("click", function() {
    const {message,valid} = validatePassword(password, confirmPassword)
    confirmPasswordValidationMessage.className = "text-" + valid;
    confirmPasswordValidationMessage.textContent = message;
    console.log(message);
  });

  toggleButton.addEventListener("click", function() {
    if (password.type === "password") {
      password.type = "text";
      passwordIcon.className = "bi bi-eye-slash";
    } else {
      password.type = "password";
      passwordIcon.className = "bi bi-eye";
    }
  });

  toggleConfirmButton.addEventListener("click", function() {
    if (confirmPassword.type === "password") {
      confirmPassword.type = "text";
      confirmPasswordIcon.className = "bi bi-eye-slash";
    } else {
      confirmPassword.type = "password";
      confirmPasswordIcon.className = "bi bi-eye";
    }
  });


  var form = document.getElementById("registerForm");
  form.addEventListener("submit", function(event){
    if (!validateForm()) {
      console.log("fail");
      alert("Incorrect password");
      event.preventDefault();
      return false; // Prevent form submission
    }
    console.log("success")
    alert("Form submitted");
    return true; // Allow form submission
  });


  
  
  //----------------------KEEPER----------------------//
  toggleKeeperVisibility(false); // initially hide keeper elements

  type.addEventListener("change", function() {
    if (type.value === "keeper") {
      toggleKeeperVisibility(true);
    } else {
      toggleKeeperVisibility(false);
    }
  });

  const catLabel = document.getElementById("catLabel");
  const spaceType = document.getElementById("space-type");
  spaceType.addEventListener("change", function() {
    if (!checkSpaceType(spaceType.value)) {
      catPrice.style.display = "none";
      catCheckbox.style.display = "none";
      catLabel.style.display = "none";
    } 
    else {
      catCheckbox.style.display = "block";
      catLabel.style.display = "block";
    }
  });

  const catCheckbox = document.getElementById("cat");
  const catPrice = document.querySelector(".catPrice");
  catCheckbox.addEventListener("change", function () {
    if (catCheckbox.checked) {
      catPrice.style.display = "block";
      catPrice.style.required = true;
    } else {
      catPrice.style.display = "none";
    }
  });

  const dogCheckbox = document.getElementById("dog");
  const dogPrice = document.querySelector(".dogPrice");
  dogCheckbox.addEventListener("change", function () {
    if (dogCheckbox.checked) {
      dogPrice.style.display = "block";
      dogPrice.style.required = true;
    } else {
      dogPrice.style.display = "none";
    }
  });
});



function contains50PercentNumbers(password) {
  const numbers = password.match(/\d/g);
  if (!numbers) {
    return false;
  }
  return numbers.length / password.length >= 0.5;
}

function containsKeyWord(password) {
  const keyWords = ["dog","cat","gata","skylos"];
  for (var i = 0; i < keyWords.length; i++) {
    if (password.includes(keyWords[i])) {
      return true;
    }
  }
  return false;
}

function validateForm() {
  let resp = validatePassword(password, confirmPassword);
  if (resp.valid === "danger") {
    return false;
  }
  return true;
}

function containsCapLetterSymbolNumber(password) {
  const regex = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*\d).+$/;
  return regex.test(password);
}

function validatePassword(password, confirmPassword) {
  var pattern = /^(?=.*[!@#$%^&*])(?=.*[a-zA-Z])(?=.*\d).*$/;

  if (password.value !== confirmPassword.value) {
    return { message: "Passwords do not match", valid: "danger" };
  } else if (password.value.length < 8) {
    return { message: "Password is too short", valid: "danger" };
  } else if (password.value.length > 15) {
    return { message: "Password is too long", valid: "danger" };
  } else if (pattern.test(password.value) === false) {
    return { message: "Password contains invalid characters(at least one special symbol,letter,number)", valid: "danger" };
  } else if (contains50PercentNumbers(password.value) === true) {
    return { message: "Password contains 50% numbers", valid: "danger" };
  } else if (containsKeyWord(password.value) === true) {
    return { message: "Password contains a keyword", valid: "danger" };
  } else if (containsCapLetterSymbolNumber(password.value) === true) {
    return { message: "Password is strong", valid: "success" };
  }
  return { message: "Password is medium", valid: "warning" };
}


function toggleKeeperVisibility(condition) {
  var keeperElements = document.getElementsByClassName("keeper");

  // Loop through all elements with class 'keeper'
  for (var i = 0; i < keeperElements.length; i++) {
    if (condition) {
      keeperElements[i].style.display = "block"; // Make visible
    } else {
      keeperElements[i].style.display = "none"; // Hide
    }
  }
}

function checkSpaceType(space){
  if(space === "outdoor"){
    return false;
  }
  return true;
}

