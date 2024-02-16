import { useEffect, useState } from 'react';

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [usd, setUsd] = useState('');
  const [select, setSelect] = useState({});

  useEffect(() => {
    fetch('https://api.coinpaprika.com/v1/tickers')
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setSelect(json[0]);
        setLoading(false);
      });
  }, []);

  const handleChangeSelect = (e) => {
    const seletedCoin = e.target.value;
    const coinObj = coins.filter((coin) => coin.symbol === seletedCoin)[0];

    setSelect(coinObj);
    setUsd(0);
  };

  const onChange = (e) => {
    setUsd(e.target.value);
  };

  return (
    <div>
      <h1>The Coins! {loading ? '' : `(${coins.length})`}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select onChange={handleChangeSelect} value={select.symbol}>
          {coins.map((coin) => (
            <option key={coin.id} value={coin.symbol}>
              {coin.name} ({coin.symbol}) : ${coin.quotes.USD.price} USD
            </option>
          ))}
        </select>
      )}
      <hr />
      <div>
        <input value={usd} type="number" onChange={onChange} disabled={loading ? true : false} placeholder="0" />
        USD ={' '}
        <input
          value={loading ? '' : usd / select.quotes.USD.price}
          type="number"
          disabled={loading ? true : false}
          placeholder="0"
        />
        {loading ? null : select.symbol}
      </div>
    </div>
  );
}

export default App;
