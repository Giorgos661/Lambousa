const form = document.querySelector('form');
const nameInput = document.querySelector('.fullName');
const emailInput = document.querySelector('.email');
const messageInput = document.querySelector('.message');
const mobileInput = document.querySelector('.mobile'); 
const subjectInput = document.querySelector('.subject');

const serviceID = 'service_iw67e3g';
const templateID = 'template_4766ske';
const publicKey = 'taCHErBMvqj9n_qG8';

// Abstract API key
const abstractAPIKey = '435e43fe034c45acb73e287fdbc738c4';

emailjs.init(publicKey);

form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate email before sending
    fetch(`https://emailvalidation.abstractapi.com/v1/?api_key=${abstractAPIKey}&email=${encodeURIComponent(emailInput.value)}`)
    .then(response => response.json())
    .then(data => {
        if (data.deliverability === 'DELIVERABLE') {
            // Email is valid, send the email
            const inputData = {
                from_name: nameInput.value,
                email_id: emailInput.value,
                message: messageInput.value,
                mobile: mobileInput.value,
                subject: subjectInput.value
            };
            emailjs.send(serviceID, templateID, inputData).then(
                () => {
                    nameInput.value = '';
                    emailInput.value = '';
                    messageInput.value = '';
                    mobileInput.value = '';
                    subjectInput.value = '';
                    console.log('Email Sent');
                    alert('Email was sent successfully');
                },
                (error) => {
                    console.log(error);
                }
            );
        } else {
            // Email is not valid
            alert('Email is not valid. Please check and try again.');
        }
    });
});