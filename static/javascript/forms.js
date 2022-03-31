const form = document.querySelector("form");

// immediately unrequiring the form in HTML as soon as the script is enabled
const unrequire = () => {
	document.getElementById("fname").removeAttribute("required");
	document.getElementById("lname").removeAttribute("required");
	document.getElementById("email").removeAttribute("required");
	document.getElementById("password").removeAttribute("required");
	document.getElementById("password2").removeAttribute("required");
}

unrequire();

form.addEventListener("submit", (event) => {
	const inputFields = event.target.querySelectorAll("input");
	const errorDiv = event.target.querySelector("div#error");

	const password = form.password.value;
	const confirmpassword = form.password2.value;
	const passwordinput = document.querySelector("#password");
	const confirmpasswordinput = document.querySelector("#password2");

	event.preventDefault();

	if (!inputFields[0].value || !inputFields[1].value) {
		errorDiv.classList.add("emptyinput");
		errorDiv.innerHTML = "<span>Error:</span> Input is empty.";
		inputFields.forEach(element => {
			element.classList.add("wronginput");
		});
	} 
	
	else if (password != confirmpassword) {
		passwordinput.classList.add("passworderror");
		confirmpasswordinput.classList.add("passworderror");
		errorDiv.classList.add("emptyinput");
		errorDiv.innerHTML = "Match Passwords.";
		return false;
	} 
	
	else {
		event.target.submit();
	}
});