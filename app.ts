
import * as dotenv from 'dotenv';
dotenv.config();
import createServer from './utils/server';
import connect from './utils/connect';
import logger from './utils/logger';

const app = createServer();


const port = process.env.PORT || 5100;
app.listen(port, async() => {
   logger.info(`server running on PORT ${port}....`);
  await connect();
});
