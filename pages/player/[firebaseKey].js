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
            {playerDetails.name}
            {playerDetails.class}
            {playerDetails.species}
            {playerDetails.level}
          </h5>
          <hr />
        </div>
      </div>
      <hr />
    </>
  );
}
