// Lotto.jsx
import React, { useState, useRef, useEffect, useMemo } from 'react';
import Ball from './Ball';

function getWinNumbers() {
  console.log('getWinNumbers');
  const candidate = Array(45).fill().map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
  return [...winNumbers, bonusNumber];
}

const Lotto = () => {
  const [winBalls, setWinBalls] = useState([]);
  const lottoNumbers = useMemo(() => getWinNumbers(), []);
  const [winNumbers, setWinNumbers] = useState(lottoNumbers);
  const [bonus, setBonus] = useState(null);
  const [redo, setRedo] = useState(false);
  const timeouts = useRef([]);

  useEffect(() => {
    console.log('useEffect');
    for (let i = 0; i < winNumbers.length - 1; i++) {
      timeouts.current[i] = setTimeout(() => {
        setWinBalls((prevBalls) => [...prevBalls, winNumbers[i]]);
      }, (i + 1) * 1000);
    }
    timeouts.current[6] = setTimeout(() => {
      setBonus(winNumbers[6]);
      setRedo(true);
    }, 7000);
    return () => {
      timeouts.current.forEach((v) => {
        clearTimeout(v);
      });
    };
  }, [winNumbers]);

  const onClickRedo = () => {
    console.log('onClickRedo');
    setWinNumbers(getWinNumbers());
    setWinBalls([]);
    setBonus(null);
    setRedo(false);
    timeouts.current = [];
  };

  return (
    <div style={{ textAlign: 'center', background: '#FFD700', padding: '20px', borderRadius: '10px', color: '#333' }}>
      <div style={{ marginBottom: '20px' }}>당첨 숫자</div>
      <div id="결과창" style={{ display: 'flex', marginBottom: '20px' }}>
        {winBalls.map((v) => (
          <Ball key={v} number={v} />
        ))}
      </div>
      <div style={{ marginBottom: '20px' }}>보너스</div>
      {bonus && <Ball number={bonus} />}
      {redo && <button style={{ marginTop: '20px', padding: '10px', fontSize: '16px', cursor: 'pointer', background: '#FF6347', color: 'white', border: 'none', borderRadius: '5px' }} onClick={onClickRedo}>한 번 더!</button>}
    </div>
  );
};

export default Lotto;
