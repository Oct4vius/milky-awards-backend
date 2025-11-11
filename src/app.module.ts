import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import DataSource from '../data-source'

import { AuthModule } from './routes/auth/auth.module';
import { UserEntity } from './routes/auth/entities/user.entity';
import { WhiteListEntryEntity } from './routes/auth/entities/whitelist.entity';
import { OptionalCategoriesModule } from './routes/optional-categories/optional-categories.module';
import { OptionalCategoriesEntity } from './routes/optional-categories/entities/optional-category.entity';
import { SuggestionCategoriesModule } from './routes/suggestion-categories/suggestion-categories.module';
import { SuggestionCategoryEntity } from './routes/suggestion-categories/entities/suggestion-category.entity';
import { ObligatoryCategoriesModule } from './routes/obligatory-categories/obligatory-categories.module';
import { ObligatoryCategoriesEntity } from './routes/obligatory-categories/entities/obligatory-category.entity';
import { NomineesModule } from './routes/nominees/nominees.module';
import { NomineeEntity } from './routes/nominees/entities/nominee.entity';
import { VotesEntity } from './routes/nominees/entities/votes.entity';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads/nominees'),
      serveRoot: '/uploads/nominees',
    }),
    TypeOrmModule.forRoot({
      ...DataSource.options,
      entities: [
        UserEntity,
        WhiteListEntryEntity,
        OptionalCategoriesEntity,
        SuggestionCategoryEntity,
        ObligatoryCategoriesEntity,
        NomineeEntity,
        VotesEntity
      ],
      autoLoadEntities: true,

    }),
    OptionalCategoriesModule,
    SuggestionCategoriesModule,
    ObligatoryCategoriesModule,
    NomineesModule,
  ],
})
export class AppModule {}
