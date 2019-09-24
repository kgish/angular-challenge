import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

export interface IPromptDialogData {
  title: string;
  subtitle: string;
  message: string;
}

@Component({
  selector: 'app-prompt-dialog',
  templateUrl: './prompt-dialog.component.html',
  styleUrls: [ './prompt-dialog.component.scss' ]
})
export class PromptDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: IPromptDialogData) {
  }

  ngOnInit() {
  }

}
