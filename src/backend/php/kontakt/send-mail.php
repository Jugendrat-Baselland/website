<?php

header('Content-Type: application/json');


if ($_SERVER["REQUEST_METHOD"] == "POST") {



    $name = htmlspecialchars($_POST['name'] ?? '');
    $email = filter_var($_POST['email'] ?? '', FILTER_SANITIZE_EMAIL);
    $message = htmlspecialchars($_POST['message'] ?? '');


    if (empty($name) || empty($email) || empty($message)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Bitte fülle alle Felder aus."]);
        exit;
    }



    $templatePath = '../assets/templates/mail/kontakt-mail.html';

    if (file_exists($templatePath)) {
        $emailBody = file_get_contents($templatePath);

        $emailBody = str_replace('{{NAME}}', $name, $emailBody);
        $emailBody = str_replace('{{EMAIL}}', $email, $emailBody);
        $emailBody = str_replace('{{MESSAGE}}', nl2br($message), $emailBody);
    } else {

        $emailBody = "Neue Nachricht von: $name <br> E-Mail: $email <br><br> Nachricht: <br> $message";
    }


    $to = "kontakt@jugendrat-bl.ch";
    $subject = "Neue Kontaktanfrage via Website";


    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: website@jugendrat-bl.ch" . "\r\n";
    $headers .= "Reply-To: $email" . "\r\n";


    $success = mail($to, $subject, $emailBody, $headers);


    http_response_code(200);
    echo json_encode(["status" => "success", "message" => "Mail wurde erfolgreich verarbeitet."]);

} else {

    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Nur POST-Requests erlaubt."]);
}
?>