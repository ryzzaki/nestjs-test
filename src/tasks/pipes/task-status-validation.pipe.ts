import { PipeTransform, BadRequestException } from "@nestjs/common";
import { TaskStatus } from '../task-status.enum';

export class StatusValidationPipe implements PipeTransform {
    readonly allowedStatutes = [
        TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE,
    ];

    transform(value: any) {
        value = value.toUpperCase();
        if (!this.isStatusValid(value)) {
            throw new BadRequestException();
        }
        return value;
    }

    private isStatusValid(status: any) {
        const index = this.allowedStatutes.indexOf(status);
        return index !== -1;
    }
}