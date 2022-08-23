import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { Reply } from 'src/app/Models/reply';
import { showReply } from 'src/app/Models/showReply';
import { User } from 'src/app/Models/user';
@Component({
  selector: 'app-reply-dialog-component',
  templateUrl: './reply-dialog-component.component.html',
  styleUrls: ['./reply-dialog-component.component.css']
})
export class ReplyDialogComponentComponent implements OnInit {
  replyMessage!:string;
  description:showReply[];
  constructor(private dialogRef: MatDialogRef<ReplyDialogComponentComponent>,
    @Inject(MAT_DIALOG_DATA) data:showReply[]) { 
      this.description = data;
    }

  ngOnInit(): void {
  }
  save() {
    this.dialogRef.close(this.replyMessage);
  }

  close() 
  {
    this.dialogRef.close();
  }
}
