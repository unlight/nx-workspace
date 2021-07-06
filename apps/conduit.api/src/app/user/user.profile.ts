import { InjectMapper, AutomapperProfile } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { mapFrom } from '@automapper/core';
import { Mapper } from '@automapper/types';
import { UserCreateCommand } from './commands/user-create/user-create.command';
import { UserCreateInput } from './dtos/user-create-input.dto';

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
