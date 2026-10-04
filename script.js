const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbwy3vOl-NEwEygcKjD9X2eWxIun1yI6JvAALVzPxS1q4KnM6zFSB-NEj9c2E5y6rcNfOw/exec";

const button = document.getElementById("signupButton");
const serviceButtons = document.querySelectorAll(".service-button");

const form = document.getElementById("signupForm");
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const serviceInput = document.getElementById("service");
const formMessage = document.getElementById("formMessage");

// Главная кнопка "Записаться"
button.addEventListener("click", function () {
    document.getElementById("contacts").scrollIntoView({
        behavior: "smooth"
    });
});

// Кнопки услуг
serviceButtons.forEach(function(button) {
    button.addEventListener("click", function() {

        const service = button.dataset.service;

        serviceInput.value = service;

        document.getElementById("contacts").scrollIntoView({
            behavior: "smooth"
        });
    });
});

// Отправка формы
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const cleanPhone = phone.replace(/[()\-\s]/g, "");
    const service = serviceInput.value || "Не указано";

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

        formMessage.textContent = "Отправляем заявку...";
        formMessage.classList.add("success");

        const data = new URLSearchParams();

        data.append("name", name);
        data.append("phone", phone);
        data.append("service", service);

        fetch(GOOGLE_SCRIPT_URL, {
            method: "POST",
            mode: "no-cors",
            body: data
        })
        .then(function() {
            formMessage.textContent = "Заявка отправлена!";
            formMessage.classList.remove("error");
            formMessage.classList.add("success");

            nameInput.classList.add("input-success");
            phoneInput.classList.add("input-success");

            form.reset();
        })
        .catch(function() {
            formMessage.textContent =
                "Не удалось отправить заявку. Попробуйте ещё раз.";
            formMessage.classList.remove("success");
            formMessage.classList.add("error");
        });
    }
});

// Убираем подсветку при исправлении поля
nameInput.addEventListener("input", function() {
    nameInput.classList.remove("input-error", "input-success");
});

phoneInput.addEventListener("input", function() {
    phoneInput.classList.remove("input-error", "input-success");
});