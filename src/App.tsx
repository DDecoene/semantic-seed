import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SentenceGenerator from '@/components/SentenceGenerator';
import LandingPage from '@/components/LandingPage';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

function App() {
  return (
    <Router basename="/semantic-seed">
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/generator" element={
              <div className="container mx-auto py-8">
                <SentenceGenerator />
              </div>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;