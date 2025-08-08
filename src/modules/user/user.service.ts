import { UserTable } from "./user.schema";
import { BaseService } from "@/framework/core/BaseService";
import { UserRepository } from "./user.repository";
import { Email } from "@/framework/lib/Email";
import { Logger } from "@/framework/lib/Logger";

export class UserService extends BaseService<typeof UserTable, UserRepository> {
  constructor(
    protected readonly repository: UserRepository,
    private readonly email: Email,
    private readonly logger: Logger
  ) {
    super(repository);
  }

  async forgetPassword(userId: string) {
    this.catchError(async () => {
      const user = await this.repository.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }
      const token = `${user.id}-${Date.now()}`;

      // Circuit Breaker with retry mechanism - Means that if the email fails to send, it will retry 3 times before throwing an error

      try {
        await this.email.send(user.email, `Reset your password`);
      } catch (error) {
        this.logger.error("Error sending email");
        this.handleError(error);
      }
    });
  }
}
