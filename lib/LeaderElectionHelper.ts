import { NotImplementedException } from "@nestjs/common";
import { HeartbeatService } from "./Heartbeat.service";

export class LeaderElectionHelper {
  constructor(private heartbeatService: HeartbeatService) {}

  // eslint-disable-next-line class-methods-use-this
  async isLeader(): Promise<boolean> {
    throw new NotImplementedException("Leader Election not implemented.");
  }

  // eslint-disable-next-line class-methods-use-this
  async isInElection(): Promise<boolean> {
    throw new NotImplementedException("Leader Election not implemented.");
  }
}

export default LeaderElectionHelper;
