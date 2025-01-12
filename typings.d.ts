import { ReactElement } from "react";

interface SanityBody {
  _createdAt: string;
  _id: string;
  _rev: string;
  _updatedAt: string;
}

interface Image {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
}

// interface Block {
//   name: "content";
//   title: "Content";
//   type: "array";
//   of: [
//     {
//       type: "block";
//       styles: [
//         { title: "Normal"; value: "normal" },
//         { title: "H1"; value: "h1" },
//         { title: "H2"; value: "h2" },
//         { title: "H3"; value: "h3" },
//         { title: "H4"; value: "h4" },
//         { title: "H5"; value: "h5" },
//         { title: "H6"; value: "h6" },
//         { title: "Quote"; value: "blockquote" },
//       ];
//       marks: {
//         decorators: [
//           { title: "Strong"; value: "strong" },
//           { title: "Emphasis"; value: "em" },
//           { title: "Code"; value: "code" },
//         ];
//         annotations: [
//           {
//             name: "internalLink";
//             type: "object";
//             title: "Internal link";
//             fields: [
//               {
//                 name: "reference";
//                 type: "reference";
//                 title: "Reference";
//                 // to: [
//                 //   { type: "post" },
//                 //   // other types you may want to link to
//                 // ];
//               },
//             ];
//           },
//         ];
//       };
//     },
//     {
//       type: "image";
//     },
//   ];
// }
export interface PageInfo extends SanityBody {
  _type: "pageInfo";
  address: string;
  backgroundInformation: string;
  email: string;
  role: string;
  heroImage: string;
  title: string;
  phoneNumber: string;
  profilePic: Image;
}

export interface Technology extends SanityBody {
  _type: "skill";
  image: Image;
  progress: number;
  title: string;
}

export interface Skill extends SanityBody {
  _type: "skill";
  image: Image;
  progress: number;
  title: string;
  webdev: boolean;
}

export interface Experience extends SanityBody {
  _type: "experience";
  company: string;
  companyImage: Image;
  dateStarted: Date;
  dateEnded: Date;
  isCurrentlyWorkingHere: Boolean;
  jobTitle: string;
  points: string[];
  technologies: Technology[];
}

export interface Project extends SanityBody {
  _type: "project";
  title: string;
  image: Image;
  linkToBuild: string;
  summary: string;
  technologies: Technology[];
  position: number;
}
export interface Social extends SanityBody {
  _type: "social";
  title: string;
  slug: slug;
  url: url;
  tag: string;
  position: number;
}
export interface GalleryImage extends SanityBody {
  _type: "galleryImage";
  title: string;
  description: string;
  actualImage: Image;
  location: string;
  dateTaken: Date;
  people: string[];
  position: number;
  linkToPost: reference;
}
export interface LogbookEntry extends SanityBody {
  _type: "logbookEntry";
  title: string;
  description: string;
  location: string;
  date: Date;
  entry: block[];
  position: number;
  slug: slug;
}
