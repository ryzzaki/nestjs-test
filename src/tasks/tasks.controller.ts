import { Controller, Get, Post, Body, Param, Delete, Put, UsePipes, ValidationPipe, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { StatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/filter-task.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/user.entity';
import { GetUser } from '../auth/get-user.decorator';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private tasksService: TasksService) {
    }

    @Get()
    getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto, @GetUser() user: User): Promise<Task[]> {
        return this.tasksService.getTasks(filterDto, user);
    }

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
    createTask(@Body() createTaskDto: CreateTaskDto, @GetUser() user: User): Promise<Task> {
        return this.tasksService.createTask(createTaskDto, user);
    }

    @Put('/:id/status')
    updateTaskStatusById(@Param('id', ParseIntPipe) id: number, @Body('status', StatusValidationPipe) status: TaskStatus): Promise<Task> {
        return this.tasksService.updateTaskStatusById(id, status);
    }
}
