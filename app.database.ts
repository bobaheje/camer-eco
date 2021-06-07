import { createConnection } from 'typeorm';


let connection=null;
class DatabaseConnector{
  static initDatabase=async ()=>{
    try{
      connection=await createConnection();
      return connection;
    }
    catch(e){
      // eslint-disable-next-line no-console
      console.log(e);
    }
  }
}
export {DatabaseConnector, connection};