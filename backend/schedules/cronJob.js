import cron from 'node-cron';
import { checkAndSendDeadlineEmail } from '../controllers/todosController.js';

// Định nghĩa cron job để chạy mỗi 2 phút
cron.schedule('0 * * * *', async () => {
    console.log('Running a task every hour');
    await checkAndSendDeadlineEmail();
});