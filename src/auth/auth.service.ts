import { Inject, Injectable } from '@nestjs/common';
import { AuthenticationProvider } from './auth';
import { UserDetails } from './utils/types';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService implements AuthenticationProvider {
    constructor(@InjectRepository(User) private userRepo: Repository<User>) {}
    async validateUser(details: UserDetails) {
        const {discordId} = details;
        const user = await this.userRepo.findOne({ where: { discordId: discordId } });
        console.log(user);
        if(user) return user;
        return await this.createUser(details);

    }
    async createUser(details: UserDetails) {
        console.log('Creating User'); 
        const user = this.userRepo.create(details);
        console.log(user);
        return this.userRepo.save(user);       
    }
    findUser(discordId: string): Promise<User | undefined> {
        console.log(discordId);
        return this.userRepo.findOne({ where: { discordId: discordId } });
    }
    
}
