import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { Length } from 'class-validator';

import { ThreadCommentDto } from '@shared/types';

import { Thread } from './Thread';
import { ThreadCommentPoint } from './ThreadCommentPoint';
import { Auditable } from './Auditable';
import { User } from './User';

@Entity({ name: 'ThreadComments' })
export class ThreadComment extends Auditable {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: string;

  @Column('varchar', {
    length: 2500,
    nullable: true,
  })
  @Length(10, 2500)
  body: string;

  @Column('int', {
    default: 0,
    nullable: false,
  })
  viewsCount: number;

  @Column('boolean', {
    default: false,
    nullable: false,
  })
  isDisabled: boolean;

  @ManyToOne(() => User, (user: User) => user.comments)
  author: User;

  @RelationId((comment: ThreadComment) => comment.author)
  authorId: string;

  @ManyToOne(() => Thread, (thread: Thread) => thread.comments)
  thread: Thread;

  @RelationId((comment: ThreadComment) => comment.thread)
  threadId: string;

  @OneToMany(
    () => ThreadCommentPoint,
    (point: ThreadCommentPoint) => point.comment,
  )
  points: ThreadCommentPoint[];

  @Column('int', {
    default: 0,
    nullable: false,
  })
  pointsSum: number;

  toJSON(): ThreadCommentDto {
    return {
      id: this.id,
      threadId: this.threadId,
      author: {
        id: this.author.id,
        name: this.author.name,
      },
      body: this.body,
      viewsCount: this.viewsCount,
      pointsSum: this.pointsSum,
      isDisabled: this.isDisabled,
      ...super.toJSON(),
    };
  }
}
