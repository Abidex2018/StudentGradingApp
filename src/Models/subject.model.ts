export interface Subject{
    subjectId: string;
    subjectName: string;
    isActive: boolean;
}

export interface ApiResponse{
    success: boolean;
    data: Subject[];
    message: string;
}