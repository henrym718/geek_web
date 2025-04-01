import { Vendor } from "../models/vendor"
import { Client } from "../models/client"
import { User } from "../models/user"

export interface GetUserResponse {
   user: User
   client?: Client
   vendor?: Vendor
}
