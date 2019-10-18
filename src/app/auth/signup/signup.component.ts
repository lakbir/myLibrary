import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {User2} from "../../models/user2.model";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  errorMessage: string;
  user: User2;
  msgConfirmationPass = '';
  classConfirmationPass = '';
  validationPasswordV = false;
  showFormInscription = true;
  constructor(private fromBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private userService: UserService) { }

  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.signUpForm = this.fromBuilder.group({
      nom: ['', [Validators.required, Validators.pattern(/[a-zA-Z]{3,}/)]],
      prenom: ['', [Validators.required, Validators.pattern(/[a-zA-Z]{3,}/)]],
      rpassword: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
      tel: [''],
      adress: [''],
      ville: [''],
      pays: [''],
      sexe: [''],
      apropos: [''],
      dateNaissance: ['']
    });
  }
  public onSubmit() {

    this.msgConfirmationPass = '';
    this.classConfirmationPass = '';
    const email = this.signUpForm.get('email').value;
    const password = this.signUpForm.get('password').value;
    const nom = this.signUpForm.get('nom').value;
    const prenom = this.signUpForm.get('prenom').value;
    const tel = this.signUpForm.get('tel').value;
    const adress = this.signUpForm.get('adress').value;
    const ville = this.signUpForm.get('ville').value;
    const pays = this.signUpForm.get('pays').value;
    const dateNaissance = this.signUpForm.get('dateNaissance').value;
    const sexe = this.signUpForm.get('sexe').value;
    const apropos = this.signUpForm.get('apropos').value;
    console.log('Emial : ' + email);
    console.log('Password : ' + password);
    console.log('Nom : ' + nom);
    console.log('Prenom : ' + prenom);
    console.log('tel : ' + tel);
    console.log('adress : ' + adress);
    console.log('A propos : ' + apropos);
    console.log('date n : ' + dateNaissance);
    console.log('sexe : ' + sexe);
    console.log('Pays : ' + pays);
    console.log('ville : ' + ville);
    const userAdd: User2 = new User2(nom, prenom, email, tel, apropos, adress, ville, pays, dateNaissance, sexe, password);
    this.authService.createNewUser(email, password).then(
      () => {
        this.userService.createNewUser(userAdd);
        this.showFormInscription = false;
      },
      (err) => {
        this.errorMessage = err;
      }
    );
  }

  validationPassword() {
    const password = this.signUpForm.get('password').value;
    const rpassword = this.signUpForm.get('rpassword').value;
    if (password === rpassword) {
      this.msgConfirmationPass = 'Les mots de passes sont identique.';
      this.classConfirmationPass = 'text-success';
      this.validationPasswordV = true;
    } else {
      this.msgConfirmationPass = 'Les mots de passes ne sont identique.';
      this.classConfirmationPass = 'text-danger';
      this.validationPasswordV = false;
    }
  }
}
