export function normalizeEmail(email) {
    return email.trim().toLowerCase();
}

export function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        normalizeEmail(email)
    );
}

export function validatePassword(password) {
    return (
        password.length >= 8 &&
        /[A-Z]/.test(password) &&
        /[a-z]/.test(password) &&
        /\d/.test(password) &&
        /[^A-Za-z0-9]/.test(password)
    );
}

export function getPasswordError(password) {
    if (password.length < 8) {
        return "Password must contain at least 8 characters.";
    }

    if (!/[A-Z]/.test(password)) {
        return "Password must contain an uppercase letter.";
    }

    if (!/[a-z]/.test(password)) {
        return "Password must contain a lowercase letter.";
    }

    if (!/\d/.test(password)) {
        return "Password must contain a number.";
    }

    if (!/[^A-Za-z0-9]/.test(password)) {
        return "Password must contain a special character.";
    }

    return "";
}