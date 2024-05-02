import { Box, styled } from '@mui/material';
import { NavBar } from './components/NavBar.tsx';
import { GameContainer } from './components/GameContainer.tsx';

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

function App() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <NavBar />
      <Offset />
      <GameContainer />
    </Box>
  );
}
export default App;
