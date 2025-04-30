import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PersonnageFav() {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(saved);
  }, []);

  const removeFromFavorites = (id) => {
    const updated = favorites.filter(fav => fav.id !== id);
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  return (
    <div>
      <h1>Mes personnages preferes</h1>
      {favorites.length === 0 ? (
        <p>Pas de favoris</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {favorites.map(character => (
            <div key={character.id} style={{ border: '1px solid #ccc', margin: 10, padding: 10, width: 180 }}>
              <img
                src={character.image}
                alt={character.name}
                style={{ width: '100%', cursor: 'pointer' }}
                onClick={() => navigate(`/character/${character.id}`)}
              />
              <h3>{character.name}</h3>
              <button onClick={() => removeFromFavorites(character.id)}>Retirer </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PersonnageFav;