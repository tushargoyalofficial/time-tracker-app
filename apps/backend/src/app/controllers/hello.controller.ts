interface IGetMessageResponse {
  message: string;
}

export default class HelloController {
  public async getMessage(): Promise<IGetMessageResponse> {
    return {
      message: 'World',
    };
  }
}
