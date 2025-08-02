# Análisis Comparativo: Zelda Oracle Password Generator (EN vs JP)

## Resumen
Comparación entre la implementación actual en TypeScript (`zeldaOraclePasswordGenerator.ts`) y la versión original (`backup1.html`) que incluye soporte para japonés.

## 1. Símbolos de Password (Code Arrays)

### Versión Actual (Solo EN/EUR/US)
```typescript
const symbols = [
    'B', 'D', 'F', 'G', 'H', 'J', 'L', 'M', '♠', '♥', '♦', '♣', '#',
    'N', 'Q', 'R', 'S', 'T', 'W', 'Y', '!', '●', '▲', '■', '+', '-',
    'b', 'd', 'f', 'g', 'h', 'j',      'm', '$', '*', '/', ':', '~',
    'n', 'q', 'r', 's', 't', 'w', 'y', '?', '%', '&', '(', '=', ')',
    '2', '3', '4', '5', '6', '7', '8', '9', '↑', '↓', '←', '→', '@'
];
```

### Versión Original (EN + JP)
```javascript
// EN/EUR/US (índices 0-63)
codeEN = "BDFGHJLM♠♥♦♣#NQRSTWY!●▲■+–bdfghjm$∗/:~nqrstwy?%&(=)23456789⬆⬇⬅➡@".split("");

// JP (índices 0-63)
codeJP = "えかく０けつ１しにねそぺ２たせいてみほすうおらの３ふさざきひわやこはゆよへるなと５６７をぷもめりちまあんぞれ８ごどむぴ９４ぼがだ".split("");
```

### Correspondencia Símbolo por Símbolo (Índice: EN → JP)

| Índice | EN Symbol | JP Symbol | Descripción |
|--------|-----------|-----------|-------------|
| 0      | B         | え        | Letra/Hiragana |
| 1      | D         | か        | Letra/Hiragana |
| 2      | F         | く        | Letra/Hiragana |
| 3      | G         | ０        | Letra/Número JP |
| 4      | H         | け        | Letra/Hiragana |
| 5      | J         | つ        | Letra/Hiragana |
| 6      | L         | １        | Letra/Número JP |
| 7      | M         | し        | Letra/Hiragana |
| 8      | ♠         | に        | Palo/Hiragana |
| 9      | ♥         | ね        | Palo/Hiragana |
| 10     | ♦         | そ        | Palo/Hiragana |
| 11     | ♣         | ぺ        | Palo/Hiragana |
| 12     | #         | ２        | Símbolo/Número JP |
| 13     | N         | た        | Letra/Hiragana |
| 14     | Q         | せ        | Letra/Hiragana |
| 15     | R         | い        | Letra/Hiragana |
| 16     | S         | て        | Letra/Hiragana |
| 17     | T         | み        | Letra/Hiragana |
| 18     | W         | ほ        | Letra/Hiragana |
| 19     | Y         | す        | Letra/Hiragana |
| 20     | !         | う        | Símbolo/Hiragana |
| 21     | ●         | お        | Símbolo/Hiragana |
| 22     | ▲         | ら        | Símbolo/Hiragana |
| 23     | ■         | の        | Símbolo/Hiragana |
| 24     | +         | ３        | Símbolo/Número JP |
| 25     | -         | ふ        | Símbolo/Hiragana |
| 26     | b         | さ        | Letra min/Hiragana |
| 27     | d         | ざ        | Letra min/Hiragana |
| 28     | f         | き        | Letra min/Hiragana |
| 29     | g         | ひ        | Letra min/Hiragana |
| 30     | h         | わ        | Letra min/Hiragana |
| 31     | j         | や        | Letra min/Hiragana |
| 32     | m         | こ        | Letra min/Hiragana |
| 33     | $         | は        | Símbolo/Hiragana |
| 34     | *         | ゆ        | Símbolo/Hiragana |
| 35     | /         | よ        | Símbolo/Hiragana |
| 36     | :         | へ        | Símbolo/Hiragana |
| 37     | ~         | る        | Símbolo/Hiragana |
| 38     | n         | な        | Letra min/Hiragana |
| 39     | q         | と        | Letra min/Hiragana |
| 40     | r         | ５        | Letra min/Número JP |
| 41     | s         | ６        | Letra min/Número JP |
| 42     | t         | ７        | Letra min/Número JP |
| 43     | w         | を        | Letra min/Hiragana |
| 44     | y         | ぷ        | Letra min/Hiragana |
| 45     | ?         | も        | Símbolo/Hiragana |
| 46     | %         | め        | Símbolo/Hiragana |
| 47     | &         | り        | Símbolo/Hiragana |
| 48     | (         | ち        | Símbolo/Hiragana |
| 49     | =         | ま        | Símbolo/Hiragana |
| 50     | )         | あ        | Símbolo/Hiragana |
| 51     | 2         | ん        | Número/Hiragana |
| 52     | 3         | ぞ        | Número/Hiragana |
| 53     | 4         | れ        | Número/Hiragana |
| 54     | 5         | ８        | Número/Número JP |
| 55     | 6         | ご        | Número/Hiragana |
| 56     | 7         | ど        | Número/Hiragana |
| 57     | 8         | む        | Número/Hiragana |
| 58     | 9         | ぴ        | Número/Hiragana |
| 59     | ↑         | ９        | Flecha/Número JP |
| 60     | ↓         | ４        | Flecha/Número JP |
| 61     | ←         | ぼ        | Flecha/Hiragana |
| 62     | →         | が        | Flecha/Hiragana |
| 63     | @         | だ        | Símbolo/Hiragana |

