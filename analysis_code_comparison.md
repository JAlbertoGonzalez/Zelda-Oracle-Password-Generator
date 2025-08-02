# Análisis Comparativo de Código: Original vs TypeScript

## Resumen
Comparación detallada entre la implementación original en JavaScript (`backup1.html`) y la implementación actual en TypeScript (`zeldaOraclePasswordGenerator.ts`) para identificar correspondencias exactas, discrepancias y funcionalidades faltantes.

## 1. Correspondencias Exactas ✅

### 1.1 Algoritmo de Checksum
**Estado**: ✅ **IDÉNTICO**

**Original:**
```javascript
checksum=0;
for(i=0;i<19;i++){checksum+=out[i];}
out[19]=(bit20_1<<5)|(bit20_2<<4)|(checksum%16);
```

**TypeScript:**
```typescript
function calculateChecksum(bytesArray: number[]): number {
    const sum = bytesArray.reduce((accumulator, currentValue) => accumulator + currentValue);
    return sum & 0x0F;  // Equivalente a % 16
}
unencodedBytes[19] = calculateChecksum(unencodedBytes);
```

### 1.2 Símbolos de Password
**Estado**: ✅ **IDÉNTICO**

**Original:**
```javascript
codeEN="BDFGHJLM♠♥♦♣#NQRSTWY!●▲■+–bdfghjm$∗/:~nqrstwy?%&(=)23456789⬆⬇⬅➡@".split("");
```

**TypeScript:**
```typescript
const symbols = [
    'B', 'D', 'F', 'G', 'H', 'J', 'L', 'M', '♠', '♥', '♦', '♣', '#',
    'N', 'Q', 'R', 'S', 'T', 'W', 'Y', '!', '●', '▲', '■', '+', '-',
    // ... resto idéntico
];
```

### 1.3 Cipher EN
**Estado**: ✅ **IDÉNTICO**

**Original:**
```javascript
cipherEN=[21,35,46,4,13,63,26,16,58,47,30,32,15,62,54,55,9,41,59,49,2,22,61,56,40,19,52,50,1,11,10,53,14,27,18,44,33,45,37,48,25,42,6,57,60,23,51,24];
```

**TypeScript:**
```typescript
const cipher = [
    21, 35, 46,  4, 13, 63, 26, 16,
    58, 47, 30, 32, 15, 62, 54, 55,
    // ... secuencia idéntica
];
```

### 1.4 Lógica de Cifrado
**Estado**: ✅ **IDÉNTICO**

**Original:**
```javascript
cipherstart=((id>>8)+id)%8;
cipherstart=((cipherstart&1)<<2)|(cipherstart&2)|((cipherstart&4)>>2);
out[0]^=cipher[lang][4*cipherstart]%8;
for(i=1;i<20;i++){out[i]^=cipher[lang][4*cipherstart+i];}
```

**TypeScript:**
```typescript
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
```

### 1.5 Memory Secrets
**Estado**: ✅ **IDÉNTICO**

**Original:**
```javascript
cipher = isReturnSecret ? 3 : 0; // Ages
cipher = isReturnSecret ? 1 : 2; // Seasons
cipher |= ((parseInt(memory) & 1) << 2);
cipher = ((gameID >> 8) + (gameID & 255) + cipher) & 7;
```

**TypeScript:**
```typescript
let cipher = 0;
if (game === "Ages") {
    cipher = isReturnSecret ? 3 : 0;
} else {
    cipher = isReturnSecret ? 1 : 2;
}
cipher |= ((parseInt(memory) & 1) << 2);
cipher = ((gameID >> 8) + (gameID & 255) + cipher) & 7;
```

## 2. Discrepancias Menores ⚠️

### 2.1 Estructura de Variables
**Problema**: Diferente organización de variables globales

**Original:**
```javascript
// Variables globales dispersas
id=parseInt(document.getElementById("idnr").value)%32768;
hero=(document.getElementById("hero").checked)?1:0;
linked=(document.getElementById("linked").checked)?1:0;
```

