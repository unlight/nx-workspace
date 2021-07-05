export interface UserRepositoryInterface {
  findById(id: string): Promise<User>;
}
