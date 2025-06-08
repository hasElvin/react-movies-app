import "../css/About.css"
import { Link } from "react-router-dom"
import githubLogo from "../assets/github.png"
import config from "../config"

function About() {
    const { TMDB_URL, GITHUB_REPO_URL, CONTACT_URL } = config;

    return (
        <div className="about-wrapper">
            <section className="about-section">
                <h2 className="about-title">About This Project</h2>
                <p className="about-text">
                    This project was developed as a fun prototype and a portfolio piece
                    to demonstrate my React frontend skills, showcasing clean UI implementation,
                    responsive design, and state management using Context API. All movie details
                    are fetched dynamically from a live API, ensuring that the content is always
                    current and up to date.
                </p>
            </section>

            <section className="about-section">
                <h2 className="about-title">Special Thanks</h2>
                <p className="about-text">
                    A huge thank-you to the amazing team at{" "}
                    <a
                        href={TMDB_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="about-link"
                    >
                        TMDB
                    </a>
                    {" "}for providing a comprehensive, developer-friendly API
                    that powers all the movie data displayed in this app.
                </p>
            </section>

            <section className="about-section">
                <h2 className="about-title">Source Code</h2>
                <p className="about-text">
                    You can view the full source code of this project in this repo:
                    <a
                        href={GITHUB_REPO_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="github-link"
                    >
                        <img src={githubLogo} alt="GitHub" className="github-logo" />
                    </a>
                </p>
            </section>

            <section className="about-section">
                <h2 className="about-title">Contact</h2>
                <p className="about-text">
                    For feedback, questions, or collaboration opportunities,
                    feel free to reach out{" "}
                    <a
                        href={CONTACT_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-link"
                    >
                        here
                    </a>
                    .
                </p>
            </section>
        </div>
    )
}

export default About