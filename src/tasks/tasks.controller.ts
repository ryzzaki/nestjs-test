import { Controller, Get, Post, Body, Param, Delete, Put, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { StatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {
    }

    // @Get()
    // getAllTasks(): Task[] {
    //     return this.tasksService.getAllTasks();
    // }

    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this.tasksService.getTaskById(id);
    }

    @Delete('/:id')
    deleteTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this.tasksService.deleteTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksService.createTask(createTaskDto);
    }

    // @Put('/:id/status')
    // updateTaskStatusById(@Param('id') id: string, @Body('status', StatusValidationPipe) status: TaskStatus): Task {
    //     return this.tasksService.updateTaskStatusById(id, status);
    // }
}
