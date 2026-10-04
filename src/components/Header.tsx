export function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#home">
        FRAME<span>STORY</span>
      </a>

      <nav aria-label="Main navigation">
        <a href="#portfolio">Portfolio</a>
        <a href="#about">About</a>
        <a href="#booking">Book a session</a>
      </nav>
    </header>
  );
}