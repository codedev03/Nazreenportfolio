import React from 'react';
import { ThemeProvider } from './pages/ThemeContext'; // Correct path to ThemeContext
import Topnavbar from './pages/Topnavbar';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contactus';
import Skills from './pages/Skills';
import Qualification from './pages/Qualification';
import Experience from './pages/Experience';
import MagicWandCursor from './pages/Magicwand';
import './assets/css/bento.css'; // Import the new bento CSS file

// ErrorBoundary definition
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught in ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong in the application.</h2>;
    }

    return this.props.children;
  }
}

function App() {
  return (
    <ThemeProvider>
      <>
        <Topnavbar />
        <MagicWandCursor />
        <div className="main-content">
          <ErrorBoundary>
            <Home />
            <Qualification />
          </ErrorBoundary>
          <Services />
          <About />
          <Contact />
          <Skills />
          <Experience />
        </div>
      </>
    </ThemeProvider>
  );
}

export default App;