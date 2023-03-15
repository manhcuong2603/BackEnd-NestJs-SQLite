import {
    AfterInsert,
    AfterRemove,
    AfterUpdate,
    Entity,
    Column,
    PrimaryGeneratedColumn, OneToMany
} from 'typeorm';

import { Exclude } from 'class-transformer';
import { Report } from 'src/reports/report.entity';


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    name: string;

    @Column()
    username: string;

    @Column()
    @Exclude()
    password: string;

    @Column()
    role: string;


    @Column({ default: true })
    admin: boolean;

    @OneToMany(() => Report, (report) => report.user)
    reports: Report[];


    @AfterInsert()
    logInsert() {
        console.log('Create a new User success !', this.id);
    }

    @AfterUpdate()
    logUpdate() {
        console.log('Update user Success !', this.id);
    }

    @AfterRemove()
    logRemove() {
        console.log('Remove user Success !', this.id);
    }
}
