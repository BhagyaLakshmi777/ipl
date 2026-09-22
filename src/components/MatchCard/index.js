// Write your code here
import './index.css'

const MatchCard = props => {
  const {matchDetails} = props
  const {competingTeam, competingTeamLogo, result, matchStatus} = matchDetails
  const isWon = matchStatus === 'Won'
  const matchStatusClassName = isWon ? 'match-won-status' : 'match-lost-status'

  return (
    <li className="match-list-item">
      <img
        src={competingTeamLogo}
        alt={`competing team ${competingTeam}`}
        className="match-image"
      />
      <p className="competing-title">{competingTeam}</p>
      <p className="competing-result">{result}</p>
      <p className={`${matchStatusClassName}`}>{matchStatus}</p>
    </li>
  )
}

export default MatchCard
