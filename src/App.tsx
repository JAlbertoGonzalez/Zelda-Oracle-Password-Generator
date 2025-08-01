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
    Card, 
    Image, 
    Text,
    Box,
    Collapse,
    Button,
    Table
} from '@mantine/core';
import './App.css';

import { updateProperties } from './zeldaOraclePasswordGenerator';

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
}

interface FooterProps {
    gameIsAges: boolean;
    memoryPassword: string[];
    htmlPassword: string;
}

interface FooterState {
    active: boolean;
}

interface MemorySecretsProps {
    password: string;
    person: string;
}

interface CardBlockProps {
    title: string;
    changeGame: (game: string) => void;
    currentGame: string | boolean;
    activeImg: string;
    inactiveImg: string;
}

class App extends Component<{}, AppState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            mainPassword: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            memoryPassword: ["", "", "", "", "", "", "", "", "", ""],
            game: "",
            gameID: "",
            heroName: "",
            childName: "",
            animal: "Ricky",
            behavior: "Infant",
            isLinkedGame: false,
            isHeroQuest: false
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

    handleChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        let value: string | boolean = event.target.value;
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
            <Container size="xl" px="md">
                <Paper shadow="md" p="xl" mt="md" style={{ backgroundColor: '#f8f9fa' }}>
                    <Title order={1} ta="center" mb="xl" c="dark.8">
                        Zelda Oracle Password Generator
                    </Title>
                    
                    <Grid>
                        <Grid.Col span={{ base: 12, md: 8 }}>
                            <Grid>
                                <Grid.Col span={{ base: 12, sm: 6 }}>
                                    <Group>
                                        <CardBlock
                                            title="Ages"
                                            changeGame={(e) => this.handleChangeState(e, "game")}
                                            currentGame={this.state.game}
                                            activeImg={nayru}
                                            inactiveImg={nayru_inactive}
                                        />
                                        <CardBlock
                                            title="Seasons"
                                            changeGame={(e) => this.handleChangeState(e, "game")}
                                            currentGame={this.state.game}
                                            activeImg={din}
                                            inactiveImg={din_inactive}
                                        />
                                    </Group>
                                </Grid.Col>

                                <Grid.Col span={{ base: 12, sm: 6 }}>
                                    <Group>
                                        <CardBlock
                                            title="Linked Game"
                                            changeGame={this.handleToggleLinkedGame}
                                            currentGame={this.state.isLinkedGame}
                                            activeImg={gameIsAges ? link_ages : link_seasons}
                                            inactiveImg={link}
                                        />
                                        <CardBlock
                                            title="Hero's Quest"
                                            changeGame={this.handleToggleHerosQuest}
                                            currentGame={this.state.isHeroQuest}
                                            activeImg={triforce}
                                            inactiveImg={triforce}
                                        />
                                    </Group>
                                </Grid.Col>

                                <Grid.Col span={12}>
                                    <Group justify="center">
                                        <CardBlock
                                            title="Ricky"
                                            changeGame={(e) => this.handleChangeState(e, "animal")}
                                            currentGame={this.state.animal}
                                            activeImg={ricky}
                                            inactiveImg={ricky_inactive}
                                        />
                                        <CardBlock
                                            title="Dimitri"
                                            changeGame={(e) => this.handleChangeState(e, "animal")}
                                            currentGame={this.state.animal}
                                            activeImg={dimitri}
                                            inactiveImg={dimitri_inactive}
                                        />
                                        <CardBlock
                                            title="Moosh"
                                            changeGame={(e) => this.handleChangeState(e, "animal")}
                                            currentGame={this.state.animal}
                                            activeImg={moosh}
                                            inactiveImg={moosh_inactive}
                                        />
                                    </Group>
                                </Grid.Col>
                            </Grid>
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, md: 4 }}>
                            <Paper shadow="sm" p="md" style={{ backgroundColor: 'white' }}>
                                <Title order={3} mb="md">Game Settings</Title>
                                
                                <TextInput
                                    label="Hero Name"
                                    placeholder="Enter hero name"
                                    maxLength={5}
                                    value={this.state.heroName}
                                    onChange={(event) => this.handleChange({
                                        target: { name: 'heroName', value: event.currentTarget.value }
                                    } as any)}
                                    mb="sm"
                                />

                                <TextInput
                                    label="Child Name"
                                    placeholder="Enter child name"
                                    maxLength={5}
                                    value={this.state.childName}
                                    onChange={(event) => this.handleChange({
                                        target: { name: 'childName', value: event.currentTarget.value }
                                    } as any)}
                                    mb="sm"
                                />

                                <NumberInput
                                    label="Game ID"
                                    placeholder="Enter game ID"
                                    min={1}
                                    max={32767}
                                    value={parseInt(this.state.gameID) || undefined}
                                    onChange={(value) => this.handleChange({
                                        target: { name: 'gameID', value: value?.toString() || '' }
                                    } as any)}
                                    mb="sm"
                                />

                                <Select
                                    label="Behavior"
                                    value={this.state.behavior}
                                    onChange={(value) => this.handleChange({
                                        target: { name: 'behavior', value: value || 'Infant' }
                                    } as any)}
                                    data={[
                                        { value: 'Infant', label: 'Infant' },
                                        { value: 'BouncyA', label: 'BouncyA' },
                                        { value: 'BouncyB', label: 'BouncyB' },
                                        { value: 'BouncyC', label: 'BouncyC' },
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
                            </Paper>
                        </Grid.Col>
                    </Grid>
                    
                    <Footer gameIsAges={gameIsAges} memoryPassword={memoryPassword} htmlPassword={htmlPassword}/>
                </Paper>
            </Container>
        );
    }
}

