// Write your code here
import './index.css'

const LatestMatch = props => {
  const {latestMatchDetailsCard} = props

  const {
    competingTeam,
    competingTeamLogo,
    date,
    firstInnings,
    manOfTheMatch,
    matchStatus,
    result,
    secondInnings,
    umpires,
    venue,
    id,
  } = latestMatchDetailsCard
  const competing_team = competingTeam
  const competing_team_logo = competingTeamLogo
  return (
    <div className="latest-match-container">
      <div className="latest-match">
        <div className="ipl-team-container">
          <p className="team-name">{competingTeam}</p>
          <p className="date">{date}</p>
          <p className="venue">{venue}</p>
          <p className="result">{result}</p>
        </div>
        <div className="competing-team-container">
          <img
            src={competing_team_logo}
            alt={`latest match ${competing_team}`}
            className="competing-team-logo"
          />
        </div>
      </div>
      <hr className="line" />
      <div className="innings-container">
        <p className="first-innings">First Innings</p>
        <p className="first-innings-value">{firstInnings}</p>
        <p className="first-innings">Second Innings</p>
        <p className="first-innings-value">{secondInnings}</p>
        <p className="man-of-match">Man Of The Match</p>
        <p className="man-of-match-value">{manOfTheMatch}</p>
        <p className="umpires">Umpires</p>
        <p className="umpires-value">{umpires}</p>
      </div>
    </div>
  )
}

export default LatestMatch
