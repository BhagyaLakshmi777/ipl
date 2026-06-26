// Write your code here
import './index.css'

const MatchCard = props => {
  const {matchDetails} = props
  const {competingTeam, competingTeamLogo, result, matchStatus} = matchDetails
  const isWon = matchStatus === 'Won'
  const matchStatusClassName = isWon ? 'match-won-status' : 'match-lost-status'
  const competing_team = competingTeam
  const competing_team_logo = competingTeamLogo
  return (
    <li className="match-list-item">
      <img
        src={competing_team_logo}
        alt={`competing team ${competing_team}`}
        className="match-image"
      />
      <p className="competing-title">{competingTeam}</p>
      <p className="competing-result">{result}</p>
      <p className={`${matchStatusClassName}`}>{matchStatus}</p>
    </li>
  )
}

export default MatchCard
