import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "./marketingPage.css"

// styling imports
// import Button from "@material-ui/core/Button";
import { ArrowUpward } from "@material-ui/icons";
import { scroller, animateScroll } from "react-scroll";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";

// images
import undrawCollab from "../../images/undraw_collab_8oes.svg";
import undrawStatus from "../../images/undraw_status_update_jjgk.svg";
import undrawDeveloper from "../../images/undraw_developer_activity_bv83.svg";
import Icon from "../../images/slackr_icon.png";


class MarketingPage extends Component {
  scrollTo() {
    scroller.scrollTo("MarketingSection", {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart"
    });
  }
  scrollToTop() {
    animateScroll.scrollToTop();
  }
  render() {
    return (
      
      <MarketingContainer>
        <div className = "marketing-nav">
          <Link to="/team" className ="nav-link-marketing">
              About Us
          </Link>
          
          <Link to="/login" className = "get-started">Get Started </Link>
        </div>

        <div className = "header">
          <img src={Icon} />
          <div className="marketing-header-text">
            <div className = "marketing-header-title">Slackr</div>
            <div className = "marketing-header-description">an asynchronous stand-up platform for fast-paced teams.</div>
          </div>
        </div>

        <section className = "body">
          
          <div className = "section">
          <div className= "circle">
              <div className="circle-blue"/>
              <div className="circle-white"/>
            </div>
            <div className="section-content">
              <div className="section-title">Manage Your Team with Efficiency</div>
              <div className="section-text">Say goodbye to long stand-ups! Discover the blockers your team is
                facing without all the commentary. Daily surveys are customizable,
                so you only ask the questions you care about, and only get the
                answers that matter.</div>
            </div>
          </div>

          <div className = "section">
            <div className= "circle">
              <div className="circle-red"/>
              <div className="circle-white"/>
            </div>
            <div className="section-content">
              <div className="section-title">Your Team, Fully Transparent</div>
              <div className="section-text">Slackr allows admins and peers to review team members' responses in Slack or on the web app, whenever is most convienient for you.</div>
            </div>
          </div>

          <div className = "section">
          <div className= "circle">
              <div className="circle-green"/>
              <div className="circle-white"/>
            </div>
            <div className="section-content">
              <div className="section-title">Record Your Progress</div>
              <div className="section-text">Slackr allows you access your team's historical surveys, so you can keep the team on track and maintain sight of weekly goals.</div>
            </div>
          </div>

          <div className = "section">
          <div className= "circle">
              <div className="circle-yellow"/>
              <div className="circle-white"/>
            </div>
            <div className="section-content">
              <div className="section-title">Connect to Slack</div>
              <div className="section-text">Install our slackr bot into your workplace to integrate seamlessly with Slack. Receive daily messages to remind you and your team members to fill out standup and view all results in Slack.
              Never forget what heppened in standup again.</div>
            </div>
          </div>
        </section>

        <div className = "header">
          <div className="marketing-header-text">
            <div className = "marketing-header-title">Get Started!</div>
            <div className = "marketing-header-description">Let Slackr optimize your team's valuable time. Help us help you.</div>
          </div>
        </div>


        <Header>
          <Typography variant="h1">Slackr</Typography>
          <BodyText>
            Slackr is an asynchronous stand-up platform for fast-paced teams.
          </BodyText>
          <HeaderButtons>
            <Link to="/login">
              <Fab
                variant="extended"
                color="primary"
                aria-label="Add"
                style={{
                  borderRadius: "35px",
                  fontSize: "18px",
                  height: "70px",
                  width: "170px"
                }}
              >
                Get Started
              </Fab>
            </Link>
          </HeaderButtons>
        </Header>

        <MarketingSection name="MarketingSection">
          <SectionDivider>
            <SectionTitle>Manage Your Team With Efficency</SectionTitle>
            <BodyText>
              Say goodbye to long stand-ups! Discover the blockers your team is
              facing without all the commentary. Daily surveys are customizable,
              so you only ask the questions you care about, and only get the
              answers that matter.{" "}
            </BodyText>
          </SectionDivider>
          <MarketingImg src={undrawCollab} />
        </MarketingSection>
        <MarketingSection1>
          <SectionDivider>
            <SectionTitle>Your Team, Fully Transparent</SectionTitle>
            <BodyText>
              Slackr allows admins and peers to review team members' responses
              in Slack or on the web app, whenever is most convienient for you.
            </BodyText>
          </SectionDivider>
          <MarketingImg src={undrawStatus} />
        </MarketingSection1>
        <MarketingSection>
          <SectionDivider>
            <SectionTitle>Record Your Progress</SectionTitle>
            <BodyText>
              Slackr allows you access your team's historical surveys, so you
              can hold each other accountable.
            </BodyText>
          </SectionDivider>
          <MarketingImg src={undrawDeveloper} />
        </MarketingSection>
        <GetStartedSection>
          <Typography variant="h3">Get Started!</Typography>
          <BodyText>Let Slackr optimize your team's valuable time</BodyText>
          <Link to="/login">
            <Fab
              variant="extended"
              color="primary"
              aria-label="Add"
              style={{
                borderRadius: "35px",
                fontSize: "18px",
                height: "70px",
                width: "170px"
              }}
            >
              Get Started
            </Fab>
          </Link>
        </GetStartedSection>
        <MarketingFooter>
          <Link to="/" style={{ color: "#FFFFFF", fontSize: "1.4rem" }}>
            Home
          </Link>
          <Link to="/team" style={{ color: "#FFFFFF", fontSize: "1.4rem" }}>
            Team
          </Link>
          <ArrowUpward
            onClick={() => this.scrollToTop()}
            style={{ width: "50px", height: "50px" }}
          />
        </MarketingFooter>
      </MarketingContainer>
    );
  }
}

export default MarketingPage;

// Styles

const MarketingContainer = styled.div`
  background-color: white;
  margin: 50px 20px;
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 300px;
  align-items: center;
  margin: 10px 0 100px;
  background-color: #f4f4f4;
  @media (max-width: 500px) {
    text-align: center;
  }
`;

const HeaderButtons = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 50px;
`;

const BodyText = styled.p`
  font-size: 1.2rem;
  line-height: 1.4;
  @media (max-width: 500px) {
    text-align: center;
  }
`;

const MarketingSection = styled.div`
  display: flex;
  align-items: center;
  margin: 50px 0;
  padding: 20px 0;
  justify-content: space-around;
  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

const MarketingSection1 = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  margin: 50px 0;
  padding: 50px 0;
  justify-content: space-around;
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;
  @media (max-width: 500px) {
    flex-direction: column;
  }
`;
const SectionTitle = styled.h3`
  width: 100%;
  font-size: 2.4rem;
  @media (max-width: 500px) {
    text-align: center;
  }
`;
const SectionDivider = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  @media (max-width: 500px) {
    width: 100%;
  }
`;

const MarketingImg = styled.img`
  width: 40%;
  @media (max-width: 500px) {
    width: 100%;
    margin-top: 20px;
  }
`;

const GetStartedSection = styled.div`
  height: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background-color: #f4f4f4;
  margin: 50px auto 150px;
  @media (max-width: 500px) {
    text-align: center;
  }
`;

const MarketingFooter = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #616df6;
  display: flex;
  justify-content: space-around;
  height: 100px;
  color: white;
  align-items: center;
`;
