import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CandidateDataService } from '../services/candidatedata.service';
import { Candidates } from '../model/candidates';
import { NgForm } from '@angular/forms';

@Component({
selector: 'app-edit',
templateUrl: './edit.component.html',
styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  currentCandidateId: string ='';
  currentCandidate!: Candidates;
  isLoading: boolean = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private candidateDataService: CandidateDataService
  ) {}

  ngOnInit(): void {
    this.currentCandidateId = this.activatedRoute.snapshot.paramMap.get('id')!;
    this.getCandidateData();
  }

  getCandidateData(): void {
    this.isLoading = true;
    this.candidateDataService.getCandidate(this.currentCandidateId)
    .then((data) => {
      this.currentCandidate = data;
      this.isLoading = false;
    })
    .catch((error) => {
      this.errorMessage = "Error retrieving candidate data"
      setTimeout(()=>{
        this.errorMessage = null;
      },5000)
    });
  }

  onEdit(editForm: NgForm){
    if(editForm.value.age < 18){
      this.errorMessage = "Candidatae must be 18 or above";
      setTimeout(()=>{
        this.errorMessage = null;
      },5000)
    }
    else{
      this.isLoading = true;
      const data = this.currentCandidate
      this.candidateDataService.updateCandidate(this.currentCandidateId, data)
      .then(()=>{
        this.isLoading = false;
        this.successMessage = "Candidate updated successfully"
        setTimeout(()=>{
          this.successMessage = null;
        },3000)
      })
      .catch((error)=>{
        this.errorMessage = "Error updating candidate"
        setTimeout(()=>{
          this.errorMessage = null;
        },5000)
      })
    }
  }
}
