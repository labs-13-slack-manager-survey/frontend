import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { animateScroll } from "react-scroll";
import Typography from "@material-ui/core/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithubSquare } from "@fortawesome/free-brands-svg-icons";

// profile pictures
import Curtis from "../../images/Curtis.png";
import Mckay from "../../images/mckay.png";
import Ben from "../../images/Ben.png";
import Erica from "../../images/erica.png";
import Taylor from "../../images/Taylor.png";
import Gannon from "../../images/Gannon.jpg";

class DevTeam extends Component {
  scrollToTop() {
    animateScroll.scrollToTop();
  }
  render() {
    return (
      <>
        <MarketingContainer>
          <div className="marketing-nav">
            <Link to="/" className="nav-link-home">
              Home
            </Link>
            <Link to="/team" className="nav-link-marketing">
              About Us
            </Link>

            <Link to="/login" className="get-started">
              Get Started{" "}
            </Link>
          </div>
        </MarketingContainer>
        <Typography
          variant="h2"
          style={{ textAlign: "center", margin: "50px 0" }}
        >
          Meet The Developers
        </Typography>
        <TeamContainer>
          <TeamMember>
            <MemberImage src={Ben} alt="Ben Tsao" />
            <Typography variant="h4">Ben Tsao</Typography>
            <p>Full-Stack Developer</p>
            <MemberLinks>
              <a target="blank" href="https://github.com/cbtsao47">
                <FontAwesomeIcon className="fa-2x" icon={faGithubSquare} />
              </a>
              <a target="blank" href="https://www.linkedin.com/in/cbtsao/">
                <FontAwesomeIcon className="fa-2x" icon={faLinkedin} />
              </a>
            </MemberLinks>
          </TeamMember>
          <TeamMember>
            <MemberImage src={Curtis} alt="Curtis Hubbard" />
            <Typography variant="h4">Curtis Hubbard</Typography>
            <p>Full-Stack Developer</p>
            <MemberLinks>
              <a target="blank" href="https://github.com/chubbard022">
                <FontAwesomeIcon className="fa-2x" icon={faGithubSquare} />
              </a>
              <a
                target="blank"
                href="https://www.linkedin.com/in/curtis-hubbard-945764158/"
              >
                <FontAwesomeIcon className="fa-2x" icon={faLinkedin} />
              </a>
            </MemberLinks>
          </TeamMember>
          <TeamMember>
            <MemberImage src={Mckay} alt="Mckay Wrigley" />
            <Typography variant="h4">Mckay Wrigley</Typography>
            <p>Full-Stack Developer</p>
            <MemberLinks>
              <a target="blank" href="https://github.com/mckaywrigley45">
                <FontAwesomeIcon className="fa-2x" icon={faGithubSquare} />
              </a>
              <a
                target="blank"
                href="https://www.linkedin.com/in/mckay-wrigley-05b496166/"
              >
                <FontAwesomeIcon className="fa-2x" icon={faLinkedin} />
              </a>
            </MemberLinks>
          </TeamMember>
          <TeamMember>
            <MemberImage src={Erica} alt="Erica Chen" />
            <Typography variant="h4">Erica Chen</Typography>
            <p>Full-Stack Developer</p>
            <MemberLinks>
              <a target="blank" href="https://github.com/erica-y-chen">
                <FontAwesomeIcon className="fa-2x" icon={faGithubSquare} />
              </a>
              <a target="blank" href="https://www.linkedin.com/in/eyufanchen/">
                <FontAwesomeIcon className="fa-2x" icon={faLinkedin} />
              </a>
            </MemberLinks>
          </TeamMember>
          <TeamMember>
            <MemberImage src={Taylor} alt="Taylor Blount" />
            <Typography variant="h4">Taylor Blount</Typography>
            <p>Full-Stack Developer</p>
            <MemberLinks>
              <a target="blank" href="https://github.com/thirdeyeclub">
                <FontAwesomeIcon className="fa-2x" icon={faGithubSquare} />
              </a>
              <a
                target="blank"
                href="linkedin.com"
                //TAYLOR add your linkedIn here when you decide to make one
              >
                <FontAwesomeIcon className="fa-2x" icon={faLinkedin} />
              </a>
            </MemberLinks>
          </TeamMember>
          <TeamMember>
            <MemberImage src={Gannon} alt="Gannon Darcy" />
            <Typography variant="h4">Gannon Darcy</Typography>
            <p>Team Lead</p>
            <MemberLinks>
              <a target="blank" href="https://github.com/GannonDetroit">
                <FontAwesomeIcon className="fa-2x" icon={faGithubSquare} />
              </a>
              <a
                target="blank"
                href="https://www.linkedin.com/in/gannon-darcy/"
              >
                <FontAwesomeIcon className="fa-2x" icon={faLinkedin} />
              </a>
            </MemberLinks>
          </TeamMember>
        </TeamContainer>
        <TeamContainer />
      </>
    );
  }
}

export default DevTeam;

// Styles

const TeamContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 120px;
`;

const TeamMember = styled.div`
  width: 400px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MemberImage = styled.img`
  height: 200px;
  width: auto;
  border-radius: 100px;
  margin-bottom: 20px;
`;

const MemberLinks = styled.div`
  width: 100px;
  padding: 20px 0;
  display: flex;
  justify-content: space-around;
`;


// Styles

const MarketingContainer = styled.div`
  background-color: white;
  margin: 50px 20px;
`;
