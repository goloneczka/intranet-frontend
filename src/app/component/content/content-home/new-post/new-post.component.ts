import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PostToSave } from 'src/app/model/post';


@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent {
  
  @Output() newPostEvent = new EventEmitter<PostToSave>();
  shouldComponentBeRender = false;
  postForm: FormGroup;

  quillConfiguration: any;
  
  constructor(private fb: FormBuilder) {
    
    this.postForm = this.fb.group({
      title: ['', [Validators.required]],
      message: ['', [Validators.required]],
    });

    this.quillConfiguration = {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        [{ header: [1, 2, 3, false] }],
      ],
    };
  }
  

  shouldDisplayForm(val : boolean) {
    this.shouldComponentBeRender = val;
  }

  addPost() {
    if(this.postForm.valid){
      const title: string = this.postForm.controls['title'].value;
      const message: string = this.postForm.controls['message'].value;
      this.newPostEvent.emit({'title': title, 'message': message});
      this.shouldComponentBeRender = false;
      this.postForm.reset();
    }
  }
}


