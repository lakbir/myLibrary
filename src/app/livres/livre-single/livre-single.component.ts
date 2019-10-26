import { Component, OnInit } from '@angular/core';
import {Livre} from '../../models/livre.model';
import {LivreService} from '../../services/livre.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-livre-single',
  templateUrl: './livre-single.component.html',
  styleUrls: ['./livre-single.component.scss']
})
export class LivreSingleComponent implements OnInit {

  livre: Livre;
  constructor(private livreService: LivreService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const idLivre = this.activatedRoute.snapshot.params['idLivre'];
    console.log('Id Livre : ' + idLivre);
    this.livreService.getSingleLivre(idLivre).then(
      (liv: Livre) => {
        this.livre = liv;
        console.log('Recuperation de livre SUCCESS');
      }, (err) => {
        console.log('ERROR : recuperation de livre' + err);
      }
    );
  }

  editerLivre() {
    this.router.navigate(['/livres', 'edit', this.activatedRoute.snapshot.params['idLivre']]);
  }
}
