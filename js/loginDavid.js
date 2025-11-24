$("#loginBtn").click(function () {
    const username = $("#username").val();
    const password = $("#password").val();

    // send POST request to your backend
    $.ajax({
        url: "http://localhost:3000/login",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({ username, password }),
        
        success: function (res) {
            // login successful → go to diary list page (make later)
            window.location.href = "entries.html";
        },

        error: function () {
            $("#error").text("Invalid username or password.");
        }
    });
});
