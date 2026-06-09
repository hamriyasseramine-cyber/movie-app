import "../css/About.css";
import PageTransition from "../components/PageTransition";

function About() {
  const stack = [
    { icon: "⚛️", name: "React", desc: "UI Framework" },
    { icon: "⚡", name: "Vite", desc: "Build Tool" },
    { icon: "🎬", name: "TMDB API", desc: "Movies Data" },
    { icon: "🎨", name: "CSS3", desc: "Styling" },
    { icon: "🔀", name: "React Router", desc: "Navigation" },
    { icon: "📦", name: "Context API", desc: "State Management" },
  ];

  return (
    <PageTransition>
      <div className="About-page">
        <section className="About-dev-section">
          <div className="About-dev-card">
            <div className="About-dev-avatar">
              <span>HY</span>
            </div>
            <div className="About-dev-info">
              <span className="About-dev-role">Developer</span>
              <h2>Hamri Yasser Amine</h2>
              <p>
                Développeur passionné par le web et les nouvelles technologies.
                Ce projet est construit avec React et Vite, connecté à l'API
                TMDB pour offrir une expérience de découverte de films moderne
                et fluide.
              </p>
              <div className="About-dev-links">
                <a
                  href="https://github.com/hamriyasseramine-cyber"
                  target="_blank"
                  rel="noreferrer"
                  className="About-link About-link--github"
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/yasser-amine-hamri/"
                  target="_blank"
                  rel="noreferrer"
                  className="About-link About-link--linkedin"
                >
                  LinkedIn
                </a>
                <a
                  href="mailto:hamriyasseramine@gmail.com"
                  className="About-link About-link--email"
                >
                  ✉ Email
                </a>
              </div>
            </div>
          </div>
        </section>

        <div className="About-divider">
          <span>Tech Stack</span>
        </div>

        <section className="About-stack-section">
          <div className="About-stack-grid">
            {stack.map((item) => (
              <div className="About-stack-card" key={item.name}>
                <span className="About-stack-icon">{item.icon}</span>
                <h3>{item.name}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageTransition>
  );
}

export default About;
