import { useState, useEffect, type ChangeEvent } from 'react';
import { 
    Container, 
    Title, 
    Grid, 
    Paper, 
    Group, 
    TextInput, 
    NumberInput, 
    Select, 
    Image, 
    Text,
    Box,
    Button,
    Table,
    SegmentedControl,
    ThemeIcon
} from '@mantine/core';
import { 
    IconUser, 
    IconUsers, 
    IconId, 
    IconMoodKid
} from '@tabler/icons-react';
import ReactCountryFlag from "react-country-flag";
import './App.css';

import { updateProperties } from './zeldaOraclePasswordGenerator';
import RingsComponent from './RingsComponent';

import nayru from './assets/Nayru.gif';
import nayru_inactive from './assets/nayru.png';
import din from './assets/Din.gif';
import din_inactive from './assets/din.png';
import link from './assets/link.png';
import link_ages from './assets/link_ages.gif';
import link_seasons from './assets/link_seasons.gif';
import triforce from './assets/triforce.png';
import moosh from './assets/moosh.png';
import moosh_inactive from './assets/moosh.png';
import ricky from './assets/ricky.png';
import ricky_inactive from './assets/ricky.png';
import dimitri from './assets/dimitri.png';
import dimitri_inactive from './assets/dimitri.png';

interface MemorySecretsProps {
    password: string;
    person: string;
}

interface GameSettingsProps {
    game: string;
    gameID: string;
    heroName: string;
    childName: string;
    animal: string;
    behavior: string;
    isLinkedGame: boolean;
    isHeroQuest: boolean;
    gameLanguage: string;
    handleChange: (event: any) => void;
    gameIsAges: boolean;
}

