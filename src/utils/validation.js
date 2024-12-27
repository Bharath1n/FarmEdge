export const validateSignup = (mobile, username, password, confirmPassword) => {
    const errors = {};

    if (!username) {
        errors.username = 'Username is required';
    }

    if (!mobile) {
        errors.mobile = 'Mobile number is required';
    }

    if (!password) {
        errors.password = 'Password is required';
    } else if (password !== confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
    }

    return errors;
};