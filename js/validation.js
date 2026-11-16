const rules = {
    login: {
        test: (v) => /^[A-Za-z0-9]{6,}$/.test(v),
        message: "Только латиница и цифры, не менее 6 символов",
    },
    password: {
        test: (v) => v.length >= 8,
        message: "Пароль должен быть не короче 8 символов",
    },
    full_name: {
        test: (v) => /^[А-Яа-яЁё]+$/.test(v),
        message: "Только кирилица и пробелы",
    },
    phone: {
        test: (v) => /^8\(\d{3}\)\d{3}-\d{2}-\d{2}$/.test(v),
        message: "Формат: 8(ХХХ)ХХХ-ХХ-ХХ",
    },
    email: {
        test: (v) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v),
        message: "Формат: name@example.ru",
    },
};

function showError (input, text) {
    const errorBox = input.parentElement.querySelector(".form__error");
    errorBox.textContent = text;
    input.classList.toggle("is_invalid", text !== "");
}

function checkField(input, useRules) {
    const value = input.value.trim();
    if (value === "") {
        showError(input, "Поле обязательно для заполнения");
        return false;
    }
    const rule = rules[input.name];
    if (useRules && rule && !rule.test(value)) {
        showError(input, rule.message);
        return false;
    }
    showError(input, "");
    return true;
}

const form = document.querySelector("#registerForm") ||
document.querySelector("#loginForm");
const useRules = form && form.id === "registerForm";

if (form) {
    const inputs = form.querySelectorAll("input");

    inputs.forEach((input) => {
        input.addEventListener("blur", () => checkField(input, useRules));
    });

    form.addEventListener("submit", (event) => {
        let allValid = true;
        inputs.forEach((input) => {
            if (!checkField(input, useRules)) {
                allValid = false;
            }
        })
            if (!allValid) {
            event.preventDefault();
        }
    });
}