import { useState } from 'react';
import { 
    Paper, 
    Title, 
    Tabs, 
    TextInput,
    Button,
    Group,
    Text,
    Box
} from '@mantine/core';

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

    const analyzePassword = () => {
        // TODO: Aquí se podría implementar la lógica para analizar el password ingresado
        console.log('Analyzing password:', inputPassword);
    };

    return (
        <Paper p="md">
            <Title order={3} mb="md">Password Management</Title>
            
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
                    <Box>
                        <Text size="sm" c="dimmed" mb="xs">
                            Enter a password to analyze:
                        </Text>
                        <TextInput
                            placeholder="Enter password here..."
                            value={inputPassword}
                            onChange={handleInputPasswordChange}
                            mb="md"
                            styles={{
                                input: {
                                    fontFamily: 'monospace',
                                    fontSize: '14px'
                                }
                            }}
                        />
                        <Group justify="flex-end">
                            <Button 
                                onClick={analyzePassword}
                                disabled={!inputPassword.trim()}
                                variant="outline"
                                size="sm"
                            >
                                Analyze Password
                            </Button>
                        </Group>
                        
                        {inputPassword && (
                            <Paper 
                                mt="md"
                                p="sm"
                                style={{ 
                                    backgroundColor: '#f8f9fa',
                                    border: '1px solid #e9ecef'
                                }}
                            >
                                <Text size="sm" c="dimmed">
                                    Password preview: <span style={{ fontFamily: 'monospace', fontWeight: 'bold' }}>{inputPassword}</span>
                                </Text>
                            </Paper>
                        )}
                    </Box>
                </Tabs.Panel>
            </Tabs>
        </Paper>
    );
};

export default GeneratedPasswordComponent;
