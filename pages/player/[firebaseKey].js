import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Image } from 'react-bootstrap';
import { viewPlayerDetails } from '../../api/playerData';

export default function ViewPlayer() {
  const [playerDetails, setPlayerDetails] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    viewPlayerDetails(firebaseKey).then(setPlayerDetails);
  }, [firebaseKey]);

  return (
    <>
      <Head>
        <title>{playerDetails.name}</title>
      </Head>
      <div className="mt-5 d-flex flex-wrap">
        <div className="d-flex flex-column" />
        <div className="text-white ms-5 details">
          <h5>
            <div className="d-flex flex-column">
              <Image src={playerDetails.image} alt={playerDetails.image} style={{ height: '200px', width: '200px' }} />
            </div>
            Name: {playerDetails.name}
            <br />
            Class: {playerDetails.playerClass}
            <br />
            Species: {playerDetails.species}
            <br />
            Level: {playerDetails.level}
          </h5>
          <hr />
        </div>
      </div><hr />
    </>

  );
}
