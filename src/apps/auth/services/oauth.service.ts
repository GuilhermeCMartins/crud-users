@Injectable()
export class OAuthService {
  constructor(
    @InjectRepository(User) private readonly usersRepo: Repository<User>,
    private readonly authService: AuthService,
  ) {}

  async execute(providerUser: { email: string; name: string }) {
    let user = await this.usersRepo.findOne({
      where: { email: providerUser.email },
    });

    if (!user) {
      user = this.usersRepo.create({
        email: providerUser.email,
        name: providerUser.name,
        role: "user",
      });
      await this.usersRepo.save(user);
    }

    return {
      access_token: this.authService.generateToken({ sub: user.id }),
    };
  }
}
