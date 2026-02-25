import { SaveFile } from "./save-file.use-case";
import * as fs from 'fs';


describe('SaveFileUseCase', () => {
    const options = {
        fileContent: 'custom content',
        fileDestination: 'custom-outputs',
        fileName: 'custom-table-name'
    }
    const filePath = `${options.fileDestination}/${options.fileName}.txt`;
    beforeEach(() => {
        jest.clearAllMocks();
    })
    afterEach(() => {
        const outputFolderExists = fs.existsSync('outputs');
        if (outputFolderExists) fs.rmSync('outputs', { recursive: true });

        const customFolderExists = fs.existsSync(options.fileDestination);
        if (customFolderExists) fs.rmSync(options.fileDestination, { recursive: true });
    });

    test('should save file with default values', () => {
        const saveFile = new SaveFile();
        const filePath = 'outputs/table.txt';
        const defaultOptions = { fileContent: 'test content' };

        const result = saveFile.execute(defaultOptions);
        const fileExist = fs.existsSync(filePath);
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });

        expect(result).toBe(true);
        expect(fileExist).toBe(true);
        expect(fileContent).toBe(defaultOptions.fileContent);
    });

    test('should save file with custom values', () => {
        const saveFile = new SaveFile();
        const result = saveFile.execute(options);
        const fileExist = fs.existsSync(filePath);
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });

        expect(result).toBe(true);
        expect(fileExist).toBe(true);
        expect(fileContent).toBe(options.fileContent);
    });

    test('should return false if directory could not be created', () => {
        const saveFile = new SaveFile();
        const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(() => {
            throw new Error('Failed to create directory');
        });

        const result = saveFile.execute(options);
        expect(result).toBe(false);

        mkdirSpy.mockRestore();
    });

    test('should return false if file could not be created', () => {
        const saveFile = new SaveFile();
         const writeFileSync = jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {
             throw new Error('this is a custom writing error message');
         });

        const result = saveFile.execute({fileContent:'hola'});
        expect(result).toBe(false);
         writeFileSync.mockRestore();
    });
})