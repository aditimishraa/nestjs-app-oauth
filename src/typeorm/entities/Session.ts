import { ISession } from "connect-typeorm";
import { Column, DeleteDateColumn, Entity, Index, PrimaryColumn } from "typeorm";

@Entity({ name: 'sessions' })
export class TypeORMSession implements ISession {
    @Index()
    @Column("bigint")
    expiredAt: number;

    @PrimaryColumn("varchar", { length: 255 })
    id: string;

    @DeleteDateColumn()
    destroyedAt?: Date;

    @Column("text")
    json = "";    
}

// import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// @Entity({name: 'users'})
// export class User {
//     @PrimaryGeneratedColumn()
//     id: number;

//     @Column({name: 'discord_id', unique: true})
//     discordId: string;

//     @Column()
//     username: string;

//     @Column()
//     discriminator: string;

//     @Column({nullable: true})
//     avatar: string;
// }