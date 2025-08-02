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

@Module({
  imports: [AuthModule,
    ConfigModule.forRoot({ isGlobal: true }), 
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      },
      entities: [UserEntity, WhiteListEntryEntity, OptionalCategoriesEntity, SuggestionCategoryEntity],
      autoLoadEntities: true,
      synchronize: false,
    }), OptionalCategoriesModule, SuggestionCategoriesModule
  ],
})
export class AppModule {}
