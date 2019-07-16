import { Injectable, Body, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { isNullOrUndefined } from 'util';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository,
    ) {}
    // getAllTasks(): Task[] {
    //     return this.tasks;
    // }
    
    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto);
    }
    
    async getTaskById(id: number): Promise<Task> {
        const found = await this.taskRepository.findOne(id);

        if (!found) {
            throw new NotFoundException(`Task with "${id}" cannot be found.`);
        }

        return found;
    }

    async deleteTaskById(id: number): Promise<Task> {
        return this.taskRepository.deleteTaskById(id);
    }
    // deleteTaskById(id: string): Task {
    //     const deletedObject = this.getTaskById(id);
    //     this.tasks.splice(this.tasks.indexOf(deletedObject), 1);
    //     return deletedObject;
    // }

    // updateTaskStatusById(id: string, @Body() status: TaskStatus): Task {
    //     const task = this.getTaskById(id);
    //     task.status = status;
    //     return task;
    // }
}
