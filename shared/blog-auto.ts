export const AUTO_STEPS=[
 ["ideas","AI topic selection"],["memory","Check existing articles"],["research","Research and source checks"],
 ["brief","Evidence and article outline"],["writing","Write article and H1"],["expansion","Depth, structure and cleanup"],
 ["metadata","Slug, descriptions and meta tags"],["save","Save private draft"],["visual_plan","Plan contextual images"],
 ["hero","Generate hero image"],["inline_1","Generate first inline image"],["inline_2","Generate second inline image"],
 ["alt_text","Describe and place the actual images"],["translation","Translate the article and SEO fields"],["verify","Final checks"]
] as const;
export type AutoStep={id:string;label:string;status:"pending"|"running"|"completed"|"failed"|"skipped";detail?:string;outputs?:Record<string,string>};
export type AutoView={id:string;requestId:string;status:"running"|"completed"|"failed"|"cancelled";cursor:number;busy:boolean;language:"en"|"es";steps:AutoStep[];postId:string|null;translationId:string|null;error:string|null};
