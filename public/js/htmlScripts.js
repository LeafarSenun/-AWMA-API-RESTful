var htmlScripts = function() {
    /*
     <div class="list-group-item" id="{{id}}" onclick="htmlScripts.getGroup('{{id}}', '{{_id}}')">{{name}}
     <button type="button" class="btn btn-xs btn-danger" style="float: right;"onclick="htmlScripts.deleteGroup('{{id}}', '{{_id}}')">delete</button>
     </div>
     */
    var res = {};

    res.checkLogin = (loginStatus) => {
        console.log(loginStatus);
        let btn = document.getElementById("addButton");
        if (loginStatus) {
            console.log("yo");
            let log = document.getElementById("login-logout");
            let reg = document.getElementById("register");
            log.href = "/logout";
            log.innerHTML = "Logout";
            reg.style.visibility="hidden"
            if (btn) btn.classList.remove("hidden");
            return;
        }
        if (btn) btn.classList.add("hidden");
    };
    return res;
}();