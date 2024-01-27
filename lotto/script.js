function shareTwitter() {
    var sendText = "GodofDeath - 죽음 예측 테스트"; // 전달할 텍스트
    var sendUrl = "https://kimchilotto.netlify.app"; // 전달할 URL
    window.open("https://twitter.com/intent/tweet?text=" + sendText + "&url=" + sendUrl);
}

function shareFacebook() {
    var sendUrl = "https://kimchilotto.netlify.app"; // 전달할 URL
    window.open("http://www.facebook.com/sharer/sharer.php?u=" + sendUrl);
}

function shareKakao() {
    Kakao.init('3465a38018dd47291708509fd32fc49b');
  
    // // 카카오링크 버튼 생성
    Kakao.Share.createDefaultButton({
      container: '#btnKakao', 
      objectType: 'feed',
      content: {
        title: '깍두기의 로또 추첨기', 
        description: '깍두기만의 방식으로 만든 로또 추첨기, 추첨 방식은 영업 비밀이며 5만원이 잘걸림.', 
        imageUrl: 'https://kimchilotto.netlify.app', 
        link: {
           mobileWebUrl: 'https://kimchilotto.netlify.app',
           webUrl: 'https://kimchilotto.netlify.app'
        },
      },
    });
  }