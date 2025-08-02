const symbols = [
    'B', 'D', 'F', 'G', 'H', 'J', 'L', 'M', '♠', '♥', '♦', '♣', '#',
    'N', 'Q', 'R', 'S', 'T', 'W', 'Y', '!', '●', '▲', '■', '+', '-',
    'b', 'd', 'f', 'g', 'h', 'j',      'm', '$', '*', '/', ':', '~',
    'n', 'q', 'r', 's', 't', 'w', 'y', '?', '%', '&', '(', '=', ')',
    '2', '3', '4', '5', '6', '7', '8', '9', '↑', '↓', '←', '→', '@'
];

const cipher = [
    21, 35, 46,  4, 13, 63, 26, 16,
    58, 47, 30, 32, 15, 62, 54, 55,
    9, 41, 59, 49,  2, 22, 61, 56,
    40, 19, 52, 50,  1, 11, 10, 53,
    14, 27, 18, 44, 33, 45, 37, 48,
    25, 42,  6, 57, 60, 23, 51, 24
];

// Default values
let game = "Ages";
let gameID = 10494;
let heroName = convertStringToBinary("Link");
let childName = convertStringToBinary("Child");
let animal = 5;
let behavior = 0;
let isLinkedGame = false;
let isHeroQuest = false;

let memory = "";
let isReturnSecret = true;

let wasGivenFreeRing = true;

let unknown58 = false;
let unknown59 = false;
let unknown88 = true;

function getAnimal(animalName: string): number {
    switch (animalName) {
        case "Ricky":
            return 3;
        case "Dimitri":
            return 4;
        case "Moosh":
            return 5;
        default:
            return 3;
    }
}

function getBehavior(behaviorName: string): number {
    switch (behaviorName) {
        case "Infant":
            return 0;
        case "BouncyA":
            return 1;
        case "BouncyB":
            return 2;
        case "BouncyC":
            return 3;
        case "BouncyD":
            return 4;
        case "BouncyE":
            return 5;
        case "ShyA":
            return 6;
        case "ShyB":
            return 7;
        case "ShyC":
            return 8;
        case "ShyD":
            return 9;
        case "ShyE":
            return 10;
        case "HyperA":
            return 11;
        case "HyperB":
            return 12;
        case "HyperC":
            return 13;
        case "HyperD":
            return 14;
        case "HyperE":
            return 15;
        default:
            return 0;
    }
}

export function updateProperties(
    newGame: string, 
    newGameID: string, 
    newHeroName: string, 
    newChildName: string, 
    newAnimal: string, 
    newBehavior: string, 
    newIsLinkedGame: boolean, 
    newIsHeroQuest: boolean
): string[][] {
    game = newGame;
    gameID = Number(newGameID);
    heroName = convertStringToBinary(newHeroName);
    childName = convertStringToBinary(newChildName);
    animal = getAnimal(newAnimal);
    behavior = getBehavior(newBehavior);
    isLinkedGame = newIsLinkedGame;
    isHeroQuest = newIsHeroQuest;

    memory = "";
    isReturnSecret = true;

    wasGivenFreeRing = true;

    // Main Secret
    const passwords = [convertIntegersToSymbols(toBytes())];

    // Push Memory Secrets
    for (let i = 0; i < 10; i++) {
        memory = i.toString();
        passwords.push(convertIntegersToSymbols(toBytesMemorySecret()).join("").split(''));
    }

    return passwords;
}

function convertStringToBinary(str: string): string[] {
    const arr: string[] = [];
    for (let i = 0; i < str.length; i++) {
        arr.push(str.charCodeAt(i).toString(2));
    }

    // Pad the binary
    while (arr.length < 5) {
        arr.push("0000000");
    }

    return arr;
}

function convertBinaryToIntegers(str: string): number[] {
    const arr = str.match(/.{6}/g) || [];
    return arr.map(x => parseInt(x, 2));
}

function convertIntegersToSymbols(arr: number[]): string[] {
    const newArray: string[] = [];
    for (let i = 0; i < arr.length; i++) {
        newArray.push(symbols[arr[i]]);
    }

    return newArray;
}

function encodeBytes(data: number[]): number[] {
    const cipherKey = (data[0] >> 3);
    let cipherPosition = cipherKey * 4;

    const secret: number[] = [];
    for (let i = 0; i < data.length; ++i) {
        secret[i] = data[i] ^ cipher[cipherPosition++];
    }

    secret[0] = (secret[0] & 7 | (cipherKey << 3));

    return secret;
}

function calculateChecksum(bytesArray: number[]): number {
    const sum = bytesArray.reduce((accumulator, currentValue) => accumulator + currentValue);
    return sum & 0x0F;
}

