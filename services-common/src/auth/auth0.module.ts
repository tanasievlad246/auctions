import { Module } from "@nestjs/common";

@Module({})
export class Auth0Module {
    static forRoot() {
        return {
            module: Auth0Module,
            providers: [],
            exports: [],
            global: true
        }
    }
}
