// Implementación alternativa basada en el código original backup1.html
// Esta versión mantiene la lógica exacta del generador original

interface PasswordResult {
    gamePassword: string[];
    ringPassword: string[];
    memorySecrets: string[][];
}

// Símbolos y cifrados exactos del original
const codeEN = "BDFGHJLM♠♥♦♣#NQRSTWY!●▲■+–bdfghjm$∗/:~nqrstwy?%&(=)23456789⬆⬇⬅➡@".split("");
const codeJP = "えかく０けつ１しにねそぺ２たせいてみほすうおらの３ふさざきひわやこはゆよへるなと５６７をぷもめりちまあんぞれ８ごどむぴ９４ぼがだ".split("");

const cipherEN = [21,35,46,4,13,63,26,16,58,47,30,32,15,62,54,55,9,41,59,49,2,22,61,56,40,19,52,50,1,11,10,53,14,27,18,44,33,45,37,48,25,42,6,57,60,23,51,24];
const cipherJP = [49,9,41,59,24,60,23,51,53,1,11,10,48,33,45,37,32,58,47,30,57,25,42,6,4,21,35,46,50,40,19,52,16,13,63,26,55,15,62,54,56,2,22,61,44,14,27,18];

const cipher = [cipherEN, cipherJP];
const code = [codeEN, codeJP];

// Secret ID arrays exactos del original
const secretID = [
    [0,4,5,7,9,1,8,2,3,6], // Ages
    [0,4,2,7,9,1,8,5,3,6]  // Seasons
];

// Descripciones exactas del original (para uso futuro)
// const description = [
//     [
//         ["ClockShop","Smith","Pirate","Deku","Ruul","Graveyard","Biggoron","Subrosian","Diver","Temple"],
//         ["とけいやウラ","ウーラコクホウ","かいぞく","デクナッツ","ルール村ちょう","ギーニ","ダイゴロン","ウーラ","すもぐりめいじん","大ようせい"]
//     ],
//     [
//         ["K Zora","Library","Troy","Tingle","Symmetry","Fairy","Elder","Tokay","Plen","Mamamu"],
//         ["キングゾーラ","としょかん","トロイ","チンクル","シメトリ村","ヤンチャようせい","ゴロンちょうろう","トカゲ人","プレンちょうちょう","ママム・ヤン"]
//     ]
// ];

// Alfabetos exactos del original
const alphaEN = "»»»»»»»»»»»»»»»»»♣♦♠»»»»»»»»»»»» !»»»»»'()»»,-.»»»»»»»»»»»:;»=»»»ABCDEFGHIJKLMNOPQRSTUVWXYZ»»»»·»abcdefghijklmnopqrstuvwxyz»»»»»ÀÂÄÆÇÈÉÊËÎÏÑÖŒÙÛÜ»»»»»»»»»»»»»»»àâäæçèéêëîïñöœùûü»»»»»»»»»»»»♥»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»";
const alphaJP = "»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»　»»»»»»»»»»»»ー»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんぁぃぅぇぉっゃゅょがぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンァィゥェォッャュョガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポ";

// Crear arrays de alfabetos procesados
const alpha: string[][] = [new Array(256), new Array(256)];
for (let i = 0; i < 256; i++) {
    alpha[0][i] = (alphaEN[i] === "»" ? `[${i.toString(16).toUpperCase().padStart(4, "0x0")}]` : alphaEN[i]);
    alpha[1][i] = (alphaJP[i] === "»" ? `[${i.toString(16).toUpperCase().padStart(4, "0x0")}]` : alphaJP[i]);
}

interface GameInputs {
    idnr: number;
    hero: boolean;
    linked: boolean;
    oracle: 'ages' | 'seasons';
    playerName: string;
    child: string;
    childtype: number;
    animal: number;
    rings: boolean[];
    bit10_5: boolean;
    bit10_6: boolean;
    bit13_5: boolean;
    bit15_5: boolean;
    bit20_1: boolean;
    bit20_2: boolean;
    lang: number; // 0 = EN, 1 = JP
}

class ZeldaOracleAlternativeGenerator {
    private lang: number = 0; // 0 = eur/us, 1 = jp

    constructor(language: number = 0) {
        this.lang = language;
    }

    generatePasswords(inputs: GameInputs): PasswordResult {
        this.lang = inputs.lang;
        
        return {
            gamePassword: this.printPW(inputs),
            ringPassword: this.printRing(inputs),
            memorySecrets: this.printMem(inputs)
        };
    }

