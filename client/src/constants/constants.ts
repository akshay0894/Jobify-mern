export enum JobStatus {
    interview= 'interview',
    declined= 'declined',
    pending= 'pending'
 }
 export enum JobType {
    fullTime= 'full-time', 
    partTime='part-time', 
    internship ='internship'
 }

 export enum Role {
   user= "user",
   admin="admin"
 }
 
 export const JOB_SORT_BY = {
    NEWEST_FIRST: 'newest',
    OLDEST_FIRST: 'oldest',
    ASCENDING: 'a-z',
    DESCENDING: 'z-a',
  };