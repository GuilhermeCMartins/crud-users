@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(User) private readonly usersRepo: Repository<User>,
    private readonly passwordService: PasswordService,
    private readonly authService: AuthService,
  ) {}

  async execute(email: string, password: string) {
    const user = await this.usersRepo.findOne({ where: { email } });
    if (!user || !user.password)
      throw new UnauthorizedException("Credenciais inválidas");

    const match = await this.passwordService.compare(password, user.password);
    if (!match) throw new UnauthorizedException("Credenciais inválidas");

    return {
      access_token: this.authService.generateToken({ sub: user.id }),
    };
  }
}
