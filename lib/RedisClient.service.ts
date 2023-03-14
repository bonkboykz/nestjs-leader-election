import { Injectable, Logger } from "@nestjs/common";
import { CALL_ELECTION, CLAIM_POWER, HEARTBEAT, VOTE } from "./Constants";
import { Redis, RedisOptions } from "ioredis";

@Injectable()
export class RedisClientService {
  public readonly client;

  public readonly publisherClient;

  private readonly prefix: string;

  private readonly logger = new Logger(RedisClientService.name);

  constructor(config: RedisOptions & { prefix?: string }) {
    this.client = new Redis(config);

    this.publisherClient = new Redis(config);

    this.prefix = `nestjs-leader-election-${config.prefix}:`;

    this.client.on("connect", () => {
      this.logger.log("Redis connected");
    });

    this.client.on("error", () => {
      this.logger.error("Redis error");
    });
  }

  getHeartbeatChannelName(): string {
    return `${this.prefix}-${HEARTBEAT}`;
  }

  getClaimPowerChannelName(): string {
    return `${this.prefix}-${CLAIM_POWER}`;
  }

  getVoteChannelName(): string {
    return `${this.prefix}-${VOTE}`;
  }

  getCallElectionChannelName(): string {
    return `${this.prefix}-${CALL_ELECTION}`;
  }

  async emitHeartbeart(nodeId: string): Promise<void> {
    await this.client.publish(this.getHeartbeatChannelName(), nodeId);
  }

  async claimPower(nodeId: string): Promise<void> {
    await this.client.publish(this.getClaimPowerChannelName(), nodeId);
  }

  async callElection(nodeId: string): Promise<void> {
    await this.client.publish(this.getCallElectionChannelName(), nodeId);
  }

  async placeVote(nodeId: string): Promise<void> {
    await this.client.publish(this.getVoteChannelName(), nodeId);
  }
}

export default RedisClientService;
