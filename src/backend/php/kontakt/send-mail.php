<?php
/**
 * send-mail.php
 * --------------------------------------------------------------------
 * Verarbeitet das Kontaktformular und versendet eine HTML-Mail.
 * Erwartet POST-Felder: name, email, message.
 * Antwortet immer als JSON mit passendem HTTP-Statuscode.
 * --------------------------------------------------------------------
 * Sicherheits-/Robustheits-Fixes ggü. der Originalversion:
 *   • FILTER_SANITIZE_EMAIL ist seit PHP 8.1 deprecated → ersetzt
 *     durch FILTER_VALIDATE_EMAIL + manuelle CRLF-Prüfung (Header
 *     Injection wird zuverlässig verhindert).
 *   • Eingaben werden getrimmt, längen-begrenzt und mit
 *     ENT_QUOTES + UTF-8 escaped, bevor sie in die HTML-Mail wandern.
 *   • Template-Pfad nutzt __DIR__ statt CWD-relativ und zeigt auf
 *     den tatsächlichen Speicherort unter /src/frontend/assets/...
 *   • mail()-Rückgabewert wird ausgewertet; bei Fehler 500 statt 200.
 *   • Subject ist RFC-2047-kodiert (Umlaute korrekt zustellbar).
 * --------------------------------------------------------------------
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

/* ─── 1. HTTP-Methode prüfen ──────────────────────────────────────── */
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    header('Allow: POST');
    echo json_encode(['status' => 'error', 'message' => 'Nur POST-Requests erlaubt.']);
    exit;
}

/* ─── 2. Eingaben lesen + trimmen ─────────────────────────────────── */
$name        = trim((string)($_POST['name']    ?? ''));
$emailRaw    = trim((string)($_POST['email']   ?? ''));
$messageRaw  = trim((string)($_POST['message'] ?? ''));

/* ─── 3. Pflichtfelder prüfen ─────────────────────────────────────── */
if ($name === '' || $emailRaw === '' || $messageRaw === '') {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Bitte fülle alle Felder aus.']);
    exit;
}

/* ─── 4. Längen-Limits (DoS-/Abuse-Schutz) ────────────────────────── */
if (mb_strlen($name) > 100 || mb_strlen($emailRaw) > 254 || mb_strlen($messageRaw) > 5000) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Eingabe zu lang.']);
    exit;
}

/* ─── 5. E-Mail validieren + Header-Injection verhindern ──────────── */
$email = filter_var($emailRaw, FILTER_VALIDATE_EMAIL);
if ($email === false || preg_match('/[\r\n]/', $emailRaw) === 1) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Ungültige E-Mail-Adresse.']);
    exit;
}

/* ─── 6. Für HTML-Mail escapen ────────────────────────────────────── */
$nameSafe    = htmlspecialchars($name,    ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
$emailSafe   = htmlspecialchars($email,   ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
$messageSafe = nl2br(htmlspecialchars($messageRaw, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'));

/* ─── 7. Mail-Body aus Template oder Fallback bauen ───────────────── */
$templatePath = __DIR__ . '/../../../frontend/assets/templates/kontakt-mail.html';
$emailBody    = null;

if (is_readable($templatePath)) {
    $template = @file_get_contents($templatePath);
    if ($template !== false) {
        $emailBody = strtr($template, [
            '{{NAME}}'    => $nameSafe,
            '{{EMAIL}}'   => $emailSafe,
            '{{MESSAGE}}' => $messageSafe,
        ]);
    }
}

if ($emailBody === null) {
    $emailBody = "Neue Nachricht von: {$nameSafe}<br>"
               . "E-Mail: {$emailSafe}<br><br>"
               . "Nachricht:<br>{$messageSafe}";
}

/* ─── 8. Mail versenden ───────────────────────────────────────────── */
$to      = 'kontakt@jugendrat-bl.ch';
$subject = '=?UTF-8?B?' . base64_encode('Neue Kontaktanfrage via Website') . '?=';

$headers = implode("\r\n", [
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8',
    'From: website@jugendrat-bl.ch',
    'Reply-To: ' . $email,
    'X-Mailer: PHP/' . PHP_VERSION,
]);

$success = @mail($to, $subject, $emailBody, $headers);

if ($success) {
    http_response_code(200);
    echo json_encode(['status' => 'success', 'message' => 'Nachricht wurde gesendet.']);
} else {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Nachricht konnte nicht versendet werden. Bitte später erneut versuchen.']);
}
