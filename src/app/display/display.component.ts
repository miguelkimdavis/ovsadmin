import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Candidates } from '../model/candidates';
import { map } from 'rxjs';
import { CandidateDataService } from '../services/candidatedata.service';
@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css'],
})

export class DisplayComponent implements OnInit {
  candidates?: Candidates[];
  currentCandidate?: Candidates;
  currentIndex = 1;
  isLoading: boolean = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  isDesc: boolean = false;
  filteredCandidates: Candidates[] | undefined;
  _filterText: string = '';
  
  constructor(
    private route: Router,
    private candidateDataService: CandidateDataService
  ) {}

  ngOnInit(): void {
    this.retrieveCandidates();
  } 


  // get filterText(){
  //   return this._filterText;
  // }

  // set filterText(value: string) {
  //   this._filterText = value;
  //   this.filteredCandidates = this.filterCandidatesByPosition(value)
  // }

  // filterCandidatesByPosition(filterTerms:string){
  //   if(this.candidates?.length == 0 || this.filterText == ''){
  //     return this.candidates
  //   }
  //   else{
  //     return this.candidates?.filter((candidate)=>{
  //       return candidate.position?.toLowerCase() === filterTerms.toLowerCase()
  //     })
  //   }
  // }

  
  // sortPosition(property: string) {
  //   console.log('Sorting by:', property);
  //   this.isDesc = !this.isDesc;
  //   const direction = this.isDesc ? 1 : -1;
  //   this.candidates?.sort((a: any, b: any) => {
  //     if (a[property] < b[property]) {
  //       return -1 * direction;
  //     }
  //     else if (a[property] > b[property]) {
  //       return 1 * direction;
  //     } 
  //     else {
  //       return 0;
  //     }
  //   });
  // }

  refreshList(): void {
    this.currentCandidate = undefined;
    this.currentIndex = -1;
    this.retrieveCandidates();
  }
  
  retrieveCandidates(): void {
    this.isLoading = true;
    this.candidateDataService
      .getAllCandidates()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({
            id: c.payload.doc.id,
            ...c.payload.doc.data(),
          }))
        )
      )
      .subscribe((data) => {
        this.isLoading = false;
        this.candidates = data;
      });
    }
    
  onEditCandidate(candidate: Candidates) {
    this.currentCandidate = candidate;
  }
  
  openModal() {
    const modal = document.getElementById('deleteModalCenter');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
    }
  }
  
  closeModal() {
    const modal = document.getElementById('deleteModalCenter');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
    }
  }
  
  confirmDelete(id: string | undefined){
    this.isLoading = true;
    this.candidateDataService.deleteCandidate(id as string)
      .then(() => {
        this.isLoading = false;
        this.successMessage = 'Candidate deleted successfully';
        setTimeout(()=>{
          this.successMessage = null;
        },3000)
      })
      .catch(() => {
        this.isLoading = false;
        this.errorMessage = 'Error deleting candidate';
        setTimeout(()=>{
          this.errorMessage = null;
        },5000)
      });
  }
}
