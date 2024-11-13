import { Injectable } from '@angular/core';
import { Candidates } from '../model/candidates';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';

@Injectable(
    {
        providedIn: 'root',
    }
)

export class CandidateDataService {
  private dbPath = '/candidates';
  errorMessage: string | null = null;
  candidatesRef: AngularFirestoreCollection<Candidates>;

  constructor(private db: AngularFirestore) {
    this.candidatesRef = db.collection(this.dbPath, ref => ref.orderBy('position'));
}

  createCandidate(candidate: Candidates): any {
    return this.candidatesRef.add({ ...candidate });
  }

  getCandidate(id: string): Promise<Candidates> {
    return this.candidatesRef
      .doc(id)
      .get()
      .toPromise()
      .then((doc) => {
        if (doc?.exists) {
          return doc.data() as Candidates;
        } 
        else 
        {
          throw new Error('Candidate not found');
        }
      })
      .catch((err) => {
        this.errorMessage = "Candidate not found";
        throw this.errorMessage;
      });
  }

  getAllCandidates(): AngularFirestoreCollection<Candidates> {
    return this.candidatesRef;
  }

  updateCandidate(id: string, data: any): Promise<void> {
    return this.candidatesRef.doc(id).update(data);
  }

  deleteCandidate(id: string): Promise<void> {
    return this.candidatesRef.doc(id).delete();
  }
}
