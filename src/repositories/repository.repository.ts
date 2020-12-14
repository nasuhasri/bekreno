import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Repository, RepositoryRelations, DevEnvironment, User, Project, Position} from '../models';
import {MysqlDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {DevEnvironmentRepository} from './dev-environment.repository';
import {UserRepository} from './user.repository';
import {ProjectRepository} from './project.repository';
import {PositionRepository} from './position.repository';

export class RepositoryRepository extends DefaultCrudRepository<
  Repository,
  typeof Repository.prototype.id,
  RepositoryRelations
> {

  public readonly devEnvironment: BelongsToAccessor<DevEnvironment, typeof Repository.prototype.id>;

  public readonly user: BelongsToAccessor<User, typeof Repository.prototype.id>;

  public readonly project: BelongsToAccessor<Project, typeof Repository.prototype.id>;

  public readonly position: BelongsToAccessor<Position, typeof Repository.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('DevEnvironmentRepository') protected devEnvironmentRepositoryGetter: Getter<DevEnvironmentRepository>, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('ProjectRepository') protected projectRepositoryGetter: Getter<ProjectRepository>, @repository.getter('PositionRepository') protected positionRepositoryGetter: Getter<PositionRepository>,
  ) {
    super(Repository, dataSource);
    this.position = this.createBelongsToAccessorFor('position', positionRepositoryGetter,);
    this.registerInclusionResolver('position', this.position.inclusionResolver);
    this.project = this.createBelongsToAccessorFor('project', projectRepositoryGetter,);
    this.registerInclusionResolver('project', this.project.inclusionResolver);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
    this.devEnvironment = this.createBelongsToAccessorFor('devEnvironment', devEnvironmentRepositoryGetter,);
    this.registerInclusionResolver('devEnvironment', this.devEnvironment.inclusionResolver);
  }
}