import { CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class BaseModel{
@PrimaryGeneratedColumn('increment')
public id!:number;

@CreateDateColumn()
public createdAt?:Date;

@UpdateDateColumn()
public updatedAt?:Date;

@DeleteDateColumn()
public deletedAt?:Date

}