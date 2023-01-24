import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { viewPlayerDetails } from '../../api/playerData';

export default function ViewPlayer() {
  const [playerDetails, setPlayerDetails] = useState({});
  const router = useRouter();
  console.warn(router);

  const { firebaseKey } = router.query;

  useEffect(() => {
    viewPlayerDetails(firebaseKey).then(setPlayerDetails);
  }, [firebaseKey]);

  return (
    <>
      <div className="mt-5 d-flex flex-wrap">
        <div className="d-flex flex-column" />
        <div className="text-white ms-5 details">
          <h5>
            <div className="d-flex flex-column">
              <img src={playerDetails.image} alt={playerDetails.first_name} style={{ height: '200px', width: '200px' }} />
            </div>
            Name:{playerDetails.name}
            <br />
            Class:{playerDetails.class}
            <br />
            Species:{playerDetails.species}
            <br />
            Level{playerDetails.level}
          </h5>
          <hr />
        </div>
      </div>
      <hr />
    </>
  );
}
