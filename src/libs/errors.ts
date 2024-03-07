export class HttpError extends Error {
  constructor(public statusCode: number, body: Record<string, unknown> = {}) {
    super(JSON.stringify(body));
  }
}

export const handleError = <T extends Error>(error: T) => {
  if (error instanceof HttpError) {
    return {
      statusCode: error.statusCode,
      body: error?.message,
    };
  }
  return {
    statusCode: 500,
    body: JSON.stringify(error.message),
  };
};
