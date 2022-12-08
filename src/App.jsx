import database from './database.json'
const App = () => {
  const dados = database

  return (
    <div className="container">
      <div className="topLeadersList">
        {dados.map((leader, index) => (
          <div className="leader" key={leader.id}>
            {index + 1 <= 3 && (
              <div className="containerImage">
                <img className="image" loading="lazy" src={leader.image} />
                <div className="crown">
                  <svg
                    id="crown1"
                    fill="#0f74b5"
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 50"
                  >
                    <polygon
                      className="cls-1"
                      points="12.7 50 87.5 50 100 0 75 25 50 0 25.6 25 0 0 12.7 50"
                    />
                  </svg>
                </div>
                <div className="leaderName">{leader.name}</div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="playerslist">
        <div className="table">
          <div>#</div>

          <div>Name</div>

          <div>Class Name</div>

          <div>Coins</div>
        </div>
        <div className="list">
          {dados.map((leader, index) => (
            <div className="player" key={leader.id}>
              <span> {leader.rank}</span>
              <div className="user">
                <img className="image" src={leader.image} />
                <span> {leader.name} </span>
              </div>
              <span> {leader.class} </span>
              <span> {leader.coins} </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
