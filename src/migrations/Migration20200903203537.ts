import { Migration } from '@mikro-orm/migrations';

export class Migration20200903203537 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "account" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "username" text not null, "password" text not null);');
    this.addSql('alter table "account" add constraint "account_username_unique" unique ("username");');

    this.addSql('drop table if exists "user" cascade;');
  }

}
