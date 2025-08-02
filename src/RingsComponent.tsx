import {
    Box,
    Button,
    Group,
    Image,
    Modal,
    Paper,
    Text,
    Title,
    Tooltip
} from '@mantine/core';
import { 
    IconChevronLeft, 
    IconChevronRight 
} from '@tabler/icons-react';
import { Component } from 'react';

import ringsData from './rings-data.json';

interface RingsComponentProps {
    // Props for rings component if needed
}

interface RingsComponentState {
    currentPage: number;
    selectedRings: boolean[];
    isModalOpen: boolean;
    showAll: boolean;
}

class RingsComponent extends Component<RingsComponentProps, RingsComponentState> {
    constructor(props: RingsComponentProps) {
        super(props);
        this.state = {
            currentPage: 0,
            selectedRings: Array(64).fill(false),
            isModalOpen: false,
            showAll: false
        };
    }

    toggleRing = (index: number) => {
        const { currentPage, showAll } = this.state;
        const globalIndex = showAll ? index : (currentPage * 16) + index; // Calculate index according to mode
        
        this.setState(prevState => ({
            selectedRings: prevState.selectedRings.map((ring, i) => 
                i === globalIndex ? !ring : ring
            )
        }));
    }

    changePage = (page: number) => {
        // Infinite navigation: if it goes beyond limits, return to the other end
        let targetPage = page;
        if (page < 0) {
            targetPage = 3; // Go to last box
        } else if (page > 3) {
            targetPage = 0; // Go to first box
        }
        this.setState({ currentPage: targetPage });
    }

    openModal = () => {
        this.setState({ isModalOpen: true });
    }

    closeModal = () => {
        this.setState({ isModalOpen: false });
    }

    toggleShowAll = () => {
        this.setState(prevState => ({ 
            showAll: !prevState.showAll,
            currentPage: 0 // Reset to first box when mode changes
        }));
    }

    selectAllRings = () => {
        this.setState({
            selectedRings: Array(64).fill(true)
        });
    }

    deselectAllRings = () => {
        this.setState({
            selectedRings: Array(64).fill(false)
        });
    }

    selectAgesRings = () => {
        const newSelectedRings = Array(64).fill(false);
        ringsData.forEach((ring, index) => {
            if (index < 64 && (ring.game.includes('A') || ring.game.includes('Ages'))) {
                newSelectedRings[index] = true;
            }
        });
        this.setState({
            selectedRings: newSelectedRings
        });
    }

    selectSeasonsRings = () => {
        const newSelectedRings = Array(64).fill(false);
        ringsData.forEach((ring, index) => {
            if (index < 64 && (ring.game.includes('S') || ring.game.includes('Seasons'))) {
                newSelectedRings[index] = true;
            }
        });
        this.setState({
            selectedRings: newSelectedRings
        });
    }

