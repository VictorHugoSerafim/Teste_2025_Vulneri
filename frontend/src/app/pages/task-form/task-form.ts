import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-form',
  standalone: false,
  templateUrl: './task-form.html',
  styleUrl: './task-form.css'
})

export class TaskForm implements OnInit {
  taskForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TaskForm>,
    private taskService: TaskService,
    @Inject(MAT_DIALOG_DATA) public task: any
  ) {}

  ngOnInit() {
    this.taskForm = this.fb.group({
      title: [this.task?.title || ''],
      description: [this.task?.description || ''],
      status: [this.task?.status || 'pendente'],
      dueDate: [this.task?.dueDate || '']
    });
  }

  save() {
    const data = this.taskForm.value;

    if (this.task) {
      this.taskService.updateTask(this.task.id, data).subscribe(() => {
        this.dialogRef.close(true);
      });
    } else {
      this.taskService.createTask(data).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}