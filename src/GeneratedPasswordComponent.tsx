import { useState } from 'react';
import { 
    Paper, 
    Tabs, 
    TextInput,
    Button,
    Group,
    Text,
    Box,
    Grid
} from '@mantine/core';
import ZeldaKeyboard from './ZeldaKeyboard';
import PasswordSymbols from './PasswordSymbols';

interface GeneratedPasswordComponentProps {
    mainPassword: string[];
    formatPassword: (password: string[]) => string;
}

const GeneratedPasswordComponent: React.FC<GeneratedPasswordComponentProps> = ({ 
    mainPassword, 
    formatPassword 
}) => {
    const [activeTab, setActiveTab] = useState<string | null>('generated');
    const [inputPassword, setInputPassword] = useState<string>('');

    const htmlPassword = formatPassword(mainPassword);

    const handleInputPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputPassword(event.currentTarget.value);
    };

    const handleSymbolClick = (symbol: string) => {
        setInputPassword(prev => prev.length < 20 ? prev + symbol : prev);
    };

    const clearInputPassword = () => {
        setInputPassword('');
    };

    const deleteLastCharacter = () => {
        setInputPassword(prev => prev.slice(0, -1));
    };

    const formatPasswordPreview = (password: string): string => {
        // Convertir la contraseña en 4 grupos de 5 caracteres
        const groups = [];
        for (let i = 0; i < password.length; i += 5) {
            groups.push(password.slice(i, i + 5));
        }
        return groups.join(' ');
    };

    const analyzePassword = () => {
        // TODO: Aquí se podría implementar la lógica para analizar el password ingresado
        console.log('Analyzing password:', inputPassword);
    };

    return (
        <Paper p="md">
            <Tabs value={activeTab} onChange={setActiveTab}>
                <Tabs.List>
                    <Tabs.Tab value="generated">Generated Password</Tabs.Tab>
                    <Tabs.Tab value="input">Input Password</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="generated" pt="md">
                    <Box>
                        <Text size="sm" c="dimmed" mb="xs">
                            Generated based on your current settings:
                        </Text>
                        <Paper 
                            style={{ 
                                fontFamily: 'monospace',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                textAlign: 'center',
                                padding: '16px',
                                backgroundColor: '#f8f9fa',
                                border: '1px solid #e9ecef'
                            }}
                            dangerouslySetInnerHTML={{
                                __html: htmlPassword.length >= 10 ? htmlPassword : "The password will appear here."
                            }}
                        />
                    </Box>
                </Tabs.Panel>

                <Tabs.Panel value="input" pt="md">
                    <Grid>
                        {/* Columna izquierda - Input y controles */}
                        <Grid.Col span={6}>
                            <Box>
                                <Text size="sm" c="dimmed" mb="xs">
                                    Enter password manually:
                                </Text>
                                <TextInput
                                    placeholder="Click symbols or type here..."
                                    value={inputPassword}
                                    onChange={handleInputPasswordChange}
                                    maxLength={20}
                                    mb="md"
                                    styles={{
                                        input: {
                                            fontFamily: 'monospace',
                                            fontSize: '14px'
                                        }
                                    }}
                                />
                                <Text size="xs" c="dimmed" mb="xs" ta="right">
                                    {inputPassword.length}/20 caracteres
                                </Text>
                                <Group justify="space-between" mb="md">
                                    <Group>
                                        <Button 
                                            onClick={clearInputPassword}
                                            variant="outline"
                                            size="xs"
                                            color="red"
                                        >
                                            Clear
                                        </Button>
                                        <Button 
                                            onClick={deleteLastCharacter}
                                            variant="outline"
                                            size="xs"
                                            disabled={!inputPassword}
                                        >
                                            Delete
                                        </Button>
                                    </Group>
                                    <Button 
                                        onClick={analyzePassword}
                                        disabled={!inputPassword.trim()}
                                        variant="filled"
                                        size="xs"
                                    >
                                        Analyze
                                    </Button>
                                </Group>
                                
                                {inputPassword && (
                                    <Paper 
                                        p="sm"
                                        style={{ 
                                            backgroundColor: '#f8f9fa',
                                            border: '1px solid #e9ecef'
                                        }}
                                    >
                                        <Text size="sm" c="dimmed" mb="xs">
                                            Password preview (text):
                                        </Text>
                                        <Text 
                                            style={{ 
                                                fontFamily: 'monospace', 
                                                fontWeight: 'bold',
                                                fontSize: '14px',
                                                marginBottom: '12px'
                                            }}
                                        >
                                            {formatPasswordPreview(inputPassword)}
                                        </Text>
                                        
                                        <Text size="sm" c="dimmed" mb="xs">
                                            Password preview (symbols):
                                        </Text>
                                        <PasswordSymbols 
                                            password={inputPassword} 
                                            symbolSize={20}
                                        />
                                    </Paper>
                                )}
                            </Box>
                        </Grid.Col>

                        {/* Columna derecha - Teclado especial */}
                        <Grid.Col span={6}>
                            <Box>
                                <Text size="sm" c="dimmed" mb="xs">
                                    Zelda Oracle Symbol Keyboard:
                                </Text>
                                <ZeldaKeyboard onSymbolClick={handleSymbolClick} />
                            </Box>
                        </Grid.Col>
                    </Grid>
                </Tabs.Panel>
            </Tabs>
        </Paper>
    );
};

export default GeneratedPasswordComponent;
