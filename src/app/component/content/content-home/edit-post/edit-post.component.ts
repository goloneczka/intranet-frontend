import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post, PostToSave } from 'src/app/model/post';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent {

  @Input() card!: Post
  @Output() editEvent = new EventEmitter<boolean>();
  @Output() editPostEvent = new EventEmitter<PostToSave>();


  postForm: FormGroup;
  quillConfiguration: any;

  constructor(private fb: FormBuilder) {
    
    this.postForm = this.fb.group({
      title: [this.card?.title, [Validators.required]],
      message: [this.card?.message, [Validators.required]],
    });

    this.quillConfiguration = {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        [{ header: [1, 2, 3, false] }],
        ['link', 'image']
      ],
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['card'] && changes['card'].currentValue) {
      this.postForm.patchValue(this.card);
    }
  }

  editPost() {
    if(this.postForm.valid){
      const title: string = this.postForm.controls['title'].value;
      const message: string = this.postForm.controls['message'].value;
      this.editPostEvent.emit({'title': title, 'message': message});
      this.editEvent.emit(false);
    }
  }

  undoEdit() {
    this.editEvent.emit(false);
  }
  
}
