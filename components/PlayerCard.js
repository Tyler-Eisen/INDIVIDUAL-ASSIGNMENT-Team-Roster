import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deletePlayer } from '../api/playerData';

function PlayerCard({ playerObj, onUpdate }) {
  const deleteThisPlayer = () => {
    if (window.confirm(`Delete ${playerObj.name}?`)) {
      deletePlayer(playerObj.firebaseKey).then(() => onUpdate());
    }
  };
  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={playerObj.image} alt={playerObj.name} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{playerObj.name}</Card.Title>
        {/* DYNAMIC LINK TO VIEW THE BOOK DETAILS  */}
        <Link href={`/player/${playerObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        {/* DYNAMIC LINK TO EDIT THE BOOK DETAILS  */}
        <Link href={`/player/edit/${playerObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisPlayer} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

PlayerCard.propTypes = {
  playerObj: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    class: PropTypes.string,
    species: PropTypes.string,
    level: PropTypes.number,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PlayerCard;