    private printPW(inputs: GameInputs): string[] {
        const out = new Array(20).fill(0);
        const id = inputs.idnr % 32768;
        const type = 0; // game=0, ring=1
        const hero = inputs.hero ? 1 : 0;
        const linked = inputs.linked ? 1 : 0;
        const oracle = inputs.oracle === "seasons" ? 1 : 0;

        // Process player name exactly like original
        const playerName = inputs.playerName.split("", 5);
        for (let i = 0; i < 5; i++) {
            const char = playerName[i];
            if (char === undefined) {
                playerName[i] = "0";
            } else {
                const charIndex = alpha[this.lang].indexOf(char);
                if (charIndex === -1) {
                    throw new Error(`Name not valid. Character '${char}' not found in alphabet`);
                }
                playerName[i] = charIndex.toString();
            }
        }

        // Process child name exactly like original
        const child = inputs.child.split("", 5);
        for (let i = 0; i < 5; i++) {
            const char = child[i];
            if (char === undefined) {
                child[i] = "0";
            } else {
                const charIndex = alpha[this.lang].indexOf(char);
                if (charIndex === -1) {
                    throw new Error(`Child name not valid. Character '${char}' not found in alphabet`);
                }
                child[i] = charIndex.toString();
            }
        }

        const childtype = inputs.childtype % 16;
        const animal = inputs.animal % 8;
        const bit1_4 = 0; // (password/ring=0, memory=1)
        const bit10_5 = inputs.bit10_5 ? 1 : 0;
        const bit10_6 = inputs.bit10_6 ? 1 : 0;
        const bit13_5 = inputs.bit13_5 ? 1 : 0;
        const bit15_5 = inputs.bit15_5 ? 1 : 0;
        const bit20_1 = inputs.bit20_1 ? 1 : 0;
        const bit20_2 = inputs.bit20_2 ? 1 : 0;

        // Cipher calculation exactly like original
        let cipherstart = ((id >> 8) + id) % 8;
        cipherstart = ((cipherstart & 1) << 2) | (cipherstart & 2) | ((cipherstart & 4) >> 2);

        // Build bytes exactly like original
        out[0] = (cipherstart << 3) | (bit1_4 << 2) | (type << 1) | (id & 1);
        out[1] = ((id & 2) << 4) | ((id & 4) << 2) | (id & 8) | ((id & 16) >> 2) | ((id & 32) >> 4) | ((id & 64) >> 6);
        out[2] = ((id & 128) >> 2) | ((id & 256) >> 4) | ((id & 512) >> 6) | ((id & 1024) >> 8) | ((id & 2048) >> 10) | ((id & 4096) >> 12);
        out[3] = ((id & 8192) >> 8) | ((id & 16384) >> 10) | (hero << 3) | (oracle << 2) | ((parseInt(playerName[0]) & 1) << 1) | ((parseInt(playerName[0]) & 2) >> 1);
        out[4] = ((parseInt(playerName[0]) & 4) << 3) | ((parseInt(playerName[0]) & 8) << 1) | ((parseInt(playerName[0]) & 16) >> 1) | ((parseInt(playerName[0]) & 32) >> 3) | ((parseInt(playerName[0]) & 64) >> 5) | ((parseInt(playerName[0]) & 128) >> 7);
        out[5] = ((parseInt(child[0]) & 1) << 5) | ((parseInt(child[0]) & 2) << 3) | ((parseInt(child[0]) & 4) << 1) | ((parseInt(child[0]) & 8) >> 1) | ((parseInt(child[0]) & 16) >> 3) | ((parseInt(child[0]) & 32) >> 5);
        out[6] = ((parseInt(child[0]) & 64) >> 1) | ((parseInt(child[0]) & 128) >> 3) | ((parseInt(playerName[1]) & 1) << 3) | ((parseInt(playerName[1]) & 2) << 1) | ((parseInt(playerName[1]) & 4) >> 1) | ((parseInt(playerName[1]) & 8) >> 3);
        out[7] = ((parseInt(playerName[1]) & 16) << 1) | ((parseInt(playerName[1]) & 32) >> 1) | ((parseInt(playerName[1]) & 64) >> 3) | ((parseInt(playerName[1]) & 128) >> 5) | ((parseInt(child[1]) & 1) << 1) | ((parseInt(child[1]) & 2) >> 1);
        out[8] = ((parseInt(child[1]) & 4) << 3) | ((parseInt(child[1]) & 8) << 1) | ((parseInt(child[1]) & 16) >> 1) | ((parseInt(child[1]) & 32) >> 3) | ((parseInt(child[1]) & 64) >> 5) | ((parseInt(child[1]) & 128) >> 7);
        out[9] = ((childtype & 1) << 5) | ((childtype & 2) << 3) | ((childtype & 4) << 1) | ((childtype & 8) >> 1) | (bit10_5 << 1) | (bit10_6);
        out[10] = ((parseInt(playerName[2]) & 1) << 5) | ((parseInt(playerName[2]) & 2) << 3) | ((parseInt(playerName[2]) & 4) << 1) | ((parseInt(playerName[2]) & 8) >> 1) | ((parseInt(playerName[2]) & 16) >> 3) | ((parseInt(playerName[2]) & 32) >> 5);
        out[11] = ((parseInt(playerName[2]) & 64) >> 1) | ((parseInt(playerName[2]) & 128) >> 3) | ((parseInt(child[2]) & 1) << 3) | ((parseInt(child[2]) & 2) << 1) | ((parseInt(child[2]) & 4) >> 1) | ((parseInt(child[2]) & 8) >> 3);
        out[12] = ((parseInt(child[2]) & 16) << 1) | ((parseInt(child[2]) & 32) >> 1) | ((parseInt(child[2]) & 64) >> 3) | ((parseInt(child[2]) & 128) >> 5) | (bit13_5 << 1) | (parseInt(playerName[3]) & 1);
        out[13] = ((parseInt(playerName[3]) & 2) << 4) | ((parseInt(playerName[3]) & 4) << 2) | (parseInt(playerName[3]) & 8) | ((parseInt(playerName[3]) & 16) >> 2) | ((parseInt(playerName[3]) & 32) >> 4) | ((parseInt(playerName[3]) & 64) >> 6);
        out[14] = ((parseInt(playerName[3]) & 128) >> 2) | ((animal & 1) << 4) | ((animal & 2) << 2) | (animal & 4) | (bit15_5 << 1) | (parseInt(playerName[4]) & 1);
        out[15] = ((parseInt(playerName[4]) & 2) << 4) | ((parseInt(playerName[4]) & 4) << 2) | (parseInt(playerName[4]) & 8) | ((parseInt(playerName[4]) & 16) >> 2) | ((parseInt(playerName[4]) & 32) >> 4) | ((parseInt(playerName[4]) & 64) >> 6);
        out[16] = ((parseInt(playerName[4]) & 128) >> 2) | ((parseInt(child[3]) & 1) << 4) | ((parseInt(child[3]) & 2) << 2) | (parseInt(child[3]) & 4) | ((parseInt(child[3]) & 8) >> 2) | ((parseInt(child[3]) & 16) >> 4);
        out[17] = (parseInt(child[3]) & 32) | ((parseInt(child[3]) & 64) >> 2) | ((parseInt(child[3]) & 128) >> 4) | (linked << 2) | ((parseInt(child[4]) & 1) << 1) | ((parseInt(child[4]) & 2) >> 1);
        out[18] = ((parseInt(child[4]) & 4) << 3) | ((parseInt(child[4]) & 8) << 1) | ((parseInt(child[4]) & 16) >> 1) | ((parseInt(child[4]) & 32) >> 3) | ((parseInt(child[4]) & 64) >> 5) | ((parseInt(child[4]) & 128) >> 7);

        // Calculate checksum exactly like original
        let checksum = 0;
        for (let i = 0; i < 19; i++) {
            checksum += out[i];
        }
        out[19] = (bit20_1 << 5) | (bit20_2 << 4) | (checksum % 16);

        // Apply cipher exactly like original
        out[0] ^= cipher[this.lang][4 * cipherstart] % 8;
        for (let i = 1; i < 20; i++) {
            out[i] ^= cipher[this.lang][4 * cipherstart + i];
        }

        // Convert to symbols
        const result: string[] = [];
        for (let i = 0; i < 20; i++) {
            result.push(code[this.lang][out[i]]);
        }

        return result;
    }