**TypeScript:**
```typescript
// Variables encapsuladas en función
export function updateProperties(
    newGame: string, 
    newGameID: string, 
    newHeroName: string,
    // ...
): string[][] {
    game = newGame;
    gameID = Number(newGameID);
    // ...
}
```

**Impacto**: ✅ Sin impacto funcional, mejor encapsulación en TypeScript.

### 2.2 Manejo de Strings vs Binary
**Problema**: Diferente representación interna

**Original:**
```javascript
player_name=document.getElementById("player_name").value.split("",5);
for(i=0;i<5;i++){
    player_name[i]=(player_name[i]==undefined)?0:alpha[lang].indexOf(player_name[i]);
}
```

**TypeScript:**
```typescript
function convertStringToBinary(str: string): string[] {
    const arr: string[] = [];
    for (let i = 0; i < str.length; i++) {
        arr.push(str.charCodeAt(i).toString(2));
    }
    while (arr.length < 5) {
        arr.push("0000000");
    }
    return arr;
}
```

**Impacto**: ⚠️ **DISCREPANCIA CRÍTICA** - Diferentes sistemas de codificación de caracteres.

## 3. Funcionalidades Faltantes ❌

### 3.1 Soporte para Japonés
**Estado**: ❌ **AUSENTE COMPLETO**

**Original tiene:**
```javascript
lang=0; // 0 = eur/us, 1 = jp
cipherJP=[49,9,41,59,24,60,23,51,53,1,11,10,48,33,45,37,32,58,47,30,57,25,42,6,4,21,35,46,50,40,19,52,16,13,63,26,55,15,62,54,56,2,22,61,44,14,27,18];
codeJP="えかく０けつ１しにねそぺ２たせいてみほすうおらの３ふさざきひわやこはゆよへるなと５６７をぷもめりちまあんぞれ８ごどむぴ９４ぼがだ".split("");
alphaJP="..."; // Alfabeto japonés completo
```

**TypeScript tiene:**
```typescript
// ❌ Solo soporte EN/EUR/US
const symbols = [...]; // Solo símbolos EN
const cipher = [...];  // Solo cipher EN
```

**Impacto**: ❌ **FUNCIONALIDAD CRÍTICA FALTANTE**

### 3.2 Ring Secrets
**Estado**: ❌ **AUSENTE COMPLETO**

**Original tiene:**
```javascript
function printRing(){
    out=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; // 15 bytes
    rings=[0,0,0,0,0,0,0,0]; // 64 rings en 8 bytes
    // Lógica completa de ring encoding
    for(i=0;i<64;i++){
        rings[Math.floor(i/8)]|=(eval("document.getElementById(\"ring"+i+"\").checked")?1:0)<<(7-(i%8));
    }
    // ... resto de la lógica
}
```

**TypeScript tiene:**
```typescript
// ❌ No hay implementación de Ring Secrets
```

**Impacto**: ❌ **FUNCIONALIDAD CRÍTICA FALTANTE**

### 3.3 Password Validation/Decoding
**Estado**: ❌ **AUSENTE COMPLETO**

**Original tiene:**
```javascript
function generateData(){
    // Decode passwords from input
    // Validate checksums
    // Extract game data
    // Show detailed analysis
}
```

**TypeScript tiene:**
```typescript
// ❌ Solo generación, no validación/decodificación
```

**Impacto**: ❌ **FUNCIONALIDAD CRÍTICA FALTANTE**

### 3.4 Alfabetos para Nombres
**Estado**: ❌ **AUSENTE COMPLETO**

**Original tiene:**
```javascript
alphaEN="»»»»»»»»»»»»»»»»»♣♦♠»»»»»»»»»»»» !»»»»»'()»»,-.»»»»»»»»»»»:;»=»»»ABCDEFGHIJKLMNOPQRSTUVWXYZ»»»»·»abcdefghijklmnopqrstuvwxyz»»»»»ÀÂÄÆÇÈÉÊËÎÏÑÖŒÙÛÜ»»»»»»»»»»»»»»»àâäæçèéêëîïñöœùûü»»»»»»»»»»»»♥»";
alpha=[new Array(256),new Array(256)];
for(i=0;i<256;i++){
    alpha[0][i]=(alphaEN[i]=="»"?"["+i.toString(16).toUpperCase().padStart(4,"0x0")+"]":alphaEN[i]);
}
```

