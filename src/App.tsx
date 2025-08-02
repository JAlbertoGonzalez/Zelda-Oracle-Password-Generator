import { Component, type ChangeEvent } from 'react';
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

interface AppState {
    mainPassword: string[];
    memoryPassword: string[];
    game: string;
    gameID: string;
    heroName: string;
    childName: string;
    animal: string;
    behavior: string;
    isLinkedGame: boolean;
    isHeroQuest: boolean;
    gameLanguage: string;
}

interface MemorySecretsProps {
    password: string;
    person: string;
}

interface GameSettingsProps {
    state: AppState;
    handleChange: (event: any) => void;
    gameIsAges: boolean;
}

class GameSettings extends Component<GameSettingsProps> {
    render() {
        const { state, handleChange, gameIsAges } = this.props;
        
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
                        value={state.gameLanguage}
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
                            border: state.gameLanguage === 'EUR/US' ? '2px solid #228be6' : '2px solid #e9ecef',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: state.gameLanguage === 'EUR/US' ? 1 : 0.4,
                            filter: state.gameLanguage === 'EUR/US' ? 'none' : 'grayscale(100%)',
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
                            border: state.gameLanguage === 'JP' ? '2px solid #228be6' : '2px solid #e9ecef',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: state.gameLanguage === 'JP' ? 1 : 0.4,
                            filter: state.gameLanguage === 'JP' ? 'none' : 'grayscale(100%)',
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
                        value={state.game}
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
                            border: state.game === 'Ages' ? '2px solid #228be6' : '2px solid #e9ecef',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: state.game === 'Ages' ? 1 : 0.4,
                            filter: state.game === 'Ages' ? 'none' : 'grayscale(100%)',
                            backgroundColor: '#f8f9fa',
                            flexShrink: 0
                        }}>
                            <Image
                                src={state.game === 'Ages' ? nayru : nayru_inactive}
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
                            border: state.game === 'Seasons' ? '2px solid #228be6' : '2px solid #e9ecef',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: state.game === 'Seasons' ? 1 : 0.4,
                            filter: state.game === 'Seasons' ? 'none' : 'grayscale(100%)',
                            backgroundColor: '#f8f9fa',
                            flexShrink: 0
                        }}>
                            <Image
                                src={state.game === 'Seasons' ? din : din_inactive}
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
                            variant={state.isLinkedGame ? 'filled' : 'outline'}
                            size="sm"
                            onClick={() => handleChange({
                                target: { name: 'isLinkedGame', value: !state.isLinkedGame }
                            } as any)}
                            style={{ flex: 1 }}
                        >
                            Linked Game
                        </Button>
                        <Button
                            variant={state.isHeroQuest ? 'filled' : 'outline'}
                            size="sm"
                            onClick={() => handleChange({
                                target: { name: 'isHeroQuest', value: !state.isHeroQuest }
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
                            border: state.isLinkedGame ? '2px solid #228be6' : '2px solid #e9ecef',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: state.isLinkedGame ? 1 : 0.4,
                            filter: state.isLinkedGame ? 'none' : 'grayscale(100%)',
                            backgroundColor: '#f8f9fa',
                            flexShrink: 0
                        }}>
                            <Image
                                src={state.isLinkedGame ? (gameIsAges ? link_ages : link_seasons) : link}
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
                            border: state.isHeroQuest ? '2px solid #228be6' : '2px solid #e9ecef',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: state.isHeroQuest ? 1 : 0.4,
                            filter: state.isHeroQuest ? 'none' : 'grayscale(100%)',
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
                        value={state.heroName}
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
                        value={state.childName}
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
                        value={state.gameID !== '' ? parseInt(state.gameID) : undefined}
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
                        value={state.behavior}
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
                        value={state.animal}
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
                            border: state.animal === 'Ricky' ? '2px solid #228be6' : '2px solid #e9ecef',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: state.animal === 'Ricky' ? 1 : 0.4,
                            filter: state.animal === 'Ricky' ? 'none' : 'grayscale(100%)',
                            backgroundColor: '#f8f9fa',
                            flexShrink: 0
                        }}>
                            <Image
                                src={state.animal === 'Ricky' ? ricky : ricky_inactive}
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
                            border: state.animal === 'Dimitri' ? '2px solid #228be6' : '2px solid #e9ecef',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: state.animal === 'Dimitri' ? 1 : 0.4,
                            filter: state.animal === 'Dimitri' ? 'none' : 'grayscale(100%)',
                            backgroundColor: '#f8f9fa',
                            flexShrink: 0
                        }}>
                            <Image
                                src={state.animal === 'Dimitri' ? dimitri : dimitri_inactive}
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
                            border: state.animal === 'Moosh' ? '2px solid #228be6' : '2px solid #e9ecef',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: state.animal === 'Moosh' ? 1 : 0.4,
                            filter: state.animal === 'Moosh' ? 'none' : 'grayscale(100%)',
                            backgroundColor: '#f8f9fa',
                            flexShrink: 0
                        }}>
                            <Image
                                src={state.animal === 'Moosh' ? moosh : moosh_inactive}
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
    }
}