    private printRing(inputs: GameInputs): string[] {
        const out = new Array(15).fill(0);
        const rings = new Array(8).fill(0);
        const id = inputs.idnr % 32768;
        const type = 1; // game=0, ring=1

        // Process rings exactly like original
        for (let i = 0; i < 64; i++) {
            const isChecked = inputs.rings[i] ? 1 : 0;
            rings[Math.floor(i / 8)] |= isChecked << (7 - (i % 8));
        }

        const bit1_4 = 0; // (password/ring=0, memory=1)
        const bit15_1 = inputs.bit20_1 ? 1 : 0; // checksum byte
        const bit15_2 = inputs.bit20_2 ? 1 : 0; // checksum byte

        let cipherstart = ((id >> 8) + id) % 8;
        cipherstart = ((cipherstart & 1) << 2) | (cipherstart & 2) | ((cipherstart & 4) >> 2);

        out[0] = (cipherstart << 3) | (bit1_4 << 2) | (type << 1) | (id & 1);
        out[1] = ((id & 2) << 4) | ((id & 4) << 2) | (id & 8) | ((id & 16) >> 2) | ((id & 32) >> 4) | ((id & 64) >> 6);
        out[2] = ((id & 128) >> 2) | ((id & 256) >> 4) | ((id & 512) >> 6) | ((id & 1024) >> 8) | ((id & 2048) >> 10) | ((id & 4096) >> 12);
        out[3] = ((id & 8192) >> 8) | ((id & 16384) >> 10) | (rings[1] >> 4);
        out[4] = ((rings[1] % 16) << 2) | (rings[5] >> 6);
        out[5] = rings[5] % 64;
        out[6] = rings[7] >> 2;
        out[7] = ((rings[7] % 4) << 4) | (rings[3] >> 4);
        out[8] = ((rings[3] % 16) << 2) | (rings[0] >> 6);
        out[9] = rings[0] % 64;
        out[10] = rings[4] >> 2;
        out[11] = ((rings[4] % 4) << 4) | (rings[2] >> 4);
        out[12] = ((rings[2] % 16) << 2) | (rings[6] >> 6);
        out[13] = rings[6] % 64;

        let checksum = 0;
        for (let i = 0; i < 14; i++) {
            checksum += out[i];
        }
        out[14] = (bit15_1 << 5) | (bit15_2 << 4) | (checksum % 16);

        out[0] ^= cipher[this.lang][4 * cipherstart] % 8;
        for (let i = 1; i < 15; i++) {
            out[i] ^= cipher[this.lang][4 * cipherstart + i];
        }

        const result: string[] = [];
        for (let i = 0; i < 15; i++) {
            result.push(code[this.lang][out[i]]);
        }

        return result;
    }

