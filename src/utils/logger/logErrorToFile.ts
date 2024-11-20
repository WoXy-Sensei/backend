import fs from 'fs';
import path from 'path';

export const logErrorToFile = (errorDetails: Record<string, any>) => {
    const logFilePath = path.join(__dirname, '..', '..', '..', 'logs', 'errors.log');
    const logMessage = `[${new Date().toISOString()}] - ${JSON.stringify(errorDetails, null, 2)}\n\n`;

    // Ensure the log directory exists
    fs.mkdirSync(path.dirname(logFilePath), { recursive: true });

    // Append the log message to the file
    fs.appendFileSync(logFilePath, logMessage, 'utf8');
};
