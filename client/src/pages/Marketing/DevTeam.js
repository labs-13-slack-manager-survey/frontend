import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { ArrowUpward } from '@material-ui/icons';
import { animateScroll } from 'react-scroll';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithubSquare } from '@fortawesome/free-brands-svg-icons';

// profile pictures
import Erin from '../../images/erin.JPG';
import Mikaela from '../../images/mikaela.jpg';
import Arshak from '../../images/arshak.jpeg';
import Shaun from '../../images/shaun.png';

class DevTeam extends Component {
	scrollToTop() {
		animateScroll.scrollToTop();
	}
	render() {
		return (
			<div>
				<Typography
					variant="h2"
					style={{ textAlign: 'center', margin: '50px 0' }}
				>
					Meet The Developers
				</Typography>
				<TeamContainer>
					<TeamMember>
						<MemberImage src={Arshak} alt="Arshak Asriyan" />
						<Typography variant="h4">Arshak Asriyan</Typography>
						<p>Full-Stack Developer</p>
						<MemberLinks>
							<a target="blank" href="https://github.com/AAsriyan">
								<FontAwesomeIcon className="fa-2x" icon={faGithubSquare} />
							</a>
							<a
								target="blank"
								href="https://www.linkedin.com/in/arshak-asriyan-097012a0/"
							>
								<FontAwesomeIcon className="fa-2x" icon={faLinkedin} />
							</a>
						</MemberLinks>
					</TeamMember>
					<TeamMember>
						<MemberImage src={Erin} alt="Erin Koen" />
						<Typography variant="h4">Erin Koen</Typography>
						<p>Full-Stack Developer</p>
						<MemberLinks>
							<a target="blank" href="https://github.com/erin-koen">
								<FontAwesomeIcon className="fa-2x" icon={faGithubSquare} />
							</a>
							<a target="blank" href="https://www.linkedin.com/in/erinkoen/">
								<FontAwesomeIcon className="fa-2x" icon={faLinkedin} />
							</a>
						</MemberLinks>
					</TeamMember>
					<TeamMember>
						<MemberImage src={Mikaela} alt="Mikaela Currier" />
						<Typography variant="h4">Mikaela Currier</Typography>
						<p>Full-Stack Developer</p>
						<MemberLinks>
							<a target="blank" href="https://github.com/mikaelacurrier">
								<FontAwesomeIcon className="fa-2x" icon={faGithubSquare} />
							</a>
							<a
								target="blank"
								href="https://www.linkedin.com/in/mikaela-currier/"
							>
								<FontAwesomeIcon className="fa-2x" icon={faLinkedin} />
							</a>
						</MemberLinks>
					</TeamMember>
					<TeamMember>
						<MemberImage src={Shaun} alt="Shaun Carmody" />
						<Typography variant="h4">Shaun Carmody</Typography>
						<p>Full-Stack Developer</p>
						<MemberLinks>
							<a target="blank" href="https://github.com/shaunmcarmody">
								<FontAwesomeIcon className="fa-2x" icon={faGithubSquare} />
							</a>
							<a
								target="blank"
								href="https://www.linkedin.com/in/shaunmcarmody/"
							>
								<FontAwesomeIcon className="fa-2x" icon={faLinkedin} />
							</a>
						</MemberLinks>
					</TeamMember>
				</TeamContainer>
				<MarketingFooter>
					<Link to="/" style={{ color: '#FFFFFF', fontSize: '1.4rem' }}>
						Home
					</Link>
					<Link to="/team" style={{ color: '#FFFFFF', fontSize: '1.4rem' }}>
						Team
					</Link>
					<ArrowUpward
						onClick={() => this.scrollToTop()}
						style={{ width: '50px', height: '50px' }}
					/>
				</MarketingFooter>
			</div>
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
