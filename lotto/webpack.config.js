//index.html은 app.js만 실행한다. 그러면 app.js에다가  jsx파일들을 다 넣어준다 
// 그걸 해주는게 이 웹팩.js파일임 
const path = require('path'); //node에서 경로쉽게가져오는거 걍쓴다고외우래

module.exports = {
    //name: 'word-relay-setting',
    mode: 'development', //실서비스: production
    devtool: 'eval', //속도 빠르게해주는거  
    resolve: {
    extensions: ['.js', '.jsx'], // 얘 덕분에 밑에 확장자명도 굳이 안적어도됨
    },

    entry: {
        app: ['./client',], //client가 불러오는 애들은 따로안불러도됨 
    }, //입력

    module: {
        rules: [{ 
            test: /\.jsx?/,   //정규표현식 js랑jsx에 규칙을적용
            loader: 'babel-loader', 
            options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
                compact: false,
                plugins: [
                    '@babel/plugin-proposal-class-properties',
                    'react-hot-loader/babel',
                ],           
            },
        }],
    },

    output: {
        path: path.join(__dirname, 'dist'), //dirname은 현재폴더(wordRelay)의 dist폴더
        filename: 'app.js',
        publicPath: '/dist/',
    }, //출력
};