const GameSettings: React.FC<GameSettingsProps> = ({ 
    game, gameID, heroName, childName, animal, behavior, 
    isLinkedGame, isHeroQuest, gameLanguage, handleChange, gameIsAges 
}) => {
    return (
        <Paper p="md">
            <Title order={3} mb="md">Game Settings</Title>
            
            <Box style={{
                display: 'grid',
                gridTemplateColumns: 'auto 1fr auto',
                gap: '12px',
                alignItems: 'center'
            }}>
                {/* Game Language Row */}
                <Text size="sm" fw={500}>Game Language</Text>
                <SegmentedControl
                    value={gameLanguage}
                    onChange={(value) => handleChange({
                        target: { name: 'gameLanguage', value: value }
                    } as any)}
                    data={[
                        { label: 'EUR/US', value: 'EUR/US' },
                        { label: 'JP', value: 'JP' }
                    ]}
                    size="sm"
                    fullWidth
                />
                <Group gap="xs" justify="center" wrap="nowrap">
                    <Box style={{ 
                        width: '32px',
                        height: '32px',
                        borderRadius: '4px',
                        overflow: 'hidden',
                        border: gameLanguage === 'EUR/US' ? '2px solid #228be6' : '2px solid #e9ecef',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: gameLanguage === 'EUR/US' ? 1 : 0.4,
                        filter: gameLanguage === 'EUR/US' ? 'none' : 'grayscale(100%)',
                        flexShrink: 0
                    }}>
                        <ReactCountryFlag 
                            countryCode="EU" 
                            svg 
                            style={{ 
                                width: '24px',
                                height: '24px',
                                objectFit: 'cover'
                            }} 
                        />
                    </Box>
                    <Box style={{ 
                        width: '32px',
                        height: '32px',
                        borderRadius: '4px',
                        overflow: 'hidden',
                        border: gameLanguage === 'JP' ? '2px solid #228be6' : '2px solid #e9ecef',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: gameLanguage === 'JP' ? 1 : 0.4,
                        filter: gameLanguage === 'JP' ? 'none' : 'grayscale(100%)',
                        flexShrink: 0
                    }}>
                        <ReactCountryFlag 
                            countryCode="JP" 
                            svg 
                            style={{ 
                                width: '24px',
                                height: '24px',
                                objectFit: 'cover'
                            }} 
                        />
                    </Box>
                </Group>

                {/* Game Title Row */}
                <Text size="sm" fw={500}>Oracle of...</Text>
                <SegmentedControl
                    value={game}
                    onChange={(value) => handleChange({
                        target: { name: 'game', value: value }
                    } as any)}
                    data={[
                        { label: 'Ages', value: 'Ages' },
                        { label: 'Seasons', value: 'Seasons' }
                    ]}
                    size="sm"
                    fullWidth
                />
                <Group gap="xs" justify="center" wrap="nowrap">
                    <Box style={{ 
                        width: '32px',
                        height: '32px',
                        borderRadius: '6px',
                        overflow: 'hidden',
                        border: game === 'Ages' ? '2px solid #228be6' : '2px solid #e9ecef',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: game === 'Ages' ? 1 : 0.4,
                        filter: game === 'Ages' ? 'none' : 'grayscale(100%)',
                        backgroundColor: '#f8f9fa',
                        flexShrink: 0
                    }}>
                        <Image
                            src={game === 'Ages' ? nayru : nayru_inactive}
                            style={{ 
                                width: '24px',
                                height: '24px',
                                objectFit: 'contain'
                            }} 
                        />
                    </Box>
                    <Box style={{ 
                        width: '32px',
                        height: '32px',
                        borderRadius: '6px',
                        overflow: 'hidden',
                        border: game === 'Seasons' ? '2px solid #228be6' : '2px solid #e9ecef',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: game === 'Seasons' ? 1 : 0.4,
                        filter: game === 'Seasons' ? 'none' : 'grayscale(100%)',
                        backgroundColor: '#f8f9fa',
                        flexShrink: 0
                    }}>
                        <Image
                            src={game === 'Seasons' ? din : din_inactive}
                            style={{ 
                                width: '24px',
                                height: '24px',
                                objectFit: 'contain'
                            }} 
                        />
                    </Box>
                </Group>

                {/* Game Type Row */}
                <Text size="sm" fw={500}>Game Type</Text>
                <Group gap="xs">
                    <Button
                        variant={isLinkedGame ? 'filled' : 'outline'}
                        size="sm"
                        onClick={() => handleChange({
                            target: { name: 'isLinkedGame', value: !isLinkedGame }
                        } as any)}
                        style={{ flex: 1 }}
                    >
                        Linked Game
                    </Button>
                    <Button
                        variant={isHeroQuest ? 'filled' : 'outline'}
                        size="sm"
                        onClick={() => handleChange({
                            target: { name: 'isHeroQuest', value: !isHeroQuest }
                        } as any)}
                        style={{ flex: 1 }}
                    >
                        Hero's Quest
                    </Button>
                </Group>
                <Group gap="xs" justify="center" wrap="nowrap">
                    <Box style={{ 
                        width: '32px',
                        height: '32px',
                        borderRadius: '6px',
                        overflow: 'hidden',
                        border: isLinkedGame ? '2px solid #228be6' : '2px solid #e9ecef',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: isLinkedGame ? 1 : 0.4,
                        filter: isLinkedGame ? 'none' : 'grayscale(100%)',
                        backgroundColor: '#f8f9fa',
                        flexShrink: 0
                    }}>
                        <Image
                            src={isLinkedGame ? (gameIsAges ? link_ages : link_seasons) : link}
                            style={{ 
                                width: '24px',
                                height: '24px',
                                objectFit: 'contain'
                            }} 
                        />
                    </Box>
                    <Box style={{ 
                        width: '32px',
                        height: '32px',
                        borderRadius: '6px',
                        overflow: 'hidden',
                        border: isHeroQuest ? '2px solid #228be6' : '2px solid #e9ecef',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: isHeroQuest ? 1 : 0.4,
                        filter: isHeroQuest ? 'none' : 'grayscale(100%)',
                        backgroundColor: '#f8f9fa',
                        flexShrink: 0
                    }}>
                        <Image
                            src={triforce}
                            style={{ 
                                width: '24px',
                                height: '24px',
                                objectFit: 'contain'
                            }} 
                        />
                    </Box>
                </Group>

                {/* Hero Name Row */}
                <Text size="sm" fw={500}>Hero Name</Text>
                <TextInput
                    placeholder="Enter hero name"
                    maxLength={5}
                    value={heroName}
                    onChange={(event) => handleChange({
                        target: { name: 'heroName', value: event.currentTarget.value }
                    } as any)}
                />
                <ThemeIcon size={32} variant="light" color="green">
                    <IconUser size={24} />
                </ThemeIcon>

                {/* Child Name Row */}
                <Text size="sm" fw={500}>Child Name</Text>
                <TextInput
                    placeholder="Enter child name"
                    maxLength={5}
                    value={childName}
                    onChange={(event) => handleChange({
                        target: { name: 'childName', value: event.currentTarget.value }
                    } as any)}
                />
                <ThemeIcon size={32} variant="light" color="pink">
                    <IconUsers size={24} />
                </ThemeIcon>

                {/* Game ID Row */}
                <Text size="sm" fw={500}>Game ID</Text>
                <NumberInput
                    placeholder="Enter game ID"
                    min={0}
                    max={32767}
                    value={gameID !== '' ? parseInt(gameID) : undefined}
                    onChange={(value) => handleChange({
                        target: { name: 'gameID', value: value?.toString() || '' }
                    } as any)}
                />
                <ThemeIcon size={32} variant="light" color="yellow">
                    <IconId size={24} />
                </ThemeIcon>

                {/* Behavior Row */}
                <Text size="sm" fw={500}>Behavior</Text>
                <Select
                    value={behavior}
                    onChange={(value) => handleChange({
                        target: { name: 'behavior', value: value || 'Infant' }
                    } as any)}
                    data={[
                        { value: 'Infant', label: 'Infant' },
                        { value: 'BouncyA', label: 'BouncyA' },
                        { value: 'BouncyB', label: 'BouncyB' },
                        { value: 'BouncyC', label:'BouncyC' },
                        { value: 'BouncyD', label: 'BouncyD' },
                        { value: 'BouncyE', label: 'BouncyE' },
                        { value: 'ShyA', label: 'ShyA' },
                        { value: 'ShyB', label: 'ShyB' },
                        { value: 'ShyC', label: 'ShyC' },
                        { value: 'ShyD', label: 'ShyD' },
                        { value: 'ShyE', label: 'ShyE' },
                        { value: 'HyperA', label: 'HyperA' },
                        { value: 'HyperB', label: 'HyperB' },
                        { value: 'HyperC', label: 'HyperC' },
                        { value: 'HyperD', label: 'HyperD' },
                        { value: 'HyperE', label: 'HyperE' },
                    ]}
                />
                <ThemeIcon size={32} variant="light" color="orange">
                    <IconMoodKid size={24} />
                </ThemeIcon>

                {/* Animal Friend Row */}
                <Text size="sm" fw={500}>Animal Friend</Text>
                <SegmentedControl
                    value={animal}
                    onChange={(value) => handleChange({
                        target: { name: 'animal', value: value }
                    } as any)}
                    data={[
                        { label: 'Ricky', value: 'Ricky' },
                        { label: 'Dimitri', value: 'Dimitri' },
                        { label: 'Moosh', value: 'Moosh' }
                    ]}
                    size="sm"
                    fullWidth
                />
                <Group gap="xs" justify="center" wrap="nowrap">
                    <Box style={{ 
                        width: '32px',
                        height: '32px',
                        borderRadius: '6px',
                        overflow: 'hidden',
                        border: animal === 'Ricky' ? '2px solid #228be6' : '2px solid #e9ecef',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: animal === 'Ricky' ? 1 : 0.4,
                        filter: animal === 'Ricky' ? 'none' : 'grayscale(100%)',
                        backgroundColor: '#f8f9fa',
                        flexShrink: 0
                    }}>
                        <Image
                            src={animal === 'Ricky' ? ricky : ricky_inactive}
                            style={{ 
                                width: '24px',
                                height: '24px',
                                objectFit: 'contain'
                            }} 
                        />
                    </Box>
                    <Box style={{ 
                        width: '32px',
                        height: '32px',
                        borderRadius: '6px',
                        overflow: 'hidden',
                        border: animal === 'Dimitri' ? '2px solid #228be6' : '2px solid #e9ecef',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: animal === 'Dimitri' ? 1 : 0.4,
                        filter: animal === 'Dimitri' ? 'none' : 'grayscale(100%)',
                        backgroundColor: '#f8f9fa',
                        flexShrink: 0
                    }}>
                        <Image
                            src={animal === 'Dimitri' ? dimitri : dimitri_inactive}
                            style={{ 
                                width: '24px',
                                height: '24px',
                                objectFit: 'contain'
                            }} 
                        />
                    </Box>
                    <Box style={{ 
                        width: '32px',
                        height: '32px',
                        borderRadius: '6px',
                        overflow: 'hidden',
                        border: animal === 'Moosh' ? '2px solid #228be6' : '2px solid #e9ecef',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: animal === 'Moosh' ? 1 : 0.4,
                        filter: animal === 'Moosh' ? 'none' : 'grayscale(100%)',
                        backgroundColor: '#f8f9fa',
                        flexShrink: 0
                    }}>
                        <Image
                            src={animal === 'Moosh' ? moosh : moosh_inactive}
                            style={{ 
                                width: '24px',
                                height: '24px',
                                objectFit: 'contain'
                            }} 
                        />
                    </Box>
                </Group>
            </Box>
        </Paper>
    );
};

