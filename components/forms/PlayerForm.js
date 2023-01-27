import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { updatePlayer, createPlayer } from '../../api/playerData';

const initialState = {
  name: '',
  playerClass: '',
  species: '',
  level: '',
  image: '',
};
function PlayerForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    // getPlayers(user.uid).then(setFormInput);
  //   getPlayers(user.uid).then((players) => setFormInput(players[2]));

    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updatePlayer(formInput)
        .then(() => router.push(`/player/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createPlayer(payload).then(() => {
        router.push('/');
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Player</h2>

      {/* Name INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Player Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter a name"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* IMAGE INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Player Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an image url"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* Species INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="Player Species" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Species"
          name="species"
          value={formInput.species}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput3" label="Player Class" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Player Class"
          name="playerClass"
          value={formInput.playerClass}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* Level TEXTAREA  */}
      <FloatingLabel controlId="floatingTextarea" label="Level" className="mb-3">
        <Form.Control
          as="textarea"
          placeholder="Level"
          name="level"
          value={formInput.level}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Player</Button>
    </Form>
  );
}

PlayerForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    species: PropTypes.string,
    playerClass: PropTypes.string,
    Level: PropTypes.number,
    firebaseKey: PropTypes.string,
  }),
};

PlayerForm.defaultProps = {
  obj: initialState,
};

export default PlayerForm;
