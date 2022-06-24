// 넘어온 값이 빈값인지 체크합니다.
// !value 하면 생기는 논리적 오류를 제거하기 위해
// 명시적으로 value == 사용
// [], {} 도 빈값으로 처리
const isEmpty = function(value) {
    if( value == "" || value == null || value == undefined || ( value != null && typeof value == "object" && !Object.keys(value).length )){
        return true;
    } else {
        return false;
    }
};

const isNotEmpty = function(value) {
    if( value == "" || value == null || value == undefined || ( value != null && typeof value == "object" && !Object.keys(value).length )){
        return false;
    } else {
        return true;
    }
};

const customPop = {
    confirm : function (txt, btn_txt, callback) {
        if (isEmpty(txt)) {
            console.warn("confirm message is empty.");
            return;
        } else if (isEmpty(callback)|| typeof callback != "function") {
            console.warn("callback is null or not function.");
            return;
        } else {
            this.open(txt, btn_txt, callback);
        }
    },
    alert: function (txt) {
        if (txt == null || txt.trim() == "") {
            console.warn("alert message is empty.");
            return;
        } else {
           this.open(txt);
        }
    },

    open: function (txt, btn_txt, callback) {
        const newPop = document.createElement("div");
        // newPop.setAttribute("id", );
        newPop.setAttribute("class", "customPop");
        document.body.appendChild(newPop);

        const newPopContent = document.createElement("div");
        newPopContent.setAttribute("class", "customPop_content");
        newPopContent.innerHTML = txt;
        newPop.appendChild(newPopContent);

        const newPopBtn = document.createElement("div");
        newPopBtn.setAttribute("class", "customPop_btn");
        newPop.appendChild(newPopBtn);

        const targetPop = this;
        if(btn_txt) {
            if(isNotEmpty(btn_txt["btn_false"])) {
                const newPopFalse = document.createElement("button");
                newPopFalse.setAttribute("class", "btn_false");
                newPopFalse.innerHTML = btn_txt["btn_false"];
                newPopFalse.addEventListener("click", function () {
                    callback(false);
                    targetPop.close(newPop);
                }, { once : true });
                newPopBtn.appendChild(newPopFalse);
            }
            if(isNotEmpty(btn_txt["btn_true"])) {
                const newPopTrue = document.createElement("button");
                newPopTrue.setAttribute("class", "btn_true");
                newPopTrue.innerHTML = btn_txt["btn_true"];
                newPopTrue.addEventListener("click", function () {
                    callback(true);
                    targetPop.close(newPop);
                }, { once : true });
                newPopBtn.appendChild(newPopTrue);
            }
        } else {
            const newPopTrue = document.createElement("button");
            newPopTrue.setAttribute("class", "btn_true");
            newPopTrue.innerHTML = "확인";
            newPopTrue.addEventListener("click", function () {
                targetPop.close(newPop);
            }, { once : true });
            newPopBtn.appendChild(newPopTrue);
        }

        $(newPop).bPopup({
            modalClose: false,
            follow: [true, true],
            positionStyle: 'fixed' //'fixed' or 'absolute'
        });
    },

    close: function (target) {
        $(target).bPopup().close();
        $(target).remove();
    }
};

const customToast = function (options) {
    const txt = options["message"];
    const newPop = document.createElement("div");
    newPop.setAttribute("class", "customPop");
    document.body.appendChild(newPop);

    const newPopContent = document.createElement("div");
    newPopContent.setAttribute("class", "customPop_content");
    newPopContent.innerHTML = txt;
    newPop.appendChild(newPopContent);

    const newPopBtn = document.createElement("div");
    newPopBtn.setAttribute("class", "customPop_btn");
    newPop.appendChild(newPopBtn);

    const targetPop = this;
};


function fadeIn(target) {
    for (let i = 1; i <= 10; i++) {
        const level = i / 10;
        // console.log(level);
        changeOpacity(target, level);
    }
}
function fadeInAction(target, level, inTimer) {
    console.log("fadeInAction");
    level = level + 0.1;
    changeOpacity(target, level);
    if(level>1) clearInterval(inTimer);
    return level;
}
function fadeOut(target) {
    for (let i = 10; i >= 0; i--) {
        const level = i / 10;
        // console.log(level);
        changeOpacity(target, level);
    }
}
function changeOpacity(target, level) {
    console.log("level :: " + level);
    var obj = target;
    obj.style.opacity = level;
    obj.style.MozOpacity = level;
    obj.style.KhtmlOpacity = level;
    obj.style.MsFilter = "'progid: DXImageTransform.Microsoft.Alpha(Opacity=" + (level * 100) + ")'";
    obj.style.filter = "alpha(opacity=" + (level * 100) + ");";
}