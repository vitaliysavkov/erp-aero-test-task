import bcrypt from 'bcrypt';

const genPassword = (password) => {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
}

const validatePassword = (password, hash) => {
    return bcrypt.compare(password, hash);
}

export { genPassword, validatePassword }