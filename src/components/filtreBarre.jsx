import './filterbar.css';
import { FiRefreshCcw } from 'react-icons/fi';

function FilterBar({ filters, setFilters, setPage }) {
  const handleChange = (e) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setPage(1);
  };

  const clearFilters = () => {
    setFilters({
      name: '',
      status: '',
      species: '',
      gender: '',
    });
    setPage(1);
  };
  return (
    <div className="filter-bar">
      <input
        type="text"
        name="name"
        placeholder="Recherche par nom"
        value={filters.name}
        onChange={handleChange}
      />
      <select name="gender" value={filters.gender} onChange={handleChange}>
        <option value="">Tous les genres</option>
        <option value="male">Masculin</option>
        <option value="female">Féminin</option>
        <option value="unknown">Inconnu</option>
      </select>

      <select name="status" value={filters.status} onChange={handleChange}>
        <option value="">Tous les statuts</option>
        <option value="alive">Vivant</option>
        <option value="dead">Mort</option>
        <option value="unknown">Inconnu</option>
      </select>

      <select name="species" value={filters.species} onChange={handleChange}>
        <option value="">Toutes les espèces</option>
        <option value="Human">Humain</option>
        <option value="Alien">Alien</option>
      </select>
      <button className="clear-button" onClick={clearFilters}>
        <FiRefreshCcw style={{ marginRight: '5px' }} />
        
      </button>
    </div>
  );
}

export default FilterBar;
