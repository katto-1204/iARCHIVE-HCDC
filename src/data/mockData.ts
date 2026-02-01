
export interface ArchiveItem {
    id: string;
    title: string;
    description: string;
    category: string;
    date: string;
    accessLevel: "public" | "restricted";
    thumbnail: string;
    subjects: string[];
}

export const mockItems: ArchiveItem[] = [
    {
        id: "1",
        title: "Class of 2023 Yearbook",
        description: "Complete yearbook featuring graduates, campus events, and memorable moments from AY 2022-2023.",
        category: "Yearbooks",
        date: "2023-12-15",
        accessLevel: "public",
        thumbnail: "/placeholder.svg",
        subjects: ["Graduates", "Campus Life", "2023"],
    },
    {
        id: "2",
        title: "Campus Centennial Photo Collection",
        description: "A curated collection of photographs documenting the institution's growth over 75 years.",
        category: "Photographs",
        date: "2023-11-20",
        accessLevel: "public",
        thumbnail: "/placeholder.svg",
        subjects: ["Campus", "History", "Centennial"],
    },
    {
        id: "3",
        title: "Research Journal Volume 15",
        description: "Latest volume featuring faculty and student research papers across various disciplines.",
        category: "Publications",
        date: "2023-10-01",
        accessLevel: "public",
        thumbnail: "/placeholder.svg",
        subjects: ["Research", "Academic", "Faculty"],
    },
    {
        id: "4",
        title: "Founding Charter Documents",
        description: "Original founding documents and correspondence from the institution's establishment.",
        category: "Documents",
        date: "1950-01-15",
        accessLevel: "restricted",
        thumbnail: "/placeholder.svg",
        subjects: ["History", "Founding", "Charter"],
    },
    {
        id: "5",
        title: "Class of 2022 Yearbook",
        description: "Yearbook commemorating the achievements and memories of the Class of 2022.",
        category: "Yearbooks",
        date: "2022-12-15",
        accessLevel: "public",
        thumbnail: "/placeholder.svg",
        subjects: ["Graduates", "Campus Life", "2022"],
    },
    {
        id: "6",
        title: "Sports Championship Gallery",
        description: "Photos and memorabilia from institutional sports championships throughout the decades.",
        category: "Photographs",
        date: "2023-08-10",
        accessLevel: "public",
        thumbnail: "/placeholder.svg",
        subjects: ["Sports", "Athletics", "Championships"],
    },
    {
        id: "7",
        title: "Student Newspaper Archives 1980-1990",
        description: "Digitized collection of student newspapers from the 1980s decade.",
        category: "Publications",
        date: "1990-12-31",
        accessLevel: "public",
        thumbnail: "/placeholder.svg",
        subjects: ["Students", "Newspaper", "1980s"],
    },
    {
        id: "8",
        title: "Administrative Records 1960-1970",
        description: "Administrative correspondence and meeting minutes from the early institutional period.",
        category: "Documents",
        date: "1970-12-31",
        accessLevel: "restricted",
        thumbnail: "/placeholder.svg",
        subjects: ["Administration", "Records", "1960s"],
    },
];
