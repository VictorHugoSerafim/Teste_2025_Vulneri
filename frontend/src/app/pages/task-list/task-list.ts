import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskForm } from '../../pages/task-form/task-form';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  standalone: false,
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})

export class TaskList implements OnInit {
  tasks: any[] = [];

  constructor(private taskService: TaskService, private dialog: MatDialog) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe({
      next: (data) => (this.tasks = data),
      error: (err) => console.error('Erro ao carregar tarefas', err)
    });
  }

  openTaskForm(task: any = null) {
    const dialogRef = this.dialog.open(TaskForm, {
      width: '400px',
      data: task
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.loadTasks();
    });
  }

  deleteTask(id: number) {
    if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
      this.taskService.deleteTask(id).subscribe(() => this.loadTasks());
    }
  }
}
