import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { User } from 'src/app/Models/user';
@Component({
  selector: 'app-like-dialog-component',
  templateUrl: './like-dialog-component.component.html',
  styleUrls: ['./like-dialog-component.component.css']
})
export class LikeDialogComponentComponent implements OnInit {
  description:User[];
  toggleLike=false;
  constructor(private dialogRef: MatDialogRef<LikeDialogComponentComponent>,
    @Inject(MAT_DIALOG_DATA) data:User[]) { 
      this.description = data;
    }

  ngOnInit(): void {
  }
  save() {
    this.dialogRef.close(this.toggleLike);
  }

  close() 
  {
    this.dialogRef.close(this.toggleLike);
  }
}
