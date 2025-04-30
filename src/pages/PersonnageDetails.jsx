import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { personnageById } from '../api/testApi';

function PersonnageDetails() {
  const { id } = useParams();
  const [personnage, setPersonnage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    personnageById(id)
      .then(res => {
        setPersonnage(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="loading">Chargement...</p>;
  if (!personnage) return <p>Personnage introuvable</p>;

  return (
    <div className="detail-container">
      <h1>{personnage.name}</h1>
      <img src={personnage.image} alt={personnage.name} className="detail-image" />
      <p><strong>Status:</strong> {personnage.status}</p>
      <p><strong>Species:</strong> {personnage.species}</p>
      <p><strong>Gender:</strong> {personnage.gender}</p>
      <p><strong>Origin:</strong> {personnage.origin?.name}</p>
      <p><strong>Location:</strong> {personnage.location?.name}</p>
    </div>
  );
}

export default PersonnageDetails;
