class CustomStatusError extends Error {
  status: number;
  constructor(msg: string, status: number) {
    super(msg);
    this.status = status;
    this.name = CustomStatusError.name;
  }
}

export default CustomStatusError;
