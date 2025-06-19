<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Aktivasi Akun</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background-color: #f5f5f7;
            color: #1d1d1f;
            line-height: 1.6;
            padding: 20px 0;
        }

        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
            border-radius: 12px;
            overflow: hidden;
        }

        .email-header {
            background-color: #ffffff;
            padding: 48px 40px 32px;
            text-align: center;
            border-bottom: 1px solid #e5e5e7;
        }

        .company-logo {
            width: 64px;
            height: 64px;
            background-color: #007AFF;
            border-radius: 16px;
            margin: 0 auto 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 28px;
            color: white;
            font-weight: 600;
        }

        .email-title {
            font-size: 32px;
            font-weight: 600;
            color: #1d1d1f;
            margin-bottom: 8px;
            letter-spacing: -0.5px;
        }

        .email-subtitle {
            font-size: 17px;
            color: #86868b;
            font-weight: 400;
        }

        .email-content {
            padding: 40px;
        }

        .greeting {
            font-size: 24px;
            font-weight: 600;
            color: #1d1d1f;
            margin-bottom: 24px;
        }

        .message {
            font-size: 17px;
            color: #1d1d1f;
            margin-bottom: 32px;
            line-height: 1.5;
        }

        .activation-section {
            text-align: center;
            margin: 40px 0;
        }

        .activation-button {
            display: inline-block;
            background-color: #007AFF;
            color: white;
            text-decoration: none;
            font-size: 17px;
            font-weight: 600;
            padding: 16px 32px;
            border-radius: 8px;
            transition: background-color 0.2s ease;
            letter-spacing: -0.2px;
        }

        .activation-button:hover {
            background-color: #0056CC;
        }

        .alternative-link {
            margin-top: 24px;
            font-size: 15px;
            color: #86868b;
        }

        .alternative-link a {
            color: #007AFF;
            text-decoration: none;
        }

        .alternative-link a:hover {
            text-decoration: underline;
        }

        .security-notice {
            background-color: #f5f5f7;
            padding: 24px;
            border-radius: 8px;
            margin-top: 32px;
        }

        .security-notice h4 {
            font-size: 17px;
            font-weight: 600;
            color: #1d1d1f;
            margin-bottom: 8px;
        }

        .security-notice p {
            font-size: 15px;
            color: #86868b;
            margin-bottom: 8px;
        }

        .footer {
            background-color: #f5f5f7;
            padding: 32px 40px;
            text-align: center;
            border-top: 1px solid #e5e5e7;
        }

        .footer-content {
            font-size: 13px;
            color: #86868b;
            line-height: 1.4;
        }

        .footer-content p {
            margin-bottom: 8px;
        }

        .footer-content a {
            color: #007AFF;
            text-decoration: none;
        }

        .footer-content a:hover {
            text-decoration: underline;
        }

        .divider {
            height: 1px;
            background-color: #e5e5e7;
            margin: 32px 0;
        }

        @media (max-width: 640px) {
            body {
                padding: 10px 0;
            }

            .email-container {
                margin: 0 10px;
                border-radius: 8px;
            }

            .email-header {
                padding: 32px 24px 24px;
            }

            .email-content {
                padding: 24px;
            }

            .email-title {
                font-size: 28px;
            }

            .greeting {
                font-size: 22px;
            }

            .message {
                font-size: 16px;
            }

            .activation-button {
                width: 100%;
                padding: 18px 24px;
            }

            .footer {
                padding: 24px;
            }
        }
    </style>
</head>

<body>
    <div class="email-container">
        <div class="email-header" style="text-align: center">
            <div class="company-logo" style="text-align: center"><img src="https://yuss.my.id/logo.jpeg" alt="logo"></div>
            <h1 class="email-title">Aktivasi Akun</h1>
            <p class="email-subtitle">Satu langkah lagi untuk memulai</p>
        </div>

        <div class="email-content">
            <h2 class="greeting">Halo {{ $user->name }},</h2>

            <p class="message">
                Terima kasih telah mendaftar. Untuk mengamankan akun Anda dan mulai menggunakan layanan kami,
                silakan konfirmasi alamat email Anda dengan mengklik tombol di bawah ini.
            </p>

            <div class="activation-section">
                <a href="{{ env('FRONTEND_URL') }}/activate/{{ $token }}" class="activation-button">
                    Aktivasi Akun
                </a>

                <p class="alternative-link">
                    Tombol tidak berfungsi?
                    <a href="{{ env('FRONTEND_URL') }}/activate/{{ $token }}">Klik di sini</a>
                </p>
            </div>

            <div class="security-notice">
                <h4>Informasi Keamanan</h4>
                <p>Jika Anda tidak membuat akun ini, abaikan email ini.</p>
            </div>

            <div class="divider"></div>

            <p style="font-size: 15px; color: #86868b;">
                Jika Anda memiliki pertanyaan, jangan ragu untuk menghubungi tim dukungan kami.
            </p>
        </div>

        <div class="footer">
            <div class="footer-content">
                <p>Email ini dikirim secara otomatis. Mohon tidak membalas email ini.</p>
                <p>© 2025 Respository.io. Semua hak dilindungi.</p>
                <p>
                    <a href="#">Kebijakan Privasi</a> |
                    <a href="#">Syarat & Ketentuan</a> |
                    <a href="#">Bantuan</a>
                </p>
            </div>
        </div>
    </div>
</body>

</html>
