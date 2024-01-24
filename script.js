const form = document.querySelector('form');

function sendEmail(){
    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "mnemosyne@cut.ac.cy",
        Password : "EF7053A220469FB2303408715EDF235C0422",
        To : 'mnemosyne@cut.ac.cy',
        From : "mnemosyne@cut.ac.cy",
        Subject : "This is the subject",
        Body : "And this is the body"
    }).then(
      message => alert(message)
    );
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    sendEmail();
});