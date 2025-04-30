import { useEffect, useState } from 'react';
import { getPersonnages } from '../api/testApi';
import FilterBar from '../components/filtreBarre';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

function TousPersonnages() {
  const [personnages, setPersonnages] = useState([]);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({ name: '', status: '', species: '', gender: '' });
  const [pageInfo, setPageInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getPersonnages({ page, ...filters })
      .then(response => {
        setPersonnages(response.data.results);
        setPageInfo(response.data.info);
      })
      .catch(err => {
        setPersonnages([]);
        setPageInfo(null);
        console.error(err);
      });
  }, [page, filters]);

  const [favoriteIds, setFavoriteIds] = useState(() => {
    const favs = JSON.parse(localStorage.getItem('favorites')) || [];
    return favs.map(f => f.id);
  });

  const toggleFavorite = (personnage) => {
    let favs = JSON.parse(localStorage.getItem('favorites')) || [];
    const exists = favs.find(f => f.id === personnage.id);
    if (exists) {
      favs = favs.filter(f => f.id !== personnage.id);
    } else {
      favs.push(personnage);
    }
    localStorage.setItem('favorites', JSON.stringify(favs));
    setFavoriteIds(favs.map(f => f.id));
  };

  const isFavorite = (id) => favoriteIds.includes(id);

  return (
    <div className="page-container">
      <h1 className="title">Les personnages</h1>

      <div className="top-bar">
        <FilterBar filters={filters} setFilters={setFilters} setPage={setPage} />
        <button className="favoris-button" onClick={() => navigate(`/favoris`)}>Favoris ❤️</button>
      </div>

      <div className="personnage-list">
        {personnages.map((personnage) => (
          <div key={personnage.id} className="personnage-card">
            <img
              src={personnage.image}
              alt={personnage.name}
              className="personnage-image"
              onClick={() => navigate(`/personnage/${personnage.id}`)}
            />
            <h3>{personnage.name}</h3>
            <div className="heart-icon" onClick={() => toggleFavorite(personnage)}>
              {isFavorite(personnage.id) ? <FaHeart color="red" /> : <FaRegHeart />}
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button onClick={() => setPage(1)} disabled={!pageInfo?.prev}>0</button>
        <button onClick={() => setPage(p => p - 1)} disabled={!pageInfo?.prev}>Pres</button>
        <span>{page}</span>
        <button onClick={() => setPage(p => p + 1)} disabled={!pageInfo?.next}>Suiv</button>
        <button onClick={() => setPage(pageInfo.pages)} disabled={!pageInfo?.next}>
          {pageInfo?.pages}
        </button>
      </div>
    </div>
  );
}

export default TousPersonnages;