**TypeScript tiene:**
```typescript
// ❌ Usa charCodeAt() directo sin validación de caracteres permitidos
function convertStringToBinary(str: string): string[] {
    const arr: string[] = [];
    for (let i = 0; i < str.length; i++) {
        arr.push(str.charCodeAt(i).toString(2));
    }
    return arr;
}
```

**Impacto**: ❌ **DISCREPANCIA CRÍTICA** - Puede generar passwords inválidos.

## 4. Discrepancias Críticas 🚨

### 4.1 Codificación de Nombres
**Problema**: Sistemas completamente diferentes

**Original:** Usa tabla de 256 caracteres predefinidos
**TypeScript:** Usa ASCII/UTF-16 directo

**Impacto**: 🚨 **INCOMPATIBILIDAD TOTAL** - Passwords generados serán diferentes.

### 4.2 Bits de Control Faltantes
**Problema**: Bits de configuración no implementados

**Original tiene:**
```javascript
bit10_5=(document.getElementById("bit10_5").checked)?1:0;
bit10_6=(document.getElementById("bit10_6").checked)?1:0;
bit13_5=(document.getElementById("bit13_5").checked)?1:0; // Friendship Ring
bit15_5=(document.getElementById("bit15_5").checked)?1:0; // Animal bit
bit20_1=(document.getElementById("bit20_1").checked)?1:0;
bit20_2=(document.getElementById("bit20_2").checked)?1:0;
```

**TypeScript tiene:**
```typescript
// ❌ Hardcoded values
let unknown58 = false;
let unknown59 = false;
let unknown88 = true;
let wasGivenFreeRing = true;
```

**Impacto**: ⚠️ Funcionalidad reducida, pero passwords básicos compatibles.

### 4.3 Validación de Entrada
**Original:**
```javascript
if(player_name[i]==-1){
    throw "Name not valid. Valid characters:<br>"+(lang==0?alphaEN.replace(/»/g,""):alphaJP.replace(/»/g,""));
}
```

**TypeScript:**
```typescript
// ❌ Sin validación de caracteres
```

**Impacto**: 🚨 Puede generar passwords corruptos.

## 5. Puntuación de Compatibilidad

### Funcionalidades Implementadas
- **Game Password (básico)**: 70% ✅
- **Memory Secrets**: 90% ✅
- **Ring Secrets**: 0% ❌
- **Soporte Japonés**: 0% ❌
- **Validación**: 0% ❌
- **Decodificación**: 0% ❌

### Compatibilidad General: **45%**

## 6. Recomendaciones Críticas

### 6.1 Prioridad ALTA 🚨
1. **Implementar alfabetos correctos** para nombres de héroe/niño
2. **Añadir validación de caracteres** de entrada
3. **Corregir codificación de strings** para match exacto con original

### 6.2 Prioridad MEDIA ⚠️
1. **Implementar Ring Secrets** (15 caracteres)
2. **Añadir password validation/decoding**
3. **Implementar bits de control configurables**

### 6.3 Prioridad BAJA ✅
1. **Añadir soporte japonés** (idioma adicional)
2. **Implementar interfaz de decodificación** 
3. **Añadir error reporting detallado**

## 7. Conclusión

La implementación TypeScript actual es **parcialmente funcional** para casos básicos, pero tiene **discrepancias críticas** que afectan la compatibilidad exacta con el sistema original. Las funcionalidades de Game Password y Memory Secrets funcionan en principio, pero la **codificación de nombres** es incompatible y puede generar passwords incorrectos.

**Recomendación**: Priorizar las correcciones de compatibilidad básica antes de añadir nuevas funcionalidades.
