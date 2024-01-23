<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/x-icon" href="./img/anchor.png" />
    <title>Lambousa</title>
    <link rel="stylesheet" href="style.css" />
    <link href="bootstrap.min.css" rel="stylesheet">
</head>
<body class="contact-body">
    <nav class="nav">
        <a href="index.html" class="logo">
            <img src="./img/anchor.png" />
        </a>
        <ul class="nav-links">
          <li><a href="index.html" class="nav-link">Home</a></li>
          <li><a href="underconstruction/underconstruction.html" class="nav-link">E-Book</a></li>
          <li><a href="underconstruction/underconstruction.html" class="nav-link">E-Trawler Lab</a></li>
          <li><a href="gallery.html" class="nav-link">Gallery</a></li>
          <li><a href="acknowledgements.html" class="nav-link active">Acknowledgements</a></li>
          <li><a href="contact.html" class="nav-link">Contact</a></li>
          <div class="flags">
            <ul>
              <li>
                <a href="acknowledgementsgr.html" class="nav-link"
                  ><img src="./img/Greece.png"
                /></a>
              </li>
              <li>
                <a href="acknowledgements.html" class="nav-link"
                  ><img src="./img/Uk.png"
                /></a>
              </li>
            </ul>
          </div>
        </ul>
        <img src="./img/menu-btn.png" alt="menu" class="menu-btn" />
    </nav>

    <div class="title1">
        <h2>Contact</h2>
        <div class="line"></div>
    </div>

    <div class="contactUs">
        <div class="box">
            <div class="contact form">
                <h3>Send us a message</h3>
                <form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post">
                    <div class="formBox">
                        <div class="row50">
                            <div class="inputBox">
                                <span>First Name</span>
                                <input type="text" name="first_name" required="required" placeholder="First Name" />
                            </div>
                            <div class="inputBox">
                                <span>Last Name</span>
                                <input type="text" name="last_name" required="required" placeholder="Last Name" />
                            </div>
                        </div>
                        <div class="row50">
                            <div class="inputBox">
                                <span>Email</span>
                                <input type="text" name="email" required="required" placeholder="Email" />
                            </div>
                            <div class="inputBox">
                                <span>Mobile</span>
                                <input type="text" name="mobile" required="required" placeholder="+357 99335544" />
                            </div>
                        </div>
                        <div class="row100">
                            <div class="inputBox">
                                <span>Message</span>
                                <textarea name="message" placeholder="Write your message here..."></textarea>
                            </div>
                        </div>
                        <div class="row100">
                            <div class="inputBox">
                                <input type="submit" name="submit" value="Send" />
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <?php
            use PHPMailer\PHPMailer\PHPMailer;
            use PHPMailer\PHPMailer\Exception;

            require 'path/to/PHPMailer/src/Exception.php';
            require 'path/to/PHPMailer/src/PHPMailer.php';
            require 'path/to/PHPMailer/src/SMTP.php';

            if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["submit"])) {
                $firstName = $_POST["first_name"];
                $lastName = $_POST["last_name"];
                $email = $_POST["email"];
                $mobile = $_POST["mobile"];
                $message = $_POST["message"];

                $mail = new PHPMailer(true);

                try {
                    $mail->isSMTP();
                    $mail->Host       = 'smtp.example.com';
                    $mail->SMTPAuth   = true;
                    $mail->Username   = 'your_email@example.com';
                    $mail->Password   = 'your_email_password';
                    $mail->SMTPSecure = 'tls'; // or 'ssl'
                    $mail->Port       = 587; // or 465

                    $mail->setFrom($email, $firstName . ' ' . $lastName);
                    $mail->addAddress('georgios1949@hotmail.com', 'Recipient Name');

                    $mail->isHTML(true);
                    $mail->Subject = 'New Contact Form Submission';
                    $mail->Body    = "Name: $firstName $lastName<br>Email: $email<br>Mobile: $mobile<br>Message: $message";

                    $mail->send();
                    echo 'Message has been sent';
                } catch (Exception $e) {
                    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
                }
            }
            ?>
        </div>
    </div>

    <section class="footer">
      <p>
        © COPYRIGHT 2023. ALL RIGHTS RESERVED BY THE CYPRUS UNIVERSITY OF
        TECHNOLOGY. DESIGNED AND DEVELOPED BY
        <a href="https://www.linkedin.com/in/giorgos-neofytou-a4b1b1245/"
        target="_blank">GIORGOS NEOFYTOU</a>  AND <a href="https://www.linkedin.com/in/stelios-fotiou-b3351529a/" target="_blank">STELIOS FOTIOU</a>
        , IN THE FRAMEWORK OF BSC THESIS
      </p>
      <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/" target="_blank">
        <img src="./img/by-nc-nd.eu.png" width="100" style="border-radius: 10%;">
    </a>
      <p>
        THIS WORK IS LICENSED UNDER A <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/" target="_blank">
          CREATIVE COMMONS
        ATTRIBUTION-NONCOMMERCIAL-NODERIVATIVES 4.0 INTERNATIONAL LICENSE.
      </a>
      </p>
    </section>

    <script
      type="module"
      src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"
    ></script>
    <script
      nomodule
      src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"
    ></script>
    <script>
        const menuBtn = document.querySelector('.menu-btn')
        const navLinks = document.querySelector('.nav-links')

        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-menu')
        })
    </script>
</body>
</html>
