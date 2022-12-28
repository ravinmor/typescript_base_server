import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
  } from "typeorm";
  import { BaseEntity } from "./BaseEntity";
  import { Permission } from "./Permission";
  import { Role } from "./Role";
import { User } from "./User";
  
  @Entity("addresses")
  export class Address extends BaseEntity {
    @Column()
    userId: string;

    @Column()
    zipcode: string;

    @Column()
    street: string;

    @Column()
    streetNumber: string;

    @Column()
    number: string;

    @Column()
    building: string;

    @Column()
    floor: string;

    @Column()
    neighborhood: string;

    @Column()
    county: string;

    @Column()
    state: string;

    @Column()
    country: string;

    @Column()
    type: string;

    @ManyToMany(() => Role)
    @JoinTable({
      name: "users_roles",
      joinColumns: [{ name: "user_id" }],
      inverseJoinColumns: [{ name: "role_id" }],
    })
    roles: Role[];
  
    @ManyToMany(() => Permission)
    @JoinTable({
      name: "users_permissions",
      joinColumns: [{ name: "user_id" }],
      inverseJoinColumns: [{ name: "permission_id" }],
    })
    permissions: Permission[];
  
    @ManyToOne(() => User, (user) => user.addresses)
    user: User
  }
  