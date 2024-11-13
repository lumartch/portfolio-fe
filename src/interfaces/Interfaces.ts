export interface IProject {
  source: string;
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  archived: boolean;
  git_url: string;
  ssh_url: string;
  clone_url: string;
  svn_url: string;
  default_branch: string;
  created_at: string;
}

export interface IProfile {
  user_id: number;
  name: string;
  username: string;
  email: string;
  git_uri: string;
  avatar_uri: string;
  bio: string;
}
