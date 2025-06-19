@Controller("auth")
export class AuthController {
  constructor(
    private readonly loginService: LoginService,
    private readonly oauthService: OAuthService,
  ) {}

  @Post("login")
  async login(@Body() body: { email: string; password: string }) {
    return this.loginService.execute(body.email, body.password);
  }

  @Post("oauth")
  async oauth(@Body() body: { email: string; name: string }) {
    return this.oauthService.execute(body);
  }
}
