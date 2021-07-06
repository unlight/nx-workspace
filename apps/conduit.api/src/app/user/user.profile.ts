import { InjectMapper, AutomapperProfile } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { mapFrom } from '@automapper/core';
import { Mapper } from '@automapper/types';
import { UserCreateInput } from './user-create.input';
import { UserCreateCommand } from './commands/user-create/user-create.command';

@Injectable()
export class UserProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile() {
    return (mapper: Mapper) => {
      mapper.createMap(UserCreateInput, UserCreateCommand).forMember(
        d => d.name,
        mapFrom(source => source.username),
      );
    };
  }
}