class Footer extends Component<FooterProps, FooterState> {
    constructor(props: FooterProps) {
        super(props);
        this.state = {
            active: false
        };
        this.expandFooter = this.expandFooter.bind(this);
    }

    expandFooter() {
        this.setState((prevState) => ({
            active: !prevState.active
        }));
    }

    render() {
        let gameIsAges = this.props.gameIsAges;
        let memoryPassword = this.props.memoryPassword;
        let htmlPassword = this.props.htmlPassword;

        if (htmlPassword.length < 10) {
            htmlPassword = "The password will appear here.";
        }

        return (
            <Box mt="xl">
                <Paper shadow="sm" p="md" style={{ backgroundColor: 'white' }}>
                    <Group justify="space-between" align="center" mb="md">
                        <Title order={3}>Generated Password</Title>
                        <Button 
                            variant="light" 
                            onClick={this.expandFooter}
                            size="sm"
                        >
                            {this.state.active ? "Hide Memory Secrets ▲" : "Show Memory Secrets ▼"}
                        </Button>
                    </Group>
                    
                    <Paper 
                        p="md" 
                        style={{ 
                            backgroundColor: '#f8f9fa', 
                            fontFamily: 'monospace',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            textAlign: 'center'
                        }}
                        dangerouslySetInnerHTML={{__html: htmlPassword}}
                    />
                    
                    <Collapse in={this.state.active}>
                        <Box mt="md">
                            <Title order={4} mb="sm">Memory Secrets</Title>
                            <Table striped highlightOnHover>
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
                                                   person={gameIsAges ? "Deku" : "Tingle"}/>
                                    <MemorySecrets password={memoryPassword[8] || "N/A"} 
                                                   person={gameIsAges ? "Biggoron" : "Elder"}/>
                                    <MemorySecrets password={memoryPassword[9] || "N/A"} 
                                                   person={gameIsAges ? "Ruul" : "Symmetry"}/>
                                </Table.Tbody>
                            </Table>
                        </Box>
                    </Collapse>
                </Paper>
            </Box>
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

class CardBlock extends Component<CardBlockProps> {
    constructor(props: CardBlockProps) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(game: string) {
        this.props.changeGame(game);
    }

    render() {
        let isActive;
        if (this.props.title === "Linked Game" || this.props.title === "Hero's Quest") {
            isActive = this.props.currentGame === true;
        } else {
            isActive = this.props.currentGame === this.props.title;
        }
        
        const image = isActive ? this.props.activeImg : this.props.inactiveImg;

        return (
            <Card
                shadow={isActive ? "lg" : "sm"}
                padding="md"
                radius="md"
                style={{
                    cursor: 'pointer',
                    border: isActive ? '2px solid #228be6' : '2px solid transparent',
                    transition: 'all 0.2s ease',
                    minWidth: '120px',
                    textAlign: 'center'
                }}
                onClick={() => this.handleClick(this.props.title)}
            >
                <Card.Section>
                    <Image
                        src={image}
                        height={80}
                        alt={this.props.title}
                        fit="contain"
                    />
                </Card.Section>

                <Text fw={500} size="sm" mt="xs" ta="center">
                    {this.props.title}
                </Text>
            </Card>
        )
    }
}

export default App;
