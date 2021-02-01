$(function() {

    // 실시간 유효성 검사 조금

    // 아이디 실시간 길이 검사
    var $id = $("input#id");
    var $r1 = $("#r1");
    
    $id.on("keyup", function() {
        if($id.val().length < 4) {
            $r1.text("X");
        }
        else {
            $r1.text('');
        }
    });


    
    // 비밀번호 실시간 특수문자 검사
    var $password = $("input#password");
    var password = document.querySelector("input#password");
    var $r2 = $("#r2");

    // 실시간 비밀번호 확인 검사
    var $pwdCheck = $("input#pwdCheck");
    var $r3 = $("#r3");

    $password.on("keyup", function() {

        $r2.text("X");

        for(var i=0; i<password.value.length; i++) {
            var ch = password.value.charCodeAt(i);
            if(
                (ch>=65 && ch<=90) ||
                (ch>=97 && ch<=122) ||
                (ch>=48 && ch<=57)
              ) {
            }
            else {
                $r2.text('');
            }
        }

        if($pwdCheck.val() == $password.val()) {
            $r3.text("");
        }
        else {
            $r3.text("X");
        }

    });

    $pwdCheck.on("keyup", function() {

        if($pwdCheck.val() == $password.val()) {
            $r3.text("");
        }
        else {
            $r3.text("X");
        }

    });


    /********************************************************************************/


    // 유효성 검사
    var registerForm = document.querySelector("#registerForm");

    registerForm.onsubmit = function() {

        // id 검사
        var id = document.getElementById("id");
        if(id.value.length < 4) {
            alert("아이디는 4글자 이상이어야 합니다.");
            id.select();
            return false;
        }
        
        var arr = JSON.parse(localStorage.getItem("arr"));
        if(arr == null) {
            arr = [];
        };
        for(var i=0; i<arr.length; i++) {
            if(arr[i].id == id.value) {
                alert("중복된 아이디가 있습니다.");
                id.select();
                return false;
            }
        }




        // 비밀번호 검사
        var flag = false;
        for(var i=0; i<password.value.length; i++) {
            var ch = password.value.charCodeAt(i);
            if(
                (ch>=65 && ch<=90) ||
                (ch>=97 && ch<=122) ||
                (ch>=48 && ch<=57)
            ) {
            }
            else {
                flag = true;
            }
        }
        if(!flag) {
            alert("비밀번호는 특수문자가 포함되어 있어야 합니다.");
            password.select();
            return false;
        }
        
        // 비밀번호 확인 검사
        var pwdCheck = document.getElementById("pwdCheck");
        if(password.value != pwdCheck.value) {
            alert("비밀번호가 일치하지 않습니다.");
            password.focus();
            return false;
        }
        
        // 이름 검사
        var name = document.getElementById("name");
        // 유니코드 순서 [가 - 힣]    ^ 시작     $ 끝
        // .test() 요 메소드가 정규식에 부합하는지 검사 실행
        if(/^[가-힣]{2,}$/.test(name.value) == false) {
            alert("이름은 한글 2글자 이상이어야합니다.");
            name.select();
            return false;
        }

        saveRegister();

    }
    

    /*************************************************************************************/

    // 객체 함수
    function Register(id, password, name, email, tel) {
        this.id = id;
        this.password = password;
        this.name = name;
        this.email = email;
        this.tel = tel;
    }
 


    // 저장
    function saveRegister() {

        var $id = $("#id");
        var $password = $("#password");
        var $pwdCheck = $("#pwdCheck");
        var $name = $("#name");
        var $email = $("#email");
        var $tel = $("#tel");

        var register = new Register($id.val(), $password.val(), $name.val(), $email.val(), $tel.val());
        
        var arr = JSON.parse(localStorage.getItem("arr"));
        if(arr == null) {
            arr = [];
        };

        arr.push(register);

        localStorage.setItem("arr", JSON.stringify(arr));

        $id.val('');
        $password.val('');
        $pwdCheck.val('');
        $name.val('');
        $email.val('');
        $tel.val('');

        loadList();

    }



    // 리스트업
    function loadList() {

        var arr = JSON.parse(localStorage.getItem("arr"));
        var table = document.querySelector("#bottom2 table");

        for(var i in arr) {
            var tr = "<tr>";
            tr += "<td>" + arr[i].id + "</td>";
            tr += "<td>" + arr[i].name + "</td>";
            tr += "<td>" + arr[i].email + "</td>";
            tr += "<td>" + arr[i].tel + "</td>";
            tr += "</tr>";

            table.innerHTML += tr;
        }

    }

    loadList();


});