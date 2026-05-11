export const INIT_SUBJECTS = [
  {
    id:1,
    code:"CS-101",
    name:"Introduction to Computer Science",
    dept:"Computer Science",
    teacher:"Dr. Jane Doe"
  },

  {
    id:2,
    code:"MATH-202",
    name:"Advanced Linear Algebra",
    dept:"Mathematics",
    teacher:"Prof. Alan Smith"
  }
];

export const INIT_ROOMS = [
  {
    id:1,
    number:"101-A",
    type:"Classroom",
    capacity:"35 Students",
    status:"available"
  },

  {
    id:2,
    number:"CS-LAB-1",
    type:"Lab",
    capacity:"25 Workstations",
    status:"conflict"
  }
];

export const INIT_TEACHERS = [
  {
    id:1,
    name:"Dr. Jane Smith",
    tid:"T-2024-001",
    email:"jane.smith@edu.com",
    phone:"+1 234-567-8901",
    subjects:["Physics","Math"],
    status:"active",
    init:"JS"
  },

  {
    id:2,
    name:"Prof. Mark Brown",
    tid:"T-2024-002",
    email:"m.brown@edu.com",
    phone:"+1 234-567-8902",
    subjects:["Chemistry"],
    status:"active",
    init:"MB"
  }
];