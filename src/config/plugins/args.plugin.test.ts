
const runCommand = async (args: string[]) => {
    jest.resetModules();
    process.argv = ['node', 'app.ts', ...args];
    const { yarg } = await import('./args.plugin');
    return yarg;
}

describe('test args.plugin.ts', () => {

    const originalArgv = process.argv;
    beforeEach(() =>{
        process.argv = originalArgv;
        jest.resetModules();
    });

    test('should return default values', async () => {
        const yarg = await runCommand(['-b', '5']);
        console.log(yarg);
        expect(yarg).toEqual(expect.objectContaining({
        b: 5,
        l: 10,
        s: false,
        n: 'multiplication-table',
        d: 'outputs',
        })
    );
    });

    test('should return configuration with custom values', async()=>{
        const argv = await runCommand(['-b', '3', '-l', '15', '-s', '-n', 'custom-table-name', '-d', 'custom-outputs']);
        expect(argv).toEqual(expect.objectContaining({
            b: 3,
            l: 15,
            s: true,
            n: 'custom-table-name',
            d: 'custom-outputs',
        }));
    });
});