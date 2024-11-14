import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Candidates } from '../model/candidates';
import { CandidateDataService } from '../services/candidatedata.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {

  candidate: Candidates = {
    name: '',
    email: '',
    age: 0,
    gender: '',
    party: '',
    course: '',
    year: 0,
    photo: '',
    position: ''
  };

  constructor(private candidateDataService: CandidateDataService) {}

  errorMessage: string | null = null;
  successMessage: string | null = null;
  isLoading:boolean = false;

  ngOnInit(): void {

  }

  onSubmit(candidateForm: NgForm) {
    this.isLoading = true;
    console.log(candidateForm.value);
    if (candidateForm.value.age < 18) {
      this.errorMessage = "Candidate Must Be 18+"
    }
    else{
      this.candidate = candidateForm.value;
      this.candidateDataService.createCandidate(this.candidate)
      .then(()=>{
        this.isLoading = false; 
        this.successMessage = "New Candidate Added"
        setTimeout(()=>{
          this.successMessage = null;
        },3000)
        candidateForm.reset()
      })
      .catch((err:Error)=>{
        console.log(err);
        this.errorMessage = "Error Adding Candidate"
        setTimeout(()=>{
          this.errorMessage = null;
        },5000)
      })
    }
  }
}