import cron from 'node-cron';
import { checkAndSendDeadlineEmail } from '../controllers/todosController.js';

// Định nghĩa cron job để chạy mỗi 6 giờ
cron.schedule('0 */6 * * *', async () => {
    console.log('Running a task and sending email every 6 hour');
    await checkAndSendDeadlineEmail();
});