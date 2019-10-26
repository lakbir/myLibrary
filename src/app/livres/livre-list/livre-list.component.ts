import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {Livre} from '../../models/livre.model';
import {LivreService} from '../../services/livre.service';
import {Router} from "@angular/router";


@Component({
  selector: 'app-livre-list',
  templateUrl: './livre-list.component.html',
  styleUrls: ['./livre-list.component.scss']
})
export class LivreListComponent implements OnInit {
  livres: Livre[];
  livresSubscription: Subscription;
  livreDeleted: Livre;
  @ViewChild('closeModalDeleteLivre') private closeModalDeleteLivre: ElementRef;
  constructor(private livreService: LivreService, private router: Router) { }

  ngOnInit() {
    this.livresSubscription = this.livreService.livresSubject.subscribe(
      (lvrs: Livre[]) => {
        this.livres = lvrs;
      }
    );
    this.livreService.getLivres();
    this.livreService.emitLivres();
  }
  editerLivre(idLivre: number) {
    this.router.navigate(['/livres', 'edit', idLivre]);
  }
  viewLivre(idLivre: number) {
      this.router.navigate(['/livres', 'view', idLivre]);
  }

  setLivreDeleted(liv: Livre) {
      this.livreDeleted = liv;
  }


  onDeleteLivre() {
    this.livreService.removeLivre(this.livreDeleted);
    this.closeModalDeleteLivre.nativeElement.click();
    this.router.navigate(['/livres']);
  }

}
