import React, { memo } from 'react';
// memo를 넣으면 PureComponent 역할을 함
//밑에 애들은 훅스가 아니라 그냥 함수 컴포넌트
const Ball = memo( ({ number }) => {
    let background;
    if (number <= 10) {
        background = '#F84A5F';
    } else if (number <= 20) {
        background = '#F5A623';
    } else if (number <= 30) {
        background = '#ECE050';
    } else if (number <= 40) {
        background = '#6A9AD4';
    } else {
        background = '#6EDCA5';
    }
    return (
        <div className = "ball" style={{ background }}>{number}</div> 
    );
});



export default Ball;