import * as dotenv from 'dotenv';
dotenv.config()

import {createStream} from 'rotating-file-stream';
import {Logger} from "tslog";

const stream = createStream("tslog.log", {
  size: "10M", // rotate every 10 MegaBytes written
  interval: "1d", // rotate daily
  compress: "gzip", // compress rotated files
});

export const logger = new Logger();

logger.attachTransport((logObj) => {
  stream.write(JSON.stringify(logObj) + "\n");
});

