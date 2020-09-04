export const mockPostMessage = jest.fn();
export const mockTerminate = jest.fn();

const mockWorker = jest.fn().mockImplementation(() => {
  return {
    postMessage: mockPostMessage,
    terminate: mockTerminate,
  };
});

export default mockWorker;
