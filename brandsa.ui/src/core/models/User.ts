import { enmRole } from "../enums/Role";
import mdlBase from "./Base";

export default class mdlUser extends mdlBase {
  username?: string;
  role?: enmRole;
}