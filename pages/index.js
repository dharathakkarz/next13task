

import styles from '../styles/Home.module.css';
import React, { useState, useEffect } from 'react';

const Home = ({ data }) => {
  const [sorting, setsorting] = useState([]);
  const [resetSort, setresetSort] = useState([]);
  const [searching, setsearching] = useState(''); 

  useEffect(() => {
    setsorting([...data]); //
    setresetSort([...data]); 
  }, [data]);

  const changeData = sorting.filter((game) =>
    game.title && game.title.toLowerCase().includes(searching.toLowerCase())
  );

  const sortByPlatform = () => {
    const sorted = [...changeData].sort((a, b) =>
      a.platform.localeCompare(b.platform)
    );
    setsorting(sorted);
  };

  const resetData = () => {
    setsorting([...resetSort]); //reset the sorting state with the original data

    setsearching(''); //clear search

  };

  return (
    <>
      <h1 className={styles.title}>Games</h1>
      <div className={styles.main}>
        <div className={styles.input1}>
          <input
            className={styles.input}
            type="text"          
            placeholder="Search Any Game"
            value={searching}
            onChange={(e) => setsearching(e.target.value)}
          />
        </div>

        {/* btn not showing on blank space */}
        {(changeData.length > 0 ) && (
          <div style={{ margin:'2px' }}>
            <button className={styles.sortbtn} onClick={sortByPlatform}>Sort Games</button>
            <button className={styles.sortbtn} onClick={resetData}>Reset</button>
          </div>
        )}
      
        <table className={styles.table}>
          <thead>
            <tr className={styles.table}>
              <th>Title</th>
              <th>Platform</th>
              <th>Score</th>
              <th>Genre</th>
              <th>Editors Choice</th>
            </tr>
          </thead>
          <tbody>
            {changeData.map((game, index) => (
              <tr key={index}>
                <td>{game.title}</td>
                <td>{game.platform}</td>
                <td>{game.score}</td>
                <td>{game.genre}</td>
                <td>{game.editors_choice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export const getServerSideProps = async () => {
  console.log('Server side clg');
  try {
    const response = await fetch(
      'https://s3-ap-southeast-1.amazonaws.com/he-public-data/gamesarena274f2bf.json'
    );

    const data = await response.json();

    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.error('Error', error.message);
  }
};

export default Home;
