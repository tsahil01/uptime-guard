export function emailTemplate({
    websiteUrl,
    statusMessage,
    timeDetected,
    responseCode,
    responseTime,
    dashboardUrl,
    unsubscribeUrl
}: {
    websiteUrl: string,
    statusMessage: string,
    timeDetected: string,
    responseCode: number,
    responseTime: number,
    dashboardUrl: string,
    unsubscribeUrl: string
}) {
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Website Status Change Alert</title>
    <!--[if mso]>
    <style type="text/css">
    body, table, td {font-family: Arial, Helvetica, sans-serif !important;}
    </style>
    <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, Helvetica, sans-serif;">
    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td align="center" style="padding: 40px 0;">
                <table role="presentation" style="width: 600px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);" border="0" cellspacing="0" cellpadding="0">
                    <!-- Header -->
                    <tr>
                        <td style="padding: 30px; text-align: center; background-color: #2563eb; border-radius: 8px 8px 0 0;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 24px;">Uptime Guard Alert</h1>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 30px;">
                            <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td>
                                        <h2 style="margin: 0 0 20px 0; color: #333333;">Status Change Detected</h2>
                                        <p style="margin: 0 0 15px 0; color: #666666;">
                                            Your website <strong style="color: #333333;">${websiteUrl}</strong> is currently:
                                        </p>
                                        
                                        <!-- Status Badge -->
                                        <p style="text-align: center; margin: 25px 0;">
                                            <span style="display: inline-block; padding: 10px 20px; border-radius: 4px; font-weight: bold; {{statusColor}}">
                                                ${statusMessage}
                                            </span>
                                        </p>
                                        
                                        <!-- Details -->
                                        <table role="presentation" width="100%" style="margin: 20px 0; border-collapse: collapse;">
                                            <tr>
                                                <td style="padding: 10px; border-bottom: 1px solid #eeeeee; color: #666666;">Time Detected:</td>
                                                <td style="padding: 10px; border-bottom: 1px solid #eeeeee; color: #333333;">${timeDetected}</td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 10px; border-bottom: 1px solid #eeeeee; color: #666666;">Response Code:</td>
                                                <td style="padding: 10px; border-bottom: 1px solid #eeeeee; color: #333333;">${responseCode}</td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 10px; border-bottom: 1px solid #eeeeee; color: #666666;">Response Time:</td>
                                                <td style="padding: 10px; border-bottom: 1px solid #eeeeee; color: #333333;">${responseTime}ms</td>
                                            </tr>
                                        </table>
                                        
                                        <!-- Action Button -->
                                        <p style="text-align: center; margin: 30px 0;">
                                            <a href="${dashboardUrl}" style="display: inline-block; padding: 12px 24px; background-color: #2563eb; color: #ffffff; text-decoration: none; border-radius: 4px; font-weight: bold;">View Dashboard</a>
                                        </p>
                                        
                                        <!-- Additional Info -->
                                        <p style="margin: 20px 0 0 0; color: #666666; font-size: 14px;">
                                            If you believe this is a false alert or need assistance, please contact our support team.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 30px; text-align: center; background-color: #f8f9fa; border-radius: 0 0 8px 8px;">
                            <p style="margin: 0; color: #666666; font-size: 14px;">
                                This is an automated message from Uptime Guard.<br>
                                Please do not reply to this email.
                            </p>
                            <p style="margin: 15px 0 0 0; color: #666666; font-size: 14px;">
                                <a href="${unsubscribeUrl}" style="color: #2563eb; text-decoration: none;">Update notification preferences</a>
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `
}