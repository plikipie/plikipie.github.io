export interface ProjectSection {
  title: string;
  body: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  short: string;
  desc: string;
  stack: string[];
  year: string;
  role: string;
  color: string;
  bg: string;
  gradient: string;
  icon: string;
  featured?: boolean;
  results: string[];
  sections: ProjectSection[];
}

export interface Skill {
  name: string;
  sub: string;
  color: string;
  svg: string;
}

export interface WhyReason {
  icon: string;
  color: string;
  title: string;
  desc: string;
}

export interface PostContent {
  h: string;
  p: string;
}

export interface Post {
  id: string;
  title: string;
  desc: string;
  readTime: string;
  date: string;
  tag: string;
  content: PostContent[];
}
