import {
    Box,
    Button,
    Group,
    Image,
    Modal,
    Paper,
    Text,
    Title
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
    selectedRings: boolean[]; // Array of 64 rings (8x2x4)
    hoveredRing: number | null; // Índice del anillo sobre el que está el ratón
    isModalOpen: boolean; // Estado de la modal
    showAll: boolean; // Estado para mostrar todos los anillos
}

class RingsComponent extends Component<RingsComponentProps, RingsComponentState> {
    constructor(props: RingsComponentProps) {
        super(props);
        this.state = {
            currentPage: 0,
            selectedRings: new Array(64).fill(false), // 64 anillos en total (8x2x4)
            hoveredRing: null, // Ningún anillo tiene hover inicialmente
            isModalOpen: false, // Modal cerrada por defecto
            showAll: false // Vista paginada por defecto
        };
    }

    toggleRing = (index: number) => {
        const { currentPage, showAll } = this.state;
        const globalIndex = showAll ? index : (currentPage * 16) + index; // Calcular índice según el modo
        
        this.setState(prevState => ({
            selectedRings: prevState.selectedRings.map((ring, i) => 
                i === globalIndex ? !ring : ring
            )
        }));
    }

    changePage = (page: number) => {
        // Navegación infinita: si va más allá de los límites, vuelve al otro extremo
        let targetPage = page;
        if (page < 0) {
            targetPage = 3; // Ir a la última página
        } else if (page > 3) {
            targetPage = 0; // Ir a la primera página
        }
        this.setState({ currentPage: targetPage, hoveredRing: null });
    }

    handleRingHover = (ringIndex: number) => {
        this.setState({ hoveredRing: ringIndex });
    }

    handleRingLeave = () => {
        this.setState({ hoveredRing: null });
    }

    openModal = () => {
        this.setState({ isModalOpen: true });
    }

    closeModal = () => {
        this.setState({ isModalOpen: false, hoveredRing: null });
    }

    toggleShowAll = () => {
        this.setState(prevState => ({ 
            showAll: !prevState.showAll,
            currentPage: 0, // Resetear a primera página cuando se cambie el modo
            hoveredRing: null 
        }));
    }

    render() {
        const { currentPage, selectedRings, hoveredRing, isModalOpen, showAll } = this.state;
        const startIndex = showAll ? 0 : currentPage * 16; // Si showAll es true, empezar desde 0
        const ringsToShow = showAll ? 64 : 16; // Mostrar todos los anillos o solo 16
        const currentPageRings = selectedRings.slice(startIndex, startIndex + ringsToShow);

        // Función para obtener información del anillo
        const getRingInfo = (ringIndex: number) => {
            const totalRingIndex = showAll ? ringIndex : startIndex + ringIndex;
            const ringData = ringsData.find(ring => ring.id === totalRingIndex + 1);
            return ringData || { name: `Anillo ${totalRingIndex + 1}`, effect: 'Información no disponible', image: '' };
        };

        return (
            <>
                {/* Botón para abrir la modal de anillos */}
                <Paper>
                    <Title order={3}>Anillos</Title>
                    <Text size="sm" c="dimmed" mb="md">
                        Seleccionados: {selectedRings.filter(ring => ring).length} / 64
                    </Text>
                    <Button 
                        onClick={this.openModal}
                        fullWidth
                        variant="outline"
                    >
                        Gestionar Anillos
                    </Button>
                </Paper>

                {/* Modal con la colección de anillos */}
                <Modal
                    opened={isModalOpen}
                    onClose={this.closeModal}
                    title="Colección de Anillos"
                    size={showAll ? "95%" : "xl"}
                    centered
                >
                    {/* Número de página arriba (solo en modo paginado) */}
                    {!showAll && (
                        <Group justify="center" mb="md">
                            <Text size="lg" fw={500} c="blue">
                                Página {currentPage + 1}/4
                            </Text>
                        </Group>
                    )}

                    {/* Grid de anillos con navegación lateral (solo en modo paginado) */}
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

                            {/* Grid de anillos 8x2 */}
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
                                        <Box
                                            key={index}
                                            onClick={() => this.toggleRing(index)}
                                            onMouseEnter={() => this.handleRingHover(index)}
                                            onMouseLeave={this.handleRingLeave}
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
                        /* Grid de todos los anillos - 8x8 */
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
                                    <Box
                                        key={index}
                                        onClick={() => this.toggleRing(index)}
                                        onMouseEnter={() => this.handleRingHover(index)}
                                        onMouseLeave={this.handleRingLeave}
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
                                );
                            })}
                        </Box>
                    )}

                    {/* Mostrar información del anillo */}
                    <Box style={{ 
                        marginTop: '16px', 
                        minHeight: '80px',
                        maxHeight: '80px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        overflow: 'hidden'
                    }}>
                        {hoveredRing !== null && (
                            <>
                                <Text ta="center" size="sm" fw={500} c="blue" style={{
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                }}>
                                    {getRingInfo(hoveredRing).name}
                                </Text>
                                <Text ta="center" size="xs" c="gray" style={{ marginTop: '4px' }}>
                                    Anillo #{showAll ? hoveredRing + 1 : startIndex + hoveredRing + 1}
                                </Text>
                                <Text ta="center" size="xs" c="dimmed" style={{ 
                                    marginTop: '4px',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical'
                                }}>
                                    {getRingInfo(hoveredRing).effect}
                                </Text>
                            </>
                        )}
                    </Box>

                    {/* Botón Ver Todos debajo de la caja de anillos */}
                    <Group justify="center" mt="md">
                        <Button
                            variant={showAll ? "filled" : "outline"}
                            size="sm"
                            onClick={this.toggleShowAll}
                        >
                            {showAll ? "Modo Páginas" : "Ver Todos"}
                        </Button>
                    </Group>

                    {/* Contador de anillos seleccionados */}
                    <Text ta="center" mt="md" size="sm" fw={500}>
                        Anillos seleccionados: {selectedRings.filter(ring => ring).length} / 64
                    </Text>
                </Modal>
            </>
        );
    }
}

export default RingsComponent;
