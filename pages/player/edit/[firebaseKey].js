import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getSinglePlayer } from '../../../api/playerData';
import PlayerForm from '../../../components/forms/PlayerForm';

export default function EditPlayer() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  // TODO: grab the firebasekey
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSinglePlayer(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (
    <>
      <Head>
        <title>Update {editItem.name} </title>
      </Head><PlayerForm obj={editItem} />
    </>
  );
}
