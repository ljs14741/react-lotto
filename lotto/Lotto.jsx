import React , { useState, useRef, useEffect, useMemo } from 'react';
import Ball from './Ball';

function getWinNumbers() {
    console.log('getWinNumbers');
    const candidate = Array(45).fill().map((v, i) => i + 1);
    const shuffle = [];
    while (candidate.length > 0) {
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length) , 1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length -1];
    const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
    return [...winNumbers, bonusNumber];
}

const Lotto = () => {
    const [winBalls, setWinBalls] = useState([]);
    const lottoNumbers = useMemo( () => getWinNumbers(), []); //useMemo는 복잡한 함수 결과값을 기억 react는 함수 전체를 다시 실행한다? 필요없는거를 안타게하기 위해 usememo사용
    const [winNumbers, setWinNumbers] = useState(lottoNumbers); //함수가 도는데 오래걸리면 useCallback으로 함수를 기억해서 함수실행시간을 줄인다.
    const [bonus, setBonus] = useState(null);
    const [redo, setRedo] = useState(false);
    const timeouts = useRef([]);

    useEffect( () => {
        console.log('useEffect');
        for (let i = 0; i < winNumbers.length -1; i++) {
            timeouts.current[i] = setTimeout(() => {
                setWinBalls((prevBalls) => [...prevBalls, winNumbers[i]]);        
            }, (i + 1) * 1000); //1초마다 하나씩 winballs에 들어감
        }
        timeouts.current[6] = setTimeout ( () => {
            setBonus(winNumbers[6]);
            setRedo(true);            
        }, 7000);
        return () => {
            timeouts.current.forEach( (v) => {
                clearTimeout(v);
            });
        };
    }, [timeouts.current]); //input자리가 빈 배열이면 componentDidMount와 같다
            //배열에 요소가 있으면 componentDidMount랑 componentDidUpdate 둘 다 수행
    const onClickRedo = () => {
        console.log('onClickRedo');
        //console.log(getWinNumbers());
        setWinNumbers(getWinNumbers());
        setWinBalls([]);
        setBonus(null);
        setRedo(false);
        timeouts.current = [];
    }

    return (
        <>
            <div>당첨 숫자</div>
            <div id = "결과창">
                {winBalls.map((v) => <Ball key={v} number ={v} />)}
            </div>
            <div>보너스</div>
            {bonus && <Ball number = {bonus} />}
            {redo && <button onClick = {onClickRedo} >한 번 더!</button>}
        </>
    );
};

export default Lotto;