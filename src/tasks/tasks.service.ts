import { Injectable, Body } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid/v1';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    createTask(createTaskDto: CreateTaskDto): Task {
        const { title, description } = createTaskDto;

        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN,
        };

        this.tasks.push(task);
        return task;
    }

    getTaskById(id: string): Task {
        return this.tasks.find(task => task.id === id);
    }

    deleteTaskById(id: string): Task {
        const deletedObject = this.getTaskById(id);
        this.tasks.splice(this.tasks.indexOf(deletedObject), 1);
        return deletedObject;
    }

    updateTaskStatusById(id: string, @Body() taskStatus: TaskStatus): Task {
        const task = this.getTaskById(id);
        task.status = taskStatus;
        return task;
    }
}
