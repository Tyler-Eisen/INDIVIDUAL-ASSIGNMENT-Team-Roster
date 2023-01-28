import { Button } from 'react-bootstrap';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import { getPlayers } from '../api/playerData';
import PlayerCard from '../components/PlayerCard';

function Home() {
  const [players, setPlayers] = useState([]);

  const { user } = useAuth();

  const getAllThePlayers = () => {
    getPlayers(user.uid).then(setPlayers);
  };

  useEffect(() => {
    getAllThePlayers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>Team Roster</title>
      </Head>
      <div className="text-center my-4">
        <Link href="/player/new" passHref>
          <Button>Add A Player</Button>
        </Link>
        <div className="d-flex flex-wrap">
          {players.map((player) => (
            <PlayerCard key={player.firebaseKey} playerObj={player} onUpdate={getAllThePlayers} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
