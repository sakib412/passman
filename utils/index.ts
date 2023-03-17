import { message } from "antd";

export async function copyToClipboard(text: string): Promise<void> {
    return navigator.clipboard.writeText(text)
        .then(() => {
            // antd success notification
            message.success("Copied to clipboard", 1.5)
        })
        .catch((error) => {
            // antd error notification
            message.error("Error copying text", 1.5)
            console.error("Error copying text: ", error);
        });
}

export function generatePassword(
    passwordLength = 16,
    minNums = 3,
    minSpecialChars = 2,
    allowCapital = true,
    allowSmall = true,
    allowDigits = true,
    allowSpecialChars = true,
    avoidAmbiguous = true
) {
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const digitChars = "0123456789";
    const specialChars = "!@#$%^&*";
    const ambiguousChars = "1lIO0";

    let chars = lowercaseChars;
    let password = "";

    if (allowCapital) chars += uppercaseChars;
    if (allowDigits) chars += digitChars;
    if (allowSpecialChars) chars += specialChars;

    while (password.length < passwordLength) {
        let char = chars[Math.floor(Math.random() * chars.length)];

        if (allowSmall && !allowCapital) {
            char = char.toLowerCase();
        } else if (!allowSmall && allowCapital) {
            char = char.toUpperCase();
        }

        if (allowSpecialChars && !specialChars.includes(char)) {
            if (Math.random() < 0.5 || password.length < minSpecialChars) {
                char = specialChars[Math.floor(Math.random() * specialChars.length)];
            }
        }

        if (allowDigits && !digitChars.includes(char)) {
            if (Math.random() < 0.5 || password.length < minNums) {
                char = digitChars[Math.floor(Math.random() * digitChars.length)];
            }
        }

        if (avoidAmbiguous && ambiguousChars.includes(char)) {
            continue;
        }

        password += char;
    }

    return password;
}



export function generatePassword2(
    passwordLength = 8,
    minNums = 2,
    minSpecialChars = 2,
    allowCapital = true,
    allowSmall = true,
    allowDigits = true,
    allowSpecialChars = true,
    avoidAmbiguous = true
) {
    // Define the character sets we'll be using
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const digitChars = "0123456789";
    const specialChars = "!@#$%^&*";
    const ambiguousChars = "1lIO0";

    // Start with the set of lowercase characters
    let chars = lowercaseChars;
    // Initialize the password string
    let password = "";

    // If capital letters are allowed, add them to the character set
    if (allowCapital) {
        chars += uppercaseChars;
    }

    // If digits are allowed, add them to the character set
    if (allowDigits) {
        chars += digitChars;
    }

    // If special characters are allowed, add them to the character set
    if (allowSpecialChars) {
        chars += specialChars;
    }

    // If the "avoid ambiguous characters" option is selected, remove ambiguous characters from the character set
    if (avoidAmbiguous) {
        chars = chars.replace(new RegExp('[' + ambiguousChars + ']', 'g'), '');
    }

    // Loop until the password is the desired length
    while (password.length < passwordLength) {
        // Choose a random character from the character set
        const char = chars[Math.floor(Math.random() * chars.length)];

        // If capital letters are not allowed, convert the character to lowercase
        if (!allowCapital) {
            password += char.toLowerCase();
            // If small letters are not allowed, convert the character to uppercase
        } else if (!allowSmall) {
            password += char.toUpperCase();
            // Otherwise, use the character as-is
        } else {
            password += char;
        }

        // If special characters are allowed and the chosen character is a special character,
        // check if we've already included enough special characters in the password
        if (allowSpecialChars && specialChars.includes(char) &&
            password.match(new RegExp('[' + specialChars + ']', 'g'))?.length || 0 < minSpecialChars) {
            // If we haven't included enough special characters, skip to the next character
            continue;
        }

        // If digits are allowed and the chosen character is a digit,
        // check if we've already included enough digits in the password
        if (allowDigits && digitChars.includes(char) &&
            password.match(new RegExp('[' + digitChars + ']', 'g'))?.length || 0 < minNums) {
            // If we haven't included enough digits, skip to the next character
            continue;
        }
    }

    // Return the generated password
    return password;
}


export function getExportFileName(name: string = "export", ext: string = "csv"): string {
    const date = new Date();
    const timestamp = `${date.getFullYear()}-${date.getMonth() +
        1}-${date.getDate()}_${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;
    return `${name}_${timestamp}.${ext}`;
}
