import zxcvbn from "zxcvbn";

export function checkPassword(password: string) {
    return zxcvbn(password).score;
}