class App extends Component<{}, AppState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            mainPassword: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            memoryPassword: ["", "", "", "", "", "", "", "", "", ""],
            game: "Ages",
            gameID: "7098",
            heroName: "Link",
            childName: "Pip",
            animal: "Ricky",
            behavior: "Infant",
            isLinkedGame: false,
            isHeroQuest: false,
            gameLanguage: "EUR/US"
        };
        this.handleChange = this.handleChange.bind(this);
        this.getPassword = this.getPassword.bind(this);
        this.formatPassword = this.formatPassword.bind(this);
        this.handleChangeState = this.handleChangeState.bind(this);
        this.handleToggleLinkedGame = this.handleToggleLinkedGame.bind(this);
        this.handleToggleHerosQuest = this.handleToggleHerosQuest.bind(this);
        this.checkValidID = this.checkValidID.bind(this);
    }

    componentDidUpdate(_prevProps: {}, prevState: AppState) {
        let passwords = this.getPassword();

        if (!passwords) {
            return false;
        }

        let newPassword = passwords[0];

        let oldPass = prevState.mainPassword ? prevState.mainPassword.join("") : "";
        let newPass = newPassword.join("");

        if (oldPass !== newPass) {
            this.setState({
                mainPassword: newPassword,
                memoryPassword: passwords.slice(1).map(p => p.join(''))
            });
        }
    }

    getPassword(): string[][] | undefined {
        let newPassword = updateProperties(
            this.state.game,
            this.state.gameID,
            this.state.heroName,
            this.state.childName,
            this.state.animal,
            this.state.behavior,
            this.state.isLinkedGame,
            this.state.isHeroQuest
        );

        if (this.state.game && this.state.gameID) {
            return newPassword;
        }
    }

    handleChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement> | { target: { name: string, value: any } }) {
        let value: string | boolean = event.target.value;
        
        // Handle boolean values for buttons
        if (event.target.name === 'isLinkedGame' || event.target.name === 'isHeroQuest') {
            this.setState({
                [event.target.name]: event.target.value
            } as any);
            return;
        }
        
        if ((event.target as HTMLInputElement).type === "checkbox") {
            value = (event.target as HTMLInputElement).checked;
        }
        this.setState({
            [event.target.name]: value
        } as any);
    }

    handleChangeState(game: string, stateName: keyof AppState) {
        this.setState({
            [stateName]: game
        } as any);
    }

    handleToggleLinkedGame() {
        this.setState((prevState) => ({
            isLinkedGame: !prevState.isLinkedGame
        }));
    }

    handleToggleHerosQuest() {
        this.setState((prevState) => ({
            isHeroQuest: !prevState.isHeroQuest
        }));
    }

    formatPassword(password: string[]): string {
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
    }

    checkValidID(event: ChangeEvent<HTMLInputElement>) {
        // 5 digits max
        if (event.target.value.length > 5) {
            console.log("1");
            event.target.value = event.target.value.slice(0, 5);
        }

        // Set to min value if too low
        if (parseInt(event.target.value) < 1 && event.target.value) {
            console.log(event.target.value);
            event.target.value = event.target.min;
        }

        // Set too max value if too high
        if (Number(event.target.value) > Number(event.target.max)) {
            console.log("13");
            event.target.value = event.target.max;
        }
    }

    render() {
        let statePassword = this.state.mainPassword;
        let htmlPassword = this.formatPassword(statePassword);

        let gameIsAges = this.state.game === "Ages";
        let memoryPassword = this.state.memoryPassword;

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
                                state={this.state}
                                handleChange={this.handleChange}
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
    }
}

class MemorySecrets extends Component<MemorySecretsProps> {
    render() {
        return (
            <Table.Tr>
                <Table.Td>{this.props.person} Secret</Table.Td>
                <Table.Td style={{ fontFamily: 'monospace', fontWeight: 'bold' }}>
                    {this.props.password}
                </Table.Td>
            </Table.Tr>
        );
    }
}

export default App;
