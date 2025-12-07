export default function Error(req: any, res: any) {
  const { error, error_description, callbackUrl, email, provider } = req.query;

  // Set appropriate status code and message based on error
  let statusCode = 403;
  let errorMessage = 'Access Denied';
  let errorDescription = 'You do not have permission to access this resource. Please contact your administrator.';

  switch (error) {
    case 'AccessDenied':
      statusCode = 403;
      errorMessage = 'Access Denied';
      errorDescription = 'You do not have permission to access this resource. Please contact your administrator.';
      break;
    case 'Configuration':
      statusCode = 500;
      errorMessage = 'Configuration Error';
      errorDescription = 'There is a problem with the authentication configuration. Please contact support.';
      break;
    case 'Verification':
      statusCode = 400;
      errorMessage = 'Verification Failed';
      errorDescription = 'The authentication verification process failed. Please try again.';
      break;
    default:
      statusCode = 400;
      errorMessage = 'Authentication Error';
      errorDescription = 'An unexpected authentication error occurred. Please try again.';
      break;
  }

  // Set the response status
  res.status(statusCode);

  // Return JSON response for API calls
  if (req.headers.accept?.includes('application/json')) {
    return res.json({
      error: errorMessage,
      description: errorDescription,
      statusCode,
      timestamp: new Date().toISOString(),
      path: req.url,
      errorType: error,
      errorDescription: error_description,
      attemptedEmail: email,
      provider: provider,
      callbackUrl: callbackUrl
    });
  }

  // Return HTML response for browser requests
  res.setHeader('Content-Type', 'text/html');

  // Build additional details section
  let additionalDetails = '';
  if (email) {
    additionalDetails += `<div class="detail-item"><strong>Attempted Email:</strong> ${email}</div>`;
  }
  if (provider) {
    additionalDetails += `<div class="detail-item"><strong>Provider:</strong> ${provider}</div>`;
  }
  if (callbackUrl) {
    additionalDetails += `<div class="detail-item"><strong>Callback URL:</strong> ${callbackUrl}</div>`;
  }
  if (error_description) {
    additionalDetails += `<div class="detail-item"><strong>Error Details:</strong> ${error_description}</div>`;
  }

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${errorMessage} - PTO Admin</title>
        <style>
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                background: white;
                margin: 0;
                padding: 0;
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .error-container {
                background: white;
                border-radius: 12px;
                padding: 40px;
                box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                text-align: center;
                max-width: 600px;
                width: 90%;
            }
            .error-icon {
                font-size: 64px;
                margin-bottom: 20px;
                color: #e74c3c;
            }
            .error-title {
                font-size: 28px;
                font-weight: 600;
                color: #2c3e50;
                margin-bottom: 16px;
            }
            .error-description {
                font-size: 16px;
                color: #7f8c8d;
                line-height: 1.6;
                margin-bottom: 30px;
            }
            .error-code {
                background: #f8f9fa;
                padding: 12px 20px;
                border-radius: 6px;
                font-family: 'Monaco', 'Menlo', monospace;
                font-size: 14px;
                color: #495057;
                margin-bottom: 20px;
            }
            .additional-details {
                background: #f8f9fa;
                padding: 20px;
                border-radius: 6px;
                margin-bottom: 30px;
                text-align: left;
                border-left: 4px solid #3498db;
            }
            .detail-item {
                margin-bottom: 8px;
                font-size: 14px;
                color: #495057;
            }
            .detail-item:last-child {
                margin-bottom: 0;
            }
            .detail-item strong {
                color: #2c3e50;
                min-width: 120px;
                display: inline-block;
            }
            .back-button {
                background: #3498db;
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 6px;
                font-size: 16px;
                cursor: pointer;
                text-decoration: none;
                display: inline-block;
                transition: background 0.3s ease;
                margin-right: 10px;
            }
            .back-button:hover {
                background: #2980b9;
            }
            .retry-button {
                background: #27ae60;
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 6px;
                font-size: 16px;
                cursor: pointer;
                text-decoration: none;
                display: inline-block;
                transition: background 0.3s ease;
            }
            .retry-button:hover {
                background: #229954;
            }
            .footer {
                margin-top: 30px;
                font-size: 14px;
                color: #95a5a6;
            }
            .debug-info {
                margin-top: 20px;
                padding: 15px;
                background: #f1f2f6;
                border-radius: 6px;
                font-size: 12px;
                color: #7f8c8d;
                text-align: left;
                font-family: 'Monaco', 'Menlo', monospace;
            }
        </style>
    </head>
    <body>
        <div class="error-container">
            <div class="error-icon">⚠️</div>
            <h1 class="error-title">${errorMessage}</h1>
            <p class="error-description">${errorDescription}</p>
            
            <div class="error-code">Status: ${statusCode} | Error: ${error || 'AccessDenied'}</div>
            
            ${
              additionalDetails
                ? `
            <div class="additional-details">
                <h3 style="margin-top: 0; color: #2c3e50;">Sign-in Details</h3>
                ${additionalDetails}
            </div>
            `
                : ''
            }
            
            <div>
                <a href="/" class="back-button">Go to Home</a>
                <a href="/api/auth/signin" class="retry-button">Try Again</a>
            </div>
            
            <div class="footer">
                Authentication Error
            </div>                    
        </div>
    </body>
    </html>
  `;

  return res.send(html);
}
