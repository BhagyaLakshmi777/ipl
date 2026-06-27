// Write your code here
import {Component} from 'react'

import './index.css'

import Loader from 'react-loader-spinner'
import {PieChart, Pie, Legend, Cell} from 'recharts'

import LatestMatch from '../LatestMatch'

import MatchCard from '../MatchCard'

let teamBackgroundClassName
const teamToClassName = {
  RCB: 'royalcb-container',
  KKR: 'kolkotakr-container',
  KXP: 'kxp-container',
  CSK: 'csk-container',
  RR: 'rr-container',
  MI: 'mi-container',
  SH: 'srh-container',
  DC: 'dc-capitals',
}

class TeamMatches extends Component {
  state = {
    latestMatchDetails: {},
    recentMatches: [],
    teamBannerUrl: '',
    isLoader: true,
  }

  componentDidMount() {
    this.teamMatchesData()
  }

  teamMatchesData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    teamBackgroundClassName = teamToClassName[id]

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data1 = await response.json()

    const updatedData = {
      latestMatchDetails: data1.latest_match_details,
      recentMatches: data1.recent_matches,
      teamBannerUrl: data1.team_banner_url,
    }
    const {latestMatchDetails} = updatedData

    const latestMatch = {
      competingTeam: latestMatchDetails.competing_team,
      competingTeamLogo: latestMatchDetails.competing_team_logo,
      date: latestMatchDetails.date,
      firstInnings: latestMatchDetails.first_innings,
      manOfTheMatch: latestMatchDetails.man_of_the_match,
      matchStatus: latestMatchDetails.match_status,
      result: latestMatchDetails.result,
      secondInnings: latestMatchDetails.second_innings,
      umpires: latestMatchDetails.umpires,
      venue: latestMatchDetails.venue,
      id: latestMatchDetails.id,
    }

    const {recentMatches} = updatedData
    const updateRecentMatches = recentMatches.map(each => ({
      umpires: each.umpires,
      id: each.id,
      result: each.result,
      manOfTheMatch: each.man_of_the_match,
      date: each.date,
      competingTeam: each.competing_team,
      competingTeamLogo: each.competing_team_logo,
      firstInnings: each.first_innings,
      matchStatus: each.match_status,
      secondInnings: each.second_innings,
      venue: each.venue,
    }))
    this.setState({
      latestMatchDetails: latestMatch,
      recentMatches: updateRecentMatches,
      teamBannerUrl: updatedData.teamBannerUrl,
      isLoader: false,
    })
  }
  onClickBack = () => {
    const {history} = this.props
    history.replace('/')
  }

  render() {
    const {latestMatchDetails, recentMatches, teamBannerUrl, isLoader} =
      this.state
    const chartData = [
      {
        name: 'Won',
        value: recentMatches.filter(item => item.matchStatus === 'Won').length,
      },
      {
        name: 'Lost',
        value: recentMatches.filter(item => item.matchStatus === 'Lost').length,
      },
      {
        name: 'Drawn',
        value: recentMatches.filter(item => item.matchStatus === 'Drawn')
          .length,
      },
    ]
    console.log(chartData)

    return isLoader ? (
      <div className="loader" testid="loader">
        <Loader type="Oval" color="#ffffff" height={50} width={50} />
      </div>
    ) : (
      <div className={`team-matches-container ${teamBackgroundClassName}`}>
        <div className="team-banner-container">
          <img src={teamBannerUrl} alt="team banner" className="banner" />
        </div>
        <h1 className="recent-match">Latest Matches</h1>
        <LatestMatch
          latestMatchDetailsCard={latestMatchDetails}
          key={latestMatchDetails.id}
        />
        <ul className="match-card-container">
          {recentMatches.map(each => (
            <MatchCard matchDetails={each} key={each.id} />
          ))}
        </ul>
        <button type="button" className="back-btn" onClick={this.onClickBack}>
          Back
        </button>
        <div className="pie-container">
          <PieChart width={300} height={300}>
            <Pie
              cx="70%"
              cy="40%"
              data={chartData}
              startAngle={0}
              endAngle={360}
              innerRadius="40%"
              outerRadius="70%"
              dataKey="value"
              nameKey="name"
            >
              <Cell name="Won" fill="#fecba6"  />
              <Cell name="Lost" fill="#b3d23f" />
              <Cell name="Drawn" fill="#a44c9e" />
            </Pie>
            <Legend
              iconType="circle"
              layout="vertical"
              verticalAlign="middle"
              align="right"
              wrapperStyle={{
                   paddingLeft: "20px",
                }}
            />
          </PieChart>
        </div>
      </div>
    )
  }
}

export default TeamMatches
