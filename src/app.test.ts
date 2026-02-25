import { ServerApp } from "./presentation/server-app";

//  process.argv = ['node', 'app.ts', '-b', '10']
describe('Test App.ts', () => {
    test('should call Server. Run with values', async() => {
     const serverRunMock = jest.fn();
     ServerApp.run = serverRunMock;
     process.argv = ['node', 'app.ts', '-b', '10', '-l', '20', '-s', '-n', 'test-file', '-d', 'test-outputs'];
     await import('./app');

     expect(serverRunMock).toHaveBeenCalledWith({base: 10, limit: 20, showTable: true, fileName: 'test-file', fileDestination: 'test-outputs'});
    });
});