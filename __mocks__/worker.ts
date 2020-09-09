export const mockPostMessage = jest.fn();
export const mockTerminate = jest.fn();

const mockWorker = jest.fn().mockImplementation(function () {
  this.postMessage = mockPostMessage;
  this.terminate = mockTerminate;
});

export default mockWorker;
