
window.onload = function() {



    // 롤링
    setInterval(function() {
    
        var rolling = $(".rolling ul");
        var rollingRow = $(".rolling ul li:first");
    
        var Area = function(){ 
            rollingRow.appendTo(rolling).show(300); 
        };
    
        $(rollingRow).hide(300, Area);         
    
        },3000
    );
    
    

}

// 네이버 검색
function naverSearch() {
    var search = document.querySelector("#search");
    console.log(search.value);
    document.getElementById('searchBtn').setAttribute('href','https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=' + search.value);
}

// 회원가입 페이지 이동
function registerPage() {
    window.open("./register.html", "register");
}
