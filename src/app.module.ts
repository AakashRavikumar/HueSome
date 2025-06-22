/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { ProductsModule } from './products/products.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST') || 'localhost',
        port: config.get<number>('DB_PORT') || 5432,
        username: config.get<string>('DB_USR_NAME') || 'postgres',
        password: config.get<string>('DB_PSSWD') || 'postgres',
        database: config.get<string>('DB_NAME') || 'huesome_digiarts',
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads', // accessible as http://localhost:3000/uploads/filename
    }),
    CategoryModule,
    ProductsModule,
    UserModule,
    CartModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
