function SendEmail() {
    var params = {
        from_name : document.getElementById("fullName").value,
        email_id : document.getElementById("email_id").value,
        mobile : document.getElementById("mobile").value,
        message : document.getElementById("message").value
    }
    emailjs.send("service_iw67e3g","template_y11hyba",params).then(function(res) {
        alert("Your message was sent successfully", + res.status);
    })
}