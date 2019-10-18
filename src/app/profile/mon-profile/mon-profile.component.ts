import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {User} from "../../models/user.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import * as firebase from 'firebase';

@Component({
  selector: 'app-mon-profile',
  templateUrl: './mon-profile.component.html',
  styleUrls: ['./mon-profile.component.scss']
})
export class MonProfileComponent implements OnInit {
  updateForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;

  userCurrent: User;
  errorMessage: any;
  constructor(private userService: AuthService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
   this.userCurrent = this.userService.getCurrentUser();
   this.fileUrl = this.userCurrent.photoUrl;
   this.initForm();
  }

  private initForm() {
    this.updateForm = this.formBuilder.group({
      displayName: [],
      email: [Validators.required],
      phone: [],
      password: [ Validators.required]
    });
  }

  onUpdateProfile() {
    const userUp = firebase.auth().currentUser;
    userUp.updateProfile({
      displayName: this.userCurrent.name ,
      photoURL: this.fileUrl
    }).then(function() {
      console.log('Profile updated');
    }).catch(function(error) {
      console.log('Error for profile updated');
    });
  }

  onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.userService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
        this.userCurrent.photoUrl = url;
      }
    );
  }
  detectFiles(event) {
    this.onUploadFile(event.target.files[0]);
  }
}
