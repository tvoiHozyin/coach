const button = document.getElementById("signupButton");
const serviceButtons = document.querySelectorAll(".service-button");

button.addEventListener("click", function () {
    document.getElementById("contacts").scrollIntoView({
        behavior: "smooth"
    });
});

serviceButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        document.getElementById("contacts").scrollIntoView({
            behavior: "smooth"
        });
    });
});

const form = document.getElementById("signupForm");

const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const formMessage = document.getElementById("formMessage");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const cleanPhone = phone.replace(/[()\-\s]/g, "");

    nameInput.classList.remove("input-error", "input-success");
    phoneInput.classList.remove("input-error", "input-success");
    formMessage.classList.remove("success", "error");

    if (name === "" || phone === "") {

        formMessage.textContent = "Заполните все поля!";
        formMessage.classList.add("error");

        if (name === "") {
            nameInput.classList.add("input-error");
        } else {
            nameInput.classList.add("input-success");
        }

        if (phone === "") {
            phoneInput.classList.add("input-error");
        }
    }

    else if (!/^(\+7|8)\d{10}$/.test(cleanPhone)) {

        formMessage.textContent = "Введите корректный номер телефона!";
        formMessage.classList.add("error");

        nameInput.classList.add("input-success");
        phoneInput.classList.add("input-error");
    }

    else {

        formMessage.textContent = "Заявка принята!";
        formMessage.classList.add("success");

        nameInput.classList.add("input-success");
        phoneInput.classList.add("input-success");

        form.reset();
    }
});

nameInput.addEventListener("input", function() {
    nameInput.classList.remove("input-error", "input-success");
});

phoneInput.addEventListener("input", function() {
    phoneInput.classList.remove("input-error", "input-success");
});