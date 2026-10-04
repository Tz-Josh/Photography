import { Header } from './components/Header';
import { Portfolio } from './components/Portfolio';
import { About } from './components/About';
import { Booking } from './components/Booking';
import './index.css';

function App() {
  return (
    <>
      <Header />

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <p className="eyebrow">
              Portraits · Events · Stories
            </p>

            <h1>
              Photography that
              <br />
              feels like you.
            </h1>

            <p className="hero-description">
              Thoughtful photographs that capture
              people, places, and moments as they
              really are.
            </p>

            <div className="hero-actions">
              <a
                className="button button-primary"
                href="#portfolio"
              >
                View my work
              </a>

              <a
                className="button button-outline"
                href="#booking"
              >
                Book a session
              </a>
            </div>
          </div>

          <div className="hero-image">
            <img
              src="/images/hero-sec-image.png"
              alt="Featured portrait from the photographer's portfolio"
            />
          </div>
        </section>

        <Portfolio />
        <About />
        <Booking />
      </main>
    </>
  );
}

export default App;