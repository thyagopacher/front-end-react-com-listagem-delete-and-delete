import React, { useState, useEffect } from 'react';
import api from './services/api'

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo projeto ${Date.now()}`,
      url: "http://github.com.br/xxx",
      techs: ["Node.js", "HTML"]
    });

    const repositorie = response.data;

    setRepositories([...repositories, repositorie]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete('repositories/' + id);

    setRepositories(repositories.filter(repo => repo.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
          <p>{repository.title}</p>

          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
