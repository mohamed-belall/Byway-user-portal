import { atom } from "jotai";

export const CoursesAtom = atom({
  items: [],
  pageIndex: 1,
  pageSize: 8,
  totalCount: 0,
  loading: false,
  error: null,
});

export const CourseFiltersAtom = atom({
 pageSize: 8,
    pageIndex: 1,
    Rate: null,
    NumberOfLecture: null,
    price: null,
    Category: [],
    Search: null,
    Sort: null,
});


export const searchAtom = atom("");



export const CourseFormAtom = atom({
  open: false,
  mode: "add", // 'add' or 'edit'
  data: null,
  loading: false,
  error: null,
});

export const deleteDialogAtom = atom({
  open: false,
  courseId: null, // Changed from instructorId to courseId
  loading: false,
  error: null,
});
