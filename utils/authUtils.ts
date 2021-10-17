export function validateEmail(email: string) {
    const regex = new RegExp('^[A-Za-z0-9._%+-]+@uwaterloo.ca$');
    return regex.test(email);
}