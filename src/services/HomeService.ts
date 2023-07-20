interface SimpleReturnMessageInterface {
  message: String;
}

export class HomeService {
  async homeFunction(): Promise<SimpleReturnMessageInterface> {
    return { message: "Hello World!!" };
  }
}
