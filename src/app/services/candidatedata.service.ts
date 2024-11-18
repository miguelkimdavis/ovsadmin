import { Injectable } from '@angular/core';
import { Candidates } from '../model/candidates';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class CandidateDataService {
  private dbPath = 'candidates';
  private resultsPath = 'results';

  errorMessage: string | null = null;
  candidatesRef: AngularFirestoreCollection<Candidates>;

  constructor(private db: AngularFirestore) {
    this.candidatesRef = db.collection
    (this.dbPath, (ref) =>
      ref.orderBy('position')
    );
  }

  createCandidate(candidate: Candidates) {
    return this.candidatesRef
      .add({ ...candidate })
      .then((item: DocumentReference<Candidates>) => {
        const candidateResults = {
          candidateId: item.id,
          position: candidate.position,
          name: candidate.name,
          party: candidate.party,
          votes: 0,
        };
        return this.db.collection(this.resultsPath).add(candidateResults);
      });
  }

  getCandidate(id: string): Promise<Candidates> {
    return this.candidatesRef
      .doc(id)
      .get()
      .toPromise()
      .then((doc) => {
        if (doc?.exists) {
          return doc.data() as Candidates;
        } else {
          throw new Error('Candidate not found');
        }
      })
      .catch((err) => {
        this.errorMessage = 'Candidate not found';
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

  deleteAllCandidates(): Promise<void> {
    return this.candidatesRef
      .get()
      .toPromise()
      .then((snapshot) => {
        if (snapshot && !snapshot.empty) {
          const batch = this.db.firestore.batch();
          snapshot.forEach((doc) => {
            batch.delete(doc.ref);
          });
          return batch.commit();
        }
        return Promise.resolve();
      });
  }
}
