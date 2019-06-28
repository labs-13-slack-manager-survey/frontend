import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "./marketingPage.css"
import AOS from 'aos';
import 'aos/dist/aos.css';

// styling imports
// import Button from "@material-ui/core/Button";
import { scroller, animateScroll } from "react-scroll";

// images

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
    AOS.init();
    return (
      
      <MarketingContainer>
        <div className = "marketing-nav">
          <Link to="/team" className ="nav-link-marketing">
              About Us
          </Link>
          
          <Link to="/login" className = "get-started">Get Started </Link>
        </div>

        <div className = "header" data-aos="fade-up"
     data-aos-anchor-placement="center-bottom" data-aos-duration="1500">
          <img src={Icon} />
          <div className="marketing-header-text">
            <div className = "marketing-header-title">Slackr</div>
            <div className = "marketing-header-description">an asynchronous stand-up platform for fast-paced teams.</div>
          </div>
        </div>

        <section className = "body">

          <div className = "section" data-aos="fade-right" data-aos-delay="300" data-aos-duration="1500">
          <div className= "circle-marketing">
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

          <div className = "section" data-aos="fade-left" data-aos-delay="300" data-aos-duration="1500">
            <div className= "circle-marketing">
              <div className="circle-red"/>
              <div className="circle-white"/>
            </div>
            <div className="section-content">
              <div className="section-title">Your Team, Fully Transparent</div>
              <div className="section-text">Slackr allows admins and peers to review team members' responses in Slack or on the web app, whenever is most convienient for you.</div>
            </div>
          </div>

          <div className = "section" data-aos="fade-right" data-aos-delay="300" data-aos-duration="1500">
          <div className= "circle-marketing">
              <div className="circle-green"/>
              <div className="circle-white"/>
            </div>
            <div className="section-content">
              <div className="section-title">Record Your Progress</div>
              <div className="section-text">Slackr allows you access your team's historical surveys, so you can keep the team on track and maintain sight of weekly goals.</div>
            </div>
          </div>

          <div className = "section" data-aos="fade-left" data-aos-delay="300" data-aos-duration="1500">
          <div className= "circle-marketing">
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

        <div className = "footer">
          <div className="vertical-line" />
          <div className = "marketing-footer-description">Let Slackr optimize your team's valuable time. Help us help you.</div>
            <Link to="/login" className = "get-started-button" data-aos="fade-up">Get Started</Link>
        </div>
        
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