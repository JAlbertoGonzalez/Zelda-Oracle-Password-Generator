import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MantineProvider, createTheme } from '@mantine/core'
import './index.css'
import App from './App.tsx'

// Import Mantine CSS
import '@mantine/core/styles.css'

// Create a custom theme inspired by Zelda
const theme = createTheme({
  primaryColor: 'blue',
  colors: {
    // Custom Zelda-inspired colors
    triforce: [
      '#FFF8DC', // lightest gold
      '#FFEB3B',
      '#FFD700',
      '#DAA520', // main gold
      '#B8860B',
      '#996515',
      '#7A5200',
      '#5C3E00',
      '#3E2A00',
      '#1F1500'  // darkest gold
    ],
  },
  fontFamily: 'Verdana, sans-serif',
  headings: {
    fontFamily: 'Georgia, serif',
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <App />
    </MantineProvider>
  </StrictMode>,
)
