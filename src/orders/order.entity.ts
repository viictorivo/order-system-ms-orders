import {
    BaseEntity,
    Entity,
    Unique,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity()
  @Unique(['salesOrderID'])
  export class Order extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ nullable: false, type: 'varchar', length: 200 })
    salesOrderID: string;
  
    @Column({ nullable: false })
    amount: number;
  
    @Column({ nullable: false, type: 'varchar', length: 20 })
    customer: string;
  
    @Column({ nullable: false })
    customerID: number;
  
    @Column({ nullable: false, type: 'varchar', length: 64  })
    orderItens: string[][];
  
    @Column({ nullable: false, type: 'varchar', length: 64 })
    orderTracking: string;
  
    @Column({ nullable: true, type: 'varchar', length: 64 })
    payments: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }