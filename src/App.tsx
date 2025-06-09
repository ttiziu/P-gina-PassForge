import Home from './pages/Home';
import Squares from './components/background/Squares';
import './App.css';

function App() {
  return (
    <>
      <Squares 
        speed={0.5} 
        squareSize={30} 
        direction="diagonal" 
        borderColor={document.body.getAttribute('data-theme') === 'dark' ? '#444' : '#fff'} 
        hoverFillColor={document.body.getAttribute('data-theme') === 'dark' ? '#181924' : '#222'} 
      />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Home />
      </div>
    </>
  );
}

export default App;
