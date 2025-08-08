import { Request, Response } from "express";
import { UserService } from "./user.service";
import { FindOptionsSQLSchema } from "@/framework/core/IBaseRepository";
import { FilterRuleGroup } from "@/framework/core/FilterBuilder";
import { Logger } from "@/framework/lib/Logger";
import { Cache } from "@/framework/lib/Cache";

export class UserController {
  constructor(
    private readonly service: UserService,
    private readonly logger: Logger,
    private readonly cache: Cache
  ) {}

  async findAll(req: Request, res: Response) {
    const parseQuery = FindOptionsSQLSchema.safeParse(req.query);

    if (!parseQuery.success) {
      this.logger.error(parseQuery.error.issues[0].message);
      return res.status(400).json({
        message: "Invalid query",
        errors: parseQuery.error.issues,
      });
    }
    // Cache
    if (this.cache.get("users")) {
      return res.status(200).json(this.cache.get("users"));
    }

    const users = await this.service.findAll(parseQuery.data);
    res.status(200).json(users);
  }
  async findById(req: Request, res: Response) {
    const { id } = req.params;
    const user = await this.service.findById(id);
    res.status(200).json(user);
  }
  async create(req: Request, res: Response) {
    const user = req.body;
    const createdUser = await this.service.create(user);
    res.status(201).json(createdUser);
  }
  async search(req: Request, res: Response) {
    const { query = "" } = req.query;
    const where: FilterRuleGroup = {
      combinator: "or",
      rules: [
        {
          field: "name",
          operator: "contains",
          value: query,
        },
        {
          field: "email",
          operator: "contains",
          value: query,
        },
        {
          field: "id",
          operator: "contains",
          value: query,
        },
      ],
    };
    const users = await this.service.findAll({ where });
    res.status(200).json(users);
  }
  async update(req: Request, res: Response) {
    const { id } = req.params;
    const user = req.body;
    const updatedUser = await this.service.update(id, user);
    res.status(200).json(updatedUser);
  }
  async delete(req: Request, res: Response) {
    const { id } = req.params;
    await this.service.delete(id);
    res.status(204).send();
  }
}