const App: React.FC = () => {
    // Individual state hooks for each piece of data
    const [mainPassword, setMainPassword] = useState<string[]>(["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]);
    const [memoryPassword, setMemoryPassword] = useState<string[]>(["", "", "", "", "", "", "", "", "", ""]);
    const [game, setGame] = useState<string>("Ages");
    const [gameID, setGameID] = useState<string>("7098");
    const [heroName, setHeroName] = useState<string>("Link");
    const [childName, setChildName] = useState<string>("Pip");
    const [animal, setAnimal] = useState<string>("Ricky");
    const [behavior, setBehavior] = useState<string>("Infant");
    const [isLinkedGame, setIsLinkedGame] = useState<boolean>(false);
    const [isHeroQuest, setIsHeroQuest] = useState<boolean>(false);
    const [gameLanguage, setGameLanguage] = useState<string>("EUR/US");

    const getPassword = (): string[][] | undefined => {
        let newPassword = updateProperties(
            game,
            gameID,
            heroName,
            childName,
            animal,
            behavior,
            isLinkedGame,
            isHeroQuest
        );

        if (game && gameID) {
            return newPassword;
        }
    };

    const updatePassword = () => {
        let passwords = getPassword();

        if (!passwords) {
            return;
        }

        let newPassword = passwords[0];

        setMainPassword(newPassword);
        setMemoryPassword(passwords.slice(1).map(p => p.join('')));
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement> | { target: { name: string, value: any } }) => {
        let value: string | boolean = event.target.value;
        
        // Handle boolean values for buttons
        if (event.target.name === 'isLinkedGame') {
            setIsLinkedGame(event.target.value);
            return;
        }
        
        if (event.target.name === 'isHeroQuest') {
            setIsHeroQuest(event.target.value);
            return;
        }
        
        if ((event.target as HTMLInputElement).type === "checkbox") {
            value = (event.target as HTMLInputElement).checked;
        }
        
        // Handle each field individually
        switch (event.target.name) {
            case 'gameLanguage':
                setGameLanguage(value as string);
                break;
            case 'game':
                setGame(value as string);
                break;
            case 'heroName':
                setHeroName(value as string);
                break;
            case 'childName':
                setChildName(value as string);
                break;
            case 'gameID':
                setGameID(value as string);
                break;
            case 'behavior':
                setBehavior(value as string);
                break;
            case 'animal':
                setAnimal(value as string);
                break;
            default:
                break;
        }
    };

    const formatPassword = (password: string[]): string => {
        let newPassword = password.slice();
        if (!password) {
            return "";
        }
        for (let i = 0; i < newPassword.length; i++) {
            if (i === 0) {
                continue;
            }
            if (i % 10 === 0) {
                newPassword[i] = "<br>" + newPassword[i];
                continue;
            }
            if (i % 5 === 0) {
                newPassword[i] = " " + newPassword[i];
            }
        }

        return newPassword.join('');
    };

    // Initial password generation
    useEffect(() => {
        updatePassword();
    }, []);

    // Update password when state changes
    useEffect(() => {
        let passwords = getPassword();

        if (!passwords) {
            return;
        }

        let newPassword = passwords[0];

        // Only update if password actually changed
        const currentPassword = mainPassword.join('');
        const newPasswordString = newPassword.join('');
        
        if (currentPassword !== newPasswordString) {
            setMainPassword(newPassword);
            setMemoryPassword(passwords.slice(1).map(p => p.join('')));
        }
    }, [game, gameID, heroName, childName, animal, behavior, isLinkedGame, isHeroQuest]);

    let statePassword = mainPassword;
    let htmlPassword = formatPassword(statePassword);

    let gameIsAges = game === "Ages";

    return (
        <Container size="xl">
            <Title order={1} ta="center" mb="xl">
                Zelda Oracle Password Generator
            </Title>
            
            <Grid>
                {/* Columna izquierda - Configuración del usuario */}
                <Grid.Col span={{ base: 12, lg: 6 }}>
                    <Box style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <GameSettings 
                            game={game}
                            gameID={gameID}
                            heroName={heroName}
                            childName={childName}
                            animal={animal}
                            behavior={behavior}
                            isLinkedGame={isLinkedGame}
                            isHeroQuest={isHeroQuest}
                            gameLanguage={gameLanguage}
                            handleChange={handleChange}
                            gameIsAges={gameIsAges}
                        />
                        <RingsComponent />
                    </Box>
                </Grid.Col>

                {/* Columna derecha - Resultados */}
                <Grid.Col span={{ base: 12, lg: 6 }}>
                    <Box style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {/* Generated Password */}
                        <Paper p="md">
                            <Title order={3} mb="md">Generated Password</Title>
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
                        </Paper>

                        {/* Memory Secrets */}
                        <Paper p="md">
                            <Title order={3} mb="md">Memory Secrets</Title>
                            <Table striped highlightOnHover withTableBorder withColumnBorders>
                                <Table.Tbody>
                                    <MemorySecrets password={memoryPassword[0] || "N/A"}
                                                   person={gameIsAges ? "ClockShop" : "King Zora"}/>
                                    <MemorySecrets password={memoryPassword[1] || "N/A"} 
                                                   person={gameIsAges ? "Graveyard" : "Fairy"}/>
                                    <MemorySecrets password={memoryPassword[2] || "N/A"} 
                                                   person={gameIsAges ? "Subrosian" : "Troy"}/>
                                    <MemorySecrets password={memoryPassword[3] || "N/A"} 
                                                   person={gameIsAges ? "Diver" : "Plen"}/>
                                    <MemorySecrets password={memoryPassword[4] || "N/A"} 
                                                   person={gameIsAges ? "Smith" : "Library"}/>
                                    <MemorySecrets password={memoryPassword[5] || "N/A"} 
                                                   person={gameIsAges ? "Pirate" : "Tokay"}/>
                                    <MemorySecrets password={memoryPassword[6] || "N/A"} 
                                                   person={gameIsAges ? "Temple" : "Mamamu"}/>
                                    <MemorySecrets password={memoryPassword[7] || "N/A"} 
                                                   person={gameIsAges ? "Diver" : "Tingle"}/>
                                    <MemorySecrets password={memoryPassword[8] || "N/A"} 
                                                   person={gameIsAges ? "Biggoron" : "Elder"}/>
                                    <MemorySecrets password={memoryPassword[9] || "N/A"} 
                                                   person={gameIsAges ? "Ruul" : "Symmetry"}/>
                                </Table.Tbody>
                            </Table>
                        </Paper>
                    </Box>
                </Grid.Col>
            </Grid>
        </Container>
    );
};

const MemorySecrets: React.FC<MemorySecretsProps> = ({ password, person }) => {
    return (
        <Table.Tr>
            <Table.Td>{person} Secret</Table.Td>
            <Table.Td style={{ fontFamily: 'monospace', fontWeight: 'bold' }}>
                {password}
            </Table.Td>
        </Table.Tr>
    );
};

export default App;
