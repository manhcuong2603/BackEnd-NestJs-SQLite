import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
@Injectable()
export class UsersService {
    static find: () => Promise<User[]>;
    constructor(@InjectRepository(User) private repo: Repository<User>) { }

    create(email: string, name: string, username: string, role: string, password: string) {
        const users = this.repo.create({ email, name, username, role, password });

        return this.repo.save(users);
    }

    findOne(id: number) {
        if (!id) {
            return null;
        }
        return this.repo.findOneBy({ id });
    }

    find(email: string) {
        return this.repo.find({ where: { email } });
    }

    async update(id: number, attrs: Partial<User>) {
        const user = await this.findOne(id);
        if (!user) {
            throw new NotFoundException('User not found !');
        }
        Object.assign(user, attrs);
        return this.repo.save(user);
    }
    async remove(id: number) {
        const user = await this.findOne(id);
        if (!user) {
            throw new NotFoundException('User not Found');
        }
        return this.repo.remove(user);
    }
}
