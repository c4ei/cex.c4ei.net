import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Wallet, WalletSchema } from './schemas/wallet.schema';
import { User, UserSchema } from '../user/schemas/user.schema';
import { WalletContract, WalletContractSchema } from './schemas/wallet-contract.schema';
import { HashService } from '../user/hash.service';
import { AuthService } from '../auth/auth.service';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([
      { name: Wallet.name, schema: WalletSchema },
      { name: User.name, schema: UserSchema },
      { name: WalletContract.name, schema: WalletContractSchema }
    ])
  ],
  controllers: [WalletController],
  providers: [
    WalletService,
    UserService,
    HashService,
    AuthService
  ]
})
export class WalletModule { }
