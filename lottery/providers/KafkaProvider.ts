import type { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class KafkaProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
  }

  public async boot() {
    // All bindings are ready, feel free to use them
  }

  public async ready() {}

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
