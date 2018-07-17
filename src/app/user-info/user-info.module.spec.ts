import { UserInfoModule } from './user-info.module';

describe('UserDashboardModule', () => {
  let userInfoModule: UserInfoModule;

  beforeEach(() => {
    userInfoModule = new UserInfoModule();
  });

  it('should create an instance', () => {
    expect(userInfoModule).toBeTruthy();
  });
});
