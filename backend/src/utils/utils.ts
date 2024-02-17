import bcrypt from 'bcrypt';

const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
const regexp = new RegExp(PASSWORD_REGEX);

export function validatePassword(password: string): boolean {

    let result = false;
    result = regexp.test(password);
    return result;
}
export function comparePassword(userPassword: string, password: string) {
    return bcrypt.compareSync(password, userPassword);
}
export function hashPassword(password: string) {
    return bcrypt.hashSync(password, 10)
}
export function stringIsNullOrEmpty(testString: string){
    return (!testString || testString.trim() === '') ? true : false;
}