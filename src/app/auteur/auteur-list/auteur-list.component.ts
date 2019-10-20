import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Actor} from '../../models/actor.model';
import {Subscription} from 'rxjs';
import {ActorService} from '../../services/actor.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-auteur-list',
  templateUrl: './auteur-list.component.html',
  styleUrls: ['./auteur-list.component.scss']
})
export class AuteurListComponent implements OnInit {
  actors: Actor[];
  actorsSubscription: Subscription;
  messageActor = '';
  actorForm: FormGroup;
  showOrHideMessageActor = false;
  classMessageActor = '';
  @ViewChild('closeModalNewActor') private closeModalNewActor: ElementRef;
  @ViewChild('closeModalDeleteActor') private closeModalDeleteActor: ElementRef;

  fileIsUploading = false;
  fileUrl = '';
  fileUploaded = false;
  idActorDeleted: number;
  constructor(private actorService: ActorService, private formBuilder: FormBuilder, private router: Router, private userService: AuthService) { }
  ngOnInit() {
    this.actorsSubscription = this.actorService.actorsSubject.subscribe(
      (acts: Actor[]) => {
        this.actors = acts;
      }
    );
    this.actorService.getActors();
    this.actorService.emitActors();
    this.initForm();
  }

  private initForm() {
    this.actorForm = this.formBuilder.group({
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  onSaveActor() {
    const actorLName = this.actorForm.get('lastName').value;
    const description = this.actorForm.get('description').value;
    const actorFName = this.actorForm.get('firstName').value;
    const actor = new Actor(actorFName, actorLName, description, this.fileUrl);
    this.actorService.createNewActor(actor);
    this.messageActor = 'Auteur créé avec success !!!';
    this.classMessageActor = 'alert-success';
    this.showOrHideMessageActor = !this.showOrHideMessageActor;
    this.closeModalNewActor.nativeElement.click();
    this.router.navigate(['/auteurs']);
  }
  onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.userService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    );
  }
  detectFiles(event) {
    this.onUploadFile(event.target.files[0]);
  }

  setIdActorDeleted(i: number) {
    this.idActorDeleted = i;
  }

  onDeleteActor() {
    console.log('Id Categorie deleted : ' + this.idActorDeleted);
    this.actorService.deleteActor(this.idActorDeleted);
    this.messageActor = 'Auteur supprimée avec success !!!';
    this.classMessageActor = 'alert-success';
    this.showOrHideMessageActor = !this.showOrHideMessageActor;
    this.closeModalDeleteActor.nativeElement.click();
    this.router.navigate(['/auteurs']);
  }

  showActor(id: number) {
    this.router.navigate(['/auteurs', 'view', id]);

  }

  editerActor(id: number) {
    this.router.navigate(['/auteurs', 'edit', id]);
  }
}
