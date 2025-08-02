# Análisis del Sistema de Checksum - Zelda Oracle Password Generator

## Resumen
El sistema de passwords de Zelda Oracle utiliza un sofisticado sistema de checksum para validar la integridad de los códigos generados. Este análisis examina cómo se calculan, almacenan y verifican los checksums en los diferentes tipos de passwords.

## 1. Tipos de Password y sus Checksums

### 1.1 Game Password (20 caracteres)
**Propósito**: Password principal de continuación del juego  
**Longitud**: 20 caracteres  
**Posición del Checksum**: Byte 19 (último byte)

#### Cálculo del Checksum
```javascript
// Generación - línea 147
checksum=0;
for(i=0;i<19;i++){
    checksum+=out[i];
}
out[19]=(bit20_1<<5)|(bit20_2<<4)|(checksum%16);
```

#### Verificación del Checksum
```javascript
// Verificación - línea 384
checksum=0;
for(i=0;i<19;i++){
    checksum+=pwRAW[i];
}
checksum%=16;

if(pwChecksum!=checksum){
    out+="ERROR: Checksum is "+pwChecksum+", should be "+checksum+"<br>\n";
}
```

### 1.2 Ring Secret (15 caracteres)
**Propósito**: Password para transferir anillos entre juegos  
**Longitud**: 15 caracteres  
**Posición del Checksum**: Byte 14 (último byte)

#### Cálculo del Checksum
```javascript
// Generación - línea 192
checksum=0;
for(i=0;i<14;i++){
    checksum+=out[i];
}
out[14]=(bit15_1<<5)|(bit15_2<<4)|(checksum%16);
```

#### Verificación del Checksum
```javascript
// Verificación - línea 312
checksum=0;
for(i=0;i<14;i++){
    checksum+=pwRAW[i];
}
checksum%=16;

if(pwChecksum!=checksum){
    out+="ERROR: Checksum is "+pwChecksum+", should be "+checksum+"<br>\n";
}
```

### 1.3 Memory Secret (5 caracteres)
**Propósito**: Secrets específicos para intercambio entre juegos  
**Longitud**: 5 caracteres  
**Posición del Checksum**: Byte 4 (último byte)

#### Cálculo del Checksum
```javascript
// Generación - línea 227
checksum=0;
for(i=0;i<4;i++){
    checksum+=out[i];
}
out[4]=(bit5_1<<5)|(bit5_2<<4)|(checksum%16);
```

#### Verificación del Checksum
```javascript
// Verificación - línea 277
checksum=0;
for(i=0;i<4;i++){
    checksum+=pwRAW[i];
}
checksum%=16;

if(pwChecksum!=checksum){
    out+="ERROR: Checksum is "+pwChecksum+", should be "+checksum+"<br>\n";
}
```

## 2. Estructura del Byte de Checksum

### 2.1 Game Password (Byte 19)
```
Bit Layout: [bit20_1][bit20_2][----][checksum_nibble]
            [  7-5  ][  4  ][3-0]

- Bits 7-5: bit20_1 (reservado, debe ser 0)
- Bit 4: bit20_2 (reservado, debe ser 0)  
- Bits 3-0: checksum % 16 (4 bits de checksum)
```

### 2.2 Ring Secret (Byte 14)
```
Bit Layout: [bit15_1][bit15_2][----][checksum_nibble]
            [  7-5  ][  4  ][3-0]

- Bits 7-5: bit15_1 (reservado, debe ser 0)
- Bit 4: bit15_2 (reservado, debe ser 0)
- Bits 3-0: checksum % 16 (4 bits de checksum)
```

### 2.3 Memory Secret (Byte 4)
```
Bit Layout: [bit5_1][bit5_2][----][checksum_nibble]
            [  7-5 ][  4  ][3-0]

- Bits 7-5: bit5_1 (0=primer juego, 1=juego vinculado)
- Bit 4: bit5_2 (depende del juego vinculado: Ages=1, Seasons=0)
- Bits 3-0: checksum % 16 (4 bits de checksum)
```

## 3. Algoritmo de Checksum

### 3.1 Método de Cálculo
El checksum se calcula mediante **suma simple** de todos los bytes excepto el byte de checksum:

```javascript
checksum = 0;
for(i = 0; i < n-1; i++) {  // n-1 bytes (excluyendo checksum)
    checksum += out[i];
}
final_checksum = checksum % 16;  // Solo los 4 bits menos significativos
```

