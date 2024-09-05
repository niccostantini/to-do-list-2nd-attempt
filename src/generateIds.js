const ids = []

function generateId() {
    function generateRandomSequence(length = 6) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let string = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            string += characters[randomIndex];
        }
        return string;
    }

    function checkExistence(result) {
        if (!ids.includes(result)) {
            ids.push(result);
            return result;
        } else {
            result = generateRandomSequence();
            return checkExistence(result); // Pass the new result to the recursive call
        }
    }
    let result = generateRandomSequence();
    return checkExistence(result);
}


export {generateId};