    private printMem(inputs: GameInputs): string[][] {
        const results: string[][] = [];
        const id = inputs.idnr % 32768;
        const oracle = inputs.oracle === "seasons" ? 1 : 0;
        const type = 1; // memory secret=1 (also ring=1)
        const bit1_4 = 1; // memory secret = 1 (ring=0 here)
        const bit5_2 = oracle ^ 1; // depends on the linked game (ages=1, seasons=0)

        for (let j = 0; j < 10; j++) {
            const out = new Array(5).fill(0);

            // The secret that is sent back to the first game
            let cipherstart = ((id >> 8) + id + bit5_2 * 2 + (secretID[oracle][j] % 2) * 4) % 8;
            cipherstart = ((cipherstart & 1) << 2) | (cipherstart & 2) | ((cipherstart & 4) >> 2);
            const bit5_1 = 0; // first game

            out[0] = (cipherstart << 3) | (bit1_4 << 2) | (type << 1) | (id & 1);
            out[1] = ((id & 2) << 4) | ((id & 4) << 2) | (id & 8) | ((id & 16) >> 2) | ((id & 32) >> 4) | ((id & 64) >> 6);
            out[2] = ((id & 128) >> 2) | ((id & 256) >> 4) | ((id & 512) >> 6) | ((id & 1024) >> 8) | ((id & 2048) >> 10) | ((id & 4096) >> 12);
            out[3] = ((id & 8192) >> 8) | ((id & 16384) >> 10) | ((secretID[oracle][j] & 1) << 3) | ((secretID[oracle][j] & 2) << 1) | ((secretID[oracle][j] & 4) >> 1) | ((secretID[oracle][j] & 8) >> 3);

            let checksum = 0;
            for (let i = 0; i < 4; i++) {
                checksum += out[i];
            }
            out[4] = (bit5_1 << 5) | (bit5_2 << 4) | (checksum % 16);

            // cipher
            out[0] ^= cipher[this.lang][4 * cipherstart] % 8;
            for (let i = 1; i < 5; i++) {
                out[i] ^= cipher[this.lang][4 * cipherstart + i];
            }

            const secretResult: string[] = [];
            for (let i = 0; i < 5; i++) {
                secretResult.push(code[this.lang][out[i]]);
            }
            results.push(secretResult);
        }

        return results;
    }
}

export type { GameInputs, PasswordResult };
export { ZeldaOracleAlternativeGenerator, alpha };
