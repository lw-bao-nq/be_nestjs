export default class BaseController {
  protected statusCode: number;
  protected message: string;
  constructor() {
    this.statusCode = 200;
  }

  /**
   * Transform all data from controller
   */
  response<T>(data: T) {
    return {
      statusCode: this.statusCode,
      data: data,
      error: null,
    };
  }
}
