import type { Logger } from "pino";

export abstract class BaseService {
  protected readonly logger: Logger;

  constructor() {
    this.logger = this.logger.child({
      context: new.target.name,
    });
  }
}