### 3.2 Características del Algoritmo
- **Tipo**: Suma aritmética simple con módulo 16
- **Rango**: 0-15 (4 bits)
- **Detección**: Errores de cambio de bits individuales y algunos errores múltiples
- **Limitaciones**: No detecta reordenamientos que mantengan la suma

## 4. Flujo de Procesamiento

### 4.1 Orden de Operaciones (Generación)
```
1. Ensamblar datos en bytes sin cifrar
2. Calcular checksum de bytes sin cifrar
3. Agregar checksum al byte final
4. Aplicar cifrado (XOR con cipher)
5. Convertir a símbolos
```

### 4.2 Orden de Operaciones (Verificación)
```
1. Convertir símbolos a bytes
2. Aplicar descifrado (XOR con cipher)
3. Extraer checksum del byte final
4. Recalcular checksum de bytes descifrados
5. Comparar checksums
```

## 5. Bits de Control Adicionales

### 5.1 Game Password
```javascript
// Bit validation
if((pwRAW[19]>>5)%2!=0){
    out+="WARNING: Bit 20₁ is 1, should be 0 (only used in memory secrets)<br>\n";
}
if((pwRAW[19]>>4)%2!=0){
    out+="WARNING: Bit 20₂ is 1, should be 0 (only used in memory secrets)<br>\n";
}
```

### 5.2 Ring Secret
```javascript
// Bit validation
if((pwRAW[14]>>5)%2!=0){
    out+="WARNING: Bit 15₁ is 1, should be 0 (only used in memory secrets)<br>\n";
}
if((pwRAW[14]>>4)%2!=0){
    out+="WARNING: Bit 15₂ is 1, should be 0 (only used in memory secrets)<br>\n";
}
```

### 5.3 Memory Secret
Los bits superiores se usan para metadatos del juego:
- **bit5_1**: Indica si es para el primer juego (0) o juego vinculado (1)
- **bit5_2**: Depende del Oracle vinculado (Ages=1, Seasons=0)

## 6. Validación y Detección de Errores

### 6.1 Tipos de Errores Detectables
- **Corrupción de bits individuales**: ✅ Detectado
- **Cambios en valores de bytes**: ✅ Detectado  
- **Bytes faltantes/extra**: ✅ Detectado por longitud
- **Reordenamiento de bytes**: ❌ No detectado si suma permanece igual

### 6.2 Tipos de Errores NO Detectables
- **Intercambio de bytes con igual suma**: Ej: [5,3] ↔ [3,5]
- **Múltiples errores que se cancelan**: Ej: +2 en un byte, -2 en otro
- **Overflow aritmético**: El módulo 16 puede ocultar algunos errores

## 7. Implementación en TypeScript Actual

### 7.1 Estado Actual
La implementación TypeScript actual (`zeldaOraclePasswordGenerator.ts`) incluye:

```typescript
function calculateChecksum(bytesArray: number[]): number {
    const sum = bytesArray.reduce((accumulator, currentValue) => accumulator + currentValue);
    return sum & 0x0F;  // Equivalente a sum % 16
}
```

### 7.2 Uso en la Implementación
```typescript
// En toBytes() - línea ~
const unencodedBytes = convertBinaryToIntegers(unencodedSecret);
unencodedBytes[19] = calculateChecksum(unencodedBytes);
const secret = encodeBytes(unencodedBytes);

// En toBytesMemorySecret() - línea ~  
const unencodedBytes = convertBinaryToIntegers(unencodedSecret);
unencodedBytes[4] = calculateChecksum(unencodedBytes) | (mask << 4);
const secret = encodeBytes(unencodedBytes);
```

## 8. Conclusiones

### 8.1 Fortalezas del Sistema
- **Simple y eficiente**: Cálculo rápido y fácil implementación
- **Compatibilidad**: Funciona en hardware limitado de Game Boy Color
- **Detección básica**: Captura la mayoría de errores de transcripción manual

### 8.2 Debilidades del Sistema
- **Checksum débil**: Solo 4 bits, limitada capacidad de detección
- **Sin redundancia**: No hay mecanismos de corrección de errores
- **Vulnerabilidad a patrones**: Ciertos tipos de errores pasan desapercibidos

### 8.3 Recomendaciones
1. **Mantener compatibilidad**: El sistema actual debe preservarse para retrocompatibilidad
2. **Documentar limitaciones**: Los usuarios deben conocer las limitaciones del checksum
3. **Validación adicional**: Considerar validaciones de contexto (rangos de valores, etc.)
4. **Testing exhaustivo**: Verificar que la implementación TypeScript coincida exactamente con la original
