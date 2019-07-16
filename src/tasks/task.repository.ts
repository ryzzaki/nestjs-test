import { Repository, EntityRepository, getConnection } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { NotFoundException } from '@nestjs/common';
import { GetTasksFilterDto } from './dto/filter-task.dto';
import { User } from '../auth/user.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        const { title, description } = createTaskDto;

        const task = new Task();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        task.user = user;
        await task.save();

        delete task.user;

        return task;
    }

    async deleteTaskById(id: number, user: User): Promise<Task> {
        const deletedTask = await this.findOne(id); // Don't do this in a production app. This is a redundant call.
        const result = await this.delete({ id, userId: user.id });

        if (result.affected === 0) {
            throw new NotFoundException(`Task with "${id}" cannot be found.`)
        }

        return deletedTask;
    }

    async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
        const { status, search } = filterDto;
        const query = this.createQueryBuilder('task');

        query.where('task.userId = :userId', { userId: user.id });

        if (status) {
            query.andWhere('task.status = :status', { status });
        }

        if (search) {
            query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', { search: `%${search}%` });
        }

        const tasks = await query.getMany();
        return tasks;
    }
}