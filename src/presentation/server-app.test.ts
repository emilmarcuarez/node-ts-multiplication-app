import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { SaveFile } from "../domain/use-cases/save-file.use-case";
import { ServerApp } from "./server-app";

describe('Server App', () => {
    const options = {
        base: 5,
        limit: 10,
        showTable: true,
        fileDestination: 'test-destination',
        fileName: 'test-file-name'
    };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test('should create ServerApp instance', () => {
        const serverApp = new ServerApp();
        expect(serverApp).toBeInstanceOf(ServerApp);
        expect(typeof ServerApp.run).toBe('function')
    });

    test('should run serverapp with default options', () => {

        // const logSpy = jest.spyOn(console, 'log');
        // const createTableSpy = jest.spyOn(CreateTable.prototype, 'execute');
        // const saveFileSpy = jest.spyOn(SaveFile.prototype, 'execute');


        // ServerApp.run(options);

        // expect(logSpy).toHaveBeenCalledWith('Server is running...');
        // expect(createTableSpy).toHaveBeenCalledWith({ base: options.base, limit: options.limit });
        // expect(createTableSpy).toHaveBeenCalledTimes(1);
        // expect(saveFileSpy).toHaveBeenCalledTimes(1);
        // expect(saveFileSpy).toHaveBeenCalledWith({ fileContent: expect.any(String), fileDestination: options.fileDestination, fileName: options.fileName });
    });

    test('should run with custom values mocked', () => {
        const logMock = jest.fn();
        const logErrorMock = jest.fn();
        const createMock = jest.fn().mockReturnValue('1 x 2 = 2');
        const saveMock = jest.fn().mockReturnValue(true);
        console.log = logMock;
        console.error = logErrorMock;
        CreateTable.prototype.execute = createMock;
        SaveFile.prototype.execute = saveMock;

        ServerApp.run(options);

        expect(logMock).toHaveBeenCalledWith('Server is running...');
        expect(createMock).toHaveBeenCalledWith({ base: options.base, limit: options.limit });
        expect(saveMock).toHaveBeenCalledWith({ fileContent: expect.any(String), fileDestination: options.fileDestination, fileName: options.fileName });
        expect(logMock).toHaveBeenCalledWith('File was created successfully!');
        expect(logErrorMock).not.toHaveBeenCalled();
    });
});