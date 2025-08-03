import { Box, Image } from '@mantine/core';

// Importar todas las imágenes de símbolos
import symbol00 from './assets/Symbols_US/00.png';
import symbol01 from './assets/Symbols_US/01.png';
import symbol02 from './assets/Symbols_US/02.png';
import symbol03 from './assets/Symbols_US/03.png';
import symbol04 from './assets/Symbols_US/04.png';
import symbol05 from './assets/Symbols_US/05.png';
import symbol06 from './assets/Symbols_US/06.png';
import symbol07 from './assets/Symbols_US/07.png';
import symbol08 from './assets/Symbols_US/08.png';
import symbol09 from './assets/Symbols_US/09.png';
import symbol10 from './assets/Symbols_US/10.png';
import symbol11 from './assets/Symbols_US/11.png';
import symbol12 from './assets/Symbols_US/12.png';
import symbol13 from './assets/Symbols_US/13.png';
import symbol14 from './assets/Symbols_US/14.png';
import symbol15 from './assets/Symbols_US/15.png';
import symbol16 from './assets/Symbols_US/16.png';
import symbol17 from './assets/Symbols_US/17.png';
import symbol18 from './assets/Symbols_US/18.png';
import symbol19 from './assets/Symbols_US/19.png';
import symbol20 from './assets/Symbols_US/20.png';
import symbol21 from './assets/Symbols_US/21.png';
import symbol22 from './assets/Symbols_US/22.png';
import symbol23 from './assets/Symbols_US/23.png';
import symbol24 from './assets/Symbols_US/24.png';
import symbol25 from './assets/Symbols_US/25.png';
import symbol26 from './assets/Symbols_US/26.png';
import symbol27 from './assets/Symbols_US/27.png';
import symbol28 from './assets/Symbols_US/28.png';
import symbol29 from './assets/Symbols_US/29.png';
import symbol30 from './assets/Symbols_US/30.png';
import symbol31 from './assets/Symbols_US/31.png';
import symbol32 from './assets/Symbols_US/32.png';
import symbol33 from './assets/Symbols_US/33.png';
import symbol34 from './assets/Symbols_US/34.png';
import symbol35 from './assets/Symbols_US/35.png';
import symbol36 from './assets/Symbols_US/36.png';
import symbol37 from './assets/Symbols_US/37.png';
import symbol38 from './assets/Symbols_US/38.png';
import symbol39 from './assets/Symbols_US/39.png';
import symbol40 from './assets/Symbols_US/40.png';
import symbol41 from './assets/Symbols_US/41.png';
import symbol42 from './assets/Symbols_US/42.png';
import symbol43 from './assets/Symbols_US/43.png';
import symbol44 from './assets/Symbols_US/44.png';
import symbol45 from './assets/Symbols_US/45.png';
import symbol46 from './assets/Symbols_US/46.png';
import symbol47 from './assets/Symbols_US/47.png';
import symbol48 from './assets/Symbols_US/48.png';
import symbol49 from './assets/Symbols_US/49.png';
import symbol50 from './assets/Symbols_US/50.png';
import symbol51 from './assets/Symbols_US/51.png';
import symbol52 from './assets/Symbols_US/52.png';
import symbol53 from './assets/Symbols_US/53.png';
import symbol54 from './assets/Symbols_US/54.png';
import symbol55 from './assets/Symbols_US/55.png';
import symbol56 from './assets/Symbols_US/56.png';
import symbol57 from './assets/Symbols_US/57.png';
import symbol58 from './assets/Symbols_US/58.png';
import symbol59 from './assets/Symbols_US/59.png';
import symbol60 from './assets/Symbols_US/60.png';
import symbol61 from './assets/Symbols_US/61.png';
import symbol62 from './assets/Symbols_US/62.png';
import symbol63 from './assets/Symbols_US/63.png';

interface PasswordSymbolsProps {
    password: string;
    symbolSize?: number;
}

const PasswordSymbols: React.FC<PasswordSymbolsProps> = ({ password, symbolSize = 24 }) => {
    // Array de símbolos de Zelda Oracle que corresponde exactamente a los índices de las imágenes
    const zeldaSymbols = [
        'B', 'D', 'F', 'G', 'H', 'J', 'L', 'M', '♠', '♥', '♦', '♣', '#',
        'N', 'Q', 'R', 'S', 'T', 'W', 'Y', '!', '●', '▲', '■', '+', '-',
        'b', 'd', 'f', 'g', 'h', 'j', 'l', 'm', '$', '*', '/', ':', '~',
        'n', 'q', 'r', 's', 't', 'w', 'y', '?', '%', '&', '(', '=', ')',
        '2', '3', '4', '5', '6', '7', '8', '9', '↑', '↓', '←', '→', '@'
    ];

    // Array de imágenes importadas
    const symbolImages = [
        symbol00, symbol01, symbol02, symbol03, symbol04, symbol05, symbol06, symbol07,
        symbol08, symbol09, symbol10, symbol11, symbol12, symbol13, symbol14, symbol15,
        symbol16, symbol17, symbol18, symbol19, symbol20, symbol21, symbol22, symbol23,
        symbol24, symbol25, symbol26, symbol27, symbol28, symbol29, symbol30, symbol31,
        symbol32, symbol33, symbol34, symbol35, symbol36, symbol37, symbol38, symbol39,
        symbol40, symbol41, symbol42, symbol43, symbol44, symbol45, symbol46, symbol47,
        symbol48, symbol49, symbol50, symbol51, symbol52, symbol53, symbol54, symbol55,
        symbol56, symbol57, symbol58, symbol59, symbol60, symbol61, symbol62, symbol63
    ];

    // Función para obtener la imagen basada en el símbolo
    const getSymbolImage = (symbol: string): string => {
        const index = zeldaSymbols.indexOf(symbol);
        return index !== -1 ? symbolImages[index] : symbolImages[0]; // Si no se encuentra, usar índice 0 por defecto
    };

    // Formatear la contraseña en grupos de 5 caracteres
    const formatPasswordInGroups = (pwd: string) => {
        const groups = [];
        for (let i = 0; i < pwd.length; i += 5) {
            groups.push(pwd.slice(i, i + 5));
        }
        return groups;
    };

    const passwordGroups = formatPasswordInGroups(password);

    return (
        <Box>
            {passwordGroups.map((group, groupIndex) => (
                <Box 
                    key={groupIndex} 
                    style={{ 
                        display: 'flex', 
                        gap: '2px', 
                        marginBottom: groupIndex < passwordGroups.length - 1 ? '8px' : '0' 
                    }}
                >
                    {group.split('').map((symbol, symbolIndex) => {
                        const symbolImage = getSymbolImage(symbol);
                        
                        return (
                            <Image
                                key={`${groupIndex}-${symbolIndex}`}
                                src={symbolImage}
                                alt={symbol}
                                style={{
                                    width: `${symbolSize}px`,
                                    height: `${symbolSize}px`,
                                    objectFit: 'contain'
                                }}
                            />
                        );
                    })}
                </Box>
            ))}
        </Box>
    );
};

export default PasswordSymbols;
