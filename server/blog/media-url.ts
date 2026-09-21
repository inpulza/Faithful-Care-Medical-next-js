export function ownedMediaUrl(value:string){
 try{const u=new URL(value),host=process.env.BLOB_PUBLIC_HOSTNAME;
 return Boolean(host&&u.protocol==="https:"&&u.hostname===host&&u.port===""&&!u.username&&!u.password&&!u.search&&!u.hash&&u.pathname.startsWith("/faithful-care/blog/")&&u.pathname.endsWith(".webp"));}
 catch{return false;}
}
