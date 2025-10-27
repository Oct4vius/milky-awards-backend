import { Module } from '@nestjs/common';
import { AuthModule } from './routes/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserEntity } from './routes/auth/entities/user.entity';
import { WhiteListEntryEntity } from './routes/auth/entities/whitelist.entity';
import { OptionalCategoriesModule } from './routes/optional-categories/optional-categories.module';
import { OptionalCategoriesEntity } from './routes/optional-categories/entities/optional-category.entity';
import { SuggestionCategoriesModule } from './routes/suggestion-categories/suggestion-categories.module';
import { SuggestionCategoryEntity } from './routes/suggestion-categories/entities/suggestion-category.entity';
import { ObligatoryCategoriesModule } from './routes/obligatory-categories/obligatory-categories.module';
import { ObligatoryCategoriesEntity } from './routes/obligatory-categories/entities/obligatory-category.entity';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT!,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
      entities: [
        UserEntity,
        WhiteListEntryEntity,
        OptionalCategoriesEntity,
        SuggestionCategoryEntity,
        ObligatoryCategoriesEntity,
      ],
      autoLoadEntities: true,
      synchronize: false,
    }),
    OptionalCategoriesModule,
    SuggestionCategoriesModule,
    ObligatoryCategoriesModule,
  ],
})
export class AppModule {}
