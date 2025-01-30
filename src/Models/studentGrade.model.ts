export interface StudentGrade{
    studentGradeId: string;
    grade: string;
    firstName: string;
    lastName: string;
    subjectId: string;
    remarks: string;
}

export interface ApiResponse{
    success: boolean;
    data: StudentGrade[];
    message: string;
}