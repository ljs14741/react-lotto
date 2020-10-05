import React , { useState , useRef , useEffect } from 'react';
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
    const [winNumbers, setWinNumbers] = useState(getWinNumbers());
    const [winBalls, setWinBalls] = useState([]);
    const [bonus, setBonus] = useState([]);
    const [ redo, setRedo] = useState([]);
    const timeouts = useRef([]);

    const onClickRedo = () => {
        console.log('onClickRedo');
        setWinNumbers(getWinNumbers());
        setWinBalls([]);
        setBonus([]);
        setRedo([]);
        timeouts.current = [];
        this.timeouts = [];
        
    }
    return (
        <>
            <div>당첨 숫자</div>
            <div id = "결과창">
                {winBalls.map((v) => <Ball key={v} number ={v} />)}
            </div>
            <div>보너스</div>
                {bonus && <Ball number = {bonus} />}
                {redo && <button onClick = { this.onClickRedo} >한 번 더!</button>}
            </>
    );

}

class Lotto extends Component {
    state = {
        winNumbers: getWinNumbers(), // 당첨숫자들
        winBalls: [], // 공을 하나씩 담을 공간?
        bonus: null, // 보너스공
        redo: false,
    };

    timeouts = [];

    runTimeouts = () => {
        console.log('runTimeOut');
        const { winNumbers } = this.state;
        for (let i = 0; i < winNumbers.length -1; i++) {
            this.timeouts[i] = setTimeout(() => {
                this.setState( (prevState) => {
                    return {
                    winBalls: [...prevState.winBalls, winNumbers[i]],
                    };
                });
            }, (i + 1) * 1000); //1초마다 하나씩 winballs에 들어감
        }
        this.timeouts[6] = setTimeout ( () => {
            this.setState( {
                bonus: winNumbers[6],
                redo: true, //한번더 버튼이 나오도록 해주는거
            });
        }, 7000);
    }

    componentDidMount() {
        console.log('didMount');
        this.runTimeouts();
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('didUpdate');
        if(this.state.winBalls.length === 0) { //redo눌렀을때만 실행할수있도록
            this.runTimeouts();
        }
    }

    componentWillUnmount() { 
        this.timeouts.forEach( (v) => {
            clearTimeout(v); //clear를 안해주면 뭐 오류날수있다카네
        });
    }

    onClickRedo = () => {
        console.log('onClickRedo');
        this.setState ({
            winNumbers: getWinNumbers(), // 당첨숫자들
            winBalls: [], // 공을 하나씩 담을 공간?
            bonus: null, // 보너스공
            redo: false,
        });
        this.timeouts = [];
    }

    render() {
        const { winBalls, bonus, redo } = this.state;
        return (
            <>
            <div>당첨 숫자</div>
            <div id = "결과창">
                {winBalls.map((v) => <Ball key={v} number ={v} />)}
            </div>
            <div>보너스</div>
                {bonus && <Ball number = {bonus} />}
                {redo && <button onClick = { this.onClickRedo} >한 번 더!</button>}
            </>
        );
    }
}

export default Lotto;