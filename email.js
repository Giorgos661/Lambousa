const form = document.querySelector('form');
const nameInput = document.querySelector('.fullName');
const emailInput = document.querySelector('.email');
const messageInput = document.querySelector('.message');
const mobileInput = document.querySelector('.mobile'); 
const subjectInput = document.querySelector('.subject');

const serviceID = 'service_iw67e3g';
const templateID = 'template_y11hyba';
const publicKey = 'taCHErBMvqj9n_qG8';

emailjs.init(publicKey);

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputData={
        from_name:nameInput.value,
        email_id:emailInput.value,
        message:messageInput.value,
        mobile: mobileInput.value, 
        subject: subjectInput.value
    };
    emailjs.send(serviceID, templateID, inputData).then(
        ()=>{
            nameInput.value='';
            emailInput.value='';
            messageInput.value='';
            mobileInput.value = ''; 
            subjectInput.value = '';
            console.log('Email Sent');
            alert('Email was sent successfully');
        },
        (error)=>{
            console.log(error);
        });
});