    render() {
        const { currentPage, selectedRings, isModalOpen, showAll } = this.state;
        const startIndex = showAll ? 0 : currentPage * 16; // If showAll is true, start from 0
        const ringsToShow = showAll ? 64 : 16; // Show all rings or only 16
        const currentPageRings = selectedRings.slice(startIndex, startIndex + ringsToShow);

        // Function to get ring information
        const getRingInfo = (ringIndex: number) => {
            const totalRingIndex = showAll ? ringIndex : startIndex + ringIndex;
            const ringData = ringsData.find(ring => ring.id === totalRingIndex + 1);
            return ringData || { name: `Ring ${totalRingIndex + 1}`, effect: 'Information not available', image: '' };
        };

        return (
            <>
                {/* Button to open rings modal */}
                <Paper>
                    <Title order={3}>Rings</Title>
                    <Text size="sm" c="dimmed" mb="md">
                        Selected: {selectedRings.filter(ring => ring).length} / 64
                    </Text>
                    <Button 
                        onClick={this.openModal}
                        fullWidth
                        variant="outline"
                    >
                        Manage Rings
                    </Button>
                </Paper>

                {/* Modal with rings collection */}
                <Modal
                    opened={isModalOpen}
                    onClose={this.closeModal}
                    title="Ring Collection"
                    size={showAll ? "95%" : "xl"}
                    centered
                >
                    {/* Mass selection buttons */}
                    <Box mb="md">
                        <Text size="sm" c="dimmed" ta="center" mb="xs">
                            Quick Selection
                        </Text>
                        <Group justify="center" gap="xs">
                            <Button
                                variant="outline"
                                size="xs"
                                onClick={this.selectAllRings}
                                color="green"
                            >
                                Select All
                            </Button>
                            <Button
                                variant="outline"
                                size="xs"
                                onClick={this.deselectAllRings}
                                color="red"
                            >
                                Deselect All
                            </Button>
                            <Button
                                variant="outline"
                                size="xs"
                                onClick={this.selectAgesRings}
                                color="blue"
                            >
                                Ages Only
                            </Button>
                            <Button
                                variant="outline"
                                size="xs"
                                onClick={this.selectSeasonsRings}
                                color="orange"
                            >
                                Seasons Only
                            </Button>
                        </Group>
                    </Box>
                    {/* Box number above (paginated mode only) */}
                    {!showAll && (
                        <Group justify="center" mb="md">
                            <Text size="lg" fw={500} c="blue">
                                Box {currentPage + 1}/4
                            </Text>
                        </Group>
                    )}

                    {/* Ring grid with side navigation (paginated mode only) */}
                    {!showAll ? (
                        <Box style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '16px',
                            padding: '0 16px'
                        }}>
                            {/* Botón anterior */}
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => this.changePage(currentPage - 1)}
                            >
                                <IconChevronLeft size={16} />
                            </Button>

                            {/* Ring grid 8x2 */}
                            <Box style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(8, 1fr)',
                                gap: '8px',
                                maxWidth: '480px',
                                flex: 1
                            }}>
                                {currentPageRings.map((isSelected, index) => {
                                    const ringInfo = getRingInfo(index);
                                    return (
                                        <Tooltip
                                            key={index}
                                            label={
                                                <Box>
                                                    <Text size="sm" fw={500} mb="xs">
                                                        {ringInfo.name}
                                                    </Text>
                                                    <Text size="xs" c="gray" mb="xs">
                                                        Ring #{startIndex + index + 1}
                                                    </Text>
                                                    <Text size="xs">
                                                        {ringInfo.effect}
                                                    </Text>
                                                </Box>
                                            }
                                            position="top"
                                            withArrow
                                            multiline
                                            w={220}
                                        >
                                            <Box
                                                onClick={() => this.toggleRing(index)}
                                                style={{
                                                    width: '50px',
                                                    height: '50px',
                                                    borderRadius: '8px',
                                                    border: isSelected ? '3px solid #228be6' : '2px solid #e9ecef',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    transition: 'all 0.2s ease',
                                                    opacity: isSelected ? 1 : 0.8,
                                                    transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                                                    backgroundColor: '#fff',
                                                    boxShadow: isSelected ? '0 4px 12px rgba(34, 139, 230, 0.3)' : '0 2px 4px rgba(0,0,0,0.1)',
                                                    overflow: 'hidden',
                                                    position: 'relative'
                                                }}
                                            >
                                                {ringInfo.image && (
                                                    <Image
                                                        src={ringInfo.image}
                                                        alt={ringInfo.name}
                                                        style={{
                                                            width: '32px',
                                                            height: '32px',
                                                            objectFit: 'contain'
                                                        }}
                                                    />
                                                )}
                                            </Box>
                                        </Tooltip>
                                    );
                                })}
                            </Box>

                            {/* Botón siguiente */}
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => this.changePage(currentPage + 1)}
                            >
                                <IconChevronRight size={16} />
                            </Button>
                        </Box>
                    ) : (
                        /* All rings grid - 8x8 */
                        <Box style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(8, 1fr)',
                            gridTemplateRows: 'repeat(8, 1fr)',
                            gap: '6px',
                            maxHeight: '70vh',
                            overflowY: 'auto',
                            padding: '16px',
                            aspectRatio: '1',
                            width: '100%',
                            maxWidth: '600px',
                            margin: '0 auto'
                        }}>
                            {currentPageRings.map((isSelected, index) => {
                                const ringInfo = getRingInfo(index);
                                return (
                                    <Tooltip
                                        key={index}
                                        label={
                                            <Box>
                                                <Text size="sm" fw={500} mb="xs">
                                                    {ringInfo.name}
                                                </Text>
                                                <Text size="xs" c="gray" mb="xs">
                                                    Ring #{index + 1}
                                                </Text>
                                                <Text size="xs">
                                                    {ringInfo.effect}
                                                </Text>
                                            </Box>
                                        }
                                        position="top"
                                        withArrow
                                        multiline
                                        w={220}
                                    >
                                        <Box
                                            onClick={() => this.toggleRing(index)}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                minWidth: '45px',
                                                minHeight: '45px',
                                                borderRadius: '6px',
                                                border: isSelected ? '2px solid #228be6' : '1px solid #e9ecef',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                transition: 'all 0.2s ease',
                                                opacity: isSelected ? 1 : 0.8,
                                                transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                                                backgroundColor: '#fff',
                                                boxShadow: isSelected ? '0 2px 8px rgba(34, 139, 230, 0.3)' : '0 1px 3px rgba(0,0,0,0.1)',
                                                overflow: 'hidden',
                                                position: 'relative'
                                            }}
                                        >
                                            {ringInfo.image && (
                                                <Image
                                                    src={ringInfo.image}
                                                    alt={ringInfo.name}
                                                    style={{
                                                        width: '28px',
                                                        height: '28px',
                                                        objectFit: 'contain'
                                                    }}
                                                />
                                            )}
                                        </Box>
                                    </Tooltip>
                                );
                            })}
                        </Box>
                    )}

                    {/* Show All button below the rings box */}
                    <Group justify="center" mt="md">
                        <Button
                            variant={showAll ? "filled" : "outline"}
                            size="sm"
                            onClick={this.toggleShowAll}
                        >
                            {showAll ? "Box Mode" : "Show All"}
                        </Button>
                    </Group>

                    {/* Selected rings counter */}
                    <Text ta="center" mt="md" size="sm" fw={500}>
                        Selected rings: {selectedRings.filter(ring => ring).length} / 64
                    </Text>
                </Modal>
            </>
        );
    }
}

export default RingsComponent;
