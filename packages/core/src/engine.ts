type Config = {};

const DEFAULT_CONFIG: Config = {};

export class Engine {
  config: Config;
  constructor(config: Partial<Config>) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }
}