function toBytes(): number[] {
    const cipherKey = ((gameID >> 8) + (gameID & 255)) & 7;
    let unencodedSecret = reverseStr(cipherKey.toString(2).padStart(3, '0'));

    unencodedSecret += "00"; // game = 0
    unencodedSecret += reverseStr(gameID.toString(2).padStart(15, '0'));
    unencodedSecret += isHeroQuest ? "1" : "0";
    unencodedSecret += game === "Ages" ? "0" : "1";
    unencodedSecret += reverseStr(parseInt(heroName[0]).toString(2).padStart(8, '0'));
    unencodedSecret += reverseStr(parseInt(childName[0]).toString(2).padStart(8, '0'));
    unencodedSecret += reverseStr(parseInt(heroName[1]).toString(2).padStart(8, '0'));
    unencodedSecret += reverseStr(parseInt(childName[1]).toString(2).padStart(8, '0'));
    unencodedSecret += reverseStr(behavior.toString(2).padStart(8, '0')).substr(0,4);
    unencodedSecret += unknown58 ? "1" : "0";
    unencodedSecret += unknown59 ? "1" : "0";
    unencodedSecret += reverseStr(parseInt(heroName[2]).toString(2).padStart(8, '0'));
    unencodedSecret += reverseStr(parseInt(childName[2]).toString(2).padStart(8, '0'));
    unencodedSecret += wasGivenFreeRing ? "1" : "0";
    unencodedSecret += reverseStr(parseInt(heroName[3]).toString(2).padStart(8, '0'));
    unencodedSecret += reverseStr(animal.toString(2).padStart(8, '0')).substr(0,3);
    unencodedSecret += unknown88 ? "1" : "0";
    unencodedSecret += reverseStr(parseInt(heroName[4]).toString(2).padStart(8, '0'));
    unencodedSecret += reverseStr(parseInt(childName[3]).toString(2).padStart(8, '0'));
    unencodedSecret += isLinkedGame ? "1" : "0";
    unencodedSecret += reverseStr(parseInt(childName[4]).toString(2).padStart(8, '0'));

    const unencodedBytes = convertBinaryToIntegers(unencodedSecret);
    unencodedBytes[19] = calculateChecksum(unencodedBytes);
    const secret = encodeBytes(unencodedBytes);

    return secret;
}

function toBytesMemorySecret(): number[] {
    let cipher = 0;
    if (game === "Ages") {
        cipher = isReturnSecret ? 3 : 0;
    } else {
        cipher = isReturnSecret ? 1 : 2;
    }

    cipher |= ((parseInt(memory) & 1) << 2);
    cipher = ((gameID >> 8) + (gameID & 255) + cipher) & 7;
    const cipherStr = reverseStr(cipher.toString(2).padStart(3, '0'));

    let unencodedSecret = cipherStr;

    unencodedSecret += "11"; // memory secret

    unencodedSecret += reverseStr(gameID.toString(2).padStart(15, '0'));
    unencodedSecret += reverseStr(parseInt(memory).toString(2).padStart(4, '0'));

    let mask = 0;

    if (game === "Ages") {
        mask = isReturnSecret ? 3 : 0;
    } else {
        mask = isReturnSecret ? 2 : 1;
    }

    const unencodedBytes = convertBinaryToIntegers(unencodedSecret);
    unencodedBytes[4] = calculateChecksum(unencodedBytes) | (mask << 4);
    const secret = encodeBytes(unencodedBytes);

    return secret;
}

function reverseStr(str: string): string {
    return str.split('').reverse().join('');
}

// Export helper functions for testing
export function generateGamePasswordForTesting(
    gameInput: string, 
    gameIDInput: string, 
    heroNameInput: string, 
    childNameInput: string, 
    animalInput: number, 
    behaviorInput: number, 
    isLinkedGameInput: boolean, 
    isHeroQuestInput: boolean
): string {
    const oldGame = game;
    const oldGameID = gameID;
    const oldHeroName = heroName;
    const oldChildName = childName;
    const oldAnimal = animal;
    const oldBehavior = behavior;
    const oldIsLinkedGame = isLinkedGame;
    const oldIsHeroQuest = isHeroQuest;

    try {
        game = gameInput;
        gameID = Number(gameIDInput);
        heroName = convertStringToBinary(heroNameInput);
        childName = convertStringToBinary(childNameInput);
        animal = animalInput;
        behavior = behaviorInput;
        isLinkedGame = isLinkedGameInput;
        isHeroQuest = isHeroQuestInput;

        // Solo retornar el game password, no todos los passwords
        return convertIntegersToSymbols(toBytes()).join('');
    } finally {
        // Restore original values
        game = oldGame;
        gameID = oldGameID;
        heroName = oldHeroName;
        childName = oldChildName;
        animal = oldAnimal;
        behavior = oldBehavior;
        isLinkedGame = oldIsLinkedGame;
        isHeroQuest = oldIsHeroQuest;
    }
}
