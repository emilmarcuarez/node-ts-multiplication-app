import { CreateTable } from "./create-table.use-case";

describe('CreateTableUseCase', () => {

    test('should create table with default values', () => {
        
        
        const createTable = new CreateTable();
        const table = createTable.execute({ base: 5 });
        const rows=table.split('\n');
        console.log(table);
        expect(createTable).toBeInstanceOf(CreateTable);
        expect(table).toContain('5 x 1 = 5');
        expect(rows.length).toBe(10);
    });

    test('shpuld create table with custom table', ()=>{
        
        const createTable = new CreateTable();
     
        const options={
            base:3,
            limit:20
        }

        const table = createTable.execute(options);
         const rows=table.split('\n').length;
         expect(table).toContain('3 x 20 = 60');
         expect(table).toContain('3 x 1 = 3');
         expect(rows).toBe(options.limit);

    })

});