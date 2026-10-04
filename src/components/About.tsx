export function About() {
  return (
    <section
      className="about-section"
      id="about"
      aria-labelledby="about-title"
    >
      <div className="about-image">
        <img
          src="/images/about.avif"
          alt="Photographer working with a camera"
          loading="lazy"
        />
      </div>

      <div className="about-content">
        <p className="eyebrow">Behind the camera</p>

        <h2 id="about-title">
          Every moment has a story.
        </h2>

        <p>
          Hi, I'm [Photographer's Name]. I photograph
          portraits, events, and the everyday moments
          people want to remember.
        </p>

        <p>
          My approach is relaxed and collaborative. I'll
          help you feel comfortable in front of the
          camera while creating photographs that feel
          personal to you.
        </p>

        <a className="button button-primary" href="#booking">
          Let's plan your session
        </a>
      </div>
    </section>
  );
}