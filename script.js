function successCallback() {
    debugger;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const captchaResponse = grecaptcha.getResponse();

    if (!captchaResponse.length) {

        throw new Error('Capcha is not checked');
    }

    const fd = new FormData(e.target);
    const params = new URLSearchParams(fd);

    fetch('http://httpbin.org/post', {
        method: 'POST',
        body: params,
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
});