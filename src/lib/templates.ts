export interface TemplateType {
  name: string;
  initialContent: string;
  thumbnail: string;
}

export const templates: TemplateType[] = [
  {
    name: "Blank document",
    initialContent: "",
    thumbnail: "/Blank.png",
  },
  {
    name: "Resume",
    initialContent: "",
    thumbnail: "/resume.png",
  },
  {
    name: "Letter",
    initialContent: "",
    thumbnail: "/Letter.png",
  },
  {
    name: "Project",
    initialContent: "",
    thumbnail: "/Project.png",
  },
  {
    name: "Brochure",
    initialContent: "",
    thumbnail: "/Brochure.png",
  },
];
