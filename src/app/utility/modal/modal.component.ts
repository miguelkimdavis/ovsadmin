import { Candidates } from 'src/app/model/candidates';
import { CandidateDataService } from './../../services/candidatedata.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  candidates?: Candidates[];
  isLoading: boolean = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor
  (
    private candidateDataService: CandidateDataService) 
  { }

  ngOnInit(): void {

  }

  confirmDelete(id: string | undefined) {
    this.isLoading = true;
    this.candidateDataService.deleteCandidate(id as string)
      .then(() => {
        this.isLoading = false;
        this.successMessage = 'Candidate deleted successfully';
      })
      .catch(() => {
        this.isLoading = false;
        this.errorMessage = 'Error deleting candidate';
      });
  }

}
