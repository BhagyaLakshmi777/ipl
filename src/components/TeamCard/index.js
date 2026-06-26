// Write your code here

import {Link} from 'react-router-dom'

import './index.css'

const TeamCard = props => {
  const {teamDetails, teamList} = props
  const {id, name, team, teamImageUrl} = teamDetails

  return (
    <Link to={`/team-matches/${id}`} className="team-link">
      <li className="team-container">
        <img src={teamImageUrl} alt={name} className="team-image" />
        <p className="name">{name}</p>
      </li>
    </Link>
  )
}

export default TeamCard
