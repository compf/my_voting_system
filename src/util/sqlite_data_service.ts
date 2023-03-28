import { DataService } from "./data_service";
import Database from 'better-sqlite3';
export class SQLLiteDataService implements DataService{
    query(tableName: string, each: ( row: {[index:string] : string}) => void, predicate: ( row: {[index:string] : string}) => boolean): void {
       
        var stmt=this.db.prepare("SELECT * FROM ? ");
        for(let row of stmt.iterate(tableName)){
            if(predicate(row )){
                each(row as {[index:string] : string})
            }
        }
    }
    queryAll(tableName: string): IterableIterator<{ [index: string]: string; }> {
        var stmt=this.db.prepare("SELECT * FROM ? ");

        return (stmt.iterate(tableName));
    }
     count(tableName: string, predicate: ( row: {[index:string] : string}) => boolean): number {
        var stmt=this.db.prepare("SELECT * FROM ? ");
        let counter=0;
        for(let row of stmt.iterate(tableName)){
            if(predicate(row )){
               counter++;
            }
        }
        return counter;
    }
    insert(tableName: string,  row: {[index:string] : string}): void {
        let args=[tableName];
        for(let c of Object.keys(row)){
            args.push(row[c])
        }
        let valuesPart="VALUES(";
        valuesPart+=Array(args.length-1).map((c)=>"?").join(",");
        valuesPart+=")"
        var insertIssuedStatement=this.db.prepare("INSERT INTO ? "+ valuesPart );
        insertIssuedStatement.run(args);
    }
    constructor(){
        this.db = new Database('database/database.db');
    }
    db:Database.Database;

}