## 2. Cifrado (Cipher Arrays)

### Versión Actual (Solo EN)
```typescript
const cipher = [
    21, 35, 46,  4, 13, 63, 26, 16,
    58, 47, 30, 32, 15, 62, 54, 55,
    9, 41, 59, 49,  2, 22, 61, 56,
    40, 19, 52, 50,  1, 11, 10, 53,
    14, 27, 18, 44, 33, 45, 37, 48,
    25, 42,  6, 57, 60, 23, 51, 24
];
```

### Versión Original (EN + JP)
```javascript
// EN/EUR/US Cipher
cipherEN = [21,35,46,4,13,63,26,16,58,47,30,32,15,62,54,55,9,41,59,49,2,22,61,56,40,19,52,50,1,11,10,53,14,27,18,44,33,45,37,48,25,42,6,57,60,23,51,24];

// JP Cipher (diferente orden)
cipherJP = [49,9,41,59,24,60,23,51,53,1,11,10,48,33,45,37,32,58,47,30,57,25,42,6,4,21,35,46,50,40,19,52,16,13,63,26,55,15,62,54,56,2,22,61,44,14,27,18];
```

### Diferencias en el Cipher
- **EN**: La implementación actual solo usa el cipher para EN/EUR/US
- **JP**: Tiene un orden completamente diferente de los valores de cifrado
- **Impacto**: Los passwords generados en JP serían completamente diferentes

## 3. Descripciones de Memory Secrets

### EN (Ages/Seasons)
```javascript
// Ages [índice][idioma][secreto]
description[0][0] = ["ClockShop","Smith","Pirate","Deku","Ruul","Graveyard","Biggoron","Subrosian","Diver","Temple"];
// Seasons  
description[1][0] = ["K Zora","Library","Troy","Tingle","Symmetry","Fairy","Elder","Tokay","Plen","Mamamu"];
```

### JP (Ages/Seasons)
```javascript
// Ages JP
description[0][1] = ["とけいやウラ","ウーラコクホウ","かいぞく","デクナッツ","ルール村ちょう","ギーニ","ダイゴロン","ウーラ","すもぐりめいじん","大ようせい"];
// Seasons JP
description[1][1] = ["キングゾーラ","としょかん","トロイ","チンクル","シメトリ村","ヤンチャようせい","ゴロンちょうろう","トカゲ人","プレンちょうちょう","ママム・ヤン"];
```

## 4. Secret ID Arrays

### Orden de Secrets
```javascript
// [game][secret_index] = secret_id
secretID = [
    [0,4,5,7,9,1,8,2,3,6],  // Ages
    [0,4,2,7,9,1,8,5,3,6]   // Seasons
];
```

## 5. Alfabetos para Nombres

### EN
```javascript
// 256 caracteres posibles para nombres de héroe y niño
alphaEN = "»»»»»»»»»»»»»»»»»♣♦♠»»»»»»»»»»»» !»»»»»'()»»,-.»»»»»»»»»»»:;»=»»»ABCDEFGHIJKLMNOPQRSTUVWXYZ»»»»·»abcdefghijklmnopqrstuvwxyz»»»»»ÀÂÄÆÇÈÉÊËÎÏÑÖŒÙÛÜ»»»»»»»»»»»»»»»àâäæçèéêëîïñöœùûü»»»»»»»»»»»»♥»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»";
```

### JP
```javascript
// 256 caracteres posibles en japonés
alphaJP = "»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»　»»»»»»»»»»»»ー»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんぁぃぅぇぉっゃゅょがぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンァィゥェォッャュョガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポ";
```

## 6. Conclusiones

### Estado Actual vs Original
1. **Funcionalidad Reducida**: La versión TypeScript actual solo soporta EN/EUR/US
2. **Símbolos**: Los símbolos EN son idénticos entre ambas versiones
3. **Cifrado**: El cipher EN es idéntico
4. **Falta Soporte JP**: No hay implementación para japonés en la versión actual

### Implementación Japonesa
1. **Símbolos Diferentes**: Usa hiragana, katakana y números japoneses
2. **Cipher Diferente**: Orden completamente distinto para cifrado
3. **Alfabeto Completo**: Soporte para caracteres japoneses en nombres
4. **Descripciones Localizadas**: Memory secrets en japonés

### Recomendaciones
1. **Agregar Soporte JP**: Implementar las constantes y lógica para japonés
2. **Selector de Idioma**: Añadir toggle EN/JP como en la versión original
3. **Mantener Compatibilidad**: Asegurar que los passwords EN sigan funcionando
4. **Testing**: Verificar que los passwords JP coincidan con la implementación original

## 7. Archivos para Implementación

Para añadir soporte japonés, necesitaríamos:
1. **Constantes JP**: symbols_JP, cipher_JP, alpha_JP
2. **Descripciones JP**: Memory secrets en japonés  
3. **Logic Updates**: Modificar funciones para usar arrays basados en idioma
4. **UI Updates**: Selector de idioma en la interfaz
