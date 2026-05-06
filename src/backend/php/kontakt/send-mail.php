<?php
// Sagt dem Browser, dass wir mit JSON (Daten) antworten
header('Content-Type: application/json');

// 1. Prüfen, ob die Daten per POST (also vom Formular) kommen
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // 2. Formulardaten abfangen und bereinigen (Sicherheit gegen Hacker!)
    // WICHTIG: Ersetze 'name', 'email', 'message' mit den "name"-Attributen deiner HTML-Inputs
    $name = htmlspecialchars($_POST['name'] ?? '');
    $email = filter_var($_POST['email'] ?? '', FILTER_SANITIZE_EMAIL);
    $message = htmlspecialchars($_POST['message'] ?? '');

    // 3. Prüfen, ob alles ausgefüllt ist
    if (empty($name) || empty($email) || empty($message)) {
        http_response_code(400); // 400 = Bad Request (Fehler)
        echo json_encode(["status" => "error", "message" => "Bitte fülle alle Felder aus."]);
        exit;
    }

    // 4. HTML-Vorlage laden (Wir wandeln .txt in eine HTML-Mail um)
    // Passe den Pfad an, falls deine Vorlage woanders liegt!
    $templatePath = '../assets/templates/mail/kontakt-mail.html'; 
    
    if (file_exists($templatePath)) {
        $emailBody = file_get_contents($templatePath);
        // Platzhalter in der Vorlage mit den echten Daten ersetzen
        $emailBody = str_replace('{{NAME}}', $name, $emailBody);
        $emailBody = str_replace('{{EMAIL}}', $email, $emailBody);
        $emailBody = str_replace('{{MESSAGE}}', nl2br($message), $emailBody); // nl2br macht Zeilenumbrüche
    } else {
        // Fallback, falls die Datei nicht gefunden wird
        $emailBody = "Neue Nachricht von: $name <br> E-Mail: $email <br><br> Nachricht: <br> $message";
    }

    // 5. E-Mail vorbereiten
    $to = "kontakt@jugendrat-bl.ch";
    $subject = "Neue Kontaktanfrage via Website";
    
    // Wichtige Header, damit es als schöne HTML-Mail erkannt wird
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: website@jugendrat-bl.ch" . "\r\n"; 
    $headers .= "Reply-To: $email" . "\r\n"; // Damit man direkt auf "Antworten" klicken kann

    // 6. E-Mail senden!
    $success = mail($to, $subject, $emailBody, $headers);

    // Dem Frontend (JavaScript) sagen, dass alles geklappt hat
    http_response_code(200); // 200 = OK
    echo json_encode(["status" => "success", "message" => "Mail wurde erfolgreich verarbeitet."]);

} else {
    // Wenn jemand versucht, die Datei direkt im Browser zu öffnen
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Nur POST-Requests erlaubt."]);
}
?>